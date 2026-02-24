import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { borderRadius, spacing, shadow } from '../theme/tokens';

export function ThemeToggle({ variant = 'pill' }) {
  const { isDark, toggle, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.85}
      style={[
        styles.btn,
        variant === 'icon' && styles.btnIcon,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        shadow(1, colors),
      ]}
    >
      {isDark ? <Moon size={16} color={colors.text} /> : <Sun size={16} color={colors.text} />}
      {variant !== 'icon' ? (
        <Text style={[styles.text, { color: colors.text }]}>
          {isDark ? 'Dark' : 'Light'}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  btnIcon: {
    paddingHorizontal: 10,
  },
  text: {
    marginLeft: spacing.sm,
    fontWeight: '800',
    fontSize: 12,
  },
});

