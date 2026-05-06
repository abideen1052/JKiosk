import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getClientSession } from '../lib/storage';

import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import CompanySelectionScreen from '../screens/CompanySelectionScreen';
import NameScreen from '../screens/NameScreen';
import OrderScreen from '../screens/OrderScreen';
import SuccessScreen from '../screens/SuccessScreen';
import WelcomeBackScreen from '../screens/WelcomeBackScreen';
import AdminScreen from '../screens/AdminScreen';
import GetReportScreen from '../screens/GetReport';
import AddCompanyScreen from '../screens/AddCompany';

export type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  CompanySelection: undefined;
  Name: undefined;
  Order: undefined;
  Success: undefined;
  WelcomeBack: undefined;
  Admin: undefined;
  Report: undefined;
  AddCompany: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(
    null,
  );

  useEffect(() => {
    const checkSession = async () => {
      const session = await getClientSession();
      if (session) {
        setInitialRoute('Auth');
      } else {
        setInitialRoute('Login');
      }
    };
    checkSession();
  }, []);

  if (!initialRoute) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen
        name="CompanySelection"
        component={CompanySelectionScreen}
      />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      <Stack.Screen name="Report" component={GetReportScreen} />
      <Stack.Screen name="AddCompany" component={AddCompanyScreen} />
    </Stack.Navigator>
  );
}
