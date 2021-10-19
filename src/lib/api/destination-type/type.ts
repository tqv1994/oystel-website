// import { DestinationModel } from "$lib/models/destination";
import { Destination } from "../destination/type";
import { Base, BaseData } from "../types";

export type DestinationTypeData = BaseData & {
  name: string;
  destinations: Destination[];
};

export class DestinationType extends Base implements DestinationTypeData {
  name: string;
  destinations: Destination[];

  constructor(data: DestinationTypeData) {
    super(data);
    Object.assign(this, data);
  }

  get url(){
    return '#';
  }
}
