import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Appearance } from 'react-native';
import { getColors } from './tokens';
import { getSavedThemeMode, saveThemeMode } from '../services/theme/themeStorage';

const ThemeContext = createContext(null);

/** Durasi animasi fade saat ganti tema (ms) */
const TRANSITION_DURATION = 300;

export function ThemeProvider({ children }) {
  const system = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const saved = getSavedThemeMode();

  const [mode, setMode] = useState(saved || system);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const setThemeMode = useCallback((nextMode) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: TRANSITION_DURATION / 2,
      useNativeDriver: true,
    }).start(() => {
      setMode(nextMode);
      saveThemeMode(nextMode);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: TRANSITION_DURATION / 2,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  const toggle = useCallback(() => {
    setThemeMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setThemeMode]);

  const colors = useMemo(() => getColors(mode), [mode]);

  const value = useMemo(
    () => ({
      mode,
      colors,
      setMode: setThemeMode,
      toggle,
      isDark: mode === 'dark',
      fadeAnim,
    }),
    [mode, colors, setThemeMode, toggle, fadeAnim]
  );

  return (
    <ThemeContext.Provider value={value}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {children}
      </Animated.View>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
