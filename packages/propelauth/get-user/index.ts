import { wrapFunction } from "do-functions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function propelAuthGetUser(args: Record<string, any>) {
  return args;
}

export const main = wrapFunction(propelAuthGetUser);
