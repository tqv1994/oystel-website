import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { DropModel } from './drop';
import { cmsUrlPrefix } from '$lib/env';

export class ProductModel {
  id: any;
  name: string;
  brand: string;
  description: string;
  price: string;
  gallery: any[];
  drops: DropModel[];
  intro: string;

  get featuredPhoto() {
    const apiConfig = new ApiConfig();
    let photo = '';
    if (this.gallery.length > 0) {
      photo = new GalleryModel(this.gallery[0]).url;
    }
    if (photo.indexOf(cmsUrlPrefix) < 0) {
      photo = cmsUrlPrefix + photo;
    }
    return photo;
  }

  getImagesUrl(type = 'default') {
    let photos: string[] = [];
    if (this.gallery.length > 0) {
      this.gallery.map((item) => {
        switch (type) {
          case 'small':
            photos.push(new GalleryModel(item).formats.small.url);
            break;
          case 'medium':
            photos.push(new GalleryModel(item).formats.medium.url);
            break;
          case 'thumbnail':
            photos.push(new GalleryModel(item).formats.thumbnail.url);
            break;
          default:
            photos.push(new GalleryModel(item).url);
            break;
        }
      });
    }
    return photos;
  }

  get link() {
    return '#';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
