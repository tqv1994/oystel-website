import type { Kind } from './category';

export type Region = Kind & {
  country: number; // ID
  experienceType1: number; //ID
  experienceType2: number; //ID
  experienceType3: number; //ID
  experienceType4: number; //ID
  experienceType5: number; //ID
  experienceType6: number; //ID
  destinationType: number // ID
};
