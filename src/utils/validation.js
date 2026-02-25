export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePasswordComplexity(password) {
  if (!password) return 'Password wajib diisi.';
  if (password.length < 8) return 'Password minimal 8 karakter.';

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (!hasLower || !hasUpper || !hasDigit || !hasSymbol) {
    return 'Password harus mengandung huruf kecil, huruf besar, angka, dan symbol.';
  }

  return null;
}

export function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}
