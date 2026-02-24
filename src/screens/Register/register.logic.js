import { useCallback, useMemo, useState } from 'react';
import { isValidEmail, validatePasswordComplexity } from '../../utils/validation';
import { register } from '../../services/auth/authService';

export function useRegisterLogic({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim() && password && confirmPassword);
  }, [email, password, confirmPassword]);

  const submit = useCallback(async () => {
    setError(null);

    const emailTrimmed = email.trim();
    if (!isValidEmail(emailTrimmed)) {
      setError('Format email tidak valid.');
      return;
    }

    const passwordError = validatePasswordComplexity(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sama.');
      return;
    }

    setLoading(true);
    try {
      await register({ email: emailTrimmed, password });
      onSuccess?.();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Register gagal. Coba lagi.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, onSuccess]);

  return {
    state: { email, password, confirmPassword, loading, error, canSubmit },
    actions: { setEmail, setPassword, setConfirmPassword, setError, submit },
  };
}
