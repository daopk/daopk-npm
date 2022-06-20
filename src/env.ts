import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { parse, DotenvParseOutput } from "dotenv";
import { cleanEnv, ValidatorSpec } from "envalid";

interface LoadEnvOptions {
  system?: boolean;
  root?: string;
}

export function loadEnv(opts: LoadEnvOptions = {}) {
  const defaultOptions: LoadEnvOptions = {
    system: true,
  };
  const options = { ...defaultOptions, ...opts };
  const mode = process.env.NODE_ENV || "development";
  const root = opts.root || process.cwd();

  const files = [".env", ".env.local", `.env.${mode}`, `.env.${mode}.local`];
  const env: DotenvParseOutput = {};

  files.forEach((file) => Object.assign(env, parseEnvFile(join(root, file))));

  if (options.system) {
    Object.assign(env, process.env);
  }

  env.NODE_ENV = mode;

  return Object.freeze(env);
}

export function defineEnv<T>(
  specs: { [K in keyof T]: ValidatorSpec<T[K]> },
  options: LoadEnvOptions = {}
) {
  return cleanEnv<T>(loadEnv(options), {
    ...specs,
  });
}

function parseEnvFile(envFile: string) {
  if (existsSync(envFile)) {
    const envText = readFileSync(envFile, { encoding: "utf-8" });
    return parse(envText);
  }
  return {};
}
