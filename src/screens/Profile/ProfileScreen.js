import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, User, LogOut, ExternalLink, Cpu } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';
import { createProfileStyles } from './styles';
import { useProfileLogic } from './profile.logic';
import { TextBold, TextRegular } from '../../components/Typography';
import { spacing } from '../../theme/tokens';

export function ProfileScreen({ navigation, onLogout }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useMemo(() => createProfileStyles(colors), [colors]);
  const { state } = useProfileLogic();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <User size={40} color={colors.primary} />
          </View>
          <TextBold style={styles.emailText}>{state.email}</TextBold>
          <TextRegular color={colors.textSecondary}>Active Account</TextRegular>
        </View>

        <Text style={styles.sectionTitle}>Main Menu</Text>
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Portfolio')}
          >
            <View style={[styles.menuIcon, { backgroundColor: colors.primary + '15' }]}>
              <ExternalLink size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Portofolio (Webview)</Text>
            <ArrowLeft size={16} color={colors.muted} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>App Specifications</Text>
        <View style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Cpu size={18} color={colors.primary} />
            <TextBold style={{ marginLeft: 8 }}>Technical Stack</TextBold>
          </View>
          {state.appSpecs.map((spec, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{spec.label}</Text>
              <Text style={styles.infoValue}>{spec.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutItem]}
          onPress={onLogout}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#fee2e2' }]}>
            <LogOut size={20} color="#dc2626" />
          </View>
          <Text style={[styles.menuText, styles.logoutText]}>Logout from App</Text>
        </TouchableOpacity>

        <View style={{ padding: 40, alignItems: 'center' }}>
          <TextRegular size={12} color={colors.muted}>MSBU App v1.0.0</TextRegular>
        </View>
      </ScrollView>
    </View>
  );
}
