import { Country } from "../country/type";
import { BaseData } from "../types";

export type Address = BaseData & {
  line1: string;
  line2: string;
  locality: string;
  city: string;
  country: Country;
  province: string;
}
