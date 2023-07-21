var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/packages/propelauth/validate-jwt/index.ts
var validate_jwt_exports = {};
__export(validate_jwt_exports, {
  main: () => main
});
module.exports = __toCommonJS(validate_jwt_exports);
var import_dotenv = require("dotenv");
var propelAuth = __toESM(require("@propelauth/node"));
(0, import_dotenv.config)();
var propelauth = propelAuth.initBaseAuth({
  authUrl: process.env.PROPELAUTH_URL ?? "",
  apiKey: process.env.PROPELAUTH_API_KEY ?? "",
  manualTokenVerificationMetadata: {
    issuer: process.env.PROPELAUTH_ISSUER ?? "",
    verifierKey: process.env.PROPELAUTH_VERIFIER_KEY ?? ""
  }
});
async function main(args) {
  const jwt = args.http.headers?.authorization;
  try {
    const user = await propelauth.validateAccessTokenAndGetUser(jwt);
    return {
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        data: user
      }
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: {
        success: false,
        statusCode: 401,
        data: null,
        message: "Unauthorized"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
