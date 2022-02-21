import { ExperienceGallery } from '$lib/store/experience';
import { Identifiable, Nameable } from '$lib/store/types';
import { writable } from 'svelte/store';
import { CollectionStore } from '$lib/store/types';
import { Drop, DropGallery } from './drop';
import { DestinationGallery } from './destination';
import { Banner } from './banner';
import { Action } from './action';
import { GalleryComponentBase } from './component';
import { Look } from './look';

export type FeaturedDrop = {
  name: string;
  drop: Drop;
  button_1: Action;
  button_2: Action;
};

export type LookGallery = GalleryComponentBase & {
  looks: Look[];
}

export type Section =
  | DropGallery
  | DestinationGallery
  | ExperienceGallery
  | Banner
  | LookGallery
  | FeaturedDrop;

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
    ... on ComponentGalleriesFeaturedDrop {
      ...featuredDropFields
    }
    ... on ComponentGalleriesLookGallery {
      ...lookGalleryFields
    }
  }
}
`;

export const featuredDropFieldsFragment = `
fragment featuredDropFields on ComponentGalleriesFeaturedDrop {
  id
  name
  button_1 {
    ...actionFields
  }
  button_2 {
    ...actionFields
  }
  drop {
    ...dropFields
  }
}
`;