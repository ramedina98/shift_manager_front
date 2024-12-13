import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";
import electron from 'vite-plugin-electron/simple'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: 'electron/main.ts'
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: {},
    }),
  ],
})
