import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { DestinationModel } from './destination';

export class DestinationTypeModel {
  id: any;
  name: string;
  destinations: DestinationModel[];

  get link() {
    return '#';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
