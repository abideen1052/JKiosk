import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { styles } from './styles';
import { strings } from '../../theme/strings';
import { colors } from '../../theme/color';
import CompanyCard from '../../components/ui/CompanyCard';
import CommonButton from '../../components/ui/CommonButton';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Assets
const talabatImg = require('../../assets/images/talabat.jpg');
const keetaImg = require('../../assets/images/keeta.png');
const snoonuImg = require('../../assets/images/snoonu.webp');
const rafeeqImg = require('../../assets/images/rafeeq.png');

interface CompanyData {
  id: string;
  image: any;
  borderStyle: any;
  selectedStyle: any;
  checkStyle: any;
}

interface CompanySelectionScreenProps {
  navigation: any;
}

const COMPANIES: CompanyData[] = [
  {
    id: '1',
    image: talabatImg,
    borderStyle: styles.talabatBorder,
    selectedStyle: styles.talabatSelected,
    checkStyle: styles.talabatCheck,
  },
  {
    id: '2',
    image: keetaImg,
    borderStyle: styles.keetaBorder,
    selectedStyle: styles.keetaSelected,
    checkStyle: styles.keetaCheck,
  },
  {
    id: '3',
    image: snoonuImg,
    borderStyle: styles.snoonuBorder,
    selectedStyle: styles.snoonuSelected,
    checkStyle: styles.snoonuCheck,
  },
  {
    id: '4',
    image: rafeeqImg,
    borderStyle: styles.rafeeqBorder,
    selectedStyle: styles.rafeeqSelected,
    checkStyle: styles.rafeeqCheck,
  },
];

import { useFlowStore } from '../../store/useFlowStore';

const CompanySelectionScreen = ({
  navigation,
}: CompanySelectionScreenProps) => {
  const { company: storedCompany, setCompany } = useFlowStore();
  
  // Find the ID that matches the stored company name, default to '1' (Talabat)
  const getInitialSelectedId = () => {
    if (storedCompany === 'Talabat') return '1';
    if (storedCompany === 'Keeta') return '2';
    if (storedCompany === 'Snoonu') return '3';
    if (storedCompany === 'Rafeeq') return '4';
    return COMPANIES[0].id;
  };

  const [selectedId, setSelectedId] = useState(getInitialSelectedId());

  const handleNext = () => {
    let companyName = 'Partner';
    if (selectedId === '1') companyName = 'Talabat';
    else if (selectedId === '2') companyName = 'Keeta';
    else if (selectedId === '3') companyName = 'Snoonu';
    else if (selectedId === '4') companyName = 'Rafeeq';
    
    setCompany(companyName);
    navigation.navigate('Name');
  };

  const renderItem = ({ item }: { item: CompanyData }) => (
    <CompanyCard
      image={item.image}
      borderStyle={item.borderStyle}
      isSelected={selectedId === item.id}
      selectedCardStyle={item.selectedStyle}
      checkContainerStyle={item.checkStyle}
      onPress={() => setSelectedId(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <Text style={styles.title}>{strings.whoAreYouDeliveringFrom}</Text>
        <Text style={styles.subtitle}>{strings.selectDeliveryPartner}</Text>

        <FlatList
          data={COMPANIES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{strings.back}</Text>
          </TouchableOpacity>

          <CommonButton
            title={strings.next}
            onPress={handleNext}
            backgroundColor={colors.secondary}
            style={styles.assistanceButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompanySelectionScreen;
