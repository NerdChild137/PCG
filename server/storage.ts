import { 
  type User, 
  type InsertUser, 
  type SiteContent,
  type InsertSiteContent,
  type SiteTheme,
  type InsertSiteTheme,
  users,
  siteContent,
  siteTheme
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
  updateSiteContent(content: InsertSiteContent): Promise<SiteContent>;
  getSiteTheme(): Promise<SiteTheme | undefined>;
  updateSiteTheme(theme: InsertSiteTheme): Promise<SiteTheme>;
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

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

  async updateSiteContent(contentData: InsertSiteContent): Promise<SiteContent> {
    const [content] = await db
      .update(siteContent)
      .set(contentData)
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
}

export const storage = new DatabaseStorage();
