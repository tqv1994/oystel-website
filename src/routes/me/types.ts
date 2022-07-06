import type { UploadFile } from '$lib/store/upload-file';

export type Advisor = {
  name: string;
  phone: string;
  email: string;
  tripDate: string;
  numberOpenTrips: number;
  numberPastTrips: number;
  avatar: UploadFile;
};
