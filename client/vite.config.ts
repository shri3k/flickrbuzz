import { URL, fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default mergeConfig(
  defineConfig({
    plugins: [
      devtools(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      viteReact(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }),
  defineVitestConfig({
    test: {
      include: ["**/*.test.ts"], // unit tests
      exclude: ["**/*.spec.ts", "node_modules", "dist"], // .spec.ts is for e2e test
    },
  }),
);
