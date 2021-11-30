import { Accommodation } from '$lib/store/accommodation';
import { Experience } from '$lib/store/experience';
import { Look } from '$lib/store/look';
import {
  Categorizable,
  Exhibitable,
  Nationalizable,
} from '$lib/store/types';
import { Attraction } from '$lib/store/attraction';
import { Restaurant } from '$lib/store/restaurant';
import { writable } from 'svelte/store';
import { CollectionStore } from '$lib/store/types';
import { Product } from './product';
import { UploadFile } from './upload-file';
import { SearchResultItemWithCountryId, SearchResultItemWithTypeIDs } from './search';
import { GalleryComponentBase } from './component';

export type DestinationBase = Exhibitable & {
  intro: string;
  videos: UploadFile[];
  experiences: Experience[];
  looks: Look[];
  pack: Product[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  attractions: Attraction[];
};

export type Destination = DestinationBase & Nationalizable & Categorizable & {
  liked: boolean;
};

export type DestinationSearchResultItem = DestinationBase & SearchResultItemWithTypeIDs & SearchResultItemWithCountryId;

export type DestinationGallery = GalleryComponentBase & {
  destinations: Destination[];
};

export const destinationStore = writable<CollectionStore<Destination>>({
  items: {},
});

export const destinationFieldsFragment = `
fragment destinationFields on Destination {
  id
  name
  description
  intro
  location
  gallery {
    ...uploadFileFields
  }
  country {
    ...countryFields
  }
  type1 {
    ...destinationTypeFields
  }
  type2 {
    ...destinationTypeFields
  }
  type3 {
    ...destinationTypeFields
  }
}
`;

export const destinationGalleryFieldsFragment = `
fragment destinationGalleryFields on ComponentGalleriesDestinationGallery {
  id
  name
  headline
  prominent
  vertical
  destinations {
    ...destinationFields
  }
}
`;
