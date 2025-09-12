import { describe, it, expect } from "vitest";

import app from "./app";

describe("Hono App", () => {
  it("should return Hello Hono!", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });
});
