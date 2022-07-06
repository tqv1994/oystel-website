import { session } from '$app/stores';
import { get, writable } from 'svelte/store';
import {
  convertAddressToInput,
  type Address,
  type AddressInput,
} from './address';
import type { Kind } from './category';
import type { Country } from './country';
import type { Destination } from './destination';
import type { Experience } from './experience';
import type { Identification } from './identification';
import type { Interest } from './interest';
import type { PersonalPreference, TravelPreference } from './preference';
import type { Product } from './product';
import type { UploadFile } from './upload-file';

export type Traveller = {
  id: number;
  created_at?: string;
  updated_at?: string;
  salutationType: Kind;
  forename: string;
  surname: string;
  birthday: string;
  height: number;
  weight: number;
  notes: string;
  homePhone: string;
  mobilePhone: string;
  workPhone: string;
  emergencyPhone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  messenger: string;
  language: string;
  nationality: Country;
  residence: Country;
  email: string;
  children: Traveller;
  // visas: Visa[];
  // identifications: Identification[];
  spouse: Traveller[];
  partners: Traveller[];
  parents: Traveller[];
  relatives: Traveller[];
  friends: [Traveller];
  otherRelations: Traveller[];
  interests: Interest[];
  travelPreferences: TravelPreference[];
  personalPreferences: PersonalPreference[];
  stylePreferences: string;
  topSize: string;
  dressSize: string;
  jeanPantSize: string;
  braSize: string;
  shoeSize: string;
  bodyStyle: string;
  gender: string;
  weightUnit: string;
  heightUnit: string;
  passportNumber: string;
  passportExpiryDate: string;
  passportPlaceOfIssue: string;
  medicalCondition: string;
  myAssistantName: string;
  myAssistantSalutationType: Kind;
  myAssistantEmail: string;
  myAssistantPhone: string;
  myAssistantContactNotes: string;
  myAssistantLanguage: Kind;
  avatar: UploadFile;
  userMe: string;
  destinationLikes?: Destination[];
  experienceLikes?: Experience[];
  productLikes?: Product[];
  address?: Address;
  identifications: Identification[];
};

export const updateTravellerMeStore = (travellerMe: Traveller) => {
  session.update((s) => {
    if (s.user && s.travellerMe) {
      let identifications: Identification[] = [];
      if (s.travellerMe.identifications) {
        identifications = s.travellerMe.identifications;
      }
      s.travellerMe = travellerMe;
      s.travellerMe.identifications = identifications;
    }
    return s;
  });
};

export const updateRelationshipToTravellerMe = (
  traveller: Traveller,
  relationship: string,
  isRemove = false,
) => {
  session.update((s) => {
    if (s.user && s.travellerMe) {
      const travellerMe = s.travellerMe;
      if (relationship === RELATIVES.children) {
        if (isRemove === false) {
          travellerMe.children = traveller;
        } else {
          travellerMe.children = null;
        }
      } else {
        const index = (travellerMe[relationship] || []).findIndex(
          (item: Traveller) => item.id.toString() === traveller.id.toString(),
        );
        if (index >= 0) {
          if (isRemove === false) {
            travellerMe[relationship][index] = traveller;
          } else {
            travellerMe[relationship].splice(index, 1);
          }
        } else {
          if (isRemove === false) {
            if (travellerMe[relationship]) {
              travellerMe[relationship].push(traveller);
            } else {
              travellerMe[relationship] = [traveller];
            }
          }
        }
      }
      s.travellerMe = travellerMe;
    }
    return s;
  });
};

export const updateIdentificationToTravellerMe = (
  identification: Identification,
  isRemove = false,
) => {
  session.update((s) => {
    if (s.user && s.travellerMe) {
      const travellerMe = s.travellerMe;
      if (!travellerMe.identifications) {
        travellerMe.identifications = [identification];
      } else {
        if (isRemove === false) {
          const index = travellerMe.identifications.findIndex(
            (item) => item.id.toString() === identification.id.toString(),
          );
          if (index >= 0) {
            travellerMe.identifications[index] = identification;
          } else {
            travellerMe.identifications.push(identification);
          }
        } else {
          const index = travellerMe.identifications.findIndex(
            (item) => item.id.toString() === identification.id.toString(),
          );
          if (index >= 0) {
            travellerMe.identifications.splice(index, 1);
          }
        }
      }
      s.travellerMe = travellerMe;
    }

    return s;
  });
};

export class TravellerInput {
  salutationType: string;
  forename: string;
  surname: string;
  birthday: string;
  height: number;
  weight: number;
  notes: string;
  homePhone: string;
  mobilePhone: string;
  workPhone: string;
  emergencyPhone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  messenger: string;
  address: AddressInput;
  language: string;
  nationality: string;
  residence: string;
  visas: string[];
  identifications: string[];
  email: string;
  spouse: string[];
  partners: string[];
  parents: string[];
  children: string;
  relatives: string[];
  friends: string[];
  otherRelations: string[];
  passportNumber: string;
  passportExpiryDate: string;
  passportPlaceOfIssue: string;
  medicalCondition: string;
  gender: string;
  myAssistantName: string;
  myAssistantSalutationType: string; // ID
  myAssistantEmail: string;
  myAssistantPhone: string;
  myAssistantContactNotes: string;
  myAssistantLanguage: string; // ID

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export function convertTravellerToInput(traveller: Traveller): TravellerInput {
  let result: TravellerInput;
  const data: any = { ...traveller };
  data.salutationType = (traveller.salutationType?.id || '').toString();
  data.partners = traveller.partners?.map((item) => item.id);
  data.parents = traveller.parents?.map((item) => item.id);
  data.children = traveller.children?.id;
  data.relatives = traveller.relatives?.map((item) => item.id);
  data.friends = traveller.friends?.map((item) => item.id);
  data.spouse = traveller.spouse?.map((item) => item.id);
  data.otherRelations = traveller.otherRelations?.map((item) => item.id);
  data.nationality = traveller.nationality?.id;
  data.interests = traveller.interests?.map((item) => item.id);
  data.personalPreferences = traveller.personalPreferences?.map(
    (item) => item.id,
  );
  data.travelPreferences = traveller.travelPreferences?.map((item) => item.id);
  data.myAssistantSalutationType = traveller.myAssistantSalutationType?.id;
  data.myAssistantLanguage = traveller.myAssistantLanguage?.id;
  data.residence = traveller.residence?.id || null;
  if (data.address) {
    data.address = convertAddressToInput(data.address);
  } else {
    data.address = {
      line1: '',
      line2: '',
      locality: '',
      city: '',
      country: '',
      province: '',
      postcode: '',
    };
  }
  delete data.__typename;
  delete data.id;
  return data;
}

export enum ENUM_TRAVELLER_GENDER {
  Female = 'Female',
  Male = 'Male',
  Others = 'Others',
}

export const RELATIVE_LABELS = {
  spouse: 'Spouse',
  parents: 'Parent',
  partners: 'Partner',
  relatives: 'Relative',
  otherRelations: 'Other Relations',
  children: 'Child',
};

export const RELATIVES = {
  spouse: 'spouse',
  parents: 'parents',
  partners: 'partners',
  relatives: 'relatives',
  otherRelations: 'otherRelations',
  children: 'children',
};

export const getRelativeKeyByLabel = (label: string) => {
  switch (label) {
    case RELATIVE_LABELS.spouse:
      return RELATIVES.spouse;
    case RELATIVE_LABELS.parents:
      return RELATIVES.parents;
    case RELATIVE_LABELS.partners:
      return RELATIVES.partners;
    case RELATIVES.children:
      return RELATIVES.children;
    default:
      return RELATIVES.otherRelations;
  }
};

export type IdentificationWithRelationship = {
  items: Identification[];
  relationship: string;
};

export function getAllIdentifications(
  traveller: Traveller,
): IdentificationWithRelationship[] {
  const result: IdentificationWithRelationship[] = [];
  result.push({
    items: traveller.identifications.map((item) => {
      item.traveller = traveller;
      return item;
    }),
    relationship: 'Me',
  });

  if (traveller.children) {
    result.push({
      items: traveller.children.identifications.map((item) => {
        item.traveller = traveller.children;
        return item;
      }),
      relationship: 'Children',
    });
  }

  if (traveller.spouse) {
    let items: Identification[] = [];
    for (const travellerItem of traveller.spouse) {
      items = items.concat(
        travellerItem?.identifications.map((item) => {
          item.traveller = travellerItem;
          return item;
        }),
      );
    }
    result.push({ items, relationship: 'Spouse' });
  }

  if (traveller.parents) {
    let items: Identification[] = [];
    for (const travellerItem of traveller.parents) {
      items = items.concat(
        travellerItem?.identifications.map((item) => {
          item.traveller = travellerItem;
          return item;
        }),
      );
    }
    result.push({ items, relationship: 'Parent' });
  }

  if (traveller.partners) {
    let items: Identification[] = [];
    for (const travellerItem of traveller.partners) {
      items = items.concat(
        travellerItem?.identifications.map((item) => {
          item.traveller = travellerItem;
          return item;
        }),
      );
    }
    result.push({ items, relationship: 'Partner' });
  }

  if (traveller.relatives) {
    let items: Identification[] = [];
    for (const travellerItem of traveller.relatives) {
      items = items.concat(
        travellerItem?.identifications.map((item) => {
          item.traveller = travellerItem;
          return item;
        }),
      );
    }
    result.push({ items, relationship: 'Relative' });
  }

  if (traveller.otherRelations) {
    let items: Identification[] = [];
    for (const travellerItem of traveller.otherRelations) {
      items = items.concat(
        travellerItem?.identifications.map((item) => {
          item.traveller = travellerItem;
          return item;
        }),
      );
    }
    result.push({ items, relationship: 'Other Relative' });
  }
  return result;
}
export const travellerFieldsFragment = `
fragment travellerFields on Traveller {
  id,
  salutationType {
      ...salutationTypeFields
  },
  forename,
  surname,
  birthday,
  height,
  weight,
  notes,
  homePhone,
  mobilePhone,
  workPhone,
  emergencyPhone,
  whatsapp,
  instagram,
  facebook,
  messenger,
  language,
  nationality {
      ...countryFields
  },
  residence {
      ...countryFields
  },
  email,
    children { 
        ...subTravellerFields
      },
  spouse { 
      ...subTravellerFields
    },
  partners { 
    ...subTravellerFields
  },
  parents{ 
    ...subTravellerFields
  },
  relatives { 
    ...subTravellerFields
  },
  friends { 
    ...subTravellerFields
  },
  otherRelations { 
    ...subTravellerFields
  },
  interests{
    ...interestFields
  },
  travelPreferences{
    ...travelPreferenceFields
  },
  personalPreferences{
    ...personalPreferenceFields
  },
  stylePreferences
  topSize
  dressSize
  jeanPantSize
  braSize
  shoeSize
  bodyStyle
  gender
  weightUnit
  heightUnit
  passportNumber
  passportExpiryDate
  passportPlaceOfIssue
  medicalCondition
  myAssistantName
  myAssistantSalutationType{
    ...salutationTypeFields
  }
  myAssistantEmail
  myAssistantPhone
  myAssistantContactNotes
  myAssistantLanguage{
    ...languageFields
  }
}
`;

export const subTravellerFieldsFragment = `
fragment subTravellerFields on Traveller {
  id,
  salutationType {
      ...salutationTypeFields
  },
  forename,
  surname,
  birthday,
  height,
  weight,
  notes,
  homePhone,
  mobilePhone,
  workPhone,
  emergencyPhone,
  whatsapp,
  instagram,
  facebook,
  messenger,
  language,
  nationality {
      ...countryFields
  },
  residence {
      ...countryFields
  },
  email
}
`;
