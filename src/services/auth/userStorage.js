import { storage } from '../../config/storage';
import { AUTH_KEYS } from '../../constants/auth';
import { normalizeEmail } from '../../utils/validation';

const DEFAULT_ACCOUNT = {
  id: 'default_admin',
  email: 'msbu@gmail.com',
  password: 'Password1!',
  createdAt: 0,
};

export function getUsers() {
  const users = storage.getArray(AUTH_KEYS.USERS);
  const storedUsers = Array.isArray(users) ? users : [];

  const filteredStored = storedUsers.filter(
    u => normalizeEmail(u.email) !== normalizeEmail(DEFAULT_ACCOUNT.email),
  );

  return [DEFAULT_ACCOUNT, ...filteredStored];
}

function setUsers(users) {
  const usersToSave = users.filter(
    u => normalizeEmail(u.email) !== normalizeEmail(DEFAULT_ACCOUNT.email),
  );
  storage.setArray(AUTH_KEYS.USERS, usersToSave);
}

export function registerUser({ email, password }) {
  const users = getUsers();
  const normalized = normalizeEmail(email);

  const exists = users.some(u => normalizeEmail(u.email) === normalized);
  if (exists) {
    throw new Error('Email sudah terdaftar. Gunakan email lain.');
  }

  const user = {
    id: String(Date.now()),
    email: email.trim(),
    password,
    createdAt: Date.now(),
  };

  setUsers([user, ...users]);
  return user;
}

export function validateLogin({ email, password }) {
  const users = getUsers();
  const normalized = normalizeEmail(email);

  const user = users.find(u => normalizeEmail(u.email) === normalized);
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
