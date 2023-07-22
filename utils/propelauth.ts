import { config } from "dotenv";
import * as propelAuth from "@propelauth/node";

config();

export const propelauth = propelAuth.initBaseAuth({
  authUrl: process.env.PROPELAUTH_URL ?? "",
  apiKey: process.env.PROPELAUTH_API_KEY ?? "",
  manualTokenVerificationMetadata: {
    issuer: process.env.PROPELAUTH_ISSUER ?? "",
    verifierKey: process.env.PROPELAUTH_VERIFIER_KEY ?? "",
  },
});
