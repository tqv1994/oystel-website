import { AdvisorModel } from '$lib/types';

export class LanguageModel {
  name: string;
  advisors: AdvisorModel[];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
