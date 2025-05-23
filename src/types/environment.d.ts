declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VITE_BACKEND_API_URL?: string;
    }
  }
}
