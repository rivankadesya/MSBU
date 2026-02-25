import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, LogOut, LayoutTemplate } from 'lucide-react-native';
import { createDashboardStyles } from './styles';
import { useDashboardLogic } from './dashboard.logic';
import { getCurrentUserEmail } from '../../services/auth/userStorage';
import { useTheme } from '../../theme/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';
import { TextBold, TextMedium, TextRegular } from '../../components/Typography';

export function DashboardScreen({ navigation, onLogout }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createDashboardStyles(colors), [colors]);
  const { state, actions } = useDashboardLogic();

  const email = useMemo(() => getCurrentUserEmail(), []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <LayoutTemplate size={18} color={colors.primary} />
            <TextBold size={20} style={{ marginLeft: 8 }}>
              Dashboard
            </TextBold>
          </View>
          <TextMedium size={13} style={styles.headerSubtitle}>
            {email ? `Login sebagai ${email}` : 'Data dari JSONPlaceholder'}
          </TextMedium>
        </View>
        <ThemeToggle variant="icon" />
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LogOut size={14} color="#fff" />
            <TextMedium size={13} style={styles.logoutText}>
              Keluar
            </TextMedium>
          </View>
        </TouchableOpacity>
      </View>

      {state.loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : state.error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{state.error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={actions.retry}>
            <Text style={styles.retryText}>Coba lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={state.posts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: 24 + insets.bottom },
          ]}
          refreshing={state.refreshing}
          onRefresh={actions.refresh}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => navigation?.navigate?.('PostDetail', { postId: item.id })}
            >
              <View style={styles.cardTopRow}>
                <View style={styles.badge}>
                  <TextMedium size={12} style={styles.badgeText}>
                    #{String(item.id)}
                  </TextMedium>
                </View>
                <ChevronRight size={18} color={colors.muted} />
              </View>
              <TextBold size={16} style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </TextBold>
              <TextRegular size={14} style={styles.cardBody} numberOfLines={3}>
                {item.body}
              </TextRegular>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

