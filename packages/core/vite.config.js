import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Pine",
      fileName: format => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
  },
  plugins: [tsconfigPaths()],
});
