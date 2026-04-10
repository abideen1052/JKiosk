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
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 40,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.textHeader,
    lineHeight: 48,
    marginBottom: 15,
  },
  tabletTitle: {
    fontSize: 56,
    lineHeight: 64,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSubHeader,
    lineHeight: 26,
    marginBottom: 40,
    maxWidth: '90%',
  },
  displayContainer: {
    marginBottom: 20,
  },
  nextButton: {
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  mobileKeypadContainer: {
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.footerBorder,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.backButtonText,
  },
});
