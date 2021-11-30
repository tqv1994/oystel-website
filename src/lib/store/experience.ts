import { writable } from 'svelte/store';
import { UploadFile } from './upload-file';
import {
  Categorizable,
  CollectionStore,
  Exhibitable,
  Nationalizable,
} from './types';
import { Destination } from './destination';
import { Look } from './look';
import { Product } from './product';
import {
  Ordering,
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
  ORDER_BY_PUBLISH_DATE_ASC,
  ORDER_BY_PUBLISH_DATE_DESC,
} from './order';
import { SearchResultItemWithCountryId, SearchResultItemWithTypeIDs } from './search';
import { GalleryComponentBase } from './component';

export type ExperienceBase = Exhibitable & {
  intro: string;
  videos: UploadFile[];
  destinations: Destination[];
  looks: Look[];
  pack: Product[];
};

export type Experience = ExperienceBase & Nationalizable & Categorizable &{
  liked: boolean;
};

export type ExperienceSearchResultItem = ExperienceBase & SearchResultItemWithTypeIDs & SearchResultItemWithCountryId;

export type ExperienceGallery = GalleryComponentBase & {
  experiences: Experience[];
};

export const experienceStore = writable<CollectionStore<Experience>>({
  items: {},
});

export const experienceOrderings: Ordering[] = [
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
