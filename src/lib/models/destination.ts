import { GalleryModel } from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { CountryModel } from './country';
import { cmsUrlPrefix } from '$lib/env';
import { stringHelper } from '$lib/helpers';

export class DestinationModel {
  id: any;
  name: string;
  intro: string;
  type: string;
  gallery: GalleryModel[];
  videos: string[];
  description: string;
  country: CountryModel;
  liked: boolean;

  get featuredPhoto() {
    const apiConfig = new ApiConfig();
    let photo = '';
    if (this.gallery && this.gallery.length > 0) {
      photo = new GalleryModel(this.gallery[0]).url;
    }
    if (photo.indexOf(cmsUrlPrefix) < 0) {
      photo = cmsUrlPrefix + photo;
    }
    return photo;
  }

  get featuredPhotoWithHash() {
    const apiConfig = new ApiConfig();
    let photo: GalleryModel = new GalleryModel();
    let photoUrl = '';
    if (this.gallery && this.gallery.length > 0) {
      photo = new GalleryModel(this.gallery[0]);
    }
    if (photo.url.indexOf(cmsUrlPrefix) < 0) {
      photoUrl = cmsUrlPrefix + photo.url;
    }
    return {
      url: photoUrl,
      blurHash: photo.blurHash,
    };
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

  get imageUrlWithHashs() {
    let photos: {
      url: string;
      blurHash?: string;
    }[] = [];
    if (this.gallery.length > 0) {
      this.gallery.map((item) => {
        item = new GalleryModel(item);
        if (item.url.indexOf(cmsUrlPrefix) < 0) {
          item.url = cmsUrlPrefix + item.url;
        }
        photos.push({ url: item.url, blurHash: item.blurHash });
      });
    }
    return photos;
  }

  get link() {
    if (!this.name) {
      return '#';
    }
    return (
      '/destination/' + stringHelper.stringToSlug(this.name) + '-' + this.id
    );
  }

  get excerpt() {
    const maxLength = 90; // maximum number of characters to extract

    //trim the string to the maximum length
    const trimmedString = this.intro
      .replace(/<[^>]*>?/gm, '')
      .substr(0, maxLength);
    return (
      trimmedString.substring(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
      ) + '...'
    );
  }

  get country_title() {
    return this.country ? this.country.name : '';
  }

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
