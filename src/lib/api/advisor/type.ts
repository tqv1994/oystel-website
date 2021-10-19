import { stringHelper } from '$lib/helpers';
import { Address } from '../address/type';
import { User } from '../auth/type';
import { Country } from '../country/type';
import { Destination } from '../destination/type';
import { Experience } from '../experience/type';
import { Language } from '../language/type';
import { Linkable } from '../linkable';
import { Speciality } from '../specialty/type';
import { BaseData, PublishableBase, PublishBaseData } from '../types';

export type AdvisorData = BaseData &
  PublishBaseData & {
    bio: string;
    accept: string;
    planningFree: string;
    userMe: User;
    countries: Country[];
    experiences: Experience[];
    destinations: Destination[];
    specialities: Speciality[];
    address: Address;
    languages: Language[];
  };

export class Advisor extends PublishableBase implements AdvisorData, Linkable {
  bio: string;
  accept: string;
  planningFree: string;
  userMe: User;
  countries: Country[];
  experiences: Experience[];
  destinations: Destination[];
  specialities: Speciality[];
  address: Address;
  languages: Language[];

  constructor(data: AdvisorData) {
    super(data);
    Object.assign(this, data);
  }

  get url() {
    return `/advisor/advisor-${this.id}`;
  }

  get languagesString(){
    return stringHelper.getLanguagesString(this.languages);
  }

  get specialitiesString(){
    return stringHelper.getSpecialtiesString(this.specialities);
  }

  get countriesString(){
    return stringHelper.getCountriesString(this.countries);
  }
}
