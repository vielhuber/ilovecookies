import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    build: {
        outDir: '_build',
        emptyOutDir: false,
        minify: mode !== 'development',
        sourcemap: mode === 'development',
        lib: {
            entry: './_js/ilovecookies.js'
        },
        rolldownOptions: {
            output: [
                {
                    format: 'iife',
                    name: 'iLoveCookies',
                    dir: '.',
                    entryFileNames: 'ilovecookies.min.js'
                },
                {
                    format: 'cjs',
                    dir: '.',
                    entryFileNames: 'ilovecookies.js',
                    exports: 'named'
                },
                {
                    format: 'es',
                    entryFileNames: 'ilovecookies.mjs'
                }
            ]
        }
    }
}));
