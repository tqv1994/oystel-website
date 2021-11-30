import { writable } from 'svelte/store';
import { Address } from './address';
import { User } from './auth';
import { Category } from './category';
import { Country } from './country';
import { Destination } from './destination';
import { Experience } from './experience';
import { Language } from './language';
import { Ordering, ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC } from './order';
import { CollectionStore, Exhibitable } from './types';
import { UploadFile } from './upload-file';

export type AdvisorBase = Exhibitable & {
  avatar: UploadFile;
  description?: string;
  accept?: string;
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
};

export type Advisor = AdvisorBase & {
  experienceType1?: Category;
  experienceType2?: Category;
  experienceType3?: Category;
  destinationType1?: Category;
  destinationType2?: Category;
  destinationType3?: Category;
  type1?: Category;
  type2?: Category;
  type3?: Category;
  language1?: Language;
  language2?: Language;
  language3?: Language;
}

export const advisorStore = writable<CollectionStore<Advisor>>({
  items: {},
});

export const advisorOrderings: Ordering[] = [
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
];

export const advisorFieldsFragment = `
fragment advisorFields on Advisor {
  id
  name
  description
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
  description
  accept
  planningFee
  instagram
  twitter
  facebook
  linkedIn
  pinterest
  destinations {
    ...destinationFields
  }
  experiences {
    ...experienceFields
  }
  my_users {
    ...userFields
  }
  userMe {
    ...userFields
  }
  agency {
    ...agencyFields
  }
  destinationTypes1 {
    ...destinationTypeFields
  }
  destinationTypes2 {
    ...destinationTypeFields
  }
  destinationTypes3 {
    ...destinationTypeFields
  }
  experienceType1 {
    ...experienceTypeFields
  }
  experienceType2 {
    ...experienceTypeFields
  }
  experienceType3 {
    ...experienceTypeFields
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
    ...tripFields
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
