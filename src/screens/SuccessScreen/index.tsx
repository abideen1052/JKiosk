import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CommonButton from '../../components/ui/CommonButton';
import { loadBeep, playBeep, releaseBeep } from '../../lib/sound';
import { Check } from 'lucide-react-native';

interface SuccessScreenProps {
  navigation: any;
  route?: any; // To receive order data
}

import { useFlowStore } from '../../store/useFlowStore';

const SuccessScreen = ({ navigation }: SuccessScreenProps) => {
  const { name, mobile, company, orderNumber, orderDate, resetFlow } =
    useFlowStore();
  const [seconds, setSeconds] = useState(8);
  const tickScaleAnim = useRef(new Animated.Value(0)).current;

  const orderDetails = {
    company: company || 'Partner',
    customerName: name || 'Rider',
    mobileNumber: mobile,
    orderNumber: orderNumber || 'N/A',
    date: orderDate,
  };

  useEffect(() => {
    loadBeep(() => {
      playBeep();
    });
    setTimeout(() => {
      Animated.timing(tickScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 300);
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNewEntry();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      releaseBeep();
    };
  }, []);

  const handleNewEntry = () => {
    resetFlow();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <Animated.View
            style={{
              transform: [{ scale: tickScaleAnim }],
            }}
          >
            <Check size={100} color="#FFFFFF" strokeWidth={5} />
          </Animated.View>
        </View>

        <Text style={styles.doneTitle}>{strings.done}</Text>
        <Text style={styles.processedText}>{strings.orderProcessed}</Text>

        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.leftColumn}>
            <Text style={styles.label}>{strings.company}</Text>
            <Text style={styles.value}>{orderDetails.company}</Text>

            <Text style={styles.label}>{strings.customerName}</Text>
            <Text style={styles.value}>{orderDetails.customerName}</Text>

            <Text style={styles.label}>{strings.mobileNumber}</Text>
            <Text style={styles.value}>{orderDetails.mobileNumber}</Text>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.label}>{strings.orderNumber}</Text>
            <View style={styles.orderNumberContainer}>
              <Text style={styles.orderNumberValue}>
                {orderDetails.orderNumber}
              </Text>
            </View>

            <Text style={styles.label}>{strings.date}</Text>
            <Text style={styles.value}>{orderDetails.date}</Text>
          </View>
        </View>

        {/* Control Button */}
        <CommonButton
          title={strings.newEntry}
          onPress={handleNewEntry}
          backgroundColor={colors.primary}
          style={styles.newEntryButton}
        />

        {/* Timer Chip */}
        <View style={styles.timerChip}>
          <Text style={styles.timerText}>
            {strings.autoRedirect}{' '}
            <Text style={styles.timerSeconds}>{seconds}s</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessScreen;
