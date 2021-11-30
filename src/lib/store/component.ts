import { Identifiable, Nameable } from './types';

export type ComponentBase = Identifiable &
  Nameable & {
    __typename: string;
  };

export type GalleryComponentBase = ComponentBase & {
  headline?: string;
  prominent: boolean;
  vertical: boolean;
  columns: number;
};
