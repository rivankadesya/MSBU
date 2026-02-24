import { useCallback, useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api/postsApi';

export function useDashboardLogic() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    const data = await fetchPosts();
    setPosts(Array.isArray(data) ? data : []);
  }, []);

  const initialLoad = useCallback(async () => {
    setLoading(true);
    try {
      await load();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Gagal mengambil data dashboard.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Gagal refresh data dashboard.';
      setError(message);
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  return {
    state: { posts, loading, refreshing, error },
    actions: { retry: initialLoad, refresh },
  };
}

