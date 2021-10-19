export type MeiliSearchQueryParams = {
    q: string;
    params: MeiliSearchQueryParamOptions;
}

export type MeiliSearchQueryParamOptions = {
    offset?: number,
    limit?: number,
    filter: any,
    facetsDistribution?: any,
    attributesToRetrieve?: string[],
    attributesToCrop?: any,
    cropLength?: number,
    attributesToHighlight?: any,
    matches?: boolean,
    sort?: any
}