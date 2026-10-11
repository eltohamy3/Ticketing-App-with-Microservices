declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
    JWT_EXPIRES_IN : string ;
    API_KEY: string;
    JWT_COOKIE_EXPIRES_IN : string ;
  }
}