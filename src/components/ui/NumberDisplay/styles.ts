import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    padding: 24,
    borderRadius: 25,
    width: '100%',
  },
  tabletContainer: {
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  countryCode: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textMuted,
    marginRight: 15,
  },
  tabletCountryCode: {
    fontSize: 48,
    marginRight: 25,
  },
  numberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  number: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.secondary,
    letterSpacing: 1,
  },
  tabletNumber: {
    fontSize: 72,
    letterSpacing: 4,
  },
  cursor: {
    width: 2,
    height: 40,
    backgroundColor: colors.primary,
    marginLeft: 5,
  },
  tabletCursor: {
    width: 3,
    height: 70,
    marginLeft: 10,
  },
});
