import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { FileUpload, FileUploadData } from './type';

export const fileUploadStore = writable<CollectionStore<FileUpload>>({
  items: {},
});

export const updateFileUploadStore = (items: FileUploadData[]): void =>
  updateStore(fileUploadStore, items, (item) => new FileUpload(item));
