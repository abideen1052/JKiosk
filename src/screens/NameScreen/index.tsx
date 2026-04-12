import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import AlphabetKeypad from '../../components/ui/AlphabetKeypad';
import CommonButton from '../../components/ui/CommonButton';

interface NameScreenProps {
  navigation: any;
}

import { useFlowStore } from '../../store/useFlowStore';

const NameScreen = ({ navigation }: NameScreenProps) => {
  const { name: storedName, setName: setStoreName } = useFlowStore();
  const [name, setName] = useState(storedName || '');

  const handleKeyPress = (key: string) => {
    setName(prev => prev + key);
  };

  const handleDelete = () => {
    setName(prev => prev.slice(0, -1));
  };

  const handleSpace = () => {
    setName(prev => prev + ' ');
  };

  const handleNext = () => {
    setStoreName(name.trim());
    navigation.navigate('Order');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        <Text style={styles.title}>{strings.whatIsYourName}</Text>
        <Text style={styles.subtitle}>{strings.nameSubtitle}</Text>

        <View style={styles.inputView}>
          <Text style={[styles.inputText, !name && styles.placeholderText]}>
            {name || strings.enterName}
          </Text>
        </View>
      </View>

      <View style={styles.keyboardContainer}>
        <AlphabetKeypad
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
          onSpace={handleSpace}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{strings.back}</Text>
          </TouchableOpacity>

          <CommonButton
            title={strings.next}
            onPress={handleNext}
            backgroundColor={colors.secondary}
            style={styles.nextButton}
            disabled={!name.trim()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;
