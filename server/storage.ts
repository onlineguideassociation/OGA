import { eq, ilike, desc, sql } from "drizzle-orm";
import { db } from "../db";
import {
  users, products, hotels, restaurants, itineraries, events,
  freelanceGigs, communityPosts, bookings, contactMessages,
  tours, reviewsTable, newsletterSubscribers,
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
  type Tour, type InsertTour,
  type Review, type InsertReview,
  type NewsletterSubscriber, type InsertNewsletter,
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

  getTours(location?: string, category?: string): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;
  searchTours(query: string): Promise<Tour[]>;

  getReviews(entityType: string, entityId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  markReviewHelpful(id: number): Promise<Review | undefined>;

  subscribeNewsletter(data: InsertNewsletter): Promise<NewsletterSubscriber>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  getPlatformStats(): Promise<{
    totalTours: number;
    totalHotels: number;
    totalRestaurants: number;
    totalProducts: number;
    totalEvents: number;
    totalBookings: number;
    totalCommunityPosts: number;
    totalFreelanceGigs: number;
    totalReviews: number;
  }>;

  globalSearch(query: string): Promise<{
    tours: Tour[];
    hotels: Hotel[];
    restaurants: Restaurant[];
    products: Product[];
    events: Event[];
    itineraries: Itinerary[];
  }>;
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

  async getTours(location?: string, category?: string): Promise<Tour[]> {
    if (location && category) {
      return db.select().from(tours).where(sql`${ilike(tours.location, `%${location}%`)} AND ${eq(tours.category, category)}`);
    }
    if (location) {
      return db.select().from(tours).where(ilike(tours.location, `%${location}%`));
    }
    if (category) {
      return db.select().from(tours).where(eq(tours.category, category));
    }
    return db.select().from(tours).orderBy(desc(tours.createdAt));
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const [t] = await db.select().from(tours).where(eq(tours.id, id));
    return t;
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const [created] = await db.insert(tours).values(tour).returning();
    return created;
  }

  async searchTours(query: string): Promise<Tour[]> {
    return db.select().from(tours).where(
      sql`${ilike(tours.name, `%${query}%`)} OR ${ilike(tours.location, `%${query}%`)}`
    );
  }

  async getReviews(entityType: string, entityId: number): Promise<Review[]> {
    return db.select().from(reviewsTable)
      .where(sql`${eq(reviewsTable.entityType, entityType)} AND ${eq(reviewsTable.entityId, entityId)}`)
      .orderBy(desc(reviewsTable.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [created] = await db.insert(reviewsTable).values(review).returning();
    return created;
  }

  async markReviewHelpful(id: number): Promise<Review | undefined> {
    const [updated] = await db.update(reviewsTable)
      .set({ helpful: sql`${reviewsTable.helpful} + 1` })
      .where(eq(reviewsTable.id, id))
      .returning();
    return updated;
  }

  async subscribeNewsletter(data: InsertNewsletter): Promise<NewsletterSubscriber> {
    const [created] = await db.insert(newsletterSubscribers).values(data).returning();
    return created;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async getPlatformStats() {
    const [tourCount] = await db.select({ count: sql<number>`count(*)::int` }).from(tours);
    const [hotelCount] = await db.select({ count: sql<number>`count(*)::int` }).from(hotels);
    const [restaurantCount] = await db.select({ count: sql<number>`count(*)::int` }).from(restaurants);
    const [productCount] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
    const [eventCount] = await db.select({ count: sql<number>`count(*)::int` }).from(events);
    const [bookingCount] = await db.select({ count: sql<number>`count(*)::int` }).from(bookings);
    const [postCount] = await db.select({ count: sql<number>`count(*)::int` }).from(communityPosts);
    const [gigCount] = await db.select({ count: sql<number>`count(*)::int` }).from(freelanceGigs);
    const [reviewCount] = await db.select({ count: sql<number>`count(*)::int` }).from(reviewsTable);
    return {
      totalTours: tourCount.count,
      totalHotels: hotelCount.count,
      totalRestaurants: restaurantCount.count,
      totalProducts: productCount.count,
      totalEvents: eventCount.count,
      totalBookings: bookingCount.count,
      totalCommunityPosts: postCount.count,
      totalFreelanceGigs: gigCount.count,
      totalReviews: reviewCount.count,
    };
  }

  async globalSearch(query: string) {
    const [t, h, r, p, e, i] = await Promise.all([
      db.select().from(tours).where(sql`${ilike(tours.name, `%${query}%`)} OR ${ilike(tours.location, `%${query}%`)}`),
      db.select().from(hotels).where(sql`${ilike(hotels.name, `%${query}%`)} OR ${ilike(hotels.location, `%${query}%`)}`),
      db.select().from(restaurants).where(sql`${ilike(restaurants.name, `%${query}%`)} OR ${ilike(restaurants.location, `%${query}%`)}`),
      db.select().from(products).where(ilike(products.name, `%${query}%`)),
      db.select().from(events).where(ilike(events.title, `%${query}%`)),
      db.select().from(itineraries).where(ilike(itineraries.title, `%${query}%`)),
    ]);
    return { tours: t, hotels: h, restaurants: r, products: p, events: e, itineraries: i };
  }
}

export const storage = new DatabaseStorage();
