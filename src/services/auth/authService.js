import { setToken, clearToken } from './tokenStorage';
import {
  registerUser,
  validateLogin,
  setCurrentUserEmail,
  clearCurrentUserEmail,
} from './userStorage';

export async function register({ email, password }) {
  if (!email?.trim() || !password) {
    throw new Error('Email dan password wajib diisi.');
  }

  const user = registerUser({ email: email.trim(), password });
  return { user };
}

export async function login(credentials) {
  if (!credentials?.email?.trim() || !credentials?.password?.trim()) {
    throw new Error('Email dan password wajib diisi.');
  }

  const user = validateLogin({
    email: credentials.email.trim(),
    password: credentials.password,
  });

  const token = `mock_jwt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  setToken(token);
  setCurrentUserEmail(user.email);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.email.split('@')[0],
    },
  };
}

export function logout() {
  clearToken();
  clearCurrentUserEmail();
}
