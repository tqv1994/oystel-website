import { Advisor } from "../advisor/type";
import { BaseData } from "../types";

export type Language = BaseData & {
  name: string;
  advisors: Advisor[];
}
