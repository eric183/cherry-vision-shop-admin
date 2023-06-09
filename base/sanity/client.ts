import { createClient } from "next-sanity";
import { resolve } from "path";

const sanityToken = process.env.NEXT_PUBLIC_SANITY_TOKEN;
const sanityProjectID = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const sanityURL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
const useCDN = process.env.NEXT_PUBLIC_CDN === "cdn" ? true : false;

const sanityClient = createClient({
  projectId: sanityProjectID,
  dataset: sanityDataset,
  apiVersion: "2021-10-21",
  useCdn: useCDN,
});

const sanityMutationClient = async (data: any) => {
  const response = await fetch(
    `${sanityURL}/?returnIds=true&returnDocuments=true`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${sanityToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).catch((error) => {
    resolve(error.message);
    console.log(error.message);
  });

  if (!response) return;
  return await response.json();
};

export { sanityMutationClient, sanityClient };
