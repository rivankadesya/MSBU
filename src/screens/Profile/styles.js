import { StyleSheet } from 'react-native';
import { borderRadius, shadow, spacing } from '../../theme/tokens';

export function createProfileStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
      marginRight: 40, // offset back button
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
      backgroundColor: colors.surface,
      marginBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    emailText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    section: {
      backgroundColor: colors.surface,
      paddingVertical: spacing.xs,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      marginLeft: spacing.lg,
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.surface,
    },
    menuIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    menuText: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    logoutItem: {
      marginTop: spacing.xl,
      marginHorizontal: spacing.lg,
      backgroundColor: '#fee2e2',
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: '#fecaca',
    },
    logoutText: {
      color: '#dc2626',
      fontWeight: '700',
    },
    infoCard: {
      marginHorizontal: spacing.lg,
      padding: spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadow(1, colors),
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
      marginBottom: spacing.sm,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
    },
    infoLabel: {
      width: 100,
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    infoValue: {
      flex: 1,
      fontSize: 13,
      color: colors.text,
      fontWeight: '700',
    }
  });
}
