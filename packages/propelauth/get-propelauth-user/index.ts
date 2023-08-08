/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { propelauth } from "../../../utils/propelauth";
import { collectProperties } from "../../../utils/collectProperties";

export async function main(args: Record<string, any>) {
  const jwt = args.http.headers?.authorization;
  const properties = ["orgName", "userId"];
  const CAN_MANAGE_USERS = "erp::can_manage_users";
  const INCLUDE_ORGANIZATIONS = true;

  const params = collectProperties(args, properties);

  const schema = z.object({
    orgName: z
      .enum(["KMC Solutions", "KMC Community"], {
        description: "The name of the organization",
        invalid_type_error: "Organization name must be a string",
      })
      .default("KMC Solutions"),
    userId: z
      .string({
        description: "The userId to check",
        required_error: "User id is required",
        invalid_type_error: "User id must be a string",
      })
      .uuid({
        message: "User id must be a valid UUID",
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

    await propelauth.validateAccessTokenAndGetUserWithOrgInfoWithPermission(
      jwt,
      { orgName: query.data.orgName },
      CAN_MANAGE_USERS
    );

    const propelauthUser = await propelauth.fetchUserMetadataByUserId(
      query.data.userId,
      INCLUDE_ORGANIZATIONS
    );

    return {
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        data: propelauthUser,
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
