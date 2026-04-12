import React from 'react';
import { styles } from './KeypadButton.styles';
import { ViewStyle, TextStyle, TouchableOpacity, Text } from 'react-native';

interface KeypadButtonProps {
  label?: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  isTablet?: boolean;
  disabled?: boolean;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({
  label,
  onPress,
  icon,
  containerStyle,
  textStyle,
  isTablet,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isTablet ? styles.tabletButton : styles.mobileButton,
        containerStyle,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
    >
      {icon ? icon : <Text style={[styles.label, textStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default KeypadButton;
