export const isDev = process.env.NEXT_PUBLIC_ENV === 'development'
export const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const sanityDataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET
export const firebaseApiKey = process.env.NEXT_PUBLIC_API_KEY
export const firebaseAuthDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN
export const firebaseStorageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET
export const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
export const firebaseAppId = process.env.NEXT_PUBLIC_APP_ID
export const firebaseProjectId = process.env.NEXT_PUBLIC_PROJECT_ID
export const emailServiceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID
export const emailPublicKey = process.env.NEXT_PUBLIC_EMAIL_KEY
