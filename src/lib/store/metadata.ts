import { Category } from './category';
import { Country } from './country';
import { Language } from './language';
import { Speciality } from './speciality';

export type Metadata = {
  specialities: Speciality[];
  destinationTypes: Category[];
  experienceTypes: Category[];
  countries: Country[];
  languages: Language[];
};
