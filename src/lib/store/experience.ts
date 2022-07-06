import { writable } from 'svelte/store';
import type { UploadFile } from './upload-file';
import type {
  Categorizable,
  CollectionStore,
  Exhibitable,
  Nationalizable,
} from './types';
import type { Destination } from './destination';
import type { Look } from './look';
import type { Product } from './product';
import {
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
  ORDER_BY_PUBLISH_DATE_ASC,
  ORDER_BY_PUBLISH_DATE_DESC,
} from './order';
import type { GalleryComponentBase } from './component';

export type ExperienceBase = Exhibitable & {
  intro: string;
  videos: UploadFile[];
  destinations: Destination[];
  looks: Look[];
  pack: Product[];
  num_views: number;
  city?: number;
};

export type Experience = ExperienceBase &
  Nationalizable &
  Categorizable & {
    liked: boolean;
  };

export type ExperienceGallery = GalleryComponentBase & {
  __component: 'galleries.experience-gallery';
  experiences: Experience[];
};

export const experienceStore = writable<CollectionStore<Experience>>({
  items: {},
});

export const experienceOrderings: Kind[] = [
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
  ORDER_BY_PUBLISH_DATE_ASC,
  ORDER_BY_PUBLISH_DATE_DESC,
];

export const experienceFieldsFragment = `
fragment experienceFields on Experience {
  id
  name
  description
  intro
  gallery {
    ...uploadFileFields
  }
  country {
    ...countryFields
  }
  type1 {
    ...experienceTypeFields
  }
  type2 {
    ...experienceTypeFields
  }
  type3 {
    ...experienceTypeFields
  }
  num_views
}
`;

export const experienceGalleryFieldsFragment = `
fragment experienceGalleryFields on ComponentGalleriesExperienceGallery {
  id
  name
  headline
  prominent
  vertical
  experiences {
    ...experienceFields
  }
}
`;
