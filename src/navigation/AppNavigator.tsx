import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/AuthScreen';
import CompanySelectionScreen from '../screens/CompanySelectionScreen';
import NameScreen from '../screens/NameScreen';
import OrderScreen from '../screens/OrderScreen';
import SuccessScreen from '../screens/SuccessScreen';
import WelcomeBackScreen from '../screens/WelcomeBackScreen';

export type RootStackParamList = {
  Auth: undefined;
  CompanySelection: undefined;
  Name: undefined;
  Order: undefined;
  Success: undefined;
  WelcomeBack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen
        name="CompanySelection"
        component={CompanySelectionScreen}
      />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
    </Stack.Navigator>
  );
}
