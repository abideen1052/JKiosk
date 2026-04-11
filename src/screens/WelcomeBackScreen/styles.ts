import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 25,
  },
  tabletContainer: {
    flexDirection: 'row',
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1.2,
    justifyContent: 'center',
    paddingRight: 40,
  },
  rightSection: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.black,
    lineHeight: 52,
  },
  tabletTitle: {
    fontSize: 64,
    lineHeight: 70,
  },
  nameText: {
    color: colors.primary,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 20,
    color: colors.textSubHeader,
    lineHeight: 28,
    marginTop: 20,
    marginBottom: 40,
    maxWidth: '90%',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
  },
  confirmButton: {
    marginBottom: 15,
  },
  notMeButton: {
    backgroundColor: colors.greyLight,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 30,
    width: '100%',
    maxWidth: 450,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardAccent: {
    width: 10,
    backgroundColor: colors.primary,
  },
  cardContent: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textHeader,
    textAlign: 'center',
    marginBottom: 10,
  },
  verifiedBadge: {
    backgroundColor: colors.greyLight,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 30,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.footerBorder,
    marginBottom: 30,
  },
  infoRow: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.secondary,
  },
  mobileHeader: {
    marginTop: 60,
    marginBottom: 40,
  },
  mobileFooter: {
    marginTop: 'auto',
    marginBottom: 40,
  },
});
