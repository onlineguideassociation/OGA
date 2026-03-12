import { eq, ilike, desc, sql } from "drizzle-orm";
import { db } from "../db";
import {
  users, products, hotels, restaurants, itineraries, events,
  freelanceGigs, communityPosts, bookings, contactMessages,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Hotel, type InsertHotel,
  type Restaurant, type InsertRestaurant,
  type Itinerary, type InsertItinerary,
  type Event, type InsertEvent,
  type FreelanceGig, type InsertFreelanceGig,
  type CommunityPost, type InsertCommunityPost,
  type Booking, type InsertBooking,
  type ContactMessage, type InsertContactMessage,
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(category?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;

  getHotels(location?: string, type?: string): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;

  getRestaurants(location?: string): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;

  getItineraries(): Promise<Itinerary[]>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;

  getEvents(category?: string): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  getFreelanceGigs(): Promise<FreelanceGig[]>;
  getFreelanceGig(id: number): Promise<FreelanceGig | undefined>;
  createFreelanceGig(gig: InsertFreelanceGig): Promise<FreelanceGig>;

  getCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: number): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  likeCommunityPost(id: number): Promise<CommunityPost | undefined>;

  getBookings(userId?: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(category?: string): Promise<Product[]> {
    if (category) {
      return db.select().from(products).where(eq(products.category, category));
    }
    return db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return db.select().from(products).where(ilike(products.name, `%${query}%`));
  }

  async getHotels(location?: string, type?: string): Promise<Hotel[]> {
    if (location && type) {
      return db.select().from(hotels)
        .where(sql`${ilike(hotels.location, `%${location}%`)} AND ${eq(hotels.type, type)}`);
    }
    if (location) {
      return db.select().from(hotels).where(ilike(hotels.location, `%${location}%`));
    }
    if (type) {
      return db.select().from(hotels).where(eq(hotels.type, type));
    }
    return db.select().from(hotels);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel;
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    const [created] = await db.insert(hotels).values(hotel).returning();
    return created;
  }

  async getRestaurants(location?: string): Promise<Restaurant[]> {
    if (location) {
      return db.select().from(restaurants).where(ilike(restaurants.location, `%${location}%`));
    }
    return db.select().from(restaurants);
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    const [r] = await db.select().from(restaurants).where(eq(restaurants.id, id));
    return r;
  }

  async createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant> {
    const [created] = await db.insert(restaurants).values(restaurant).returning();
    return created;
  }

  async getItineraries(): Promise<Itinerary[]> {
    return db.select().from(itineraries);
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    const [i] = await db.select().from(itineraries).where(eq(itineraries.id, id));
    return i;
  }

  async createItinerary(itinerary: InsertItinerary): Promise<Itinerary> {
    const [created] = await db.insert(itineraries).values(itinerary).returning();
    return created;
  }

  async getEvents(category?: string): Promise<Event[]> {
    if (category) {
      return db.select().from(events).where(eq(events.category, category));
    }
    return db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [e] = await db.select().from(events).where(eq(events.id, id));
    return e;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }

  async getFreelanceGigs(): Promise<FreelanceGig[]> {
    return db.select().from(freelanceGigs).orderBy(desc(freelanceGigs.createdAt));
  }

  async getFreelanceGig(id: number): Promise<FreelanceGig | undefined> {
    const [g] = await db.select().from(freelanceGigs).where(eq(freelanceGigs.id, id));
    return g;
  }

  async createFreelanceGig(gig: InsertFreelanceGig): Promise<FreelanceGig> {
    const [created] = await db.insert(freelanceGigs).values(gig).returning();
    return created;
  }

  async getCommunityPosts(): Promise<CommunityPost[]> {
    return db.select().from(communityPosts).orderBy(desc(communityPosts.createdAt));
  }

  async getCommunityPost(id: number): Promise<CommunityPost | undefined> {
    const [p] = await db.select().from(communityPosts).where(eq(communityPosts.id, id));
    return p;
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const [created] = await db.insert(communityPosts).values(post).returning();
    return created;
  }

  async likeCommunityPost(id: number): Promise<CommunityPost | undefined> {
    const [updated] = await db.update(communityPosts)
      .set({ likes: sql`${communityPosts.likes} + 1` })
      .where(eq(communityPosts.id, id))
      .returning();
    return updated;
  }

  async getBookings(userId?: number): Promise<Booking[]> {
    if (userId) {
      return db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
    }
    return db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
