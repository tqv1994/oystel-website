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
  };
