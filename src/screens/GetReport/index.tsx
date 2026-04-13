import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { styles } from './styles';
import { colors } from '../../theme/color';
import { getAllDeliveryLogs } from '../../lib/riderService';
import { useDebounce } from '../../hooks/useDebounce';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdminDropdown from '../../components/ui/AdminDropdown';
import { useCompanyStore } from '../../store/useCompanyStore';

interface DeliveryLog {
  id: string;
  mobile: string;
  rider_name: string;
  company: string;
  order_number: string;
  order_date: string;
  created_at: string;
}

const GetReportScreen = ({ navigation }: any) => {
  const { companies, fetchCompanies } = useCompanyStore();
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All');

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const companyOptions = [
    { label: 'All Companies', value: 'All' },
    ...companies.map(c => ({ label: c.name, value: c.name }))
  ];
  
  // Logic for generating last 12 months
  const generateMonthsList = () => {
    const months = [];
    const date = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
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
    const data = await getAllDeliveryLogs({
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
        <Text style={styles.orderNumber}>#{item.order_number}</Text>
        <View style={styles.companyBadge}>
          <Text style={styles.companyText}>{item.company}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.riderName}>{item.rider_name}</Text>
          <Text style={styles.mobileText}>{item.mobile}</Text>
        </View>
        <Text style={styles.dateText}>{item.order_date}</Text>
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
