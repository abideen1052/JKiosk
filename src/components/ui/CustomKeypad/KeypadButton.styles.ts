import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../theme/color';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greyLight,
  },
  mobileButton: {
    width: screenWidth > 400 ? 75 : screenWidth * 0.18,
    height: screenWidth > 400 ? 75 : screenWidth * 0.18,
    borderRadius: 40,
    margin: screenWidth * 0.02,
  },
  tabletButton: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    maxWidth: 110,
    maxHeight: 110,
    minWidth: 80,
    minHeight: 80,
    borderRadius: 55,
    margin: screenWidth * 0.01,
  },
  label: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.textHeader,
  },
});
