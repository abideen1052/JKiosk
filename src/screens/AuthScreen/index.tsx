import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CustomKeypad from '../../components/ui/CustomKeypad';
import NumberDisplay from '../../components/ui/NumberDisplay';
import CommonButton from '../../components/ui/CommonButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface AuthScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
}

const isTablet = DeviceInfo.isTablet();

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberPress = (num: string) => {
    if (phoneNumber.length < 8) {
      setPhoneNumber(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleNextPress = () => {
    console.log('Next pressed for:', phoneNumber);
    navigation.navigate('CompanySelection');
  };

  const formatPhoneNumber = (num: string) => {
    if (!num) return '';
    const part1 = num.slice(0, 4);
    const part2 = num.slice(4, 8);
    return part2 ? `${part1} ${part2}` : part1;
  };

  const renderContent = () => {
    if (isTablet) {
      return (
        <View style={[styles.container, styles.tabletContainer]}>
          <View style={styles.leftSection}>
            <Text style={[styles.title, styles.tabletTitle]}>
              {strings.enterMobileNumber}
            </Text>
            <Text style={styles.subtitle}>{strings.subtitleMobile}</Text>

            <NumberDisplay
              number={formatPhoneNumber(phoneNumber)}
              isTablet={true}
              containerStyle={styles.displayContainer}
            />

            <CommonButton
              title={strings.next}
              onPress={handleNextPress}
              style={styles.nextButton}
            />
          </View>

          <View style={styles.rightSection}>
            <CustomKeypad
              onNumberPress={handleNumberPress}
              onDeletePress={handleDeletePress}
              onCheckPress={handleNextPress}
              isTablet={true}
            />
          </View>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />

        <Text style={styles.title}>{strings.enterMobileNumber}</Text>
        <Text style={styles.subtitle}>{strings.subtitleMobileSecondary}</Text>

        <NumberDisplay
          number={formatPhoneNumber(phoneNumber)}
          isTablet={false}
          containerStyle={styles.displayContainer}
        />

        <CustomKeypad
          onNumberPress={handleNumberPress}
          onDeletePress={handleDeletePress}
          onCheckPress={handleNextPress}
          isTablet={false}
          containerStyle={styles.mobileKeypadContainer}
        />

        <CommonButton
          title={strings.next}
          onPress={handleNextPress}
          style={styles.nextButton}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default AuthScreen;
