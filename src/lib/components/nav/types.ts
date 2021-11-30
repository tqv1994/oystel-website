import { Exhibitable } from "$lib/store/types";

export type MainNavItem = {
  name: string;
  url: string;
  children?: Exhibitable[];
};
