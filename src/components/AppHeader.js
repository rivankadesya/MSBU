import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { borderRadius, shadow, spacing } from '../theme/tokens';
import { TextBold, TextMedium } from './Typography';

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  right,
  icon,
}) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const Icon = icon || ChevronLeft;

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: insets.top + spacing.sm,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.85}
            style={[
              styles.backBtn,
              { backgroundColor: colors.surface, borderColor: colors.border },
              shadow(1, colors),
            ]}
          >
            <Icon size={18} color={colors.text} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.textWrap}>
          {title ? (
            <TextBold size={16} numberOfLines={1}>
              {title}
            </TextBold>
          ) : null}
          {subtitle ? (
            <TextMedium
              size={13}
              style={{ color: colors.textSecondary, marginTop: 2 }}
              numberOfLines={1}
            >
              {subtitle}
            </TextMedium>
          ) : null}
        </View>

        {right ? <View style={styles.right}>{right}</View> : <View style={styles.rightPlaceholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  right: {
    marginLeft: spacing.sm,
  },
  rightPlaceholder: {
    width: 40,
  },
});

