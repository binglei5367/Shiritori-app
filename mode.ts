import { serve } from "https://deno.land/std/http/server.ts";

const handler = (request: Request): Response => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    return new Response("Hello, Deno Deploy!", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }
  return new Response("Not Found", { status: 404 });
};

serve(handler);
