import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CommonButton from '../../components/ui/CommonButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { styles } from './styles';

import { useFlowStore } from '../../store/useFlowStore';

interface WelcomeBackScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeBack'>;
  route?: any;
}

const isTablet = DeviceInfo.isTablet();

const WelcomeBackScreen = ({ navigation }: WelcomeBackScreenProps) => {
  const { name, company } = useFlowStore();

  const userData = {
    name: name || 'Rider',
    company: company || 'Partner',
    isVerified: true,
  };

  const handleConfirm = () => {
    // Navigate to Order screen directly or Company selection if needed
    navigation.navigate('Order');
  };

  const handleNotMe = () => {
    // Go back to Auth to re-enter details
    navigation.navigate('CompanySelection');
  };

  const renderContent = () => {
    if (isTablet) {
      return (
        <View style={[styles.container, styles.tabletContainer]}>
          <View style={styles.leftSection}>
            <Text style={[styles.title, styles.tabletTitle]}>
              {strings.welcomeBack}
            </Text>
            <Text style={[styles.title, styles.tabletTitle, styles.nameText]}>
              {userData.name.split(' ')[0]}!
            </Text>
            <Text style={styles.subtitle}>{strings.welcomeSub}</Text>

            <View style={styles.buttonGroup}>
              <CommonButton
                title={strings.yesThatsMe}
                onPress={handleConfirm}
                style={styles.confirmButton}
              />
              <CommonButton
                title={strings.updateDetails}
                onPress={handleNotMe}
                backgroundColor={colors.greyLight}
                textColor={colors.textSubHeader}
                style={styles.notMeButton}
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                //disabled={loading}
              >
                <Text style={styles.backText}>{strings.back}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.card}>
              <View style={styles.cardAccent} />
              <View style={styles.cardContent}>
                <Text style={styles.cardName}>{userData.name}</Text>
                {userData.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓ ID VERIFIED</Text>
                  </View>
                )}

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.label}>{strings.deliveringFrom}</Text>
                  <Text style={styles.value}>{userData.company}</Text>
                </View>
              </View>
            </View>
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

        <View style={styles.mobileHeader}>
          <Text style={styles.title}>{strings.welcomeBack}</Text>
          <Text style={[styles.title, styles.nameText]}>
            {userData.name.split(' ')[0]}!
          </Text>
          <Text style={styles.subtitle}>{strings.welcomeSub}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>{userData.name}</Text>
            {userData.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ ID VERIFIED</Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>{strings.deliveringFrom}</Text>
              <Text style={styles.value}>{userData.company}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mobileFooter}>
          <CommonButton
            title={strings.yesThatsMe}
            onPress={handleConfirm}
            style={styles.confirmButton}
          />
          <CommonButton
            title={strings.updateDetails}
            onPress={handleNotMe}
            backgroundColor={colors.greyLight}
            textColor={colors.textSubHeader}
            style={styles.notMeButton}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            //disabled={loading}
          >
            <Text style={styles.backText}>{strings.back}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default WelcomeBackScreen;
