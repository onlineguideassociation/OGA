import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProductSchema, insertHotelSchema, insertRestaurantSchema,
  insertItinerarySchema, insertEventSchema, insertFreelanceGigSchema,
  insertCommunityPostSchema, insertBookingSchema, insertContactMessageSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/products", async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    if (search) {
      const results = await storage.searchProducts(search);
      return res.json(results);
    }
    const products = await storage.getProducts(category);
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    const parsed = insertProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid product data", errors: parsed.error.errors });
    const product = await storage.createProduct(parsed.data);
    res.status(201).json(product);
  });

  app.get("/api/hotels", async (req, res) => {
    const location = req.query.location as string | undefined;
    const type = req.query.type as string | undefined;
    const results = await storage.getHotels(location, type);
    res.json(results);
  });

  app.get("/api/hotels/:id", async (req, res) => {
    const hotel = await storage.getHotel(Number(req.params.id));
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  });

  app.post("/api/hotels", async (req, res) => {
    const parsed = insertHotelSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid hotel data", errors: parsed.error.errors });
    const hotel = await storage.createHotel(parsed.data);
    res.status(201).json(hotel);
  });

  app.get("/api/restaurants", async (req, res) => {
    const location = req.query.location as string | undefined;
    const results = await storage.getRestaurants(location);
    res.json(results);
  });

  app.get("/api/restaurants/:id", async (req, res) => {
    const restaurant = await storage.getRestaurant(Number(req.params.id));
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  });

  app.post("/api/restaurants", async (req, res) => {
    const parsed = insertRestaurantSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid restaurant data", errors: parsed.error.errors });
    const restaurant = await storage.createRestaurant(parsed.data);
    res.status(201).json(restaurant);
  });

  app.get("/api/itineraries", async (_req, res) => {
    const results = await storage.getItineraries();
    res.json(results);
  });

  app.get("/api/itineraries/:id", async (req, res) => {
    const itinerary = await storage.getItinerary(Number(req.params.id));
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  });

  app.post("/api/itineraries", async (req, res) => {
    const parsed = insertItinerarySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid itinerary data", errors: parsed.error.errors });
    const itinerary = await storage.createItinerary(parsed.data);
    res.status(201).json(itinerary);
  });

  app.get("/api/events", async (req, res) => {
    const category = req.query.category as string | undefined;
    const results = await storage.getEvents(category);
    res.json(results);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  });

  app.post("/api/events", async (req, res) => {
    const parsed = insertEventSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid event data", errors: parsed.error.errors });
    const event = await storage.createEvent(parsed.data);
    res.status(201).json(event);
  });

  app.get("/api/freelance-gigs", async (_req, res) => {
    const results = await storage.getFreelanceGigs();
    res.json(results);
  });

  app.get("/api/freelance-gigs/:id", async (req, res) => {
    const gig = await storage.getFreelanceGig(Number(req.params.id));
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json(gig);
  });

  app.post("/api/freelance-gigs", async (req, res) => {
    const parsed = insertFreelanceGigSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid gig data", errors: parsed.error.errors });
    const gig = await storage.createFreelanceGig(parsed.data);
    res.status(201).json(gig);
  });

  app.get("/api/community-posts", async (_req, res) => {
    const results = await storage.getCommunityPosts();
    res.json(results);
  });

  app.get("/api/community-posts/:id", async (req, res) => {
    const post = await storage.getCommunityPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post("/api/community-posts", async (req, res) => {
    const parsed = insertCommunityPostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid post data", errors: parsed.error.errors });
    const post = await storage.createCommunityPost(parsed.data);
    res.status(201).json(post);
  });

  app.post("/api/community-posts/:id/like", async (req, res) => {
    const post = await storage.likeCommunityPost(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.get("/api/bookings", async (req, res) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const results = await storage.getBookings(userId);
    res.json(results);
  });

  app.post("/api/bookings", async (req, res) => {
    const parsed = insertBookingSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid booking data", errors: parsed.error.errors });
    const booking = await storage.createBooking(parsed.data);
    res.status(201).json(booking);
  });

  app.post("/api/contact", async (req, res) => {
    const parsed = insertContactMessageSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid message data", errors: parsed.error.errors });
    const message = await storage.createContactMessage(parsed.data);
    res.status(201).json(message);
  });

  return httpServer;
}
