import { Country } from './country';
import { Base, Nameable } from './types';

export type Address = Base &
  Nameable & {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    country: Country;
    province: string;
    zipcode: string;
  };

export type AddressInput = {
  line1: string
  line2: string
  locality: string
  zipcode: string
  city: string
  country: string // ID
  province: string
}

export function convertAddressToInput(address: Address): AddressInput {
  let result: AddressInput;
  const data: any = { ...address };
  data.country = address.country?.id;
  delete data.__typename;
  delete data.id;
  result = data;
  return result;
}



export const addressFieldsFragment = `
  fragment addressFields on Address {
    id
    line1
    line2
    locality
    zipcode
    city
    country{
      ...countryFields
    }
    province
  }
`;
