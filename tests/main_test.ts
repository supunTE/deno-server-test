import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { main } from "../src/main.ts";

Deno.test("Server starts and responds", async () => {
  const server = serve({ port: 8000 });
  const url = "http://localhost:8000/";

  // Start the server in a separate promise
  const serverPromise = (async () => {
    for await (const req of server) {
      req.respond({ body: "Hello World" });
    }
  })();

  // Allow some time for the server to start
  await new Promise((resolve) => setTimeout(resolve, 100));

  const response = await fetch(url);
  const body = await response.text();

  assertEquals(response.status, 200);
  assertEquals(body, "Hello World");

  // Close the server
  server.close();
  await serverPromise;
});