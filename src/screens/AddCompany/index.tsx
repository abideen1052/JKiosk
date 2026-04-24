import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { colors } from '../../theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/ui/CommonButton';
import { saveCompany, deleteCompany } from '../../lib/storage';
import { useCompanyStore } from '../../store/useCompanyStore';

const AddCompanyScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  
  const { companies, addCompanyToStore, updateCompanyInStore, removeCompanyFromStore, fetchCompanies } = useCompanyStore();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSave = async () => {
    if (!name.trim() || !logoUrl.trim()) {
      Alert.alert('Error', 'Please enter both name and logo URL');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const updated = await saveCompany(name.trim(), logoUrl.trim(), editingId);
        updateCompanyInStore(updated);
        Alert.alert('Success', 'Company updated successfully');
      } else {
        const newCompany = await saveCompany(name.trim(), logoUrl.trim());
        addCompanyToStore(newCompany);
        Alert.alert('Success', 'Company added successfully');
      }
      resetForm();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save company');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (company: any) => {
    setName(company.name);
    setLogoUrl(company.logo_url);
    setEditingId(company.id);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Company',
      'Are you sure you want to delete this company?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCompany(id);
              removeCompanyFromStore(id);
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete company');
            }
          }
        }
      ]
    );
  };

  const resetForm = () => {
    setName('');
    setLogoUrl('');
    setEditingId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          ref={scrollRef}
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{editingId ? 'Edit Company' : 'Add Company'}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Talabat"
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Logo URL</Text>
              <TextInput
                style={styles.input}
                placeholder="https://example.com/logo.png"
                value={logoUrl}
                onChangeText={setLogoUrl}
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
              />
            </View>

            <CommonButton
              title={isSaving ? "SAVING..." : (editingId ? "UPDATE COMPANY" : "SAVE COMPANY")}
              onPress={handleSave}
              backgroundColor={colors.primary}
              style={styles.saveButton}
              disabled={isSaving}
            />

            {editingId && (
              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelText}>CANCEL EDIT</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.previewContainer}>
            <Text style={styles.previewLabel}>Logo Preview</Text>
            <View style={styles.previewImage}>
              {logoUrl.trim() ? (
                <Image
                  source={{ uri: logoUrl }}
                  style={styles.previewImg}
                  onError={() => console.log('Image preview error')}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.placeholderText}>
                  Image preview will appear here
                </Text>
              )}
            </View>
          </View>

          <Text style={styles.listHeader}>Existing Companies</Text>
          {companies.map((company) => (
            <View key={company.id} style={styles.companyItem}>
              <Image source={{ uri: company.logo_url }} style={styles.itemLogo} resizeMode="contain" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{company.name}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(company)}>
                  <Text style={styles.actionIcon}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(company.id)}>
                  <Text style={styles.actionIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCompanyScreen;
