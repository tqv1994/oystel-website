import { Category } from './category';
import { Base } from './types';
import { UploadFile } from './upload-file';

export type RoomStyle = Base & {
    name: string;
    thumbnail: UploadFile;
    roomStyleType: RoomStyleType;
};

export const roomStyleFieldsFragment = `
fragment roomStyleFields on RoomStyle {
  id
  name
  thumbnail {
      ...uploadFileFields
  }
  roomStyleType {
      ...roomStyleTypeFields
  }
}
`;

export type RoomStyleType = Category;


export const roomStyleTypeFieldsFragment = `
fragment roomStyleTypeFields on RoomStyleType {
    id
    name
  }
`;
