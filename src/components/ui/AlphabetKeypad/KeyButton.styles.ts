import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textHeader,
  },
  specialButton: {
    backgroundColor: colors.greyLight,
  },
  spaceButton: {
    flex: 4,
  },
  actionButton: {
    backgroundColor: colors.secondary,
    flex: 1.5,
  },
  actionText: {
    color: colors.white,
    fontWeight: '700',
  },
});
