import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { CountryModel } from './country';
import { UserModel } from '$lib/models/user';
import { stringHelper } from '$lib/helpers';
import { LanguageModel } from './language';

export class AdvisorModel {
  id: any;
  name: string;
  countries: CountryModel[];
  bio: string;
  accept: boolean;
  userMe: UserModel;
  specialities: AdvisorSpeciality[];
  location: CountryModel;
  languages: LanguageModel[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
    if (this.userMe) {
      this.userMe = new UserModel(this.userMe);
    }
  }

  get link() {
    if (!this.userMe) {
      return '#';
    }
    return (
      '/advisor/' +
      stringHelper.stringToSlug(
        this.userMe.displayName
          ? this.userMe.displayName
          : this.userMe.username,
      ) +
      '-' +
      this.id
    );
  }

  get specialitiesString() {
    let result = '';
    if (this.specialities && this.specialities.length > 0) {
      this.specialities.map((item: AdvisorSpeciality, index) => {
        if (index == 0) {
          result = item.title;
        } else {
          result += ', ' + item.title;
        }
      });
    }
    return result;
  }

  get locationTitle() {
    return this.location ? this.location.name : '';
  }

  get languagesString() {
    let result = '';
    if (this.languages && this.languages.length > 0) {
      this.languages.map((item, index) => {
        if (index == 0) {
          result = item.title;
        } else {
          result += ', ' + item.title;
        }
      });
      return result;
    }
  }
}

export class AdvisorSpeciality {
  id: number;
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
