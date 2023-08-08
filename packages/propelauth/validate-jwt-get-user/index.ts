import { propelauth } from "../../../utils/propelauth";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function main(args: Record<string, any>) {
  if (args.http.method !== "GET") {
    return {
      statusCode: 405,
      body: {
        success: false,
        statusCode: 405,
        data: null,
        message: "Method not allowed",
      },
    };
  }

  const jwt = args.http.headers?.authorization;
  try {
    const propelauthUser = await propelauth.validateAccessTokenAndGetUser(jwt);

    return {
      statuCode: 200,
      body: {
        success: true,
        statusCode: 200,
        user: propelauthUser,
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
