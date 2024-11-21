import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from "dotenv";

dotenv.config();

const firebaseConfigKeys = [
  "REACT_APP_FIREBASE_API_KEY",
  "REACT_APP_FIREBASE_AUTH_DOMAIN",
  "REACT_APP_FIREBASE_DATABASE_URL",
  "REACT_APP_FIREBASE_PROJECT_ID",
  "REACT_APP_FIREBASE_STORAGE_BUCKET",
  "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  "REACT_APP_FIREBASE_APP_ID",
  "REACT_APP_FIREBASE_MEASUREMENT_ID",
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    ...firebaseConfigKeys.reduce((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
      return acc;
    }, {}),
  },
})
