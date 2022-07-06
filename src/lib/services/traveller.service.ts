import type { Traveller, TravellerInput } from '$lib/store/traveller';
import type { updateTravellerData } from 'src/routes/traveller/update-me.json';

export const getTravellerService = async (
  id: string | number,
): Promise<Traveller> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/traveller/${id}.json`);
    if (res.ok) {
      const data: Traveller = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};

export const updateTravellerService = async (
  id: string | number,
  input: TravellerInput,
): Promise<Traveller> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/traveller/update-${id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...input,
      }),
    });
    if (res.ok) {
      const data: Traveller = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};

export const updateTravellerMeService = async (
  input: TravellerInput,
): Promise<Traveller> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/traveller/update-me.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...input,
      }),
    });
    if (res.ok) {
      const data: updateTravellerData = await res.json();
      resolve(data.updateTraveller.traveller);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};
