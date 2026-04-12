import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CustomKeypad from '../../components/ui/CustomKeypad';
import NumberDisplay from '../../components/ui/NumberDisplay';
import CommonButton from '../../components/ui/CommonButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFlowStore } from '../../store/useFlowStore';
import {
  saveNewRider,
  saveDeliveryLog,
  updateRiderLastSeen,
} from '../../lib/riderService';

interface OrderScreenProps {
  navigation: any;
}

const isTablet = DeviceInfo.isTablet();

const OrderScreen = ({ navigation }: OrderScreenProps) => {
  const {
    mobile,
    name,
    company,
    isReturning,
    setOrderNumber: setStoreOrderNumber,
  } = useFlowStore();

  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNumberPress = (num: string) => {
    if (orderNumber.length < 8) {
      setOrderNumber(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setOrderNumber(prev => prev.slice(0, -1));
  };

  const handleNextPress = async () => {
    if (!orderNumber) return;

    setLoading(true);
    try {
      if (isReturning) {
        await updateRiderLastSeen(mobile, company);
      } else {
        await saveNewRider(mobile, name, company);
      }
      await saveDeliveryLog(mobile, name, company, orderNumber);
      setStoreOrderNumber(orderNumber);
      navigation.navigate('Success');
    } catch (error) {
      console.error('Final Submission Error:', error);
      Alert.alert(
        'Error',
        'Could not save delivery details. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (isTablet) {
      return (
        <View style={[styles.container, styles.tabletContainer]}>
          <View style={styles.leftSection}>
            <Text style={[styles.title, styles.tabletTitle]}>
              {strings.enterOrderNumber}
            </Text>
            <Text style={styles.subtitle}>{strings.orderSubtitle}</Text>

            <NumberDisplay
              number={orderNumber}
              isTablet={true}
              containerStyle={styles.displayContainer}
              isPhone={false}
            />

            <CommonButton
              title={strings.next}
              onPress={handleNextPress}
              style={styles.nextButton}
              disabled={!orderNumber}
              isLoading={loading}
              backgroundColor={colors.secondary}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.backText}>{strings.back}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightSection}>
            <CustomKeypad
              onNumberPress={handleNumberPress}
              onDeletePress={handleDeletePress}
              onCheckPress={handleNextPress}
              isTablet={true}
              disabled={loading}
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

        <Text style={styles.title}>{strings.enterOrderNumber}</Text>
        <Text style={styles.subtitle}>{strings.orderSubtitle}</Text>

        <NumberDisplay
          number={orderNumber}
          isTablet={false}
          containerStyle={styles.displayContainer}
          isPhone={false}
        />

        <CustomKeypad
          onNumberPress={handleNumberPress}
          onDeletePress={handleDeletePress}
          onCheckPress={handleNextPress}
          isTablet={false}
          containerStyle={styles.mobileKeypadContainer}
          disabled={loading}
        />

        <CommonButton
          title={strings.submit}
          onPress={handleNextPress}
          style={styles.nextButton}
          disabled={!orderNumber}
          isLoading={loading}
          backgroundColor={colors.secondary}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.backText}>{strings.back}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default OrderScreen;
