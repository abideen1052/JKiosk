import { ViewStyle, View, Text } from 'react-native';
import { strings } from '../../../theme/strings';
import { styles } from './styles';

interface NumberDisplayProps {
  number: string;
  isTablet?: boolean;
  containerStyle?: ViewStyle;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({
  number,
  isTablet,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        isTablet && styles.tabletContainer,
        containerStyle,
      ]}
    >
      <Text style={[styles.countryCode, isTablet && styles.tabletCountryCode]}>
        {strings.countryCode}
      </Text>
      <View style={styles.numberWrapper}>
        <Text style={[styles.number, isTablet && styles.tabletNumber]}>
          {number || '0000 0000'}
        </Text>
        <View style={[styles.cursor, isTablet && styles.tabletCursor]} />
      </View>
    </View>
  );
};

export default NumberDisplay;
