import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
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
import { FormInput } from '../../components/FormInput';

export function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createRegisterStyles(colors), [colors]);

  const { state, actions } = useRegisterLogic({
    onSuccess: () => {
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
              placeholder="Minimal 8 karakter"
              secureTextEntry
              showPasswordToggle
              editable={!state.loading}
              error={!!state.error}
              helperText="Contoh: Abc@1234 (huruf besar, kecil, angka, symbol)"
            />

            <FormInput
              label="Konfirmasi Password"
              value={state.confirmPassword}
              onChangeText={t => {
                actions.setConfirmPassword(t);
                actions.setError(null);
              }}
              placeholder="Ulangi password"
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
  },
});
