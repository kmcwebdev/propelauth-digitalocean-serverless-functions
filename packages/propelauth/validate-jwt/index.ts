import { config } from "dotenv";
import * as propelAuth from "@propelauth/node";

config();

const propelauth = propelAuth.initBaseAuth({
  authUrl: process.env.PROPELAUTH_URL ?? "",
  apiKey: process.env.PROPELAUTH_API_KEY ?? "",
  manualTokenVerificationMetadata: {
    issuer: process.env.PROPELAUTH_ISSUER ?? "",
    verifierKey: process.env.PROPELAUTH_VERIFIER_KEY ?? "",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(args: Record<string, any>) {
  const jwt = args.http.headers?.authorization;
  try {
    const user = await propelauth.validateAccessTokenAndGetUser(jwt);
    return {
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        data: user,
      },
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: {
        success: false,
        statusCode: 401,
        data: null,
        message: "Unauthorized",
      },
    };
  }
}
