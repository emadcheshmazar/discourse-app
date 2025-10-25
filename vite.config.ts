import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => ({
  base: "/discourse-landing-build/", 
  plugins: [react()],
  server: {
    proxy:
      mode === "development"
        ? {
            "/api/discourse": {
              target: "https://aliasysdiscourse.ir",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/discourse/, ""),
              secure: false,
            },
          }
        : undefined,
  },
}));
