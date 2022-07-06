import type { Advisor } from './advisor';
import type { Destination } from './destination';
import type { Experience } from './experience';

export type Features = {
  destinations: Destination[];
  experiences: Experience[];
  advisors: Advisor[];
};
