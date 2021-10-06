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
  title,
  body,
  price
  published_at
`;


const dropsType = `
    id
    title
    body
`;

const experience_typeType = `
    id
    created_at
    updated_at
    title
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
    title
    body
    intro
    published_at
`;

const destination_typeType = `
    id
    created_at
    updated_at
    title
    published_at
`;

const destinationType = `
    id
    created_at
    updated_at
    name
    body
    location
    intro
    published_at
`;


export{
    dropsType,
    uploadFileType,
    productType,
    experience_typeType,
    experienceType,
    countriesType,
    destination_typeType,
    destinationType
}