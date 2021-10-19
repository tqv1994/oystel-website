export const uploadFileQuery = `
  id
  created_at
  updated_at
  name
  alternativeText
  caption
  blurHash
  width
  height
  formats
  hash
  ext
  mime
  size
  url
  previewUrl
  provider
`;

export const productQuery = `
  id,
  created_at
  updated_at
  brand,
  name,
  description,

  price
  published_at
`;

export const dropsQuery = `
  id
  name
  description
`;

export const experienceTypeQuery = `
  id
  created_at
  updated_at
  name
  published_at
`;

export const countriesQuery = `
  id
  created_at
  updated_at
  name
  code
  phone
  published_at
`;

export const experienceQuery = `
  id
  created_at
  updated_at
  name
  description
  intro
  published_at
`;

export const destinationTypeQuery = `
  id
  created_at
  updated_at
  name
  published_at
`;

export const destinationQuery = `
  id
  created_at
  updated_at
  name
  description
  location
  intro
  published_at
`;

export const menuQuery = `
  id
  created_at
  updated_at
  name
  link
  order
  slug
  published_at
`;

export const tagQuery = `
  id
  created_at
  updated_at
  name
  slug
  id_relative
  published_at
`;


export const experiencesQuery = `
  id,
  name,
  description,

  experience_type{
    id,
    name,
    created_at,
    updated_at,
  },
  intro,
  type,
  gallery{
    id,
    url,
    caption,blurHash,
    width,height,
    formats,
    created_at,
    updated_at
  },
  videos{
    id,
    url,
    caption,blurHash,
    width,height,
    formats,
    created_at,
    updated_at
  },
  # users,
  created_at,
  updated_at,
`

