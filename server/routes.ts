import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication routes: /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Content management routes
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getSiteContent();
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/content", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const content = await storage.updateSiteContent(req.body);
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Theme management routes
  app.get("/api/theme", async (req, res) => {
    try {
      const theme = await storage.getSiteTheme();
      res.json(theme);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/theme", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    try {
      const theme = await storage.updateSiteTheme(req.body);
      res.json(theme);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return httpServer;
}
