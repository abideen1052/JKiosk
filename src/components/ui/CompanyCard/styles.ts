import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    flex: 1,
    margin: 10,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  companyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeader,
    marginBottom: 15,
    textAlign: 'center',
  },
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 12,
  },
  // Specific Border Styles
  talabatBorder: { backgroundColor: colors.talabatBorder },
  keetaBorder: { backgroundColor: colors.keetaBorder },
  snoonuBorder: { backgroundColor: colors.snoonuBorder },
  rafeeqBorder: { backgroundColor: colors.rafeeqBorder },

  // Base Selection Styles
  checkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  checkText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Brand-Specific Selection Styles
  talabatSelected: { borderColor: colors.talabat, borderWidth: 2 },
  talabatCheck: { backgroundColor: colors.talabat },
  
  keetaSelected: { borderColor: colors.keetaBorder, borderWidth: 2 }, // Using border color for yellow keeta
  keetaCheck: { backgroundColor: colors.keetaBorder },
  
  snoonuSelected: { borderColor: colors.snoonu, borderWidth: 2 },
  snoonuCheck: { backgroundColor: colors.snoonu },
  
  rafeeqSelected: { borderColor: colors.rafeeq, borderWidth: 2 },
  rafeeqCheck: { backgroundColor: colors.rafeeq },
});
