export const commonQuery = {
    uploadFileQuery: `
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
        `,
    productQuery: `
        id,
        created_at
        updated_at
        brand,
        title,
        body,
        price
        published_at
        `,
    dropsQuery: `
        id
        title
        body
    `,
    experience_typeQuery: `
        id
        created_at
        updated_at
        title
        published_at
        `,
    countriesQuery: `
        id
        created_at
        updated_at
        name
        code
        phone
        published_at
        `,

    experienceQuery: `
        id
        created_at
        updated_at
        title
        body
        intro
        published_at
        `,
    destination_typeQuery: `
        id
        created_at
        updated_at
        title
        published_at
    `,
    destinationQuery: `
        id
        created_at
        updated_at
        name
        body
        location
        intro
        published_at
    `
}