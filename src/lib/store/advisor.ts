import { dateTimeHelper } from '$lib/helpers/datetime';
import { writable } from 'svelte/store';
import { Address } from './address';
import { User } from './auth';
import { Category } from './category';
import { Country } from './country';
import { Destination } from './destination';
import { Experience } from './experience';
import { Language } from './language';
import { Ordering, ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC } from './order';
import { Trip } from './trip';
import { CollectionStore, Exhibitable } from './types';
import { UploadFile } from './upload-file';

export type AdvisorBase = Exhibitable & {
  avatar: UploadFile;
  biography?: string;
  accept?: boolean;
  planningFee?: boolean;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  pinterest?: string;
  userMe?: User;
  country?: Country;
  experiences?: Experience[];
  destinations?: Destination[];
  address?: Address;
  website?: string;
  timezone?: string;
  email?: string;
  email2?: string;
  phone_number?: string;
  cell_mobile?: string;
  whatsapp?: string;
  emergency?: string;
  phone_number_code?: string;
  cell_mobile_code?: string;
  whatsapp_code?: string;
  emergency_code?: string;
  initials?: string;
  gallery?: UploadFile;
  trips?: Trip[];

};

export type Advisor = AdvisorBase & {
  experienceTypes1?: Category;
  experienceTypes2?: Category;
  experienceTypes3?: Category;
  experienceTypes4?: Category;
  experienceTypes5?: Category;
  destinationType1?: Category;
  destinationType2?: Category;
  destinationType3?: Category;
  type1?: Category;
  type2?: Category;
  type3?: Category;
  language1?: Language;
  language2?: Language;
  language3?: Language;
  agency?: Agency;
}

export type Agency = {
  id: string;
  affiliate_agencies?: Category[],
  affiliate_networks?: Category[],
  affiliate_benefit_programs?: Category[]
}

export const advisorStore = writable<CollectionStore<Advisor>>({
  items: {},
});

export const advisorOrderings: Ordering[] = [
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
];

export const getLastTripDate = (advisor: Advisor): string =>{
  let lastTrip: Trip|null = advisor.trips.reduce((acc: Trip,item)=>{
    if(!acc){
      return item;
    }else if(item.depart_at > acc.depart_at){ 
      return item;
    }else{
      return acc
    }
  },null);
  return lastTrip?.depart_at ? dateTimeHelper.formatDate(lastTrip.depart_at) : "";
}

export const numberOfOpenTrips = (advisor: Advisor): number => {
  return advisor.trips.reduce((acc: number,item)=>{
    if(item.state == 'enquired'){
      acc++;
    }
    return acc;
  },0);
}

export const numberOfPastTrips = (advisor: Advisor): number => {
  return advisor.trips.reduce((acc: number,item)=>{
    if(item.state == 'completed'){
      acc++;
    }
    return acc;
  },0);
}

export const advisorFieldsFragment = `
fragment advisorFields on Advisor {
  id
  name
  biography
  avatar {
    ...uploadFileFields
  }
  gallery {
    ...uploadFileFields
  }
  accept
  planningFee
  instagram
  twitter
  facebook
  linkedIn
  pinterest
  destinationTypes1 {
    ...destinationTypeFields
  }
  destinationTypes2 {
    ...destinationTypeFields
  }
  destinationTypes3 {
    ...destinationTypeFields
  }
  experienceTypes1 {
    ...experienceTypeFields
  }
  experienceTypes2 {
    ...experienceTypeFields
  }
  experienceTypes3 {
    ...experienceTypeFields
  }
  experienceTypes4 {
    ...experienceTypeFields
  }
  experienceTypes5 {
    ...experienceTypeFields
  }
  website
  timezone
  joined_at
  language1 {
    ...languageFields
  }
  language2 {
    ...languageFields
  }
  language3 {
    ...languageFields
  }
  type1 {
    ...advisorTypeFields
  }
  type2 {
    ...advisorTypeFields
  }
  type3 {
    ...advisorTypeFields
  }
  country {
    ...countryFields
  }
}
`;

export const advisorFieldDeps = [];

export const advisorPrivateFieldsFragment = `
fragment advisorFields on Advisor {
  id
  biography
  accept
  planningFee
  instagram
  twitter
  facebook
  linkedIn
  pinterest
  agency {
    ...agencyFields
  }
  active
  reference
  website
  timezone
  joined_at
  email2
  address {
    ...addressFields
  }
  language1 {
    ...languageFields
  }
  language2 {
    ...languageFields
  }
  language3 {
    ...languageFields
  }
  affiliate_agencies {
    ...affiliateAgencyFields
  }
  affiliate_networks {
    ...affiliateNetworkFields
  }
  affiliate_benefit_programs {
    ...affiliateBenefitProgramFields
  }
  trips {
    id
    depart_at
    return_at
  }
  type1 {
    ...advisorTypeFields
  }
  type2 {
    ...advisorTypeFields
  }
  type3 {
    ...advisorTypeFields
  }
  country {
    ...countryFields
  }
  phone_number
}
`;
