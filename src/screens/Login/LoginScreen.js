import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogIn } from 'lucide-react-native';
import { createLoginStyles } from './styles';
import { useLoginLogic } from './login.logic';
import { useTheme } from '../../theme/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';

export function LoginScreen({ onLoginSuccess, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createLoginStyles(colors), [colors]);
  const [focused, setFocused] = useState({});
  const { state, actions } = useLoginLogic({
    onSuccess: onLoginSuccess,
  });

  return (
    <KeyboardAvoidingView
      style={[
        localStyles.keyboard,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.logoWrap}>
                <LogIn size={36} color="#fff" strokeWidth={2} />
              </View>
              <Text style={styles.title}>Selamat datang</Text>
              <Text style={styles.subtitle}>
                Masuk ke akun Anda. Token berlaku selama 1 jam.
              </Text>
            </View>
            <ThemeToggle variant="icon" />
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
                onChangeText={t => {
                  actions.setEmail(t);
                  actions.setError(null);
                }}
                onFocus={() => setFocused(f => ({ ...f, email: true }))}
                onBlur={() => setFocused(f => ({ ...f, email: false }))}
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
                placeholder="••••••••"
                placeholderTextColor={colors.textSecondary}
                value={state.password}
                onChangeText={t => {
                  actions.setPassword(t);
                  actions.setError(null);
                }}
                onFocus={() => setFocused(f => ({ ...f, password: true }))}
                onBlur={() => setFocused(f => ({ ...f, password: false }))}
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
                <Text style={styles.buttonText}>Masuk</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Token disimpan lokal dan kadaluarsa dalam 1 jam.
            </Text>
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate?.('Register')}
                activeOpacity={0.8}
              >
                <Text style={[styles.linkText, styles.linkStrong]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
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
