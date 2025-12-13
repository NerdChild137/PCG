import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const siteContent = pgTable("site_content", {
  id: integer("id").primaryKey().default(1),
  heroHeadline: text("hero_headline").notNull().default("Advancing Access & Opportunity in Infrastructure"),
  heroSubtext: text("hero_subtext").notNull().default("Specializing in Civil Rights Compliance, Small Business Outreach, and Workforce Development for major transit projects across the nation."),
  aboutText: jsonb("about_text").notNull().$type<string[]>().default([]),
  services: jsonb("services").notNull().$type<{title: string, description: string}[]>().default([]),
  leadershipTitle: text("leadership_title").notNull().default("Leadership"),
  leadershipSubtitle: text("leadership_subtitle").notNull().default("Demarcus Peters"),
  leadershipRole: text("leadership_role").notNull().default("Director of Civil Rights Compliance & Small Business Outreach"),
  expertiseTitle: text("expertise_title").notNull().default("Areas of Expertise"),
  expertiseDescription: text("expertise_description").notNull().default("We engage our core capabilities to deliver equitable outcomes for local communities and businesses."),
  transitTitle: text("transit_title").notNull().default("Transit Specific Practice"),
  contactTitle: text("contact_title").notNull().default("Get in Touch"),
  footerDescription: text("footer_description").notNull().default("Specializing in Civil Rights Compliance, Small Business Outreach, and Workforce Development for major transit projects."),
  logoUrl: text("logo_url"),
});

export const siteTheme = pgTable("site_theme", {
  id: integer("id").primaryKey().default(1),
  primaryColor: text("primary_color").notNull().default("215 28% 17%"),
  accentColor: text("accent_color").notNull().default("180 100% 35%"),
});

export const resources = pgTable("resources", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  linkUrl: text("link_url"),
  linkText: text("link_text").default("Learn More"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
});

export const insertSiteThemeSchema = createInsertSchema(siteTheme).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteTheme = typeof siteTheme.$inferSelect;
export type InsertSiteTheme = z.infer<typeof insertSiteThemeSchema>;
export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
