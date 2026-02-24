import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { LoginScreen } from '../screens/Login';
import { isTokenValid } from '../services/auth/tokenStorage';
import { RegisterScreen } from '../screens/Register';
import { DashboardScreen } from '../screens/Dashboard';
import { PostDetailScreen } from '../screens/PostDetail';
import { logout } from '../services/auth/authService';
import { useTheme } from '../theme/useTheme';
import { createNavigationTheme } from '../theme/navigationTheme';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export function RootNavigator() {
  const { colors, isDark } = useTheme();
  const navTheme = createNavigationTheme(colors);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = useCallback(() => {
    setIsAuthenticated(isTokenValid());
  }, []);

  useLayoutEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auto-logout jika token kadaluarsa (maks 1 jam)
  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(() => {
      if (!isTokenValid()) {
        setIsAuthenticated(false);
      }
    }, 30 * 1000);
    return () => clearInterval(id);
  }, [isAuthenticated]);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsAuthenticated(false);
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard">
              {(props) => (
                <DashboardScreen {...props} onLogout={handleLogout} />
              )}
            </Stack.Screen>
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});
