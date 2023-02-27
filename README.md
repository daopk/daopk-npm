# daopk-npm

[![npm-image]][npm-url]


This package provides a convenient way to enable type-safety for environment variables in your Node.js application by wrapping the functionality of `dotenv` and `envalid` libraries.

## Installation

You can install this package using npm:

```bash
npm install @daopk/env
```

## Usage

To use this package, create a file named `env.ts` in your source root folder and define your environment variables with their expected types using `defineEnv` function. For example:

```typescript
import { defineEnv, num, str } from '@daopk/env';

export const env = defineEnv({
    NODE_ENV: str(),

    SERVER_HOST: str({ default: 'localhost' }),
    SERVER_PORT: num({ default: 3000 }),
});
```
After defining your environment variables, you can import the exported env variable from the `env.ts` file.

```typescript
import { env } from '~/env';

console.log(env.NODE_ENV); // Prints the value of NODE_ENV as a string
console.log(env.SERVER_HOST); // Prints the value of SERVER_HOST as a string
console.log(env.SERVER_PORT); // Prints the value of SERVER_PORT as a number
```

To use the `~` alias in your TypeScript project, you need to configure the paths option in the `tsconfig.json` file. For example:
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

[npm-image]: https://img.shields.io/npm/v/@daopk/env/latest.svg
[npm-url]: https://npmjs.org/package/@daopk/env "npm"
