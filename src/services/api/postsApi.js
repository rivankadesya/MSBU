import { httpClient } from './httpClient';

export async function fetchPosts() {
  const res = await httpClient.get('/posts');
  return res.data;
}

export async function fetchPostById(postId) {
  const res = await httpClient.get(`/posts/${postId}`);
  return res.data;
}

export async function fetchPostComments(postId) {
  const res = await httpClient.get(`/posts/${postId}/comments`);
  return res.data;
}

