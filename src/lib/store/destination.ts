import type { Accommodation } from '$lib/store/accommodation';
import type { Experience } from '$lib/store/experience';
import type { Look } from '$lib/store/look';
import type {
  Categorizable,
  Exhibitable,
  Nationalizable,
} from '$lib/store/types';
import type { Attraction } from '$lib/store/attraction';
import type { Restaurant } from '$lib/store/restaurant';
import { writable } from 'svelte/store';
import type { CollectionStore } from '$lib/store/types';
import type { Product } from './product';
import type { UploadFile } from './upload-file';
import type { GalleryComponentBase } from './component';

export type DestinationBase = Exhibitable & {
  intro: string;
  videos: UploadFile[];
  experiences: Experience[];
  looks: Look[];
  pack: Product[];
  accommodations: Accommodation[];
  restaurants: Restaurant[];
  attractions: Attraction[];
  num_views: number;
  location: string;
};

export type Destination = DestinationBase &
  Nationalizable &
  Categorizable & {
    liked: boolean;
  };

export type DestinationGallery = GalleryComponentBase & {
  __component: 'galleries.destination-gallery';
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
  num_views
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
