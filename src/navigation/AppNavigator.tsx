import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/AuthScreen';
import CompanySelectionScreen from '../screens/CompanySelectionScreen';

export type RootStackParamList = {
  Auth: undefined;
  CompanySelection: undefined;
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
    </Stack.Navigator>
  );
}
