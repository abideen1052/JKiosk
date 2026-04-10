import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 40,
    color: colors.successGreen,
  },
  doneTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 5,
  },
  processedText: {
    fontSize: 18,
    color: colors.textSubHeader,
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderLeftWidth: 8,
    borderLeftColor: colors.rafeeq, // Using rafeeq purple for the stripe
  },
  leftColumn: {
    flex: 1.2,
  },
  rightColumn: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 20,
  },
  orderNumberContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.orderHighlight, // Light reddish background for order number
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  orderNumberValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  newEntryButton: {
    width: 220,
    height: 60,
    borderRadius: 15,
    marginTop: 40,
  },
  timerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.footerBorder,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  timerText: {
    fontSize: 14,
    color: colors.textSubHeader,
    fontWeight: '600',
  },
  timerSeconds: {
    fontWeight: '800',
  },
});
