import { AdvisorModel } from "$lib/types";

export class LanguageModel{
    title: string;
    advisors: AdvisorModel[];
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}