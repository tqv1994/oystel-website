import { Advisor } from "../advisor/type";
import { Base, BaseData } from "../types";

export type SpecialityData = BaseData & {
    name: string;
    advisors: Advisor[];
}

export class Speciality extends Base implements SpecialityData {
  name: string;
  advisors: Advisor[];

  constructor(data: SpecialityData) {
    super(data);
    Object.assign(this, data);
  }
}
