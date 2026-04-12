import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
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
import { getRiderByMobile } from '../../lib/riderService';
import { useFlowStore } from '../../store/useFlowStore';

interface AuthScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
}

const isTablet = DeviceInfo.isTablet();

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNumberPress = (num: string) => {
    if (phoneNumber.length < 8) {
      setPhoneNumber(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const { setMobile, setRiderDetails, resetFlow } = useFlowStore();

  const handleNextPress = async () => {
    if (phoneNumber.length < 8) return;

    setLoading(true);
    try {
      const rider = await getRiderByMobile(phoneNumber);
      console.log('Rider found:', rider);

      if (rider) {
        // Returning rider — go to Welcome Back screen
        setRiderDetails({
          name: rider.name,
          company: rider.company,
          mobile: phoneNumber,
          isReturning: true,
        });
        navigation.navigate('WelcomeBack');
      } else {
        // New rider — start clean flow
        resetFlow();
        setMobile(phoneNumber);
        navigation.navigate('CompanySelection');
      }
    } catch (err) {
      console.error('Error fetching rider:', err);
      // Fallback to normal flow if error
      setMobile(phoneNumber);
      navigation.navigate('CompanySelection');
    } finally {
      setLoading(false);
    }
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
              style={[styles.nextButton, styles.tabletNextButton]}
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

          <TouchableOpacity
            style={styles.adminButtonTablet}
            onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.adminText}>Admin Access</Text>
          </TouchableOpacity>
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
          isLoading={loading}
        />

        <TouchableOpacity
          style={styles.adminButtonMobile}
          onPress={() => navigation.navigate('Admin')}
        >
          <Text style={styles.adminText}>Admin Access</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default AuthScreen;
