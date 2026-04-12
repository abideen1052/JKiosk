import {
  ViewStyle,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import { styles } from './styles';
import { colors } from '../../../theme/color';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor,
  textColor,
  disabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor ? { backgroundColor } : null,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} size={'large'} />
      ) : (
        <Text style={[styles.text, textColor ? { color: textColor } : null]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;
