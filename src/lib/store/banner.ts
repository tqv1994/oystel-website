import { writable } from 'svelte/store';
import type { Action } from './action';
import type { ComponentBase } from './component';
import type { CollectionStore } from './types';
import type { UploadFile } from './upload-file';

export const bannerStore = writable<CollectionStore<Banner>>({
  items: {},
});

export type Banner = ComponentBase & {
  __component: 'banners.banner';
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
