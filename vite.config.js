import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: true,
    target: 'esnext',
  },
  plugins: [glsl()],
});
