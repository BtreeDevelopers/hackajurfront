import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const envObj: Record<string, string> = {};
  envObj["URL_BASE"] = env.URL_BASE;
  return {
    plugins: [vue()],
    server: {
      port: 8080,
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    define: {
      "process.env": envObj,
    },
  };
});
