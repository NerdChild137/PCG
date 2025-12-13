import { 
  type User, 
  type InsertUser, 
  type SiteContent,
  type InsertSiteContent,
  type SiteTheme,
  type InsertSiteTheme,
  type Resource,
  type InsertResource,
  users,
  siteContent,
  siteTheme,
  resources
} from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSiteContent(): Promise<SiteContent | undefined>;
  updateSiteContent(content: Partial<InsertSiteContent>): Promise<SiteContent>;
  getSiteTheme(): Promise<SiteTheme | undefined>;
  updateSiteTheme(theme: InsertSiteTheme): Promise<SiteTheme>;
  getResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
  updateResource(id: number, resource: Partial<InsertResource>): Promise<Resource>;
  deleteResource(id: number): Promise<void>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getSiteContent(): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).limit(1);
    if (!content) {
      const [newContent] = await db.insert(siteContent).values({}).returning();
      return newContent;
    }
    return content;
  }

  async updateSiteContent(contentData: Partial<InsertSiteContent>): Promise<SiteContent> {
    const updateData: any = { ...contentData };
    const [content] = await db
      .update(siteContent)
      .set(updateData)
      .where(eq(siteContent.id, 1))
      .returning();
    return content;
  }

  async getSiteTheme(): Promise<SiteTheme | undefined> {
    const [theme] = await db.select().from(siteTheme).limit(1);
    if (!theme) {
      const [newTheme] = await db.insert(siteTheme).values({}).returning();
      return newTheme;
    }
    return theme;
  }

  async updateSiteTheme(themeData: InsertSiteTheme): Promise<SiteTheme> {
    const [theme] = await db
      .update(siteTheme)
      .set(themeData)
      .where(eq(siteTheme.id, 1))
      .returning();
    return theme;
  }

  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async createResource(resourceData: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values(resourceData).returning();
    return resource;
  }

  async updateResource(id: number, resourceData: Partial<InsertResource>): Promise<Resource> {
    const [resource] = await db
      .update(resources)
      .set(resourceData)
      .where(eq(resources.id, id))
      .returning();
    return resource;
  }

  async deleteResource(id: number): Promise<void> {
    await db.delete(resources).where(eq(resources.id, id));
  }
}

export const storage = new DatabaseStorage();
