import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { borderRadius, spacing } from '../theme/tokens';

/**
 * FormInput – Komponen input form yang reusable & theme-aware.
 *
 * Props:
 *  - label           : string  — label di atas input
 *  - value           : string
 *  - onChangeText    : fn
 *  - placeholder     : string
 *  - secureTextEntry : bool    — aktifkan mode password
 *  - showPasswordToggle : bool — tampilkan icon mata (hanya berlaku jika secureTextEntry=true)
 *  - keyboardType    : string
 *  - editable        : bool
 *  - error           : bool | string — border merah; jika string ditampilkan sebagai pesan error
 *  - helperText      : string  — teks bantuan di bawah input
 *  - style           : ViewStyle — override wrapper
 *  - inputStyle      : TextStyle — override TextInput
 *  - onFocus / onBlur
 */
export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle = false,
  keyboardType = 'default',
  editable = true,
  error,
  helperText,
  style,
  inputStyle,
  onFocus,
  onBlur,
  autoCapitalize = 'none',
  autoCorrect = false,
  ...rest
}) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [secureHidden, setSecureHidden] = useState(secureTextEntry);

  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur?.();
  }, [onBlur]);

  const hasError = !!error;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.surface,
            borderColor: hasError
              ? colors.error
              : focused
              ? colors.primary
              : colors.border,
          },
          !editable && styles.disabled,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureHidden}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          {...rest}
        />

        {secureTextEntry && showPasswordToggle ? (
          <TouchableOpacity
            onPress={() => setSecureHidden(h => !h)}
            style={styles.eyeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            {secureHidden ? (
              <EyeOff size={20} color={colors.muted} strokeWidth={2} />
            ) : (
              <Eye size={20} color={colors.primary} strokeWidth={2} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {typeof error === 'string' && error ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      ) : null}

      {helperText && !error ? (
        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
  },
  eyeBtn: {
    paddingLeft: spacing.sm,
    paddingVertical: 4,
  },
  disabled: {
    opacity: 0.55,
  },
  errorText: {
    fontSize: 13,
    marginTop: spacing.xs,
  },
  helperText: {
    fontSize: 12,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
});
