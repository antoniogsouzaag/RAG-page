import express from "express";
import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import type { AddressInfo } from "net";

// Routes that get a fully-rendered HTML snapshot baked at build time so that
// crawlers (Google) and AI engines that don't run JavaScript (GPTBot,
// ClaudeBot, PerplexityBot, ...) receive real content instead of an empty
// SPA shell. The live JS bundle is preserved, so users still get the full
// interactive app (createRoot simply re-renders over the snapshot).
const ROUTES = ["/", "/app", "/terms", "/privacy"];

// Scroll the whole page so framer-motion `whileInView` sections reveal
// (opacity -> 1) and lazy-loaded chunks mount before we capture the HTML.
async function autoScroll(page: import("playwright").Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + window.innerHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
}

export async function prerender(distPath: string): Promise<void> {
  if (process.env.PRERENDER === "false") {
    console.log("[prerender] skipped (PRERENDER=false)");
    return;
  }

  const indexPath = path.join(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.warn(`[prerender] ${indexPath} not found, skipping prerender`);
    return;
  }

  // Serve the built client exactly like production (static assets + SPA shell).
  const app = express();
  app.use(express.static(distPath, { index: false }));
  app.get("*", (_req, res) => res.sendFile(indexPath));
  const server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", () => resolve()));
  const { port } = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${port}`;

  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    console.warn(
      "[prerender] could not launch Chromium, skipping prerender (run `npx playwright install chromium`). Site still works via the <noscript> fallback.",
      err instanceof Error ? err.message : err,
    );
    server.close();
    return;
  }

  const snapshots: { route: string; html: string }[] = [];

  try {
    const context = await browser.newContext({
      // Tall viewport so most `whileInView` content is considered visible.
      viewport: { width: 1366, height: 3200 },
    });

    for (const route of ROUTES) {
      try {
        const page = await context.newPage();
        await page.goto(`${baseUrl}${route}`, {
          waitUntil: "networkidle",
          timeout: 30000,
        });
        // Wait for React to mount real content into #root.
        await page.waitForFunction(
          () => {
            const root = document.getElementById("root");
            return !!root && root.children.length > 0;
          },
          { timeout: 15000 },
        );
        await autoScroll(page);
        await page.waitForTimeout(800);

        const html = await page.content();
        snapshots.push({ route, html });
        await page.close();
        console.log(`[prerender] captured ${route}`);
      } catch (err) {
        console.warn(
          `[prerender] failed to capture ${route} (keeping SPA fallback):`,
          err instanceof Error ? err.message : err,
        );
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  // Write snapshots only after all routes are captured, so writing the home
  // snapshot doesn't pollute the shell used to render the other routes.
  for (const { route, html } of snapshots) {
    const outFile =
      route === "/"
        ? indexPath
        : path.join(distPath, route.replace(/^\//, ""), "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf-8");
  }

  console.log(`[prerender] wrote ${snapshots.length} route snapshot(s)`);
}

// Allow running standalone: `tsx script/prerender.ts`
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  prerender(distPath).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
