import { storage } from '../../config/storage';
import { THEME_KEYS, THEME_MODES } from '../../constants/theme';

export function getSavedThemeMode() {
  const v = storage.getString(THEME_KEYS.MODE);
  if (v === THEME_MODES.DARK || v === THEME_MODES.LIGHT) return v;
  return null;
}

export function saveThemeMode(mode) {
  storage.setString(THEME_KEYS.MODE, String(mode));
}

