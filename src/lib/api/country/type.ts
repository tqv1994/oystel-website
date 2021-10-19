import { Linkable } from "../linkable";
import { Base, BaseData } from "../types";

export type CountryData = BaseData & {
  name: string;
  code: string;
  phone?: number;
}
export class Country extends Base implements CountryData, Linkable {
  name: string;
  code: string;
  phone?: number;

  constructor(data: CountryData) {
    super(data);
    Object.assign(this, data);
  }

  get url() {
    return `/countries/${this.id}`;
  }
}
