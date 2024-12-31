import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	test: {
		root: './',
		globals: true,
		include: ['**/*.e2e-spec.ts'],
		setupFiles: ['./Test/SetupE2E.ts'],
	},
	plugins: [
		tsconfigPaths(),
		swc.vite({
			module: { type: 'es6' },
		}),
	],
});
