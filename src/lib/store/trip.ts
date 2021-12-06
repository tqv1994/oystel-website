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