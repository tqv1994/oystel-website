import { writable } from 'svelte/store';
import { AsyncStore } from '../types';

const store = writable<AsyncStore & {
  loading?: boolean;
}>({
  loading: false,
});

export default store;
