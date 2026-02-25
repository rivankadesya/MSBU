import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 30000, // Tingkatkan timeout ke 30 detik
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Axios/1.13.5 (MSBU-App; Android)',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  },
});

httpClient.interceptors.response.use(
  (response) => {
    console.log(`[API Success] ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const { config, response, request, code } = error;
    
    // Log detail untuk debug di Metro Console
    console.error(`[API Error] ${config?.method?.toUpperCase()} ${config?.url}`, {
      status: response?.status,
      code: code,
      message: error.message
    });

    if (config && (code === 'ECONNABORTED' || !response) && (!config.__retryCount || config.__retryCount < 2)) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      console.warn(`[API Retry] Attempt ${config.__retryCount} for ${config.url}`);
      await new Promise(r => setTimeout(r, 1000 * config.__retryCount));
      return httpClient(config);
    }

    let msg = 'Unknown Error';
    if (response) {
      msg = `Server Error [${response.status}]: ${response.data?.message || 'Terjadi kesalahan sistem.'}`;
    } else if (code === 'ERR_NETWORK') {
      msg = 'Network Error: Gagal terhubung ke server. Pastikan HP anda bisa akses dummyjson.com lewat browser.';
    } else if (code === 'ECONNABORTED') {
      msg = 'Request Timeout: Koneksi internet terlalu lambat.';
    } else {
      msg = error.message || 'Gagal mengambil data.';
    }
    
    error.message = msg;
    return Promise.reject(error);
  }
);

