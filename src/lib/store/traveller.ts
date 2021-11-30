import { Address } from './address';
import { Category } from './category';
import { Country } from './country';
import { Identification } from './identification';
import { Visa } from './visa';

export type Traveller = {
    id: number;
    created_at?: string;
    updated_at?: string;
    salutation: Category;
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
    language: string
    nationality: Country;
    residence: Country;
    email: string;
    children: Traveller;
    addresses: Address[];
    visas: Visa[];
    identifications: Identification[];
    spouse: Traveller[];
    partners: Traveller[];
    parents: Traveller[];
    relatives: Traveller[];
    friends: [Traveller];
    otherRelations: Traveller[];
}

export type TravellerInput = {
  salutation: string
  forename: string
  surname: string
  birthday: string
  height: number
  weight: number
  notes: string
  homePhone: string
  mobilePhone: string
  workPhone: string
  emergencyPhone: string
  whatsapp: string
  instagram: string
  facebook: string
  messenger: string
  addresses: string[]
  language: string
  nationality: string
  residence: string
  visas: string[]
  identifications: string[]
  email: string
  spouse: string[]
  partners: string[]
  parents: string[]
  children: string
  relatives: string[]
  friends: string[]
  otherRelations: string[]
};

export function convertTravellerToInput(traveller: Traveller): TravellerInput{
  let result: TravellerInput;
  const data: any = traveller;
  data.salutation = traveller.salutation?.id;
  data.addresses = traveller.addresses?.map((item)=>{return item.id});
  data.visas = traveller.visas?.map((item)=>{return item.id});
  data.identifications =  traveller.identifications?.map((item)=>{return item.id});
  data.partners = traveller.parents?.map((item)=>item.id);
  data.parents = traveller.parents?.map((item)=>item.id);
  data.children = traveller.children?.id;
  data.relatives = traveller.relatives?.map((item)=>item.id);
  data.friends = traveller.friends?.map((item)=>item.id);
  data.otherRelations = traveller.otherRelations?.map((item)=>item.id);
  data.nationality = traveller.nationality?.id;
  delete data.__typename;
  delete data.id;
  result = data;
  return result;
}

export const travellerFieldsFragment = `
fragment travellerFields on Traveller {
  id,
  salutation {
      ...salutationFields
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
  visas {
      ...visaFields
  },
  identifications {
      ...identificationFields
    },
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
}
`;

export const subTravellerFieldsFragment = `
fragment subTravellerFields on Traveller {
  id,
  salutation {
      ...salutationFields
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
  visas {
      ...visaFields
  },
  identifications {
      ...identificationFields
    },
}
`;
