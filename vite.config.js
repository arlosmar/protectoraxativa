import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

//import { compression } from 'vite-plugin-compression2';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        commonjs(),
        //compression({/*include: [/\.(js)$/, /\.(css)$/],*/deleteOriginalAssets: false}) // it deletes the original css and js files
    ]/*,
    build: { chunkSizeWarningLimit: 1600 }*/
});
