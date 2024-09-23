import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT,
  PROJECT_ID,
  APY_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCKOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();
client
  .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
  .setProject(PROJECT_ID!)
  .setKey(APY_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
