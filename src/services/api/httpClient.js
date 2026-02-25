import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'MSBU-App/1.0',
    'Cache-Control': 'no-cache',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    if (!config || config.retry === 0) return Promise.reject(error);
    config.__retryCount = config.__retryCount || 0;
    const maxRetries = 2;
    const isNetworkError = !error.response && error.request;
    const isTimeout = error.code === 'ECONNABORTED';
    if ((isNetworkError || isTimeout) && config.__retryCount < maxRetries) {
      config.__retryCount += 1;
      console.warn(`Retrying request (${config.__retryCount}/${maxRetries}):`, config.url);
      const backoff = new Promise((resolve) => {
        setTimeout(resolve, config.__retryCount * 1000);
      });
      
      await backoff;
      return httpClient(config);
    }

    let msg = 'Unknown Error';
    if (error.response) {
      msg = `Server Error [${error.response.status}]`;
    } else if (error.request) {
      msg = 'Network Error: Koneksi tidak stabil. Timed out.';
    } else {
      msg = error.message;
    }
    
    error.message = msg;
    return Promise.reject(error);
  }
);

