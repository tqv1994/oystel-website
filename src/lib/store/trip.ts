import { Advisor } from "./advisor";
import { Currency } from "./currency";
import { Destination } from "./destination";
import { Document } from "./document";
import { Experience } from "./experience";
import { Insurance } from "./insurance";
import { LodgingType } from "./lodgingType";
import { RoomPreference } from "./roomPreference";
import { RoomStyle } from "./roomStyle";
import { TravelingWithYou } from "./travelingWithYous";
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
    numberOfNights?: number;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfRoom?: number;
    desiredDestinations?: string;
    lodgingTypeOther?: string;
    needFlights?: boolean;
    travelByFlight?: string;
    travelAnotherWay?: string;
    numberOfTripsInSixMonths?: string;
    experiences?: Experience[];
    travelingWithYous?: TravelingWithYou[];
    lodgingTypes?: LodgingType[];
    roomStyles?: RoomStyle[];
    currency?: Currency;
    destinationTypes?: Destination[];
    roomPreferences?: RoomPreference[];
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
    numberOfNights: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfRoom: number;
    desiredDestinations: string;
    lodgingTypeOther: string;
    needFlights: boolean;
    travelByFlight: string;
    travelAnotherWay: string;
    numberOfTripsInSixMonths: number;
    experiences: string[]; // ID[]
    travelingWithYous: string[]; // ID[]
    lodgingTypes: string[]; // ID[]
    roomStyles: string[]; // ID []
    destinationTypes: string[]; // ID[]
    roomPreferences: string[]; //ID[]

    constructor(values: Object = {}) {
        Object.assign(this, values);
        this.experiences = this.experiences || [];
        this.travelingWithYous = this.travelingWithYous || [];
        this.lodgingTypes = this.lodgingTypes || [];
        this.roomStyles = this.roomStyles || [];
        this.destinationTypes = this.destinationTypes || [];
        this.roomPreferences = this.roomPreferences || [];
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
    data.experiences = (trip.experiences || []).map((item)=>item.id+"");
    data.travelingWithYous = (trip.travelingWithYous || []).map((item)=>item.id+"");
    data.lodgingTypes = (trip.lodgingTypes || []).map((item)=>item.id + "");
    data.roomStyles = (trip.roomStyles || []).map((item) => item.id + "");
    data.currency = trip.currency?.id || '';
    data.destinationTypes = (trip.destinationTypes || []).map((item)=> item.id + "");
    data.roomPreferences = (trip.roomPreferences || []).map((item)=> item.id+"");
    delete data.id;
    delete data.updated_at
    delete data.__typename;
    result = new TripInput(data);
    return result;
}

export enum ENUM_TRIP_STATE{
    new_enquiry = "new_enquiry",
    enquired = "enquired",
    planning = "planning",
    progressing = "progressing",
    completed = "completed",
}

export const ENUM_TRIP_STATE_LABEL = {
    new_enquiry: 'New Enquiry',
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
    numberOfNights
    numberOfAdults
    numberOfChildren
    numberOfRoom
    desiredDestinations
    lodgingTypeOther
    needFlights
    travelByFlight
    travelAnotherWay
    numberOfTripsInSixMonths
    experiences{
        ...experienceFields
    }
    travelingWithYous{
        ...travelingWithYouFields
    }
    lodgingTypes {
        ...lodgingTypeFields
    }
    roomStyles {
        ...roomStyleFields
    }
    currency{
        ...currencyFields
    }
    roomPreferences{
        ...roomPreferenceFields
    }
    destinationTypes{
        ...destinationTypeFields
    }
}
`;