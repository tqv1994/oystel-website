import type { Country } from './country';
import type { Base, Nameable } from './types';

export type Address = Base &
  Nameable & {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    country: Country;
    province: string;
    postcode: string;
  };

export type AddressInput = {
  line1?: string;
  line2?: string;
  locality?: string;
  postcode?: string;
  city?: string;
  country?: string; // ID
  province?: string;
};

export function convertAddressToInput(address: Address): AddressInput {
  const data: any = { ...address };
  data.country = address.country?.id;
  delete data.__typename;
  delete data.id;
  const result: AddressInput = data;
  return result;
}
