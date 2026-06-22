import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try a few candidate locations for the built client files. Depending on
  // how the project is built and deployed, __dirname may differ from
  // process.cwd(), so check both.
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
  ];

  const distPath = candidates.find((p) => fs.existsSync(p));
  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Checked: ${candidates.join(", ")}. Run \"npm run build\" and ensure the resulting dist/public folder is deployed alongside the server bundle.`,
    );
  }

  console.log(`serving static files from ${distPath}`);

  // Serve static assets but do not automatically serve index.html for every
  // request — we only want to return index.html for non-API GET requests so
  // API routes are not interfered with.
  app.use(express.static(distPath, { index: false }));

  const shellIndex = path.resolve(distPath, "index.html");

  app.get("*", (req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api") || req.path.startsWith("/api-docs")) return next();

    // Prefer a route-specific prerendered snapshot (better SEO/GEO) when one
    // exists, e.g. /terms -> dist/public/terms/index.html. Otherwise fall back
    // to the SPA shell which renders the route client-side.
    const safePath = req.path.replace(/\.\.+/g, "").replace(/^\/+/, "");
    const prerendered = safePath
      ? path.resolve(distPath, safePath, "index.html")
      : shellIndex;

    const fileToSend =
      prerendered.startsWith(distPath) && fs.existsSync(prerendered)
        ? prerendered
        : shellIndex;

    res.sendFile(fileToSend, (err) => {
      if (err) return next(err);
    });
  });
}
