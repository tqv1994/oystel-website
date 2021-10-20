import { Linkable } from "../linkable";
import { FileUpload, FileUploadData } from "../file-upload/type";
import { BaseData, PublishableBase } from "../types";
import { User } from "../auth/type";

export type ProductData = BaseData & PublishableBase & {
  name: string;
  brand: string;
  description: string;
  price: string;
  gallery: FileUploadData[];
  intro: string;
  liked?: boolean;
  users: User[];
}

export class Product extends PublishableBase implements ProductData, Linkable {
  name: string;
  brand: string;
  description: string;
  price: string;
  gallery: FileUpload[];
  intro: string;
  liked?: boolean;
  users: User[];

  constructor(data: ProductData) {
    super(data);
    Object.assign(this, data);
    this.liked = data.liked ? data.liked : false;
  }

  get url() {
    return `/experiences/${this.id}`;
  }

  static fromData(items: ProductData[]) {
    if (!items || !items.length) {
      return [];
    }
    return items.map((item) => new Product(item));
  }
}
