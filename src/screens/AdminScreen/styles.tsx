import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: colors.textHeader,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textHeader,
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
});
