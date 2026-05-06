import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import { loginClient } from '../../lib/clientService';
import CommonButton from '../../components/ui/CommonButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

const isTablet = DeviceInfo.isTablet();
const logo = require('../../assets/images/aiPOS.png');

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await loginClient(email, password);

      if (result.success) {
        navigation.replace('Auth');
      } else {
        setError(result.message || 'An error occurred during login');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{strings.email}</Text>
        <TextInput
          style={styles.input}
          placeholder={strings.enterEmail}
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{strings.password}</Text>
        <TextInput
          style={styles.input}
          placeholder={strings.enterPassword}
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <CommonButton
        title={strings.login}
        onPress={handleLogin}
        style={[styles.loginButton, isTablet && styles.tabletLoginButton]}
        isLoading={loading}
        disabled={loading}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.container, isTablet && styles.tabletContainer]}>
            <View style={styles.leftSection}>
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
              </View>
              <Text style={[styles.title, isTablet && styles.tabletTitle]}>
                {strings.login}
              </Text>
              <Text style={styles.subtitle}>
                Please sign in to your account to continue using the Kiosk.
              </Text>

              {!isTablet && renderForm()}
            </View>

            {isTablet && (
              <View style={styles.rightSection}>{renderForm()}</View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
