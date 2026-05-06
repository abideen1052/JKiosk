import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { strings } from '../../theme/strings';
import { clearClientSession } from '../../lib/storage';

const logo = require('../../assets/images/aiPOS.png');
const AdminScreen = ({ navigation }: any) => {
  const menuOptions = [
    {
      title: 'Get Report',
      description: 'View and export delivery logs',
      icon: '📊',
      screen: 'Report',
    },
    {
      title: 'Add Company',
      description: 'Add new delivery companies to the system',
      icon: '🏢',
      screen: 'AddCompany', // Placeholder for now
    },
  ];

  const handlePress = (screen: string) => {
    if (screen === 'Report' || screen === 'AddCompany') {
      navigation.navigate(screen);
    } else {
      console.log(`Navigate to ${screen}`);
    }
  };

  const handleLogout = async () => {
    await clearClientSession();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Admin Panel</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={() => handlePress(option.screen)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{option.icon}</Text>
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{option.title}</Text>
              <Text style={styles.menuDescription}>{option.description}</Text>
            </View>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{strings.back}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;
