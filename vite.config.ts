import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const _dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": resolve(_dirname, "./src/app"),
      "@lexica": resolve(_dirname, "./src/modules/lexica"),
      "@table": resolve(_dirname, "./src/modules/table"),
    },
  },
  appType: "spa",
});
