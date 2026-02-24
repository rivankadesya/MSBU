import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { getColors } from './tokens';
import { getSavedThemeMode, saveThemeMode } from '../services/theme/themeStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const system = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const saved = getSavedThemeMode();

  const [mode, setMode] = useState(saved || system);

  const setThemeMode = useCallback((nextMode) => {
    setMode(nextMode);
    saveThemeMode(nextMode);
  }, []);

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
    }),
    [mode, colors, setThemeMode, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };

