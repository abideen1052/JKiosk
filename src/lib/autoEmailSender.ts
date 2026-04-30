import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';
import BackgroundTimer from 'react-native-background-timer';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const EMAIL_CONFIG = {
  serviceId: 'service_jjtf554', // From emailjs.com dashboard
  templateId: 'template_msvpyfp', // Your EmailJS template ID
  publicKey: 'e4EX0xwBYYLfF2UCQ', // EmailJS public key
  recipients: ['abideen1052@gmail.com, zainmohammed1052@gmail.com'], // Target emails
};

const SCHEDULED_HOUR = 11;
const SCHEDULED_MINUTE = 38;
// ────────────────────────────────────────────────────────────────────────────

interface DeliveryLog {
  id: string;
  mobile: string;
  name: string;
  company: string;
  orderNumber: string;
  orderDate: string;
  createdAt: string;
}

// ── Convert file to base64 string for email attachment ──
const fileToBase64 = async (filePath: string): Promise<string> => {
  const base64 = await RNFS.readFile(filePath, 'base64');
  return base64;
};

// ── Send email silently via EmailJS REST API (no UI) ──
export const sendReportByEmail = async (
  logs: DeliveryLog[],
  label: string = 'report',
): Promise<void> => {
  try {
    if (logs.length === 0) throw new Error('No logs to send');

    // 1. Generate the Excel file
    const filePath = await generateExcelFile(logs, label);
    const base64File = await fileToBase64(filePath);
    const fileName = filePath.split('/').pop() ?? 'report.xlsx';

    // 2. Send to each recipient
    const sendPromises = EMAIL_CONFIG.recipients.map(async recipient => {
      const payload = {
        service_id: EMAIL_CONFIG.serviceId,
        template_id: EMAIL_CONFIG.templateId,
        user_id: EMAIL_CONFIG.publicKey,
        template_params: {
          to_email: recipient,
          subject: `Delivery Report — ${label} — ${new Date().toLocaleDateString()}`,
          message: `Please find the automated delivery report for ${label} attached.\n\nGenerated at: ${new Date().toLocaleString()}`,
          // These map to your EmailJS template variables:
          report_label: label,
          report_date: new Date().toLocaleDateString(),
          generated_time: new Date().toLocaleString(),
          attachment_name: fileName,
          attachment_data: base64File, // attach in EmailJS template
        },
      };

      const response = await fetch(
        'https://api.emailjs.com/api/v1.0/email/send',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`EmailJS error for ${recipient}: ${errText}`);
      }
    });

    await Promise.all(sendPromises);
    console.log(
      `[AutoReport] Report sent to ${EMAIL_CONFIG.recipients.join(', ')}`,
    );

    // 3. Cleanup temp file
    await RNFS.unlink(filePath).catch(() => {});
  } catch (err) {
    console.error('[AutoReport] Failed to send report:', err);
    throw err;
  }
};

// ── Calculate ms until next 10:45 AM ──
const getMsUntilScheduledTime = (): number => {
  const now = new Date();
  const target = new Date();

  target.setHours(SCHEDULED_HOUR, SCHEDULED_MINUTE, 0, 0);

  // If 10:45 AM already passed today, schedule for tomorrow
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  console.log(
    `[AutoReport] Next report scheduled in ${Math.round(diff / 60000)} minutes`,
  );
  return diff;
};

// ── Start the daily 10:45 AM auto-sender ──
let schedulerTimerId: number | null = null;

export const startAutoReportScheduler = (
  getLogsCallback: () => DeliveryLog[] | Promise<DeliveryLog[]>, // Pass a function that returns current logs
  label: string = 'report',
): void => {
  // Clear any existing scheduler
  stopAutoReportScheduler();

  const scheduleNext = () => {
    const delay = getMsUntilScheduledTime();

    schedulerTimerId = BackgroundTimer.setTimeout(async () => {
      try {
        const logs = await getLogsCallback(); // Fetch latest logs at send time
        await sendReportByEmail(logs, label);
      } catch (err) {
        console.error('[AutoReport] Scheduled send failed:', err);
      } finally {
        // Schedule the next day's send after this one fires
        scheduleNext();
      }
    }, delay);
  };

  scheduleNext();
  console.log('[AutoReport] Scheduler started');
};

// ── Stop the scheduler (call on logout / app teardown) ──
export const stopAutoReportScheduler = (): void => {
  if (schedulerTimerId !== null) {
    BackgroundTimer.clearTimeout(schedulerTimerId);
    schedulerTimerId = null;
    console.log('[AutoReport] Scheduler stopped');
  }
};

// ── Your existing generateExcelFile (unchanged) ──
export const generateExcelFile = async (
  logs: DeliveryLog[],
  label: string = 'report',
): Promise<string> => {
  const formatted = logs.map(log => ({
    Date: log.orderDate,
    Time: new Date(log.createdAt).toLocaleTimeString(),
    Company: log.company,
    'Rider Name': log.name,
    Mobile: log.mobile,
    'Order No': log.orderNumber,
  }));

  const ws = XLSX.utils.json_to_sheet(formatted);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Delivery Logs');

  const fileName = `delivery_${label}_${
    new Date().toISOString().split('T')[0]
  }.xlsx`;
  const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
  const excelData = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

  await RNFS.writeFile(filePath, excelData, 'base64');
  return filePath;
};
