import { writable, readable } from 'svelte/store';

import type { AuthData, HomePageModel } from '$lib/types';

const store = writable<{
  homePage?: HomePageModel;
}>({
  homePage: undefined,
});

export default store;
