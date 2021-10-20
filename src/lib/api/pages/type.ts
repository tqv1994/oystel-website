import { Country } from "$lib/api/country/type"
import { Destination } from "../destination/type";
import { DestinationType } from "../destination-type/type"
import { DropData } from "../drop/type";
import { Experience } from "../experience/type";
import { ExperienceType } from "../experience-type/type";
import { Speciality } from "../specialty/type";
import { Advisor } from "../advisor/type";
import { Product } from "../product/type";

export type MetadataData = {
  countries: Country[];
  destinationTypes: DestinationType[];
  experienceTypes: ExperienceType[];
  specialties: Speciality[];
}

export type HomePageData = {
  drops: DropData[];
  experiences: Experience[];
  destinations: Destination[];
};

export type ExperiencesData = {
  experienceTypes: ExperienceType[];
}

export type ExperiencesSearchData = {
  experiences: Experience[];
}

export type  ExperiencePageData = {
  products: Product[];
  experience:  Experience;
  experiences: Experience[];
};

export type UpdateExperienceData = {
  updateExperience: {
    experience: Experience;
  }
}

export type DestinationData = {
  destinationTypes: DestinationType[];
}

export type DestinationsSearchData = {
  destinations: Destination[];
}

export type DestinationPageData = {
  products: Product[];
  destination:  Destination;
  experiences: Experience[];
};

export type UpdateDestinationData = {
  updateDestination: {
    destination: Destination;
  }
}

export type AdvisorsPageData = {
  advisors: Advisor[];
};

export type AdvisorPageData = {
  advisor: Advisor;
};

export type UpdateProductData = {
  updateProduct: {
    product: Product;
  }
}

export type SearchResultsPageData = {
  destinations: Destination[]|any[];
  experiences: Experience[]|any[];
}