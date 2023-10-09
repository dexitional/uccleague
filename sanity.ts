import imageUrlBuilder from '@sanity/image-url'
import { createClient } from "next-sanity";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kcud4yuh",
  apiVersion: "2023-10-08",
  useCdn: process.env.NODE_ENV === "production"
}

export const sanityClient = createClient(config); // Make Fetch Query to Sanity CMS
export const urlFor = (source: any) => imageUrlBuilder(config).image(source); // Extract Image Url
//export const useCurrentUser = createCurrentUserHook(config); // Use Current LoggedIn User 
/*
skBhcR5t4OlNwbXF3dMxoPOXcImjv4qLSl5sqPvCecPpidiLNXCR1lgjduTRJoCmXPruDF2IylPatYeRY0kwQPy9hVGCEjRAfbUSx6Dflm66jfFNtrrYxG1islScqOeyCfrI5fKoWaKoJvJezEnCFXRuneuNslcfXwKU9v2cE6tdF1HywvCk
*/