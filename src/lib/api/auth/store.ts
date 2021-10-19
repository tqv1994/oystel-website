import { writable } from 'svelte/store';
import { AsyncStore } from '../types';
import { User } from './type';

const store = writable<AsyncStore & {
  user?: User;
}>({
  user: undefined,
});

export default store;
