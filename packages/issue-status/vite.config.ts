import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig(async () => {
  const packageRoot = import.meta.dirname;

  const configPath = path.resolve(process.cwd(), "issue-status.config.ts");

  if (!fs.existsSync(configPath)) {
    throw new Error("issue-status.config.ts not found.");
  }

  return {
    root: packageRoot,
    base: "./",
    plugins: [react(), tailwindcss()],
    define: {
      __CONFIG_PATH__: JSON.stringify(configPath),
    },
    server: { fs: { allow: [configPath, packageRoot] } },
    build: {
      outDir: path.resolve(process.cwd(), "dist"),
      emptyOutDir: true,
      target: "esnext",
    },
  };
});
