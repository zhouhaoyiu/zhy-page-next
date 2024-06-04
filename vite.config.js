import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
//  Failed to resolve component: dock-item
// If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
export default defineConfig({
  plugins: [
    vue({
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('dock-'),
      },
    }),
  ],
});
