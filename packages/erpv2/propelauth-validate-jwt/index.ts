import { wrapFunction } from "do-functions";
import { config } from "dotenv";
import * as propelAuth from "@propelauth/node";

config();

const propelauth = propelAuth.initBaseAuth({
  authUrl: process.env.PROPELAUTH_URL ?? "",
  apiKey: process.env.PROPELAUTH_API_KEY ?? "",
  manualTokenVerificationMetadata: {
    issuer: process.env.PROPELAUTH_ISSUER ?? "",
    verifierKey: process.env.PROPELAUTH_VERIFIER_KEY ?? "",
  }
});

async function propelAuthValidateJwt(args: Record<string, any>) {
  const jwt = args.http.headers?.authorization;
  try {
    const user = await propelauth.validateAccessTokenAndGetUser(jwt);
    return user;
  } catch (error) {
    throw new Error(error.message)
  }

}

export const main = wrapFunction(propelAuthValidateJwt);