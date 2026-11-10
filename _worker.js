// Temporary site-wide maintenance mode for FR55BEL.MEDIA.
// To restore the site, remove this _worker.js file and restore the previous index.html.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Serve the maintenance homepage for every public route.
    // Use the Pages assets binding directly to avoid a redirect loop.
    const pageUrl = new URL("/index.html", url.origin);
    const response = await env.ASSETS.fetch(new Request(pageUrl, { method: "GET" }));
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "no-store, max-age=0");
    headers.set("X-Robots-Tag", "noindex, follow");
    return new Response(request.method === "HEAD" ? null : response.body, {
      status: 503,
      statusText: "Service Unavailable",
      headers
    });
  }
};
