import { dateTimeHelper } from '$lib/helpers/datetime';
import { writable } from 'svelte/store';
import type { Address } from './address';
import type { User } from './auth';
import type { Destination } from './destination';
import type { Experience } from './experience';
import { ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC } from './order';
import type { Trip } from './trip';
import type {
  Categorizable,
  CollectionStore,
  Likeable,
  Publishable,
} from './types';
import type { UploadFile } from './upload-file';
import type { Kind } from './category';

export type AdvisorBase = Publishable &
  Categorizable &
  Likeable & {
    username: string;
    name: string;
    description: string;
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
    country?: string;
    experiences?: string[];
    destinations?: string[];
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
    gallery?: UploadFile[];
    trips?: Trip[];
    joined_at?: string;
    city: string;
  };

export type Advisor = AdvisorBase & {
  experienceType1?: string;
  experienceType2?: string;
  experienceType3?: string;
  experienceType4?: string;
  experienceType5?: string;
  destinationType1?: string;
  destinationType2?: string;
  destinationType3?: string;
  type1?: Kind;
  type2?: Kind;
  type3?: Kind;
  language1?: string;
  language2?: string;
  language3?: string;
  agency?: Agency;
};

export type Agency = {
  id: string;
  affiliate_agencies?: Kind[];
  affiliate_networks?: Kind[];
  affiliate_benefit_programs?: Kind[];
};

export const advisorStore = writable<CollectionStore<Advisor>>({
  items: {},
});

export const advisorOrderings: Kind[] = [ORDER_BY_NAME_ASC, ORDER_BY_NAME_DESC];

export const getLastTripDate = (advisor: Advisor): string => {
  const lastTrip: Trip | null = (advisor?.trips || []).reduce(
    (acc: Trip, item) => {
      if (!acc) {
        return item;
      } else if (item.depart_at > acc.depart_at) {
        return item;
      } else {
        return acc;
      }
    },
    null,
  );
  return lastTrip?.depart_at
    ? dateTimeHelper.formatDate(lastTrip.depart_at)
    : '';
};

export const numberOfOpenTrips = (advisor: Advisor): number => {
  return (advisor?.trips || []).reduce((acc: number, item) => {
    if (item.state == 'enquired') {
      acc++;
    }
    return acc;
  }, 0);
};

export const numberOfPastTrips = (advisor: Advisor): number => {
  return (advisor?.trips || []).reduce((acc: number, item) => {
    if (item.state == 'completed') {
      acc++;
    }
    return acc;
  }, 0);
};

export const advisorFieldsFragment = `
fragment advisorFields on Advisor {
  id
  username
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
  experienceType1 {
    ...experienceTypeFields
  }
  experienceType2 {
    ...experienceTypeFields
  }
  experienceType3 {
    ...experienceTypeFields
  }
  experienceType4 {
    ...experienceTypeFields
  }
  experienceType5 {
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
  language1 {
    ...languageFields
  }
  language2 {
    ...languageFields
  }
  language3 {
    ...languageFields
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

export const getSpecialtiesString = (
  advisor: Advisor,
  experienceTypes: Kind[],
): string => {
  const experienceTypeIds: string[] = [];
  if (advisor) {
    if (advisor.experienceType1) {
      experienceTypeIds.push(advisor.experienceType1);
    }
    if (advisor.experienceType2) {
      experienceTypeIds.push(advisor.experienceType2);
    }
    if (advisor.experienceType3) {
      experienceTypeIds.push(advisor.experienceType3);
    }
    if (advisor.experienceType4) {
      experienceTypeIds.push(advisor.experienceType4);
    }
    if (advisor.experienceType5) {
      experienceTypeIds.push(advisor.experienceType5);
    }
  }
  return experienceTypeIds.reduce((acc: string, id) => {
    const experienceType = experienceTypes.find(
      (item) => item.id.toString() === id.toString(),
    );
    if (experienceType) {
      if (acc === '') {
        acc = experienceType.name;
      } else {
        acc += `, ${experienceType.name}`;
      }
    }
    return acc;
  }, '');
};
