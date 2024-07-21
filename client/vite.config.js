import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5500,
    proxy: {
      // this means whenever we make a request to /api => it send that req to http://localhost:3000/api
      // proxy here as the man in the middle of the client and server (forward proxy)
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
