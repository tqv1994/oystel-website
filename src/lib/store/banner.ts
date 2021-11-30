import { writable } from 'svelte/store';
import { Action } from './action';
import { ComponentBase } from './component';
import { CollectionStore } from './types';
import { UploadFile } from './upload-file';

export const bannerStore = writable<CollectionStore<Banner>>({
  items: {},
});

export type Banner = ComponentBase & {
    headline?: string;
    description?: string;
    actions?: Action[];
    gallery?: UploadFile[];
    background?: UploadFile[];
  };

export const bannerFieldsFragment = `
fragment bannerFields on ComponentBannersBanner {
  name
  headline
  description
  actions {
    ...actionFields
  }
  gallery {
    ...uploadFileFields
  }
   background {
    ...uploadFileFields
  }
}
`;
