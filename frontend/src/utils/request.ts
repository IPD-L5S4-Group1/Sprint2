// Base URL logic: Prioritize environment variable, fallback to localhost
// Note: Backend controllers are mixed (e.g., /users, /api/resumes), so we point to root.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface Result<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * Generic Request Function
 * @param options uni.request options
 * @returns Promise<T>
 */
const request = <T>(options: UniApp.RequestOptions): Promise<T> => {
  return new Promise((resolve, reject) => {
    // 1. Request Interceptor Logic
    const token = uni.getStorageSync('token');
    const header = {
      'Content-Type': 'application/json',
      ...options.header,
    };
    
    if (token) {
      // @ts-ignore - Header index signature mismatch in Uni definitions sometimes
      header['Authorization'] = `Bearer ${token}`;
    }

    // 2. Execute Request
    uni.request({
      ...options,
      url: `${BASE_URL}${options.url}`, // Auto-prepend Base URL
      header,
      success: (res) => {
        // 3. Response Interceptor Logic
        const statusCode = res.statusCode;
        const data = res.data as Result<T>;

        // Success Case: HTTP 200 AND Business Code 200
        if (statusCode === 200 && data.code === 200) {
          resolve(data.data);
        } else {
          // Business Error (e.g., 4001 User Not Found)
          const errorMsg = data.message || 'Request Failed';
          uni.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 2000,
          });
          reject(new Error(errorMsg));
        }
      },
      fail: (err) => {
        // Network Error
        uni.showToast({
          title: 'Network Error',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
};

export default request;

