import { storage } from '../../config/storage';
import { AUTH_KEYS, TOKEN_MAX_AGE_MS } from '../../constants/auth';

export function setToken(token) {
  const expiresAt = Date.now() + TOKEN_MAX_AGE_MS;
  storage.setString(AUTH_KEYS.TOKEN, token);
  storage.setString(AUTH_KEYS.TOKEN_EXPIRY_AT, String(expiresAt));
}

export function getToken() {
  const token = storage.getString(AUTH_KEYS.TOKEN);
  const expiryStr = storage.getString(AUTH_KEYS.TOKEN_EXPIRY_AT);

  if (!token || !expiryStr) return null;

  const expiresAt = Number(expiryStr);
  if (Number.isNaN(expiresAt) || Date.now() >= expiresAt) {
    clearToken();
    return null;
  }

  return token;
}

export function isTokenValid() {
  return getToken() !== null;
}

export function clearToken() {
  storage.removeItem(AUTH_KEYS.TOKEN);
  storage.removeItem(AUTH_KEYS.TOKEN_EXPIRY_AT);
}
