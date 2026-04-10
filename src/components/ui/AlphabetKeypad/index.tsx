import React from 'react';
import { View } from 'react-native';
import KeyButton from './KeyButton';
import { styles } from './styles';
import { styles as keyStyles } from './KeyButton.styles';

interface AlphabetKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onSpace: () => void;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ['SPACE'],
];

const AlphabetKeypad = ({ onKeyPress, onDelete, onSpace }: AlphabetKeypadProps) => {
  return (
    <View style={styles.container}>
      {ROWS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map(key => {
            if (key === 'DEL') {
              return (
                <KeyButton
                  key={key}
                  label="⌫"
                  onPress={onDelete}
                  style={keyStyles.actionButton}
                  textStyle={keyStyles.actionText}
                />
              );
            }
            if (key === 'SPACE') {
              return (
                <KeyButton
                  key={key}
                  label="SPACE"
                  onPress={onSpace}
                  style={keyStyles.spaceButton}
                />
              );
            }
            return (
              <View key={key} style={styles.keyWrapper}>
                <KeyButton
                  label={key}
                  onPress={() => onKeyPress(key)}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default AlphabetKeypad;
