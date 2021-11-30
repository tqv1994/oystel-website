import { ExperienceGallery } from '$lib/store/experience';
import { Identifiable, Nameable } from '$lib/store/types';
import { writable } from 'svelte/store';
import { CollectionStore } from '$lib/store/types';
import { DropGallery } from './drop';
import { DestinationGallery } from './destination';
import { Banner } from './banner';

export type Section =
  | DropGallery
  | DestinationGallery
  | ExperienceGallery
  | Banner;

export type Page = Identifiable &
  Nameable & {
    sections: Section[];
  };

export type PageQueryResult = {
  page: Page;
};

export const pageStore = writable<CollectionStore<Page>>({
  items: {},
});

export const pageFieldsFragment = `
fragment pageFields on Page {
  id
  name
  sections {
    __typename
    ... on ComponentGalleriesDropGallery {
      ...dropGalleryFields
    }
    ... on ComponentGalleriesDestinationGallery {
      ...destinationGalleryFields
    }
    ... on ComponentGalleriesExperienceGallery {
      ...experienceGalleryFields
    }
    ... on ComponentBannersBanner {
      ...bannerFields
    }
  }
}
`;
