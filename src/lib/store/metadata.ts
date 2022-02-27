import { Category } from './category';
import { Country } from './country';
import { InterestType } from './interest';
import { Language } from './language';
import { Features } from './nav';
import { PersonalPreferenceType, TravelPreferenceType } from './preference';

export type Metadata = {
  advisorTypes: Category[];
  destinationTypes: Category[];
  experienceTypes: Category[];
  countries: Country[];
  languages: Language[];
  feature: Features;
  salutationTypes: Category[];
  interestTypes: InterestType[];
  travelPreferenceTypes:TravelPreferenceType[];
  personalPreferenceTypes:PersonalPreferenceType[];
  productColours: Category[];
  productPattners: Category[];
  productDesigners: Category[];
  productTypes: Category[];
  vacationStyles: Category[];
};
