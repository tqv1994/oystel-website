import { writable } from 'svelte/store';

import type { UserType } from '$lib/types';

const store = writable<{
  user?: UserType;
}>({
  user: undefined,
});

export default store;
