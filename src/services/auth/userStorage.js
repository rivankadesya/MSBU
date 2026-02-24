import { storage } from '../../config/storage';
import { AUTH_KEYS } from '../../constants/auth';
import { normalizeEmail } from '../../utils/validation';

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const raw = storage.getString(AUTH_KEYS.USERS);
  if (!raw) return [];
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

function setUsers(users) {
  storage.setString(AUTH_KEYS.USERS, JSON.stringify(users));
}

export function registerUser({ email, password }) {
  const users = getUsers();
  const normalized = normalizeEmail(email);

  const exists = users.some((u) => normalizeEmail(u.email) === normalized);
  if (exists) {
    throw new Error('Email sudah terdaftar. Gunakan email lain.');
  }

  const user = {
    id: String(Date.now()),
    email: email.trim(),
    password, // Demo only. Untuk produksi sebaiknya di-hash + disimpan aman.
    createdAt: Date.now(),
  };

  setUsers([user, ...users]);
  return user;
}

export function validateLogin({ email, password }) {
  const users = getUsers();
  const normalized = normalizeEmail(email);

  const user = users.find((u) => normalizeEmail(u.email) === normalized);
  if (!user) throw new Error('Akun tidak ditemukan. Silakan register dulu.');
  if (user.password !== password) throw new Error('Password salah.');

  return user;
}

export function setCurrentUserEmail(email) {
  storage.setString(AUTH_KEYS.CURRENT_USER_EMAIL, email ? String(email) : '');
}

export function getCurrentUserEmail() {
  const v = storage.getString(AUTH_KEYS.CURRENT_USER_EMAIL);
  return v ? String(v) : null;
}

export function clearCurrentUserEmail() {
  storage.removeItem(AUTH_KEYS.CURRENT_USER_EMAIL);
}
