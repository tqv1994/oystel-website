import { Exhibitable } from "$lib/store/types";
import { UploadFile } from "$lib/store/upload-file";

export type MainNavItem = {
  name: string;
  url: string;
  children?: (Exhibitable | SubNavItem)[];
};

export type SubNavItem = {
  name: string;
  description: string;
  url: string;
  gallery: UploadFile[];
}