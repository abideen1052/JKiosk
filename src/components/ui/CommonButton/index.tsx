import { ViewStyle, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface CommonButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
