import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, LogOut, LayoutTemplate, ShoppingBag, User } from 'lucide-react-native';
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
            <ShoppingBag size={18} color={colors.primary} />
            <TextBold size={20} style={{ marginLeft: 8 }}>
              Store Catalog
            </TextBold>
          </View>
          <TextMedium size={13} style={styles.headerSubtitle}>
            {email ? `Welcome, ${email.split('@')[0]}` : 'Discover amazing products'}
          </TextMedium>
        </View>
        <ThemeToggle variant="icon" />
        <TouchableOpacity 
          style={[styles.logoutBtn, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }]} 
          onPress={() => navigation.navigate('Profile')}
        >
          <User size={20} color={colors.primary} />
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
            <Text style={styles.retryText}>Retry</Text>
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
              <Image 
                source={{ uri: item.thumbnail }} 
                style={styles.cardImage} 
                resizeMode="cover"
              />
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <TextBold size={17} style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </TextBold>
              <TextBold size={18} style={styles.cardPrice}>
                ${item.price}
              </TextBold>
              <TextRegular size={14} style={styles.cardBody} numberOfLines={2}>
                {item.description}
              </TextRegular>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

