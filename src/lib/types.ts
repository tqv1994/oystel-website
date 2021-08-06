export type UserType = {
  username: string
  forenames?: string
  surname?: string
  displayName?: string
  phoneNumber?: string
  location?: string
  birthday?: Date
  height?: Number
  weight?: Number
  notes?: string
  email?: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: RoleType
  destinationLikes?: DestinationLikeType[]
  experienceLikes?: ExperienceLikeType[]
  productLikes?: ProductLikeType[]
  myAdvisors?: MyAdvisorType[]
  advisorMe?: AdvisorType
}

export type AdvisorType = {
  bio?: string
  accept?: boolean
  countries?: number[]
  destinations?: number[]
  experiences: number[]
  myUsers?: MyUserType
  agency: AgencyType
}

export type AgencyType = {
  displayName: string
  legalName?: string
  description?: string
  advisors?: AdvisorType[]
}

export type RoleType = {
  name: string
  description?: string
  type: string
}

export type DestinationLikeType = {
  id: number
  name: string
}

export type ExperienceLikeType = {
  id: number
  name: string
}

export type ProductLikeType = {
  id: number
  name: string
}

export type MyUserType = {
  id: number
  name: string
}

export type MyAdvisorType = {
  id: number
  name: string
}

export type AuthData = {
  token: string
}
