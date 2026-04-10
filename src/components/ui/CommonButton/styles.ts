import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 70,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  arrow: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
