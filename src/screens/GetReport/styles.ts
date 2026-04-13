import { StyleSheet } from 'react-native';
import { colors } from '../../theme/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backText: {
    fontSize: 24,
    color: colors.textHeader,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textHeader,
  },
  searchContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.footerBorder,
  },
  searchInput: {
    fontSize: 16,
    color: colors.textHeader,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterItem: {
    flex: 0.48,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.footerBorder,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSubHeader,
  },
  listContainer: {
    paddingBottom: 40,
  },
  logCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textHeader,
  },
  companyBadge: {
    backgroundColor: colors.greyLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  companyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textMuted,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  riderName: {
    fontSize: 16,
    color: colors.textHeader,
    marginBottom: 4,
  },
  mobileText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  loadingIndicator: {
    marginTop: 50,
  },
});
