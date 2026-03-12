import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star, Search, MapPin, Clock, Heart, Share2, CheckCircle, MessageSquare,
  Camera, Compass, Hotel, Palette, Mountain, BarChart3, Globe, Users,
  TrendingUp, Shield, ArrowRight, X, Calendar, DollarSign, Eye, Phone,
  Plus, Filter, ChevronDown, Award, Languages, Car, ShoppingBag, Zap
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

type ListingCategory = "All" | "Tours & Activities" | "Hotels & Stays" | "Local Experiences" | "Adventure & Outdoor" | "Travel Services" | "Transport" | "Products & Gear";

const CATEGORIES: { key: ListingCategory; icon: React.ElementType; color: string; count: number }[] = [
  { key: "All", icon: Globe, color: "text-slate-600", count: 16 },
  { key: "Tours & Activities", icon: Compass, color: "text-blue-600", count: 4 },
  { key: "Hotels & Stays", icon: Hotel, color: "text-amber-600", count: 3 },
  { key: "Local Experiences", icon: Palette, color: "text-pink-600", count: 3 },
  { key: "Adventure & Outdoor", icon: Mountain, color: "text-emerald-600", count: 2 },
  { key: "Travel Services", icon: BarChart3, color: "text-indigo-600", count: 2 },
  { key: "Transport", icon: Car, color: "text-orange-600", count: 1 },
  { key: "Products & Gear", icon: ShoppingBag, color: "text-purple-600", count: 1 },
];

interface Listing {
  id: number;
  title: string;
  seller: string;
  avatar: string;
  location: string;
  province: string;
  category: ListingCategory;
  price: number;
  priceType: "per person" | "per night" | "per day" | "per trip" | "fixed" | "per hour";
  negotiable: boolean;
  rating: number;
  reviews: number;
  views: number;
  image: string;
  description: string;
  tags: string[];
  verified: boolean;
  featured: boolean;
  posted: string;
  languages: string[];
  contactType: "Message" | "Call" | "WhatsApp";
}

const LISTINGS: Listing[] = [
  {
    id: 1, title: "Angkor Wat Sunrise Private Tour with Tuk-Tuk", seller: "Sokha Tours", avatar: "🧭",
    location: "Siem Reap", province: "Siem Reap", category: "Tours & Activities",
    price: 25, priceType: "per person", negotiable: true, rating: 4.9, reviews: 487, views: 2340,
    image: "🏛️", description: "Private sunrise tour of Angkor Wat, Bayon, and Ta Prohm. Includes tuk-tuk transport, cold water, and local guide. Small group or private available.",
    tags: ["Sunrise", "Angkor Wat", "Private Tour"], verified: true, featured: true, posted: "2 days ago",
    languages: ["English", "Khmer", "Mandarin"], contactType: "WhatsApp",
  },
  {
    id: 2, title: "Boutique Guesthouse in Old Market Area", seller: "Srey Mao Guesthouse", avatar: "🏠",
    location: "Siem Reap", province: "Siem Reap", category: "Hotels & Stays",
    price: 18, priceType: "per night", negotiable: true, rating: 4.6, reviews: 124, views: 890,
    image: "🛏️", description: "Clean, comfortable rooms in the heart of Old Market. AC, WiFi, hot shower, and breakfast included. Walking distance to Pub Street and Night Market.",
    tags: ["Guesthouse", "Central", "Breakfast Included"], verified: true, featured: false, posted: "1 week ago",
    languages: ["English", "Khmer"], contactType: "Message",
  },
  {
    id: 3, title: "Khmer Cooking Class with Market Tour", seller: "Chef Channary", avatar: "👩‍🍳",
    location: "Phnom Penh", province: "Phnom Penh", category: "Local Experiences",
    price: 22, priceType: "per person", negotiable: false, rating: 4.8, reviews: 256, views: 1560,
    image: "🥘", description: "Learn to cook 4 authentic Khmer dishes. Start at the local market to buy fresh ingredients, then cook in a traditional kitchen. Recipes included.",
    tags: ["Cooking Class", "Market Tour", "Khmer Food"], verified: true, featured: true, posted: "3 days ago",
    languages: ["English", "Khmer", "French"], contactType: "WhatsApp",
  },
  {
    id: 4, title: "Kampot Kayaking & Pepper Farm Day Trip", seller: "Adventure Kampot", avatar: "🛶",
    location: "Kampot", province: "Kampot", category: "Adventure & Outdoor",
    price: 35, priceType: "per person", negotiable: true, rating: 4.7, reviews: 98, views: 720,
    image: "🛶", description: "Full-day adventure: kayak along the Kampot River, visit a traditional pepper farm, and enjoy a picnic lunch by the riverside. All equipment provided.",
    tags: ["Kayaking", "Pepper Farm", "Day Trip"], verified: true, featured: false, posted: "5 days ago",
    languages: ["English"], contactType: "Call",
  },
  {
    id: 5, title: "Professional Photography Tour - Golden Hour Phnom Penh", seller: "Dara Photography", avatar: "📸",
    location: "Phnom Penh", province: "Phnom Penh", category: "Local Experiences",
    price: 45, priceType: "per hour", negotiable: false, rating: 5.0, reviews: 67, views: 450,
    image: "📷", description: "Capture stunning photos of Phnom Penh during golden hour. Royal Palace, riverside, colonial architecture. 30+ edited digital photos delivered next day.",
    tags: ["Photography", "Golden Hour", "Portrait"], verified: true, featured: false, posted: "1 day ago",
    languages: ["English", "Khmer", "Japanese"], contactType: "Message",
  },
  {
    id: 6, title: "Eco-Homestay in Mondulkiri Highlands", seller: "Bunong Community Stay", avatar: "🌿",
    location: "Sen Monorom", province: "Mondulkiri", category: "Hotels & Stays",
    price: 12, priceType: "per night", negotiable: false, rating: 4.5, reviews: 42, views: 380,
    image: "🏡", description: "Authentic Bunong community homestay. Sleep in a traditional longhouse, eat local meals, and experience indigenous culture. Guides available for forest treks.",
    tags: ["Homestay", "Indigenous", "Eco-Tourism"], verified: true, featured: false, posted: "2 weeks ago",
    languages: ["English", "Khmer", "Bunong"], contactType: "Call",
  },
  {
    id: 7, title: "Custom Cambodia Itinerary Planning Service", seller: "PlanMyTrip.kh", avatar: "📋",
    location: "Phnom Penh", province: "Phnom Penh", category: "Travel Services",
    price: 30, priceType: "per trip", negotiable: true, rating: 4.8, reviews: 189, views: 1200,
    image: "🗺️", description: "Personalized itinerary for your Cambodia trip. Includes hotel recommendations, transport planning, restaurant list, and daily schedule. Delivered in 24 hours.",
    tags: ["Itinerary", "Planning", "Custom"], verified: true, featured: true, posted: "4 days ago",
    languages: ["English", "Mandarin", "Korean"], contactType: "WhatsApp",
  },
  {
    id: 8, title: "Sihanoukville Island Hopping Boat Tour", seller: "Captain Kosal", avatar: "⛵",
    location: "Sihanoukville", province: "Preah Sihanouk", category: "Tours & Activities",
    price: 28, priceType: "per person", negotiable: true, rating: 4.6, reviews: 156, views: 980,
    image: "🏝️", description: "Visit 3 islands: Koh Rong Sanloem, Koh Thmei, and a secret beach. Snorkeling gear, lunch, and drinks included. Departs 8am returns 5pm.",
    tags: ["Island Hopping", "Snorkeling", "Beach"], verified: true, featured: false, posted: "6 days ago",
    languages: ["English", "Khmer"], contactType: "Call",
  },
  {
    id: 9, title: "Apsara Dance Performance & Traditional Dinner", seller: "Khmer Arts Collective", avatar: "💃",
    location: "Siem Reap", province: "Siem Reap", category: "Local Experiences",
    price: 35, priceType: "per person", negotiable: false, rating: 4.9, reviews: 312, views: 2100,
    image: "🎭", description: "Traditional Apsara dance performance with authentic Khmer dinner buffet. 6 dance acts, live music, and a 5-course meal featuring local specialties.",
    tags: ["Apsara Dance", "Cultural Show", "Dinner"], verified: true, featured: true, posted: "1 day ago",
    languages: ["English", "Khmer", "French", "Japanese"], contactType: "Message",
  },
  {
    id: 10, title: "Mountain Bike Tour: Battambang Countryside", seller: "Pedal Cambodia", avatar: "🚲",
    location: "Battambang", province: "Battambang", category: "Adventure & Outdoor",
    price: 20, priceType: "per person", negotiable: true, rating: 4.7, reviews: 78, views: 520,
    image: "🚵", description: "Cycle through Battambang's beautiful countryside. Visit temples, rice paddies, and local villages. Bike, helmet, water, and snacks included. 25km route.",
    tags: ["Cycling", "Countryside", "Villages"], verified: true, featured: false, posted: "1 week ago",
    languages: ["English", "French"], contactType: "WhatsApp",
  },
  {
    id: 11, title: "Airport Transfer Service - Phnom Penh & Siem Reap", seller: "SafeRide Cambodia", avatar: "🚗",
    location: "Phnom Penh", province: "Phnom Penh", category: "Transport",
    price: 15, priceType: "per trip", negotiable: false, rating: 4.4, reviews: 523, views: 3400,
    image: "🚐", description: "Reliable airport pickup and drop-off in Phnom Penh and Siem Reap. Clean car, AC, English-speaking driver. Available 24/7. Book 24 hours in advance.",
    tags: ["Airport Transfer", "Private Car", "24/7"], verified: true, featured: false, posted: "3 days ago",
    languages: ["English", "Khmer"], contactType: "WhatsApp",
  },
  {
    id: 12, title: "Handwoven Silk Scarves from Takeo Province", seller: "Silk Village Artisans", avatar: "🧣",
    location: "Takeo", province: "Takeo", category: "Products & Gear",
    price: 18, priceType: "fixed", negotiable: true, rating: 4.8, reviews: 89, views: 670,
    image: "🧶", description: "Authentic handwoven Cambodian silk scarves made by village artisans in Takeo. Traditional Khmer patterns. Each scarf takes 2 weeks to weave. Ships nationwide.",
    tags: ["Silk", "Handwoven", "Artisan"], verified: true, featured: false, posted: "2 weeks ago",
    languages: ["English", "Khmer"], contactType: "Message",
  },
  {
    id: 13, title: "Phnom Penh Night Life & Street Food Walking Tour", seller: "PP Night Tours", avatar: "🌙",
    location: "Phnom Penh", province: "Phnom Penh", category: "Tours & Activities",
    price: 18, priceType: "per person", negotiable: false, rating: 4.7, reviews: 201, views: 1340,
    image: "🍜", description: "Explore Phnom Penh after dark! Visit 5 street food stalls, try local snacks, see illuminated landmarks, and end at a rooftop bar. 3-hour walking tour.",
    tags: ["Night Tour", "Street Food", "Walking"], verified: true, featured: false, posted: "2 days ago",
    languages: ["English", "Khmer"], contactType: "WhatsApp",
  },
  {
    id: 14, title: "Licensed Khmer/English Tour Guide for Hire", seller: "Virak Professional Guides", avatar: "🎓",
    location: "Siem Reap", province: "Siem Reap", category: "Travel Services",
    price: 50, priceType: "per day", negotiable: true, rating: 4.9, reviews: 345, views: 1890,
    image: "🧑‍🏫", description: "Ministry-licensed professional tour guide available for Angkor temples, city tours, and countryside excursions. 10+ years experience. Fluent English and Mandarin.",
    tags: ["Licensed Guide", "Professional", "Angkor"], verified: true, featured: true, posted: "1 day ago",
    languages: ["English", "Khmer", "Mandarin"], contactType: "Call",
  },
  {
    id: 15, title: "Beachfront Bungalow - Otres Beach", seller: "Otres Chill", avatar: "🏖️",
    location: "Sihanoukville", province: "Preah Sihanouk", category: "Hotels & Stays",
    price: 35, priceType: "per night", negotiable: true, rating: 4.5, reviews: 67, views: 490,
    image: "🌅", description: "Beachfront wooden bungalow on quiet Otres Beach. Private balcony with hammock, ocean view, fan/AC options. Beach bar and restaurant on site.",
    tags: ["Beachfront", "Bungalow", "Ocean View"], verified: true, featured: false, posted: "1 week ago",
    languages: ["English", "Khmer", "Russian"], contactType: "Message",
  },
  {
    id: 16, title: "Bamboo Train Experience & Killing Caves Tour", seller: "Battambang Discovery", avatar: "🚂",
    location: "Battambang", province: "Battambang", category: "Tours & Activities",
    price: 22, priceType: "per person", negotiable: true, rating: 4.6, reviews: 134, views: 870,
    image: "🚃", description: "Ride the famous Bamboo Train, visit Phnom Sampeau killing caves, and see millions of bats fly out at sunset. Half-day tour with tuk-tuk transport.",
    tags: ["Bamboo Train", "Bat Cave", "Half Day"], verified: true, featured: false, posted: "4 days ago",
    languages: ["English", "Khmer", "French"], contactType: "WhatsApp",
  },
];

const PROVINCES = ["All Provinces", "Siem Reap", "Phnom Penh", "Kampot", "Battambang", "Mondulkiri", "Preah Sihanouk", "Takeo"];
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Viewed"] as const;

export default function LocalMarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory>("All");
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]>("Newest");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState<Listing | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let result = LISTINGS.filter(l => {
      const matchCat = selectedCategory === "All" || l.category === selectedCategory;
      const matchProv = selectedProvince === "All Provinces" || l.province === selectedProvince;
      const matchSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase()) || l.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchProv && matchSearch;
    });
    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Top Rated": result.sort((a, b) => b.rating - a.rating); break;
      case "Most Viewed": result.sort((a, b) => b.views - a.views); break;
    }
    return result;
  }, [selectedCategory, selectedProvince, searchQuery, sortBy]);

  const featured = LISTINGS.filter(l => l.featured);
  const totalViews = LISTINGS.reduce((s, l) => s + l.views, 0);
  const totalReviews = LISTINGS.reduce((s, l) => s + l.reviews, 0);

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast({ title: savedIds.includes(id) ? "Removed from saved" : "Listing saved!" });
  };

  return (
    <div className="space-y-6" data-testid="local-marketplace-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#C1121F] to-rose-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <MapPin className="h-3 w-3 mr-1.5" /> Cambodia Local Marketplace
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-local-title">
          Buy, Sell & Book Local Travel Services
        </h2>
        <p className="text-sm text-slate-500">
          Cambodia's tourism classifieds. Connect directly with local guides, tour operators, and travel businesses across the Kingdom.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-[#C1121F]/10 to-[#C1121F]/5 border border-[#C1121F]/15 rounded-xl p-3 text-center">
          <ShoppingBag className="h-4 w-4 text-[#C1121F] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{LISTINGS.length}</div>
          <div className="text-[9px] text-slate-500">Active Listings</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-center">
          <MapPin className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{PROVINCES.length - 1}</div>
          <div className="text-[9px] text-slate-500">Provinces Covered</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Eye className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalViews.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Monthly Views</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <Star className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalReviews.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Verified Reviews</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text" placeholder="Search tours, stays, services..."
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            data-testid="input-search-local"
          />
        </div>
        <select value={selectedProvince} onChange={e => setSelectedProvince(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700 outline-none" data-testid="select-province">
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof SORT_OPTIONS[number])}
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700 outline-none" data-testid="select-sort-local">
          {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <Button onClick={() => setShowPostModal(true)} className="bg-[#C1121F] hover:bg-[#a30f1a] text-white font-semibold rounded-xl h-10 px-5" data-testid="btn-post-listing">
          <Plus className="h-4 w-4 mr-1.5" /> Post Listing
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map(({ key, icon: Icon, color, count }) => {
          const isActive = selectedCategory === key;
          return (
            <button key={key} onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive ? "bg-[#C1121F] text-white border-[#C1121F] shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-[#C1121F]/50 hover:bg-red-50"
              }`}
              data-testid={`filter-local-${key.toLowerCase().replace(/[\s&]/g, "-")}`}>
              <Icon className={`h-3 w-3 ${isActive ? "text-white" : color}`} /> {key}
              <span className={`text-[9px] ${isActive ? "text-white/70" : "text-slate-400"}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {selectedCategory === "All" && !searchQuery && selectedProvince === "All Provinces" && (
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" /> Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(listing => (
              <Card key={listing.id} className="overflow-hidden border-2 border-amber-200/50 hover:border-amber-300 transition-all hover:shadow-lg group">
                <div className="h-32 bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center relative">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{listing.image}</span>
                  <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0 text-[9px]"><Zap className="h-2.5 w-2.5 mr-0.5" /> Featured</Badge>
                  <button onClick={() => toggleSave(listing.id)}
                    className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition-all ${savedIds.includes(listing.id) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-400 hover:text-rose-500"}`}
                    data-testid={`btn-save-local-${listing.id}`}>
                    <Heart className={`h-3.5 w-3.5 ${savedIds.includes(listing.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3 text-[#C1121F]" /> {listing.location}</span>
                    <Badge variant="outline" className="text-[8px]">{listing.category}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{listing.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#C1121F]">${listing.price}</span>
                    <span className="text-[10px] text-slate-400">{listing.priceType}</span>
                    {listing.negotiable && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px]">Negotiable</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {listing.rating}</span>
                    <span>({listing.reviews} reviews)</span>
                    <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {listing.posted}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t p-3 flex gap-2">
                  <Button onClick={() => setShowContactModal(listing)} className="flex-1 bg-[#C1121F] hover:bg-[#a30f1a] text-white h-8 text-xs font-bold rounded-lg" data-testid={`btn-contact-${listing.id}`}>
                    <MessageSquare className="h-3 w-3 mr-1" /> Contact
                  </Button>
                  <Button variant="outline" onClick={() => { }} className="h-8 px-3 rounded-lg"><Share2 className="h-3 w-3" /></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-3">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} {selectedCategory !== "All" ? `in ${selectedCategory}` : ""} {selectedProvince !== "All Provinces" ? `in ${selectedProvince}` : ""}
        </h3>
        <div className="space-y-3">
          {filtered.map(listing => (
            <Card key={listing.id} className="overflow-hidden border hover:border-[#C1121F]/30 transition-all hover:shadow-md group" data-testid={`card-listing-${listing.id}`}>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-40 h-32 md:h-auto bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center relative flex-shrink-0">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{listing.image}</span>
                  {listing.verified && <Badge className="absolute bottom-2 left-2 bg-emerald-500 text-white border-0 text-[8px]"><CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Verified</Badge>}
                  <button onClick={() => toggleSave(listing.id)}
                    className={`absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center transition-all ${savedIds.includes(listing.id) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-400 hover:text-rose-500"}`}>
                    <Heart className={`h-3 w-3 ${savedIds.includes(listing.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3 text-[#C1121F]" /> {listing.location}, {listing.province}</span>
                        <Badge variant="outline" className="text-[8px]">{listing.category}</Badge>
                        <span className="text-[9px] text-slate-400 flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {listing.posted}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{listing.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-2">{listing.description}</p>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {listing.tags.map(tag => <Badge key={tag} variant="outline" className="text-[8px] px-1.5 py-0 text-slate-500 border-slate-200">{tag}</Badge>)}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {listing.rating} ({listing.reviews})</span>
                        <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" /> {listing.views} views</span>
                        <span className="flex items-center gap-0.5"><Languages className="h-3 w-3" /> {listing.languages.join(", ")}</span>
                        <span className="flex items-center gap-0.5">{listing.avatar} {listing.seller}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold text-[#C1121F]">${listing.price}</div>
                      <div className="text-[9px] text-slate-400">{listing.priceType}</div>
                      {listing.negotiable && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px] mt-1">Negotiable</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button onClick={() => setShowContactModal(listing)} size="sm" className="bg-[#C1121F] hover:bg-[#a30f1a] text-white text-xs font-bold h-8 px-4 rounded-lg" data-testid={`btn-contact-list-${listing.id}`}>
                      <MessageSquare className="h-3 w-3 mr-1" /> Contact Seller
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg px-3" data-testid={`btn-book-local-${listing.id}`}>
                      <Calendar className="h-3 w-3 mr-1" /> Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No listings found. Try different filters or search terms.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-100 bg-gradient-to-br from-red-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-red-100 text-[#C1121F] flex items-center justify-center mx-auto"><Shield className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">Safe & Secure</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Verified sellers, secure payments, and platform-protected communication.</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto"><Languages className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">Khmer & English</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Browse listings in both Khmer and English. Connect with local providers directly.</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto"><MapPin className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">100% Local</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Every listing is from a real Cambodian business or guide. Support local tourism.</p>
          </CardContent>
        </Card>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowContactModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#C1121F] to-rose-600 px-6 py-4 text-white relative">
              <button onClick={() => setShowContactModal(null)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-contact"><X className="h-5 w-5" /></button>
              <div className="flex items-center gap-2 mb-1"><MessageSquare className="h-5 w-5" /><span className="font-bold">Contact Seller</span></div>
              <p className="text-sm text-white/80 line-clamp-1">{showContactModal.title}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="text-3xl">{showContactModal.avatar}</span>
                <div>
                  <div className="text-sm font-bold text-slate-900">{showContactModal.seller}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <MapPin className="h-2.5 w-2.5" /> {showContactModal.location}
                    <Star className="h-2.5 w-2.5 text-amber-400" /> {showContactModal.rating}
                    {showContactModal.verified && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[8px]"><CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Verified</Badge>}
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-[#C1121F]">${showContactModal.price}</span>
                  <span className="text-xs text-slate-400 ml-1">{showContactModal.priceType}</span>
                </div>
                {showContactModal.negotiable && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-xs">Price Negotiable</Badge>}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Your Message</label>
                <textarea placeholder={`Hi ${showContactModal.seller}, I'm interested in "${showContactModal.title}"...`} rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C1121F] resize-none" data-testid="textarea-contact-msg" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: MessageSquare, label: "Message", active: showContactModal.contactType === "Message" },
                  { icon: Phone, label: "Call", active: showContactModal.contactType === "Call" },
                  { icon: Globe, label: "WhatsApp", active: showContactModal.contactType === "WhatsApp" },
                ].map(m => (
                  <button key={m.label} className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                    m.active ? "bg-[#C1121F]/10 border-[#C1121F] text-[#C1121F]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`} data-testid={`btn-method-${m.label.toLowerCase()}`}>
                    <m.icon className="h-3.5 w-3.5" /> {m.label}
                  </button>
                ))}
              </div>
              <Button onClick={() => { toast({ title: "Message sent!", description: `Your message to ${showContactModal.seller} has been delivered.` }); setShowContactModal(null); }}
                className="w-full bg-[#C1121F] hover:bg-[#a30f1a] text-white font-bold h-11 rounded-xl text-sm" data-testid="btn-send-message">
                <MessageSquare className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPostModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#C1121F] to-rose-600 px-6 py-4 text-white relative">
              <button onClick={() => setShowPostModal(false)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-post"><X className="h-5 w-5" /></button>
              <div className="flex items-center gap-2 mb-1"><Plus className="h-5 w-5" /><span className="font-bold">Post a Listing</span></div>
              <p className="text-sm text-white/80">List your tour, service, or accommodation</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Listing Title</label>
                <input type="text" placeholder="e.g. Private Angkor Wat Tour with Tuk-Tuk" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C1121F]" data-testid="input-listing-title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Category</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none bg-white" data-testid="select-listing-category">
                    {CATEGORIES.filter(c => c.key !== "All").map(c => <option key={c.key} value={c.key}>{c.key}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Province</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none bg-white" data-testid="select-listing-province">
                    {PROVINCES.filter(p => p !== "All Provinces").map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Price ($)</label>
                  <input type="number" placeholder="25" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C1121F]" data-testid="input-listing-price" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Price Type</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none bg-white" data-testid="select-price-type">
                    <option>per person</option><option>per night</option><option>per day</option><option>per trip</option><option>fixed</option><option>per hour</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Description</label>
                <textarea placeholder="Describe your service, what's included, and availability..." rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#C1121F] resize-none" data-testid="textarea-listing-desc" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Photos</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-[#C1121F] transition-colors cursor-pointer">
                  <Camera className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Click or drag to upload photos</p>
                </div>
              </div>
              <Button onClick={() => { toast({ title: "Listing posted!", description: "Your listing is now live on the marketplace." }); setShowPostModal(false); }}
                className="w-full bg-[#C1121F] hover:bg-[#a30f1a] text-white font-bold h-11 rounded-xl text-sm" data-testid="btn-submit-listing">
                Post Listing
              </Button>
              <p className="text-[10px] text-slate-400 text-center">Free to post. Your listing will appear immediately after submission.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
