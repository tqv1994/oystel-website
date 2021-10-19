import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { ExperienceModel } from './experience';
import { DestinationModel } from './destination';
import { AdvisorModel } from '$lib/types';

export class CountryModel {
  id: any;
  name: string;
  experiences: ExperienceModel[];
  destinations: DestinationModel[];
  advisor: AdvisorModel[];
  parent: AdvisorModel;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
