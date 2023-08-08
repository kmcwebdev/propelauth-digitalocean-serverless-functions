import { z } from "zod";
import { collectProperties } from "../../../utils/collectProperties";
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
  const properties = ["orgName", "permission"];

  const params = collectProperties(args, properties);

  const schema = z.object({
    orgName: z
      .enum(["KMC Solutions", "KMC Community"], {
        description: "The name of the organization",
        invalid_type_error: "Organization name must be a string",
      })
      .default("KMC Solutions"),
    permission: z
      .string({
        description: "The permission to check",
        required_error: "Permission is required",
        invalid_type_error: "Permission must be a string",
      })
      .min(1, {
        message: "Permission must be at least 1 character",
      }),
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
      await propelauth.validateAccessTokenAndGetUserWithOrgInfoWithPermission(
        jwt,
        { orgName: query.data.orgName },
        query.data.permission
      );

    return {
      statusCode: 200,
      body: {
        user: {
          userId: propelauthUser.user.userId,
          email: propelauthUser.user.email,
          firstName: propelauthUser.user.firstName,
          lastName: propelauthUser.user.lastName,
          username: propelauthUser.user.username,
        },
        orgData: propelauthUser.orgMemberInfo,
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
