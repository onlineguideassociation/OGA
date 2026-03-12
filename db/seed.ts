import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  products, hotels, restaurants, itineraries, events,
  freelanceGigs, communityPosts
} from "@shared/schema";

async function seed() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("Seeding database...");

  await db.insert(products).values([
    { name: "Angkor Wat Art Print (Canvas)", category: "Art & Souvenirs", price: 45, image: "🖼️", rating: 4.8, sales: 342, supplier: "Heritage Artisans Co.", commission: 25, description: "Beautiful hand-painted canvas print of the iconic Angkor Wat temple." },
    { name: "Cambodian Silk Scarf (Premium)", category: "Fashion", price: 89, image: "🧣", rating: 4.9, sales: 215, supplier: "Silk Roads Collective", commission: 20, description: "Premium handwoven Cambodian silk scarf in traditional patterns." },
    { name: "Temple Guidebook (Digital + Print)", category: "Digital Products", price: 29, image: "📚", rating: 4.7, sales: 1240, supplier: "OnlineGuide Media", commission: 40, description: "Comprehensive guide to Cambodia's temples with maps and history." },
    { name: "Khmer Cooking Spice Kit", category: "Food & Beverages", price: 34, image: "🌶️", rating: 4.6, sales: 428, supplier: "Spice Route Exports", commission: 22, description: "Authentic Khmer cooking spice kit with 12 traditional spices." },
    { name: "Bamboo Eco-Backpack", category: "Travel Gear", price: 76, image: "🎒", rating: 4.9, sales: 567, supplier: "EcoTravel Innovations", commission: 18, description: "Sustainable bamboo fiber backpack, perfect for eco-conscious travelers." },
    { name: "AI Guide Voice Tour (Lifetime)", category: "Digital Products", price: 149, image: "🤖", rating: 4.8, sales: 892, supplier: "OnlineGuide AI Labs", commission: 35, description: "Lifetime access to AI-powered voice tour guide for all SE Asia destinations." },
    { name: "Handwoven Krama Scarf", category: "Fashion", price: 25, image: "🧶", rating: 4.5, sales: 780, supplier: "Rural Artisans Network", commission: 30, description: "Traditional Cambodian krama scarf handwoven by rural artisans." },
    { name: "Kampot Pepper Collection", category: "Food & Beverages", price: 42, image: "🫚", rating: 4.9, sales: 365, supplier: "Kampot Pepper Co.", commission: 25, description: "World-famous Kampot pepper in three varieties: black, red, and white." },
  ]).onConflictDoNothing();

  await db.insert(hotels).values([
    { name: "Raffles Hotel Le Royal", location: "Phnom Penh, Cambodia", rating: 4.9, reviews: 1284, price: 350, image: "🏨", amenities: ["Pool", "Spa", "Restaurant", "Bar", "Wifi", "Room Service"], type: "Luxury", ecoCertified: true, description: "Historic luxury hotel in the heart of Phnom Penh." },
    { name: "Shinta Mani Angkor", location: "Siem Reap, Cambodia", rating: 4.8, reviews: 956, price: 220, image: "🌴", amenities: ["Pool", "Spa", "Restaurant", "Wifi", "Airport Shuttle"], type: "Boutique", ecoCertified: true, description: "Award-winning boutique hotel near Angkor temples." },
    { name: "Six Senses Krabey Island", location: "Koh Krabey, Cambodia", rating: 4.9, reviews: 412, price: 850, image: "🏝️", amenities: ["Private Pool", "Spa", "Beachfront", "Restaurant", "Water Sports"], type: "Resort", ecoCertified: true, description: "Private island resort with stunning ocean views." },
    { name: "Rosewood Phnom Penh", location: "Phnom Penh, Cambodia", rating: 4.7, reviews: 823, price: 280, image: "🏙️", amenities: ["Skybar", "Spa", "Restaurant", "Gym", "Wifi"], type: "Luxury", ecoCertified: false, description: "Modern luxury hotel with panoramic city views." },
    { name: "Jaya House River Park", location: "Siem Reap, Cambodia", rating: 4.8, reviews: 645, price: 180, image: "🌿", amenities: ["Pool", "Restaurant", "Spa", "Garden", "Bikes"], type: "Boutique", ecoCertified: true, description: "Riverfront boutique hotel with lush tropical gardens." },
    { name: "The Balé Phnom Penh", location: "Phnom Penh, Cambodia", rating: 4.6, reviews: 387, price: 150, image: "🏢", amenities: ["Pool", "Gym", "Restaurant", "Wifi", "Laundry"], type: "Standard", ecoCertified: false, description: "Modern hotel with comfortable rooms and great amenities." },
  ]).onConflictDoNothing();

  await db.insert(restaurants).values([
    { name: "Malis Restaurant", cuisine: "Fine Khmer Dining", location: "Phnom Penh", rating: 4.8, reviews: 1240, priceRange: "$$$", image: "🥘", features: ["Loyalty Rewards", "Table Booking", "POS Integrated"], description: "Award-winning Khmer fine dining by celebrity chef Luu Meng." },
    { name: "Cuisine Wat Damnak", cuisine: "Authentic Cambodian", location: "Siem Reap", rating: 4.9, reviews: 856, priceRange: "$$$", image: "🍲", features: ["Loyalty Rewards", "Table Booking"], description: "Innovative Cambodian cuisine using local ingredients." },
    { name: "The Sugar Palm", cuisine: "Contemporary Khmer", location: "Siem Reap", rating: 4.7, reviews: 512, priceRange: "$$", image: "🍛", features: ["Table Booking", "POS Integrated"], description: "Traditional Cambodian recipes with a modern twist." },
    { name: "Khema La Poste", cuisine: "French & Cambodian", location: "Phnom Penh", rating: 4.6, reviews: 923, priceRange: "$$$", image: "🍷", features: ["Loyalty Rewards", "POS Integrated"], description: "French-Cambodian fusion in a colonial-era building." },
    { name: "Romdeng", cuisine: "Cambodian Street Food", location: "Phnom Penh", rating: 4.5, reviews: 678, priceRange: "$$", image: "🍜", features: ["Table Booking"], description: "Social enterprise restaurant serving traditional Cambodian street food." },
    { name: "Haven Training Restaurant", cuisine: "International", location: "Siem Reap", rating: 4.7, reviews: 445, priceRange: "$$", image: "🍽️", features: ["Table Booking", "Loyalty Rewards"], description: "Training restaurant supporting underprivileged youth." },
  ]).onConflictDoNothing();

  await db.insert(itineraries).values([
    { title: "Angkor Temples 3-Day Immersion", duration: "3 days", difficulty: "Moderate", price: 299, rating: 4.9, aiGuided: true, languages: ["English", "Khmer", "French"], sites: [{ name: "Angkor Wat", description: "The world's largest religious monument", duration: "3 hours" }, { name: "Bayon Temple", description: "Famous for its giant stone faces", duration: "2.5 hours" }, { name: "Ta Prohm", description: "The 'Tomb Raider' temple with jungle ruins", duration: "2 hours" }], description: "Immerse yourself in the ancient Angkor civilization." },
    { title: "Phnom Penh Cultural Deep Dive", duration: "2 days", difficulty: "Easy", price: 199, rating: 4.7, aiGuided: true, languages: ["English", "Khmer", "Chinese"], sites: [{ name: "Royal Palace", description: "Seat of the Cambodian monarchy", duration: "2 hours" }, { name: "Silver Pagoda", description: "Sacred temple with rare treasures", duration: "1.5 hours" }, { name: "S-21 Memorial", description: "Historical museum & reflection site", duration: "2 hours" }], description: "Discover the rich culture and history of Cambodia's capital." },
    { title: "Eco-Tourism & Countryside Adventure", duration: "4 days", difficulty: "Challenging", price: 449, rating: 4.8, aiGuided: true, languages: ["English", "Khmer"], sites: [{ name: "Tonle Sap Lake", description: "Southeast Asia's largest freshwater lake", duration: "4 hours" }, { name: "Floating Villages", description: "Traditional island communities", duration: "3 hours" }, { name: "Cardamom Mountains", description: "Pristine jungle & wildlife sanctuary", duration: "Full day" }], description: "Experience Cambodia's incredible natural beauty." },
    { title: "Food & Culture Weekend", duration: "2 days", difficulty: "Easy", price: 179, rating: 4.8, aiGuided: true, languages: ["English", "Khmer", "Japanese"], sites: [{ name: "Central Market", description: "Vibrant local food scene", duration: "2 hours" }, { name: "Cooking Class", description: "Learn traditional Khmer cuisine", duration: "3 hours" }, { name: "Night Market Tour", description: "Street food & local experiences", duration: "2.5 hours" }], description: "Taste your way through Cambodia's culinary traditions." },
  ]).onConflictDoNothing();

  await db.insert(events).values([
    { title: "AI & Global Tourism Summit 2026", date: "Nov 12-14, 2026", type: "In-Person", category: "Technology", location: "Phnom Penh, Cambodia", attendees: 0, maxAttendees: 2500, description: "The premier gathering for innovators at the intersection of AI and travel.", featured: true },
    { title: "E-Commerce Automation Mastery", date: "Aug 24, 2026", type: "Webinar", category: "E-commerce", attendees: 0, maxAttendees: 500, description: "Master the latest e-commerce automation strategies.", featured: false },
    { title: "Fintech Integration for Hospitality", date: "Sep 10, 2026", type: "Hybrid", category: "Finance", location: "Siem Reap, Cambodia", attendees: 0, maxAttendees: 300, description: "Explore fintech solutions for the hospitality industry.", featured: false },
    { title: "Sustainable Tourism Data Analytics", date: "Oct 05, 2026", type: "Virtual Workshop", category: "Technology", attendees: 0, maxAttendees: 200, description: "Learn to leverage data for sustainable tourism.", featured: false },
    { title: "Logistics Optimization Summit", date: "Dec 02, 2026", type: "In-Person", category: "Logistics", location: "Bangkok, Thailand", attendees: 0, maxAttendees: 1000, description: "Global summit on logistics and supply chain optimization.", featured: false },
  ]).onConflictDoNothing();

  await db.insert(freelanceGigs).values([
    { title: "React Developer for Booking Dashboard", client: "TravelOS Inc.", type: "Fixed Price", budget: "$1,500 - $2,500", duration: "1 month", tags: ["React", "TypeScript", "Tailwind"], proposals: 12, description: "Build a modern booking dashboard with real-time availability." },
    { title: "UI/UX Designer for Mobile App Redesign", client: "Angkor Explorers", type: "Hourly", budget: "$45 - $65/hr", duration: "3-6 months", tags: ["Figma", "Mobile UI", "Prototyping"], proposals: 34, description: "Redesign the mobile app for a leading tourism company." },
    { title: "Content Writer for Eco-Tourism Blog", client: "Green Cambodia", type: "Fixed Price", budget: "$500", duration: "2 weeks", tags: ["Copywriting", "SEO", "Travel"], proposals: 8, description: "Write engaging blog content about sustainable tourism." },
    { title: "Blockchain Smart Contract Developer", client: "CamboFinance", type: "Fixed Price", budget: "$3,000 - $5,000", duration: "2 months", tags: ["Solidity", "DeFi", "Web3"], proposals: 5, description: "Develop smart contracts for a new DeFi protocol." },
    { title: "Video Editor for Tourism Campaign", client: "Visit Cambodia", type: "Hourly", budget: "$30 - $50/hr", duration: "1 month", tags: ["Premiere Pro", "After Effects", "Motion Graphics"], proposals: 19, description: "Edit promotional videos for national tourism campaign." },
  ]).onConflictDoNothing();

  await db.insert(communityPosts).values([
    { authorName: "Sarah J.", authorRole: "Tourism Operator", authorAvatar: "👩‍💼", title: "How we increased bookings by 40% using the RDTB predictive model", content: "Wanted to share some insights from our recent campaign targeting the Angkor Wat circuit based on the AI forecasting tool. The results were incredible!", likes: 124, comments: 32, tags: ["Growth", "Case Study", "RDTB"] },
    { authorName: "David Chen", authorRole: "Tech Lead", authorAvatar: "👨‍💻", title: "Building custom integrations with the Marketplace API", content: "I've just published a new mini-course on how to connect your existing inventory system to the OnlineGuide Marketplace. Check it out!", likes: 89, comments: 14, tags: ["Development", "API", "Tutorial"] },
    { authorName: "Maria Santos", authorRole: "Content Creator", authorAvatar: "🎨", title: "My journey from freelancer to agency owner using OnlineGuide tools", content: "Started as a solo freelancer two years ago. Now I run a 12-person agency thanks to the platform's creator tools and community support.", likes: 256, comments: 47, tags: ["Success Story", "Creator Economy"] },
    { authorName: "Vuthy Khun", authorRole: "Hotel Manager", authorAvatar: "🏨", title: "Tips for maximizing your hotel's visibility on the platform", content: "After 6 months of optimizing our listing, here are the top strategies that helped us rank higher and get more bookings.", likes: 178, comments: 23, tags: ["Hospitality", "Tips", "Growth"] },
  ]).onConflictDoNothing();

  console.log("Seeding complete!");
  await pool.end();
}

seed().catch(console.error);
