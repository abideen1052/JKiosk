import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../theme/color';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabletContainer: {
    backgroundColor: colors.white,
    borderRadius: 40,
    width: screenWidth * 0.4,
    maxWidth: 480,
    minWidth: 350,
    paddingVertical: 30,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  listContent: {
    alignItems: 'center',
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
  specialKeyText: {
    fontSize: 32,
    color: colors.textHeader,
  },
  checkKeyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textHeader,
  },
});
