import { writable, readable } from 'svelte/store';

import type { UserModel, AuthData } from '$lib/types';

const store = writable<{
  user?: UserModel;
}>({
  user: undefined,
});

export default store;
