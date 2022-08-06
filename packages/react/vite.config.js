import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PineReact",
      fileName: format => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
  },
  plugins: [react()],
});
