import server from "../dist/server/server.js";

export default async (request) => {
  const host = request.headers.get("host") ?? "localhost";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const absoluteUrl = new URL(request.url, `${proto}://${host}`);
  const absoluteRequest = new Request(absoluteUrl, request);
  return server.fetch(absoluteRequest);
};
