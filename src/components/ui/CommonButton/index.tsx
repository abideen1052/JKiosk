import { ViewStyle, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  style,
  backgroundColor,
  textColor,
  disabled,
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
      <Text style={[styles.text, textColor ? { color: textColor } : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
