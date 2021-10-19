import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { DropModel } from './drop';
import { cmsUrlPrefix } from '$lib/env';

export class TagModel {
  id: any;
  name: string;
  slug: string;
  prefix: string;

  get link() {
    return '#';
  }

  get titleWithPrefix() {
    if (this.title) {
      if (this.prefix && this.title != '') {
        const prefix = this.prefix.replace(
          new RegExp('--', 'g'),
          '&nbsp;&nbsp;&nbsp;&nbsp;',
        );
        return prefix + this.title;
      }
      return this.title;
    }
    return '';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
