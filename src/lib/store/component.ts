import type { Kind } from './category';

export type ComponentBase = Kind & {
  __component: string;
};

export type GalleryComponentBase = ComponentBase & {
  headline?: string;
  prominent: boolean;
  vertical: boolean;
  columns: number;
};
