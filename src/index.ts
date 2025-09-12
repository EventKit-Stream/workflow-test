import { websocket } from "hono/bun";

import app from "./app";

export default {
  port: 3000,
  fetch: app.fetch,
  websocket,
};
