import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CompanyCard from '../../components/ui/CompanyCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFlowStore } from '../../store/useFlowStore';
import { useCompanyStore } from '../../store/useCompanyStore';

// Fallback placeholder image
const placeholderImg = require('../../assets/images/placeholder.png');

interface CompanySelectionScreenProps {
  navigation: any;
}

const CompanySelectionScreen = ({
  navigation,
}: CompanySelectionScreenProps) => {
  const { company: storedCompany, setCompany } = useFlowStore();
  const { companies, loading, fetchCompanies } = useCompanyStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    if (companies.length > 0) {
      if (storedCompany) {
        const matched = companies.find(c => c.name === storedCompany);
        if (matched) {
          setSelectedId(matched.id);
        } else if (!selectedId) {
          setSelectedId(companies[0].id);
        }
      } else if (!selectedId) {
        setSelectedId(companies[0].id);
      }
    }
  }, [companies, storedCompany]);

  const handleSelect = (item: any) => {
    setSelectedId(item.id);
    setCompany(item.name);
    navigation.navigate('Name');
  };

  const getCompanyStyles = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('talabat')) {
      return {
        borderStyle: styles.talabatBorder,
        selectedStyle: styles.talabatSelected,
        checkStyle: styles.talabatCheck,
      };
    }
    if (lowerName.includes('keeta')) {
      return {
        borderStyle: styles.keetaBorder,
        selectedStyle: styles.keetaSelected,
        checkStyle: styles.keetaCheck,
      };
    }
    if (lowerName.includes('snoonu')) {
      return {
        borderStyle: styles.snoonuBorder,
        selectedStyle: styles.snoonuSelected,
        checkStyle: styles.snoonuCheck,
      };
    }
    if (lowerName.includes('rafeeq')) {
      return {
        borderStyle: styles.rafeeqBorder,
        selectedStyle: styles.rafeeqSelected,
        checkStyle: styles.rafeeqCheck,
      };
    }
    return {
      borderStyle: styles.defaultBorder,
      selectedStyle: styles.defaultSelected,
      checkStyle: styles.defaultCheck,
    };
  };

  const renderItem = ({ item }: { item: any }) => {
    const companyStyles = getCompanyStyles(item.name);
    const imageSource =
      item.logo_url && item.logo_url.startsWith('http')
        ? { uri: item.logo_url }
        : placeholderImg;

    return (
      <CompanyCard
        title={item.name}
        image={imageSource}
        fallbackImage={placeholderImg}
        borderStyle={companyStyles.borderStyle}
        isSelected={selectedId === item.id}
        selectedCardStyle={companyStyles.selectedStyle}
        checkContainerStyle={companyStyles.checkStyle}
        onPress={() => handleSelect(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <Text style={styles.title}>{strings.whoAreYouDeliveringFrom}</Text>
        <Text style={styles.subtitle}>{strings.selectDeliveryPartner}</Text>

        {loading && companies.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={companies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No delivery partners found.
                </Text>
                <TouchableOpacity onPress={() => fetchCompanies(true)}>
                  <Text
                    style={[
                      styles.emptyText,
                      { color: colors.primary, marginTop: 10 },
                    ]}
                  >
                    Retry
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{strings.back}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompanySelectionScreen;
