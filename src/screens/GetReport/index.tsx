import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { colors } from '../../theme/color';
import { getLogs, clearAllLogs } from '../../lib/storage';
import { useDebounce } from '../../hooks/useDebounce';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminDropdown from '../../components/ui/AdminDropdown';
import { useCompanyStore } from '../../store/useCompanyStore';
import { getSavedEmail } from '../../lib/mailSettings';
import { shareExcelFile } from '../../lib/exportService';
import EmailModal from '../../components/ui/EmailModal';

interface DeliveryLog {
  id: string;
  mobile: string;
  name: string;
  company: string;
  orderNumber: string;
  orderDate: string;
  createdAt: string;
}

const GetReportScreen = ({ navigation }: any) => {
  const { companies, fetchCompanies } = useCompanyStore();
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    getSavedEmail().then(setSavedEmail);
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleExport = async () => {
    if (!savedEmail) {
      setEmailModalVisible(true);
      return;
    }
    try {
      await shareExcelFile(
        logs,
        `${selectedCompany}_${selectedMonth}`,
        savedEmail,
      );
    } catch (err: any) {
      Alert.alert('Export Failed', err.message);
    }
  };

  const handleClearLogs = () => {
    Alert.alert(
      'Clear All Logs',
      'Are you sure you want to clear all the logs? This action cannot be undone and you will lose all report data.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllLogs();
            if (success) {
              setLogs([]);
              Alert.alert('Success', 'All logs have been cleared successfully.');
            } else {
              Alert.alert('Error', 'Failed to clear logs.');
            }
          },
        },
      ]
    );
  };

  const companyOptions = [
    { label: 'All Companies', value: 'All' },
    ...companies.map(c => ({ label: c.name, value: c.name })),
  ];

  // Logic for generating last 12 months
  const generateMonthsList = () => {
    const months = [];
    const date = new Date();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (let i = 0; i < 12; i++) {
      const m = date.getMonth();
      const y = date.getFullYear();

      const value = `${y}-${(m + 1).toString().padStart(2, '0')}`;
      const label = `${monthNames[m]} ${y}`;

      months.push({ label, value });
      date.setMonth(date.getMonth() - 1);
    }
    return months;
  };

  const monthItems = generateMonthsList();
  const [selectedMonth, setSelectedMonth] = useState(monthItems[0].value);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const data = await getLogs({
      company: selectedCompany,
      month: selectedMonth,
      search: debouncedSearch,
    });
    setLogs(data || []);
    setLoading(false);
  }, [selectedCompany, selectedMonth, debouncedSearch]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const renderLogItem = ({ item }: { item: DeliveryLog }) => (
    <View style={styles.logCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
        <View style={styles.companyBadge}>
          <Text style={styles.companyText}>{item.company}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.riderName}>{item.name}</Text>
          <Text style={styles.mobileText}>{item.mobile}</Text>
        </View>
        <Text style={styles.dateText}>{item.orderDate}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Delivery Reports</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Order ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.filtersRow}>
        <AdminDropdown
          label="Company"
          value={selectedCompany}
          items={companyOptions}
          onSelect={setSelectedCompany}
        />
        <AdminDropdown
          label="Month"
          value={selectedMonth}
          items={monthItems}
          onSelect={setSelectedMonth}
        />
      </View>
      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={handleExport} style={styles.exportBtn}>
          <Text style={styles.exportBtnText}>Export Excel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setEmailModalVisible(true)}
          style={styles.editEmailBtn}
        >
          <Text style={styles.editEmailText}>
            {!savedEmail ? 'Add Email' : 'Update Email'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClearLogs}
          style={styles.clearLogsBtn}
        >
          <Text style={styles.clearLogsText}>Clear Logs</Text>
        </TouchableOpacity>
      </View>

      {/* Email Modal */}
      <EmailModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        onSave={setSavedEmail}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No entries found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default GetReportScreen;
