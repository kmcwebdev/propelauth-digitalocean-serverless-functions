import { wrapFunction } from "do-functions";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sample(args: Record<string, any>) {
  if (args.http.method !== "POST") {
    throw new Error("Method not allowed");
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
      success: false,
      statusCode: 400,
      data: null,
      message: validateSchema.error.errors[0]?.message,
    };
  }

  return args;
}

export const main = wrapFunction(sample);
