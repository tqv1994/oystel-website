import { Identifiable } from "./types";
import { UploadFile } from "./upload-file";

export type Document = Identifiable & {
    type: string;
    documents: UploadFile[];
    description: string;
}

export const docmentFieldsFragment = `
fragment documentFields on Document{
    id
    type
    documents{
        ...uploadFileFields
    }
    description
}
`