import { wrapFunction } from "do-functions";

async function sample() {
  return "Hello World";
}

export const main = wrapFunction(sample);