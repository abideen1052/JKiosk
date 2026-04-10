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

interface OrderScreenProps {
  navigation: any;
}

const isTablet = DeviceInfo.isTablet();

const OrderScreen = ({ navigation }: OrderScreenProps) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleNumberPress = (num: string) => {
    if (orderNumber.length < 4) {
      setOrderNumber(prev => prev + num);
    }
  };

  const handleDeletePress = () => {
    setOrderNumber(prev => prev.slice(0, -1));
  };

  const handleNextPress = () => {
    console.log('Order Number entered:', orderNumber);
    navigation.navigate('Success');
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
              backgroundColor={colors.secondary}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
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
        />

        <CommonButton
          title={strings.next}
          onPress={handleNextPress}
          style={styles.nextButton}
          disabled={!orderNumber}
          backgroundColor={colors.secondary}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{strings.back}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default OrderScreen;
