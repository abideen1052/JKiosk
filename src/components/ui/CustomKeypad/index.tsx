import { FlatList, View, ViewStyle } from 'react-native';
import KeypadButton from './KeypadButton';
import { styles } from './styles';

interface CustomKeypadProps {
  onNumberPress: (num: string) => void;
  onDeletePress: () => void;
  onCheckPress: () => void;
  containerStyle?: ViewStyle;
  isTablet?: boolean;
}

const CustomKeypad: React.FC<CustomKeypadProps> = ({
  onNumberPress,
  onDeletePress,
  onCheckPress,
  containerStyle,
  isTablet,
}) => {
  const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'delete',
    '0',
    'check',
  ];

  const renderItem = ({ item }: { item: string }) => {
    if (item === 'delete') {
      return (
        <KeypadButton
          onPress={onDeletePress}
          label="⌫"
          isTablet={isTablet}
          containerStyle={!isTablet ? styles.transparentBg : undefined}
          textStyle={styles.specialKeyText}
        />
      );
    }
    if (item === 'check') {
      return (
        <KeypadButton
          onPress={onCheckPress}
          label="✓"
          isTablet={isTablet}
          containerStyle={!isTablet ? styles.transparentBg : undefined}
          textStyle={styles.checkKeyText}
        />
      );
    }
    return (
      <KeypadButton
        label={item}
        onPress={() => onNumberPress(item)}
        isTablet={isTablet}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        isTablet && styles.tabletContainer,
        containerStyle,
      ]}
    >
      <FlatList
        data={keys}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CustomKeypad;
