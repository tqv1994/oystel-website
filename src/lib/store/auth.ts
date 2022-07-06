import type { UploadFile } from './upload-file';
import type { Publishable } from './types';
import type { Traveller } from './traveller';

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
  avatar: UploadFile;
  travellerMe: number;
  neverMissADrop: boolean;
  curatedForYou: boolean;
  getTravelGuides: boolean;
  getTravelOffers: boolean;
};

export type Auth = { user: User; travellerMe: Traveller };
