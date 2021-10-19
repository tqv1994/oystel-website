import { Linkable } from "../linkable";
import { FileUpload, FileUploadData } from "../file-upload/type";
import { BaseData, PublishableBase } from "../types";

export type ProductData = BaseData & PublishableBase & {
  name: string;
  brand: string;
  description: string;
  price: string;
  gallery: FileUploadData[];
  intro: string;
}

export class Product extends PublishableBase implements ProductData, Linkable {
  name: string;
  brand: string;
  description: string;
  price: string;
  gallery: FileUpload[];
  intro: string;

  constructor(data: ProductData) {
    super(data);
    Object.assign(this, data);
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
