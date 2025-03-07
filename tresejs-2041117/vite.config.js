import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {templateCompilerOptions} from '@tresjs/core'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'


// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        ...templateCompilerOptions
    }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@c': path.resolve(__dirname, 'src/components')
        }

    },
    server: {
        proxy: {
            '/yigo': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, "")
            },
        }
    },
    define: {
        '__API_BASE_URL__': JSON.stringify(''),
    },
})
