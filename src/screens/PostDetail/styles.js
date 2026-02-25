import { StyleSheet } from 'react-native';
import { borderRadius, shadow, spacing } from '../../theme/tokens';

export function createPostDetailStyles(colors) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    ...shadow(1, colors),
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  metaBox: {
    backgroundColor: colors.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 4,
    lineHeight: 28,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginVertical: spacing.md,
  },
  comment: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  commentRating: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fbbf24',
  },
  commentBody: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
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
    fontWeight: '800',
  },
});
}

