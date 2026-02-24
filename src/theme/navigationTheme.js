export function createNavigationTheme(colors) {
  return {
    dark: false, // react-navigation uses this for some defaults; we drive actual colors ourselves
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };
}

