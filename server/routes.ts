import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health-check endpoint so we can quickly verify the server is up
  app.get("/_health", (_req, res) => {
    res.json({ ok: true });
  });

  // put other application routes here (prefix with /api if desired)

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
