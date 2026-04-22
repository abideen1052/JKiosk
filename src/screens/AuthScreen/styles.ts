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
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: -40,
  },
  logo: {
    width: 200,
    height: 100,
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
  errorText: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  displayContainer: {
    marginBottom: 20,
  },
  nextButton: {
    width: '100%',
    maxWidth: 400,
    //marginTop: 10,
  },
  tabletNextButton: {
    marginTop: 20,
  },
  mobileKeypadContainer: {
    marginVertical: 40,
  },
  adminButtonMobile: {
    alignSelf: 'center',
    padding: 10,
  },
  adminButtonTablet: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    right: 150,
    alignItems: 'center',
    padding: 15,
    width: 250,
  },
  adminText: {
    color: colors.textMuted,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
