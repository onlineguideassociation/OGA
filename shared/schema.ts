import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, doublePrecision, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  role: text("role").default("member"),
  avatar: text("avatar"),
  reputation: integer("reputation").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: doublePrecision("price").notNull(),
  image: text("image").default("📦"),
  rating: doublePrecision("rating").default(0),
  sales: integer("sales").default(0),
  supplier: text("supplier").notNull(),
  commission: integer("commission").default(0),
  description: text("description"),
  inStock: boolean("in_stock").default(true),
});

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  rating: doublePrecision("rating").default(0),
  reviews: integer("reviews").default(0),
  price: doublePrecision("price").notNull(),
  image: text("image").default("🏨"),
  amenities: text("amenities").array(),
  type: text("type").default("Standard"),
  ecoCertified: boolean("eco_certified").default(false),
  description: text("description"),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  cuisine: text("cuisine").notNull(),
  location: text("location").notNull(),
  rating: doublePrecision("rating").default(0),
  reviews: integer("reviews").default(0),
  priceRange: text("price_range").default("$$"),
  image: text("image").default("🍽️"),
  features: text("features").array(),
  description: text("description"),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  difficulty: text("difficulty").default("Moderate"),
  price: doublePrecision("price").notNull(),
  rating: doublePrecision("rating").default(0),
  aiGuided: boolean("ai_guided").default(true),
  languages: text("languages").array(),
  sites: jsonb("sites").default([]),
  description: text("description"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  type: text("type").default("Virtual"),
  category: text("category").notNull(),
  location: text("location"),
  attendees: integer("attendees").default(0),
  maxAttendees: integer("max_attendees"),
  description: text("description"),
  featured: boolean("featured").default(false),
});

export const freelanceGigs = pgTable("freelance_gigs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  type: text("type").default("Fixed Price"),
  budget: text("budget").notNull(),
  duration: text("duration"),
  tags: text("tags").array(),
  proposals: integer("proposals").default(0),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id"),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  authorAvatar: text("author_avatar").default("👤"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  type: text("type").notNull(),
  referenceId: integer("reference_id").notNull(),
  referenceName: text("reference_name").notNull(),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  guests: integer("guests").default(1),
  totalPrice: doublePrecision("total_price"),
  status: text("status").default("confirmed"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").default("tours"),
  location: text("location").notNull(),
  price: doublePrecision("price").notNull(),
  currency: text("currency").default("$"),
  rating: doublePrecision("rating").default(0),
  reviews: integer("reviews").default(0),
  duration: text("duration"),
  badge: text("badge"),
  image: text("image").default("🏛️"),
  description: text("description"),
  features: text("features").array(),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  maxGuests: integer("max_guests").default(20),
  languages: text("languages").array(),
  guideId: integer("guide_id"),
  guideName: text("guide_name"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar").default("👤"),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content").notNull(),
  helpful: integer("helpful").default(0),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").default("footer"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true });
export const insertRestaurantSchema = createInsertSchema(restaurants).omit({ id: true });
export const insertItinerarySchema = createInsertSchema(itineraries).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertFreelanceGigSchema = createInsertSchema(freelanceGigs).omit({ id: true });
export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({ id: true, createdAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertTourSchema = createInsertSchema(tours).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviewsTable).omit({ id: true, createdAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type Hotel = typeof hotels.$inferSelect;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type Restaurant = typeof restaurants.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertFreelanceGig = z.infer<typeof insertFreelanceGigSchema>;
export type FreelanceGig = typeof freelanceGigs.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
