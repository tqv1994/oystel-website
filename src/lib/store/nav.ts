import { Advisor } from "./advisor";
import { Destination } from "./destination";
import { Experience } from "./experience";

export type Features = {
  destinations: Destination[];
  experiences: Experience[];
  advisors: Advisor[];
}