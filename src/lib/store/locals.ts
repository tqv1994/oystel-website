import { User } from "./auth";
import { Metadata } from "./metadata";

export type Locals = {
  user?: User;
  metadata: Metadata;
};
