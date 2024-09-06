import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@images": resolve(__dirname, "src/images"),
      "@pages": resolve(__dirname, "src/pages"),
      "@Contexts": resolve(__dirname, "src/Contexts"),
    },
  },
});
