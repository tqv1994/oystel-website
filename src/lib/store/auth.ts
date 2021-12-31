import { writable } from 'svelte/store';
import { Destination } from './destination';
import { Experience } from './experience';
import { UploadFile } from './upload-file';
import { Product } from './product';
import { AsyncStore, Publishable } from './types';
import { Traveller } from './traveller';
import { Advisor } from './advisor';

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
  travellerMe: Traveller;
  neverMissADrop: boolean;
  curatedForYou: boolean;
  myAdvisors: Advisor[];
};

export class UserInput  {
	username: string;
	surname: string;
	name: string;
	mobile: string;
	location: string;
	birthday: string;
	height: number;
	weight: number;
	notes: string;
	email: string;
	phoneNumber: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	avatar: string // ID;
	myAdvisors: string[] // ID[];
	advisorMe: string; // ID
	agencyMe: string; // ID
  travellerMe?: Traveller;
  destinationLikes?: string[] // ID[];
  experienceLikes?: string[] // ID[];
  productLikes?: string[] // ID[];

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
};

export const convertUserToInput = (user: User): UserInput => {
  const data: any = {...user};
  data.avatar = user.avatar?.id || '';
  data.myAdvisors = (user.myAdvisors || []).map((item)=>item.id+"");
  data.advisorMe = user.travellerMe?.id || '';
  data.destinationLikes = (user.destinationLikes || []) .map((item)=>item.id+"");
  data.experienceLikes = (user.experienceLikes || []) .map((item)=>item.id+"");
  data.productLikes = (user.productLikes || []) .map((item)=>item.id+"");
  data.travellerMe = user.travellerMe.id || '';
  delete data.id;
  if(data.role){ delete data.role; } 
  delete data.__typename;
  return new UserInput(data);
}

export const userFieldsFragment = `
fragment userFields on UsersPermissionsUser  {
    id
    name
    username
    email
    confirmed
    blocked
    role {
      name
      description
    }
    avatar {
      ...uploadFileFields
    }
    travellerMe {
      ...travellerFields
    }
    advisorMe {
      id
    }
    myAdvisors {
      id
    }
    neverMissADrop
    curatedForYou
}
`;

export const subUserFieldsFragment = `
fragment subUserFields on UsersPermissionsUser  {
    id
    name
    username
    email
    avatar {
      ...uploadFileFields
    }
}
`;
