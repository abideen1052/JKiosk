import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
  Text,
} from 'react-native';
import { styles } from './styles';

interface CompanyCardProps {
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  borderStyle: ViewStyle;
  onPress: () => void;
  isSelected?: boolean;
  selectedCardStyle?: ViewStyle;
  checkContainerStyle?: ViewStyle;
  title?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  image,
  fallbackImage,
  borderStyle,
  onPress,
  isSelected,
  selectedCardStyle,
  checkContainerStyle,
  title,
}) => {
  const [hasError, setHasError] = useState(false);

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
      <View style={styles.content}>
        {title && <Text style={styles.companyTitle}>{title}</Text>}
        <Image
          source={hasError ? fallbackImage : image}
          style={styles.logo}
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CompanyCard;
