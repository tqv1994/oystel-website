import { Advisor } from "./advisor";
import { Destination } from "./destination";
import { Document } from "./document";
import { Insurance } from "./insurance";
import { Traveller } from "./traveller";
import { Base } from "./types";

export type Trip = Base & {
    lead_traveller: Traveller;
    advisor:Advisor;
    description: string;
    note: string;
    state: string;
    reference: string;
    depart_at: string;
    return_at: string;
    destinations: Destination[];
    travellers: Traveller[];
    budget: number;
    vaccinated: boolean;
    documents:Document[];
    insurances:Insurance[];
    emergencyName: string;
    emergencyPhone: string;
    emergencyRole: string;
    emergencyReference: string;
}

export class TripInput {
    lead_traveller: string // ID
    advisor: string // ID
    description: string
    note: string
    state: string
    reference: string
    depart_at: string | Date
    return_at: string | Date
    destinations: string[] // ID[]
    currency: string
    budget: number
    vaccinated: boolean
    documents: string[] // ID[]
    insurances: string[] // ID[]
    travellers: string[] // ID[]
    published_at: string | Date
    emergencyName: string;
    emergencyPhone: string;
    emergencyRole: string;
    emergencyReference: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export const convertTripToInput = (trip: Trip): TripInput => {
    let result: TripInput;
    const data: any = { ...trip };
    data.lead_traveller = (trip.lead_traveller?.id || '') + "";
    data.advisor = trip.advisor.id;
    data.destinations = trip.destinations?.map((destination) => destination.id);
    data.documents = trip.documents.map((item) => item.id);
    data.insurances = trip.insurances.map((item) => item.id);
    data.travellers = trip.travellers.map((item) => item.id);
    delete data.id;
    delete data.updated_at
    delete data.__typename;
    result = new TripInput(data);
    return result;
}

export enum ENUM_TRIP_STATE{
    enquired = "enquired",
    planning = "planning",
    progressing = "progressing",
    completed = "completed",
}

export const ENUM_TRIP_STATE_LABEL = {
    enquired: "Enquired",
    planning: "Planning",
    progressing: "Progressing",
    completed: "Completed",
}

export const tripFieldsFragment = `
fragment tripFields on Trip{
    id
    lead_traveller{
        ...travellerFields
    }
    advisor{
       id
       name
    }
    description
    note
    state
    reference
    depart_at
    return_at
    destinations{
        ...destinationFields
    }
    travellers{
        ...travellerFields
    }
    documents{
        ...documentFields
    }
    insurances{
        ...insuranceFields
    }
    budget
    vaccinated
    emergencyName
    emergencyPhone
    emergencyRole
    emergencyReference
}
`;