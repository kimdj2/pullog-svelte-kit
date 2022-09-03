import adapter from '@sveltejs/adapter-auto';
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true,
		}),	
  ],
	kit: {
		adapter: adapter(),
    prerender: {
      default: true,
      // entries: ['*', '/sitemap.xml', '/rss.xml']
    }
	}
};

export default config;

