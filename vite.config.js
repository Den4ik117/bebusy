import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from 'path'

export default defineConfig({
    build: {
        manifest: true,
        outDir: 'public',
        rollupOptions: {
            input: 'resources/js/app.js',
        },
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
})
