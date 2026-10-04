import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "tests/**/*.test.ts",
      "src/**/*.test.ts"
    ],
    coverage:{
      provider: "v8",
      reporter: [
        "text",
        "html",
        "lcov"
      ],
      reportsDirectory: "./coverage",
      exclude: [
        "src/types/**",
        "**/*.d.ts",
        "**/index.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    clearMocks: true,
    restoreMocks: true,
  },
});