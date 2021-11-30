import { Traveller } from './traveller';
import { UploadFile } from './upload-file';

export type Identification = {
    id: number;
    created_at?: string;
    updated_at?: string;
    type: string;
    documentId: string;
    country: string;
    front: UploadFile;
    expiry: string;
    traveller: Traveller;
    published_at: string;
    back: UploadFile[];
}

export const identificationFieldsFragment = `
fragment identificationFields on Identification {
  id,
  type,
  documentId,
  country {
      ...countryFields
  },
  front {
      ...uploadFileFields
  },
  expiry,
  back{
    ...uploadFileFields
  }
}
`;
