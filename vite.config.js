import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@store": "/src/store",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
    },
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: false,
    },
  },
});
