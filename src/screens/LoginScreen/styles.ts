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
    justifyContent: 'center',
    paddingLeft: 50,
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
  formContainer: {
    width: '100%',
    maxWidth: 500,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textHeader,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.footerBorder,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textHeader,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.footerBorder,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textHeader,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 5,
  },
  errorText: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 30,
    width: '100%',
  },
  tabletLoginButton: {
    marginTop: 40,
  },
});
