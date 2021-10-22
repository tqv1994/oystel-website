import { Country, CountryData } from '../country/type';
import { Linkable } from '../linkable';
import { FileUpload, FileUploadData } from '../file-upload/type';
import { BaseData, PublishableBase, PublishBaseData } from '../types';
import { stringHelper } from '$lib/helpers';
import { User } from '../auth/type';

export type ExperienceData = BaseData &
  PublishBaseData & {
    name: string;
    description: string;
    intro: string;
    type: string;
    gallery: FileUploadData[];
    videos: FileUploadData[];
    country: CountryData;
    liked: boolean;
    users: User[];
  };

export class Experience
  extends PublishableBase
  implements ExperienceData, Linkable
{
  name: string;
  description: string;
  intro: string;
  type: string;
  gallery: FileUpload[];
  videos: FileUpload[];
  country: CountryData;
  liked: boolean;
  users: User[];

  constructor(data: ExperienceData) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.intro = data.intro ? data.intro : '';
    this.type = data.type;
    this.gallery = FileUpload.fromData(data.gallery);
    this.videos = FileUpload.fromData(data.videos);
    this.country = data.country;
    this.users = data.users;
    this.liked = data.liked ? data.liked : false;
  
  }

  get url() {
    return `/experiences-listing/${stringHelper.stringToSlug(this.name)}-${this.id}`;
  }

  get descriptionSections() {
    if(this.description){
      return this.description.split('\n\n\n');
    }else{
      return [];
    }
  }

  get excerpt() {
    const maxLength = 90; // maximum number of characters to extract
    if(this.intro.length <= maxLength) return this.intro;
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
}
