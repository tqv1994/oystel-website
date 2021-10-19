import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import authStore from '$lib/api/auth/store';
import { Product, ProductData } from '$lib/api/product/type';

export const productStore = writable<CollectionStore<Product>>({
  items: {},
});

export const updateProductStore = (items: ProductData[]): void =>
  updateStore(productStore, items, (item) => new Product(item));
