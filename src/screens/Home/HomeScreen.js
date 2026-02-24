import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { clearToken } from '../../services/auth/tokenStorage';

export function HomeScreen({ onLogout }) {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    clearToken();
    onLogout?.();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Berhasil masuk</Text>
        <Text style={styles.subtitle}>
          Token Anda disimpan lokal dan berlaku 1 jam.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#fff" />
          <Text style={styles.buttonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
