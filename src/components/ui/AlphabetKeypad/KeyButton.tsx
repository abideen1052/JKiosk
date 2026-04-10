import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './KeyButton.styles';

interface KeyButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isSpecial?: boolean;
}

const KeyButton = ({ label, onPress, style, textStyle, isSpecial }: KeyButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSpecial && styles.specialButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default KeyButton;
