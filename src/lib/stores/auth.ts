import { writable, readable } from 'svelte/store';

import type { AuthData } from '$lib/types';
import type { UserModel } from '$lib/models/user';

const store = writable<{
  user?: UserModel;
}>({
  user: undefined,
});

export default store;
