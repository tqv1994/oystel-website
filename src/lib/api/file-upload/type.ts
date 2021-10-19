import { Linkable } from "../linkable";
import { PublishableBase, PublishBaseData } from "../types";

export type FileUploadData = PublishBaseData & {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: ImageData;
    medium: ImageData;
    small: ImageData;
  };
  blurHash: string;
  hash: string;
};

export type ImageData = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
};

export class FileUpload extends PublishableBase implements FileUploadData, Linkable {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: ImageData;
    medium: ImageData;
    small: ImageData;
  };
  blurHash: string;
  hash: string;

  constructor(data: FileUploadData) {
    super(data);
    Object.assign(this, data);
  }

  static fromData(items: FileUploadData[]) {
    if (!items || !items.length) {
      return [];
    }
    return items.map((item) => new FileUpload(item));
  }
}
