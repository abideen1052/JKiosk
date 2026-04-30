import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import * as XLSX from 'xlsx';
import { Platform } from 'react-native';

interface DeliveryLog {
  id: string;
  mobile: string;
  name: string;
  company: string;
  orderNumber: string;
  orderDate: string;
  createdAt: string;
}

// ── Generate Excel file from logs and return file path ──
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

// ── Share/export file (WhatsApp, Drive, etc.) ──
export const shareExcelFile = async (
  logs: DeliveryLog[],
  label: string = 'report',
  emails?: string,
): Promise<void> => {
  try {
    if (logs.length === 0) throw new Error('No data to export');

    const filePath = await generateExcelFile(logs, label);

    const shareUrl =
      Platform.OS === 'android' ? `file://${filePath}` : filePath;

    await Share.open({
      title: 'Export Delivery Report',
      subject: `Delivery Report — ${label}`, // ← email subject
      message: `Please find the delivery report for ${label} attached.`, // ← email body
      url: shareUrl,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: filePath.split('/').pop() ?? 'report.xlsx',
      failOnCancel: false,
      email: emails, // Use dynamic emails
    });
  } catch (err: any) {
    if (
      err.message !== 'User did not share' &&
      err.message !== 'CANCEL' &&
      err?.dismissedAction !== true
    ) {
      throw err;
    }
  }
};
