import { hc } from "hono/client";

import type app from "../src/app";

// Define the client type directly without creating an unused variable
type Client = ReturnType<typeof hc<typeof app>>;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);
