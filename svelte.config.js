import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: vercel(),
    target: '#svelte',

    vite: {
      ssr:{
        noExternal: [
            '@smui/top-app-bar',
            '@smui/common',
            '@smui/icon-button',
            '@smui/tooltip',
            '@smui/textfield',
            '@smui/button',
            '@smui/ripple',
            '@smui/dialog',
            '@smui/layout-grid',
            '@smui/tab',
            '@smui/tab-bar'
        ],
      }
    },
  },
};

export default config;
