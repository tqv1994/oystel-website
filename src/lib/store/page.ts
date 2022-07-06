import type { ExperienceGallery as ExperienceGalleryData } from '$lib/store/experience';
import { writable } from 'svelte/store';
import type { CollectionStore } from '$lib/store/types';
import type { Drop, DropGallery as DropGalleryData } from './drop';
import type { DestinationGallery as DestinationGalleryData } from './destination';
import type { Banner as BannerData } from './banner';
import type { Action } from './action';
import type { ComponentBase, GalleryComponentBase } from './component';
import type { Look } from './look';
import type { ProductGallery as ProductGalleryData } from './product';
import type { Kind } from './category';
import type { UploadFile } from './upload-file';

export type FeaturedDropData = ComponentBase & {
  __component: 'galleries.featured-drop';
  drop: Drop;
  button_1: Action;
  button_2: Action;
};

export type LookGalleryData = GalleryComponentBase & {
  looks: Look[];
};

export type HTMLData = ComponentBase & {
  __component: 'controls.html';
  content: string;
};

export type Section =
  | HeroGalleryData
  | DropGalleryData
  | DestinationGalleryData
  | ExperienceGalleryData
  | BannerData
  | LookGalleryData
  | FeaturedDropData
  | ProductGalleryData
  | HTMLData;

export type HeroGalleryData = ComponentBase & {
  __component: 'galleries.hero-gallery';
  gallery: UploadFile[];
};

export type Page = Kind & {
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
    ... on ComponentGalleriesHeroGallery {
      ...heroGalleryFields
    }
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
    ... on ComponentGalleriesProductGallery {
      ...productGalleryFields
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
