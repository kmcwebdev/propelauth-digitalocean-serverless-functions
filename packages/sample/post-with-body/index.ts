/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export async function main(args: Record<string, any>) {
  if (args.http.method !== "POST") {
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

  const schema = z.object({
    name: z
      .string({
        description: "Name of the user",
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, {
        message: "Name must be at least 1 character long",
      }),
  });

  const validateSchema = await schema.safeParseAsync(args?.body);

  if (!validateSchema.success) {
    return {
      statusCode: 400,
      body: {
        success: false,
        statusCode: 400,
        data: null,
        message: validateSchema.error.errors[0]?.message,
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      success: true,
      statusCode: 200,
      data: `Hello ${args.body.name}`,
    },
  };
}
