import { Category } from './category';
import { Country } from './country';
import { Language } from './language';
import { Features } from './nav';

export type Metadata = {
  advisorTypes: Category[];
  destinationTypes: Category[];
  experienceTypes: Category[];
  countries: Country[];
  languages: Language[];
  feature: Features;
  salutations: Category[];
};
