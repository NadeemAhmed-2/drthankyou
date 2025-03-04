// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// import path from 'path';

// export default defineConfig({
  
//   define: {
//     // Polyfill `global` with `window` in the browser environment
//     global: 'window',
//   },
//   resolve: {
//     alias: {
//       // Ensure any references to `global` are handled properly
//       global: path.resolve(__dirname, 'node_modules/node-libs-browser/mock/empty.js'),
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    // Polyfill `global` with `window` in the browser environment
    global: 'window',
  },
  plugins: [react()],
});
