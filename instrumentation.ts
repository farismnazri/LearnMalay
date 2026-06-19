import { assertValidProductionEnv } from "./src/server/env";

type RuntimeProcess = {
  exit?: (code: number) => never;
};

export function register() {
  try {
    assertValidProductionEnv();
  } catch (error) {
    console.error(error);
    const runtimeProcess = (globalThis as typeof globalThis & { process?: RuntimeProcess }).process;
    runtimeProcess?.exit?.(1);
    throw error;
  }
}
