import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserPlus } from 'lucide-react-native';
import { createRegisterStyles } from './styles';
import { useRegisterLogic } from './register.logic';
import { useTheme } from '../../theme/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';
import { TextBold, TextRegular } from '../../components/Typography';

export function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createRegisterStyles(colors), [colors]);
  const [focused, setFocused] = useState({});

  const { state, actions } = useRegisterLogic({
    onSuccess: () => {
      // setelah register, kembali ke login
      navigation?.replace?.('Login');
    },
  });

  return (
    <KeyboardAvoidingView
      style={[
        localStyles.keyboard,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <UserPlus size={32} color={colors.primary} />
              <ThemeToggle variant="icon" />
            </View>
            <TextBold size={28} style={[styles.title, { marginTop: 12 }]}>
              Buat akun
            </TextBold>
            <TextRegular size={14} style={styles.subtitle}>
              Email harus unik. Password wajib berisi huruf besar, huruf kecil,
              angka, dan symbol.
            </TextRegular>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  focused.email && styles.inputFocused,
                  state.error && styles.inputError,
                ]}
                placeholder="nama@email.com"
                placeholderTextColor={colors.textSecondary}
                value={state.email}
                onChangeText={(t) => {
                  actions.setEmail(t);
                  actions.setError(null);
                }}
                onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                onBlur={() => setFocused((f) => ({ ...f, email: false }))}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!state.loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focused.password && styles.inputFocused,
                  state.error && styles.inputError,
                ]}
                placeholder="Minimal 8 karakter"
                placeholderTextColor={colors.textSecondary}
                value={state.password}
                onChangeText={(t) => {
                  actions.setPassword(t);
                  actions.setError(null);
                }}
                onFocus={() => setFocused((f) => ({ ...f, password: true }))}
                onBlur={() => setFocused((f) => ({ ...f, password: false }))}
                secureTextEntry
                editable={!state.loading}
              />
              <Text style={styles.helperText}>
                Contoh: Abc@1234 (punya huruf besar, kecil, angka, symbol)
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Konfirmasi Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focused.confirm && styles.inputFocused,
                  state.error && styles.inputError,
                ]}
                placeholder="Ulangi password"
                placeholderTextColor={colors.textSecondary}
                value={state.confirmPassword}
                onChangeText={(t) => {
                  actions.setConfirmPassword(t);
                  actions.setError(null);
                }}
                onFocus={() => setFocused((f) => ({ ...f, confirm: true }))}
                onBlur={() => setFocused((f) => ({ ...f, confirm: false }))}
                secureTextEntry
                editable={!state.loading}
              />
            </View>

            {state.error ? (
              <Text style={styles.errorText}>{state.error}</Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.button,
                (state.loading || !state.canSubmit) && styles.buttonDisabled,
              ]}
              onPress={actions.submit}
              disabled={state.loading || !state.canSubmit}
              activeOpacity={0.8}
            >
              {state.loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => navigation?.goBack?.()}
              disabled={state.loading}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Kembali ke Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  keyboard: {
    flex: 1,
    // background actual dari styles.container (themed)
  },
});

