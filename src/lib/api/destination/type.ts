import { Country } from "../country/type";
import { Linkable } from "../linkable";
import { FileUpload, FileUploadData } from "../file-upload/type";
import { BaseData, PublishableBase, PublishBaseData } from "../types";
import { stringHelper } from '$lib/helpers';
import { User } from "../auth/type";

export type DestinationData = BaseData & PublishBaseData & {
  name: string;
  intro: string;
  type: string;
  gallery: FileUploadData[];
  videos: FileUploadData[];
  description: string;
  country: Country;
  users: User[];
  liked: boolean;
}

export class Destination extends PublishableBase implements DestinationData, Linkable {
  name: string;
  intro: string;
  type: string;
  gallery: FileUpload[];
  videos: FileUploadData[];
  description: string;
  country: Country;
  users: User[];
  liked: boolean;

  constructor(data: DestinationData) {
    super(data);
    this.name = data.name;
    this.intro = data.intro ? data.intro : "";
    this.type = data.type;
    this.gallery = FileUpload.fromData(data.gallery);
    this.videos = FileUpload.fromData(data.videos);
    this.description = data.description;
    this.country = data.country;
    this.users = data.users;
    this.liked = data.liked ? data.liked : false;
    }

  get url() {
    return `/destination/${stringHelper.stringToSlug(this.name)}-${this.id}`;
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
