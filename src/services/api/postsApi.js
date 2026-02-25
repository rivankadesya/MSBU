import { httpClient } from './httpClient';

export async function fetchPosts() {
  const res = await httpClient.get('products');
  return res.data.products; 
}

export async function fetchPostById(postId) {
  const res = await httpClient.get(`products/${postId}`);
  return res.data;
}

export async function fetchPostComments(postId) {

  const res = await httpClient.get(`products/${postId}`);
  return res.data.reviews || [];
}

