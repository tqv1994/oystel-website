import { Identifiable } from "./types";
import { UploadFile } from "./upload-file";

export type Insurance = Identifiable & {
    policyId: string;
    documents: UploadFile[];
    website: string;
    contact: string;
}

export const insuranceFieldsFragment = `
fragment insuranceFields on Insurance{
    id
    policyId
    website
    contact
    documents{
        ...uploadFileFields
    }
}
`