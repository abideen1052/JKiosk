import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { getSavedEmail, saveEmail } from '../../../lib/mailSettings';
import { styles } from './styles';

interface EmailModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (email: string) => void;
}

const EmailModal = ({ visible, onClose, onSave }: EmailModalProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (visible) {
      getSavedEmail().then(saved => {
        if (saved) {
          const list = saved.split(',').map(e => e.trim()).filter(Boolean);
          setEmails(list);
        } else {
          setEmails([]);
        }
      });
      setCurrentInput('');
      setEditingIndex(null);
    }
  }, [visible]);

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  const handleAddOrUpdate = () => {
    const trimmed = currentInput.trim();
    if (!trimmed || !validateEmail(trimmed)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (editingIndex !== null) {
      const newList = [...emails];
      newList[editingIndex] = trimmed;
      setEmails(newList);
      setEditingIndex(null);
    } else {
      if (emails.includes(trimmed)) {
        Alert.alert('Duplicate Email', 'This email is already in the list');
        return;
      }
      setEmails([...emails, trimmed]);
    }
    setCurrentInput('');
  };

  const handleEdit = (index: number) => {
    setCurrentInput(emails[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const newList = emails.filter((_, i) => i !== index);
    setEmails(newList);
    if (editingIndex === index) {
      setEditingIndex(null);
      setCurrentInput('');
    }
  };

  const handleSave = async () => {
    if (emails.length === 0) {
      Alert.alert('No Emails', 'Please add at least one email address');
      return;
    }
    const joined = emails.join(', ');
    await saveEmail(joined);
    onSave(joined);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Report Emails</Text>
          <Text style={styles.subtitle}>
            Reports will be auto-sent to these addresses on the last day of each month
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={currentInput}
              onChangeText={setCurrentInput}
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity onPress={handleAddOrUpdate} style={styles.addBtn}>
              <Text style={styles.addBtnText}>
                {editingIndex !== null ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.emailList}>
            {emails.map((item, index) => (
              <View key={index} style={styles.emailItem}>
                <Text style={styles.emailText} numberOfLines={1}>
                  {item}
                </Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(index)}>
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Text style={styles.deleteBtn}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={styles.saveText}>Save All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;
