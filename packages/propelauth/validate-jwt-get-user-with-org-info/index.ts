import { z } from "zod";
import { collectProperties } from "../../../utils/collectProperties";
import { propelauth } from "../../../utils/propelauth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const properties = ["orgName"];

  const params = collectProperties(args, properties);

  const schema = z.object({
    orgName: z
      .enum(["KMC Solutions", "KMC Community"], {
        description: "The name of the organization",
        invalid_type_error: "Organization name must be a string",
      })
      .default("KMC Solutions"),
  });

  try {
    const query = await schema.safeParseAsync(params);

    if (!query.success) {
      return {
        statusCode: 400,
        body: {
          success: false,
          statusCode: 400,
          data: null,
          message: query.error.errors[0]?.message,
        },
      };
    }

    const propelauthUser =
      await propelauth.validateAccessTokenAndGetUserWithOrgInfo(jwt, {
        orgName: query.data.orgName,
      });

    return {
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        data: {
          user: {
            userId: propelauthUser.user.userId,
            email: propelauthUser.user.email,
            firstName: propelauthUser.user.firstName,
            lastName: propelauthUser.user.lastName,
            username: propelauthUser.user.username,
          },
          orgData: propelauthUser.orgMemberInfo,
        },
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
