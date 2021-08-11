export type UserModel = {
  username: string
  forenames?: string
  surname?: string
  displayName?: string
  phoneNumber?: string
  location?: string
  birthday?: Date
  height?: number
  weight?: number
  notes?: string
  email?: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: RoleModel
  destinationLikes?: DestinationLikeModel[]
  experienceLikes?: ExperienceLikeModel[]
  productLikes?: ProductLikeModel[]
  myAdvisors?: MyAdvisorModel[]
  advisorMe?: AdvisorModel
}

export type AdvisorModel = {
  bio?: string
  accept?: boolean
  countries?: number[]
  destinations?: number[]
  experiences: number[]
  myUsers?: MyUserModel
  agency: AgencyModel
}

export type AgencyModel = {
  displayName: string
  legalName?: string
  description?: string
  advisors?: AdvisorModel[]
}

export type RoleModel = {
  name: string
  description?: string
  type: string
}

export type DestinationLikeModel = {
  id: number
  name: string
}

export type ExperienceLikeModel = {
  id: number
  name: string
}

export type ProductLikeModel = {
  id: number
  name: string
}

export type MyUserModel = {
  id: number
  name: string
}

export type MyAdvisorModel = {
  id: number
  name: string
}

export type AuthData = {
  token: string
}

export enum AgencyType {
  individual,
  company,
}

export type AgencyApplicationForm1 = {
  name: string
  type: AgencyType
  
}

export type AgencyApplicationForm3 = {
  description: string
}