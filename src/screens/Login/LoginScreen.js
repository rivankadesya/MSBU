import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
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
import { TextBold, TextRegular } from '../../components/Typography';
import { FormInput } from '../../components/FormInput';

export function LoginScreen({ onLoginSuccess, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createLoginStyles(colors), [colors]);
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
              <TextBold size={28} style={styles.title}>
                Selamat datang
              </TextBold>
              <TextRegular size={16} style={styles.subtitle}>
                Masuk ke akun Anda. Token berlaku selama 1 jam.
              </TextRegular>
            </View>
            <ThemeToggle variant="icon" />
          </View>

          <View style={styles.form}>
            <FormInput
              label="Email"
              value={state.email}
              onChangeText={t => {
                actions.setEmail(t);
                actions.setError(null);
              }}
              placeholder="nama@email.com"
              keyboardType="email-address"
              editable={!state.loading}
              error={!!state.error}
            />

            <FormInput
              label="Password"
              value={state.password}
              onChangeText={t => {
                actions.setPassword(t);
                actions.setError(null);
              }}
              placeholder="••••••••"
              secureTextEntry
              showPasswordToggle
              editable={!state.loading}
              error={!!state.error}
            />

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
  },
});
