declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      Host: string;
      BASE_URL: string;
      JWT_SECRET_KEY: string;
      CRYPTO_SECRET_KET: string;
      DB_CONNECTION_URL: string;
      CLIENT_BASE_URL: string;
      GMAIL_CLIENT_ID: string;
      GMAIL_CLIENT_SECRET: string;
      GMAIL_REDIRECT_URI: string;
      GMAIL_REFRESH_TOKEN: string;
      GMAIL_USER: string;
      GMAIL_FROM: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
