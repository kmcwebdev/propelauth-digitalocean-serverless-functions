var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/packages/sample/sample/index.ts
var sample_exports = {};
__export(sample_exports, {
  main: () => main
});
module.exports = __toCommonJS(sample_exports);
var import_zod = require("zod");
async function main(args) {
  if (args.http.method !== "POST") {
    throw new Error("Method not allowed");
  }
  const schema = import_zod.z.object({
    name: import_zod.z.string({
      description: "Name of the user",
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    }).min(1, {
      message: "Name must be at least 1 character long"
    })
  });
  const validateSchema = await schema.safeParseAsync(args?.body);
  if (!validateSchema.success) {
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 400,
      body: {
        success: false,
        statusCode: 400,
        data: null,
        message: validateSchema.error.errors[0]?.message
      }
    };
  }
  return {
    statusCode: 200,
    body: {
      message: `Hello ${args.body.name}`
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
