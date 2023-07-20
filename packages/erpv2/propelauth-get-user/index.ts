import { wrapFunction } from "do-functions";

async function propelAuthGetUser(args: Record<string, any>) {

  console.log(args);

  return "Hello World!";
}

export const main = wrapFunction(propelAuthGetUser);