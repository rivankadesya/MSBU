import { useCallback, useMemo, useState } from 'react';
import { login } from '../../services/auth/authService';
import { isValidEmail } from '../../utils/validation';

export function useLoginLogic({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim() && password);
  }, [email, password]);

  const submit = useCallback(async () => {
    setError(null);

    const emailTrimmed = email.trim();
    if (!isValidEmail(emailTrimmed)) {
      setError('Format email tidak valid.');
      return;
    }

    setLoading(true);
    try {
      await login({ email: emailTrimmed, password });
      onSuccess?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Login gagal. Coba lagi.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [email, password, onSuccess]);

  return {
    state: { email, password, loading, error, canSubmit },
    actions: { setEmail, setPassword, setError, submit },
  };
}

