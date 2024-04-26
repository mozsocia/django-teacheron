import { defineConfig } from 'vite'
import postcss from './postcss.config.cjs'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: path.resolve(__dirname, 'src') + '/',
      },
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
      
    ],
  },
  server: {
    port: 3080,
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    outDir: "../static/viteapp"
  }
})
