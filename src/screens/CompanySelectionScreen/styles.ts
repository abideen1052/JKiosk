import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.textHeader,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSubHeader,
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 0,
    left: 25,
    right: 25,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#8B340B',
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B340B',
  },
  assistanceButton: {
    minWidth: 180,
    height: 55,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Company specialized styles
  talabatText: { color: colors.talabat },
  talabatBorder: { backgroundColor: colors.talabatBorder },
  keetaText: { color: colors.keeta },
  keetaBorder: { backgroundColor: colors.keetaBorder },
  snoonuText: { color: colors.snoonu },
  snoonuBorder: { backgroundColor: colors.snoonuBorder },
  rafeeqText: { color: colors.rafeeq },
  rafeeqBorder: { backgroundColor: colors.rafeeqBorder },
  talabatSelected: { borderColor: colors.talabat, borderWidth: 2 },
  talabatCheck: { backgroundColor: colors.talabat },
  keetaSelected: { borderColor: colors.keetaBorder, borderWidth: 2 },
  keetaCheck: { backgroundColor: colors.keetaBorder },
  snoonuSelected: { borderColor: colors.snoonu, borderWidth: 2 },
  snoonuCheck: { backgroundColor: colors.snoonu },
  rafeeqSelected: { borderColor: colors.rafeeq, borderWidth: 2 },
  rafeeqCheck: { backgroundColor: colors.rafeeq },
});
