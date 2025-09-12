import { Hono } from "hono";

const app = new Hono()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/test1", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/test2", (c) => {
    return c.text("Hello Hono!");
  });

export default app;
