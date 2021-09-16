import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-vercel';
import netlify  from '@sveltejs/adapter-netlify';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
      // adapter: adapter({
      //     // default options are shown
      //     pages: 'build',
      //     assets: 'build',
      //     fallback: null
      // }),
      adapter: netlify(),
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
            '@smui/tab-bar',
            '@smui/checkbox',
            '@smui/data-table',
            '@smui/select',
            '@smui/drawer',
            '@smui/list',
            '@smui/radio',
            '@smui/form-field'
        ],
      }
    },
  },
};

export default config;
