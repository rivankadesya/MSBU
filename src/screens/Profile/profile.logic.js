import { useMemo } from 'react';
import { getCurrentUserEmail } from '../../services/auth/userStorage';

export function useProfileLogic() {
  const email = useMemo(() => getCurrentUserEmail(), []);
  
  const appSpecs = [
    { label: 'Built with', value: 'React Native v0.84.0' },
    { label: 'Network', value: 'Axios v1.13.5' },
    { label: 'Storage', value: 'MMKV Storage' },
    { label: 'Theme', value: 'Custom Hook + Context' },
    { label: 'API Base', value: 'DummyJSON' },
  ];

  return {
    state: {
      email,
      appSpecs
    }
  };
}
