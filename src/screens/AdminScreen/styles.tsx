import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    height: 100,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.textHeader,
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
    left: 0,
    top: 5,
  },
  logo: {
    width: 200,
    height: 100,
  },
  menuContainer: {
    flex: 1,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: colors.background, // Or a lighter version of primary
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 30,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textHeader,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  arrowText: {
    fontSize: 24,
    color: colors.primary,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 0,
    left: 25,
    right: 25,
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
});
