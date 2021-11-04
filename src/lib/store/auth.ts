import { writable } from 'svelte/store';
import { Destination } from './destination';
import { Experience } from './experience';
import { UploadFile } from './upload-file';
import { Product } from './product';
import { AsyncStore, Publishable } from './types';

export const authStore = writable<
  AsyncStore & {
    user?: User;
  }
>({
  user: undefined,
});

export type User = Publishable & {
  username: string;
  surname: string;
  name: string;
  mobile: string;
  location?: string;
  birthday?: string;
  height?: number;
  weight?: number;
  notes?: string;
  email?: string;
  phoneNumber?: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  destinationLikes?: Destination[];
  experienceLikes?: Experience[];
  productLikes?: Product[];
  avatar: UploadFile;
};
