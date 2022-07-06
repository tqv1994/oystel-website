import type { Advisor } from './advisor';
import type { Kind } from './category';
import type { Currency } from './currency';
import type { Destination } from './destination';
import type { Document } from './document';
import type { Experience } from './experience';
import type { Insurance } from './insurance';
import type { Traveller } from './traveller';
import type { Base } from './types';

export type Trip = Base & {
  lead_traveller: Traveller;
  advisor: Advisor;
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
  documents: Document[];
  insurance: Insurance;
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
  experienceTypes?: Kind[];
  travelGroupTypes?: Kind[];
  lodgingTypes?: Kind[];
  roomStyles?: Kind[];
  currency?: Currency;
  destinationTypes?: Destination[];
  roomPreferences?: Kind[];
};

export class TripInput {
  lead_traveller: string; // ID
  advisor: string; // ID
  description: string;
  note: string;
  state: string;
  reference: string;
  depart_at: string | Date;
  return_at: string | Date;
  destinations: string[]; // ID[]
  currency: string;
  budget: number;
  vaccinated: boolean;
  documents: string[]; // ID[]
  insurance: string; // ID
  travellers: string[]; // ID[]
  published_at: string | Date;
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
  experienceTypes: string[]; // ID[]
  travelGroupTypes: string[]; // ID[]
  lodgingTypes: string[]; // ID[]
  roomStyles: string[]; // ID []
  destinationTypes: string[]; // ID[]
  roomPreferences: string[]; //ID[]
  nightlyBudget: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.experienceTypes = this.experienceTypes || [];
    this.travelGroupTypes = this.travelGroupTypes || [];
    this.lodgingTypes = this.lodgingTypes || [];
    this.roomStyles = this.roomStyles || [];
    this.destinationTypes = this.destinationTypes || [];
    this.roomPreferences = this.roomPreferences || [];
  }
}

export const convertTripToInput = (trip: Trip): TripInput => {
  let result: TripInput;
  const data: any = { ...trip };
  data.lead_traveller = (trip.lead_traveller?.id || '') + '';
  data.advisor = trip.advisor.id;
  data.destinations = trip.destinations?.map((destination) => destination.id);
  data.documents = trip.documents.map((item) => item.id);
  data.insurance = trip.insurance;
  data.travellers = trip.travellers.map((item) => item.id);
  data.experienceTypes = (trip.experienceTypes || []).map((item) => item.id + '');
  data.travelGroupTypes = (trip.travelGroupTypes || []).map(
    (item) => item.id + '',
  );
  data.lodgingTypes = (trip.lodgingTypes || []).map((item) => item.id + '');
  data.roomStyles = (trip.roomStyles || []).map((item) => item.id + '');
  data.currency = trip.currency?.id || '';
  data.destinationTypes = (trip.destinationTypes || []).map(
    (item) => item.id + '',
  );
  data.roomPreferences = (trip.roomPreferences || []).map(
    (item) => item.id + '',
  );
  delete data.id;
  delete data.updated_at;
  delete data.__typename;
  result = new TripInput(data);
  return result;
};

export enum ENUM_TRIP_STATE {
  new_enquiry = 'new_enquiry',
  enquired = 'enquired',
  planning = 'planning',
  progressing = 'progressing',
  completed = 'completed',
  rejected = 'rejected',
  confirmed = 'confirmed',
  travelling = 'travelling',
  returned = 'returned',
  canceled = 'canceled',
}

export const ENUM_TRIP_STATE_LABEL = {
  new_enquiry: 'New Enquiry',
  enquired: 'Enquired',
  planning: 'Planning',
  progressing: 'Progressing',
  completed: 'Completed',
  rejected: 'Rejected',
  confirmed: 'Confirmed',
  travelling: 'Travelling',
  returned: 'Returned',
  canceled: 'Canceled',
};

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
    insurance{
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
    travelGroupTypes{
        ...travelGroupTypeFields
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
