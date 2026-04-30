import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
// import {
//   startAutoReportScheduler,
//   stopAutoReportScheduler,
// } from './src/lib/autoEmailSender';
// import { getLogs } from './src/lib/storage';

export default function App() {
  // useEffect(() => {
  //   startAutoReportScheduler(
  //     () => getLogs(), // Fetches latest logs from AsyncStorage at send time
  //     'daily',
  //   );

  //   return () => stopAutoReportScheduler(); // Cleanup on unmount
  // }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
