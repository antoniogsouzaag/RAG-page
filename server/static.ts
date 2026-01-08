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

  app.get("*", (req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api") || req.path.startsWith("/api-docs")) return next();

    res.sendFile(path.resolve(distPath, "index.html"), (err) => {
      if (err) return next(err);
    });
  });
}
