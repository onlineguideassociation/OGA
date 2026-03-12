import {
  Plane, Hotel, Utensils, ShoppingBag, Landmark, Building,
  MapPin, Bot
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MapNode {
  id: string;
  name: string;
  type: "airport" | "city" | "temple" | "market" | "hotel" | "restaurant" | "shop" | "media" | "commerce" | "realestate" | "agriculture" | "skills";
  lat: number;
  lng: number;
  description: string;
  rating?: number;
  revenue?: string;
  aiRecommendation?: string;
  connections?: string[];
}

export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  graphColor: string;
  graphBg: string;
}

export const CAMBODIA_NODES: MapNode[] = [
  { id: "pp-airport", name: "Phnom Penh International Airport", type: "airport", lat: 11.5465, lng: 104.8442, description: "Main international gateway to Cambodia", revenue: "$8.2M", connections: ["pp-city"], aiRecommendation: "Best arrival hub for Southern Cambodia tour" },
  { id: "sr-airport", name: "Siem Reap International Airport", type: "airport", lat: 13.4107, lng: 103.8126, description: "Gateway to Angkor temples", revenue: "$5.1M", connections: ["sr-city"], aiRecommendation: "Direct flights from Bangkok, Seoul, Singapore" },
  { id: "pp-city", name: "Phnom Penh", type: "city", lat: 11.5564, lng: 104.9282, description: "Capital city of Cambodia", revenue: "$24M", connections: ["pp-airport", "royal-palace", "central-market", "malis", "raffles"], aiRecommendation: "AI suggests 2-day cultural deep dive" },
  { id: "sr-city", name: "Siem Reap", type: "city", lat: 13.3633, lng: 103.8564, description: "Gateway to the Angkor temples", revenue: "$32M", connections: ["sr-airport", "angkor-wat", "bayon", "old-market", "cuisine-wd", "shinta-mani", "silk-shop"], aiRecommendation: "3-day temple circuit recommended by AI" },
  { id: "angkor-wat", name: "Angkor Wat", type: "temple", lat: 13.4125, lng: 103.8670, description: "World's largest religious monument, UNESCO Heritage", rating: 4.9, revenue: "$2.4k", connections: ["sr-city", "bayon", "ta-prohm", "heritage-photo"], aiRecommendation: "Sunrise visit at 5:30am optimal. Avg 2.5hr visit." },
  { id: "bayon", name: "Bayon Temple", type: "temple", lat: 13.4411, lng: 103.8600, description: "Famous for its serene stone faces", rating: 4.8, revenue: "$1.8k", connections: ["angkor-wat", "sr-city"], aiRecommendation: "Best lighting for photos: 7-9am" },
  { id: "royal-palace", name: "Royal Palace", type: "temple", lat: 11.5619, lng: 104.9312, description: "Official residence of the King of Cambodia", rating: 4.7, revenue: "$1.2k", connections: ["pp-city"], aiRecommendation: "Pair with Silver Pagoda visit. Allow 2hrs." },
  { id: "ta-prohm", name: "Ta Prohm", type: "temple", lat: 13.4350, lng: 103.8891, description: "The 'Tomb Raider' temple with jungle roots", rating: 4.8, revenue: "$1.6k", connections: ["angkor-wat"], aiRecommendation: "Less crowded after 3pm" },
  { id: "central-market", name: "Central Market", type: "market", lat: 11.5710, lng: 104.9224, description: "Art deco market with local goods", rating: 4.3, revenue: "$890", connections: ["pp-city", "artisan-shop"], aiRecommendation: "Best for silk, spices, and souvenirs" },
  { id: "old-market", name: "Old Market (Phsar Chas)", type: "market", lat: 13.3530, lng: 103.8573, description: "Bustling market in Siem Reap center", rating: 4.4, revenue: "$1.1k", connections: ["sr-city", "night-market", "silk-shop"], aiRecommendation: "Morning visits best for fresh produce" },
  { id: "night-market", name: "Angkor Night Market", type: "market", lat: 13.3582, lng: 103.8553, description: "Evening shopping with crafts and food stalls", rating: 4.2, revenue: "$720", connections: ["sr-city", "old-market"], aiRecommendation: "Opens 5pm. Best souvenir prices after 8pm." },
  { id: "raffles", name: "Raffles Hotel Le Royal", type: "hotel", lat: 11.5730, lng: 104.9210, description: "Historic luxury hotel in Phnom Penh", rating: 4.9, revenue: "$4.5M", connections: ["pp-city"], aiRecommendation: "Top pick for luxury travelers. Book 30d ahead." },
  { id: "shinta-mani", name: "Shinta Mani Angkor", type: "hotel", lat: 13.3610, lng: 103.8580, description: "Award-winning boutique hotel near temples", rating: 4.8, revenue: "$2.8M", connections: ["sr-city"], aiRecommendation: "Best value luxury in Siem Reap" },
  { id: "malis", name: "Malis Restaurant", type: "restaurant", lat: 11.5599, lng: 104.9350, description: "Fine Khmer dining by celebrity chef Luu Meng", rating: 4.8, revenue: "$320k", connections: ["pp-city"], aiRecommendation: "Reserve 2 days ahead. Try the Fish Amok." },
  { id: "cuisine-wd", name: "Cuisine Wat Damnak", type: "restaurant", lat: 13.3508, lng: 103.8571, description: "Innovative Cambodian cuisine with local ingredients", rating: 4.9, revenue: "$280k", connections: ["sr-city"], aiRecommendation: "6-course tasting menu highly rated" },
  { id: "silk-shop", name: "Artisans Angkor", type: "shop", lat: 13.3555, lng: 103.8590, description: "Premium Cambodian silk and crafts workshop", rating: 4.7, revenue: "$450k", connections: ["sr-city", "old-market"], aiRecommendation: "Free workshop tours available daily" },
  { id: "heritage-photo", name: "Heritage Photo Tours", type: "media", lat: 13.39, lng: 103.84, description: "Professional photography tours across Angkor complex", revenue: "$450", connections: ["angkor-wat", "artisan-shop"], aiRecommendation: "High content-to-commerce conversion rate" },
  { id: "artisan-shop", name: "Artisan Commerce Hub", type: "commerce", lat: 11.56, lng: 104.95, description: "E-commerce platform for Cambodian artisan products", revenue: "$1.1k", connections: ["central-market", "heritage-photo"], aiRecommendation: "Product listings growing 18% month-over-month" },
  { id: "resort-land", name: "Coastal Resort Development", type: "realestate", lat: 10.63, lng: 103.52, description: "Eco-resort development on Koh Rong Sanloem", revenue: "$50k", connections: ["eco-farm"], aiRecommendation: "Sustainable tourism investment opportunity" },
  { id: "eco-farm", name: "Battambang Eco Farm", type: "agriculture", lat: 13.10, lng: 103.20, description: "Organic farm-to-table experience near Battambang", revenue: "$3.2k", connections: ["resort-land"], aiRecommendation: "Agro-tourism growing 25% YoY in region" },
  { id: "ai-mentor", name: "AI Tourism Mentor", type: "skills", lat: 12.50, lng: 105.50, description: "AI-powered guide training and certification platform", revenue: "$5k", connections: ["angkor-wat", "sr-city", "pp-city"], aiRecommendation: "Upskilling 200+ guides with AI-assisted certification" },
];

export const NODE_TYPES: readonly NodeTypeConfig[] = [
  { type: "airport", label: "Airports", icon: Plane, color: "bg-blue-500", textColor: "text-blue-600", graphColor: "#3b82f6", graphBg: "#eff6ff" },
  { type: "city", label: "Cities", icon: Building, color: "bg-slate-700", textColor: "text-slate-700", graphColor: "#64748b", graphBg: "#f8fafc" },
  { type: "temple", label: "Temples", icon: Landmark, color: "bg-amber-500", textColor: "text-amber-600", graphColor: "#f59e0b", graphBg: "#fffbeb" },
  { type: "market", label: "Markets", icon: ShoppingBag, color: "bg-green-500", textColor: "text-green-600", graphColor: "#22c55e", graphBg: "#f0fdf4" },
  { type: "hotel", label: "Hotels", icon: Hotel, color: "bg-purple-500", textColor: "text-purple-600", graphColor: "#a855f7", graphBg: "#faf5ff" },
  { type: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-red-500", textColor: "text-red-600", graphColor: "#ef4444", graphBg: "#fef2f2" },
  { type: "shop", label: "Shops", icon: ShoppingBag, color: "bg-pink-500", textColor: "text-pink-600", graphColor: "#ec4899", graphBg: "#fdf2f8" },
  { type: "media", label: "Media", icon: MapPin, color: "bg-violet-500", textColor: "text-violet-600", graphColor: "#8b5cf6", graphBg: "#f5f3ff" },
  { type: "commerce", label: "Commerce", icon: ShoppingBag, color: "bg-emerald-500", textColor: "text-emerald-600", graphColor: "#10b981", graphBg: "#ecfdf5" },
  { type: "realestate", label: "Real Estate", icon: Building, color: "bg-orange-500", textColor: "text-orange-600", graphColor: "#f97316", graphBg: "#fff7ed" },
  { type: "agriculture", label: "Agriculture", icon: MapPin, color: "bg-lime-600", textColor: "text-lime-600", graphColor: "#65a30d", graphBg: "#f7fee7" },
  { type: "skills", label: "Skills & AI", icon: Bot, color: "bg-cyan-500", textColor: "text-cyan-600", graphColor: "#06b6d4", graphBg: "#ecfeff" },
] as const;

export function getNodeConfig(type: string) {
  return NODE_TYPES.find(nt => nt.type === type) || NODE_TYPES[0];
}

export const MAP_BOUNDS = { minLat: 10.0, maxLat: 14.8, minLng: 102.0, maxLng: 107.0 };

export function toX(lng: number) {
  return ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
}

export function toY(lat: number) {
  return ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
}
