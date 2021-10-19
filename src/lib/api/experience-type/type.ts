import { ExperienceModel } from "$lib/models/experience";
import { Experience } from "../experience/type";
import { Base, BaseData } from "../types";

export type ExperienceTypeData = BaseData & {
  name: string;
  experiences: Experience[];
};

export class ExperienceType extends Base implements ExperienceTypeData {
  name: string;
  experiences: Experience[];

  constructor(data: ExperienceTypeData) {
    super(data);
    Object.assign(this, data);
  }

  get url(){
    return '#';
  }
}
