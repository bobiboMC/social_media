import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.cjs';
import autoprefixer from 'autoprefixer';

/** @type {import('vite').UserConfig} */
export default ({ mode }) => {
	// For copyIntl plugin
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	return defineConfig({
		plugins: [sveltekit()],
		server: {},
		css: {
			postcss: {
				plugins: [tailwind(tailwindConfig), autoprefixer]
			}
		},
		resolve: {
			dedupe: ['svelte'],
			alias: [
				{ find: '@', replacement: '/src/' },
				{ find: '@components', replacement: '/src/components' },
				{ find: '@stores', replacement: '/src/stores' },
				{ find: '@src', replacement: '/src' }
			],
			mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
		}
		/*
		optimizeDeps: {
			esbuildOptions: {
				// Node.js global to browser globalThis
				define: {
					global: 'globalThis'
				}
			}
		}*/
		/*define: {
			// By default, Vite doesn't include shims for NodeJS/
			// necessary for segment analytics lib to work
			global: {}
		}*/
	});
};
