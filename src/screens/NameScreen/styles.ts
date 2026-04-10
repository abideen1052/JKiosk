import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme/color';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSubHeader,
    marginBottom: 40,
  },
  inputView: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingVertical: 10,
    marginBottom: 40,
    minHeight: 60,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.textHeader,
  },
  placeholderText: {
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: colors.background,
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
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.backButtonText,
  },
  nextButton: {
    minWidth: width * 0.3,
    height: 55,
  },
  keyboardContainer: {
    width: '100%',
  },
});
