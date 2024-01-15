import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://neural-feed-backend-2yg8.onrender.com/",
        changeOrigin: true,
      },
    },
  },
});
