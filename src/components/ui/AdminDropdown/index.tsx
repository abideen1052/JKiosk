import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from './styles';
import { colors } from '../../../theme/color';

interface DropdownItem {
  label: string;
  value: string;
}

interface AdminDropdownProps {
  label: string;
  value: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({
  label,
  value,
  items,
  onSelect,
  placeholder = 'Select...',
}) => {
  const [visible, setVisible] = useState(false);

  const selectedItem = items.find((item) => item.value === value);

  const handleSelect = (itemValue: string) => {
    onSelect(itemValue);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      item.value === value && styles.selectedItem,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text style={[
                      styles.itemText,
                      item.value === value && styles.selectedItemText
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AdminDropdown;
