import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { keepSupabaseAlive } from './src/lib/keepAlive';

export default function App() {
  useEffect(() => {
    keepSupabaseAlive();
  }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
