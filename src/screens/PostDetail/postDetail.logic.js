import { useCallback, useEffect, useState } from 'react';
import { fetchPostById, fetchPostComments } from '../../services/api/postsApi';

export function usePostDetailLogic(postId) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    const [p, c] = await Promise.all([
      fetchPostById(postId),
      fetchPostComments(postId),
    ]);
    setPost(p || null);
    setComments(Array.isArray(c) ? c : []);
  }, [postId]);

  const retry = useCallback(async () => {
    setLoading(true);
    try {
      await load();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch product details.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [load]);

  useEffect(() => {
    retry();
  }, [retry]);

  return {
    state: { post, comments, loading, error },
    actions: { retry },
  };
}

