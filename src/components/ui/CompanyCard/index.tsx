import React from 'react';
import { View, TouchableOpacity, Image, ViewStyle, ImageSourcePropType, Text } from 'react-native';
import { styles } from './styles';

interface CompanyCardProps {
  image: ImageSourcePropType;
  borderStyle: ViewStyle;
  onPress: () => void;
  isSelected?: boolean;
  selectedCardStyle?: ViewStyle;
  checkContainerStyle?: ViewStyle;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ 
  image, 
  borderStyle, 
  onPress, 
  isSelected,
  selectedCardStyle,
  checkContainerStyle
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isSelected && selectedCardStyle]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      {isSelected && (
        <View style={[styles.checkContainer, checkContainerStyle]}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
      <View style={[styles.leftBorder, borderStyle]} />
      <Image 
        source={image} 
        style={styles.logo} 
        resizeMode="cover" 
      />
    </TouchableOpacity>
  );
};

export default CompanyCard;
