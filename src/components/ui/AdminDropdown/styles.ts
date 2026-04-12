import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: colors.footerBorder,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.textHeader,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 10,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  selectedItem: {
    backgroundColor: colors.primary + '10', // subtle primary tint
  },
  itemText: {
    fontSize: 16,
    color: colors.textHeader,
  },
  selectedItemText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
