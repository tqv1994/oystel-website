import { Metadata } from "src/routes/metadata.json";
import { User } from "./auth";

export type Locals = {
  user?: User;
  metadata: Metadata;
};
