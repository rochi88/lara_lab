import { defineConfig } from 'vite';
import laravel, { refreshPaths } from 'laravel-vite-plugin';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: [
                ...refreshPaths,
                'app/Http/Livewire/**',
            ],
        }),
        VitePWA({
            strategies: 'injectManifest',
            devOptions: {
                enabled: false, // Enable to test the service worker
                type: 'classic'
            },
            base: '/',
            filename: 'sw.js',
            registerType: 'autoUpdate',
            scope: '/',
            outDir: 'public',
            srcDir: 'resources/js',
            injectManifest: {
                swDest: process.env.APP_ENV == 'production' ? 'public/sw.js' : 'public/dev-sw.js'
            },
            manifest: {
                id: (process.env.APP_NAME)?.split('_').map(str => str.charAt(0).toLowerCase() + str.slice(1)).join('-'),
                name: process.env.APP_NAME,
                short_name: process.env.PWA_SHORT_NAME,
                description: process.env.PWA_DESCRIPTION,
                theme_color: process.env.PWA_THEME_COLOR,
                start_url: '/?standalone=true',
                icons: [
                    {
                        "src": "android-chrome-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    },
                    {
                        "src": "android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        // "purpose": "any maskable"
                        // Use this if your icon can take the cropping (Laravel-Vite's icon can't)
                    }
                ]
            }
        }),
    ],
});
