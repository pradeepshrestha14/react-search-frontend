import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = {
  plugins: [react()],
  // Vitest configuration
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
};

export default defineConfig(config);
