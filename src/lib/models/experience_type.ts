import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { ExperienceModel } from './experience';

export class ExperienceTypeModel {
  id: any;
  name: string;
  experiences: ExperienceModel[];

  get link() {
    return `#`;
  }

  linkURL( id:number ){
    return `./experiences-listing/detail?id=${id}`
  }
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
