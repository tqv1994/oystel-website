const uploadFileType = `
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

const productType = `
  id,
  created_at
  updated_at
  brand,
  name,
  description,

  price
  published_at
`;

const dropsType = `
    id
    name
    description
`;

const experience_typeType = `
    id
    created_at
    updated_at
    name
    published_at
`;

const countriesType = `
    id
    created_at
    updated_at
    name
    code
    phone
    published_at
`;

const experienceType = `
    id
    created_at
    updated_at
    name
    description
    intro
    published_at
`;

const destination_typeType = `
    id
    created_at
    updated_at
    name
    published_at
`;

const destinationType = `
    id
    created_at
    updated_at
    name
    description
    location
    intro
    published_at
`;

export {
  dropsType,
  uploadFileType,
  productType,
  experience_typeType,
  experienceType,
  countriesType,
  destination_typeType,
  destinationType,
};
