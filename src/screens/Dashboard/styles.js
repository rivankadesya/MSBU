import { StyleSheet } from 'react-native';
import { borderRadius, shadow, spacing } from '../../theme/tokens';

export function createDashboardStyles(colors) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    paddingRight: spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary,
  },
  logoutBtn: {
    backgroundColor: '#dc2626',
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...shadow(2, colors),
    marginLeft: spacing.sm,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow(1, colors),
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 12,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  cardBody: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  categoryBadge: {
    backgroundColor: colors.primary + '15', // Opacity 15%
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    ...shadow(1, colors),
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
}

