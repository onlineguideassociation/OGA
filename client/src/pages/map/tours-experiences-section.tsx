import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin, Clock, Users, Star, Search, Filter, Globe, Shield, Heart,
  Calendar, ChevronRight, ArrowRight, Camera, Utensils, Waves,
  Mountain, Ticket, Footprints, Loader2, X, CreditCard, CheckCircle,
  Sparkles, TrendingUp, Share2, Languages, Compass, Zap, BookOpen,
  ChevronDown, Award
} from "lucide-react";
import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Tour } from "@shared/schema";

type ExperienceCategory = "All" | "Cultural & Historical" | "Walking & Sightseeing" | "Food & Culinary" | "Water Activities" | "Adventure & Outdoor" | "Tickets & Passes" | "Day Trips";

const CATEGORIES: { key: ExperienceCategory; icon: React.ElementType; color: string }[] = [
  { key: "All", icon: Globe, color: "text-slate-600" },
  { key: "Cultural & Historical", icon: Camera, color: "text-amber-600" },
  { key: "Walking & Sightseeing", icon: Footprints, color: "text-blue-600" },
  { key: "Food & Culinary", icon: Utensils, color: "text-rose-600" },
  { key: "Water Activities", icon: Waves, color: "text-cyan-600" },
  { key: "Adventure & Outdoor", icon: Mountain, color: "text-emerald-600" },
  { key: "Tickets & Passes", icon: Ticket, color: "text-purple-600" },
  { key: "Day Trips", icon: Compass, color: "text-orange-600" },
];

interface ExperienceListing {
  id: number;
  name: string;
  location: string;
  country: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviews: number;
  duration: string;
  category: ExperienceCategory;
  image: string;
  description: string;
  features: string[];
  languages: string[];
  maxGuests: number;
  guideName: string;
  badge?: string;
  instantBooking: boolean;
  freeCancel: boolean;
  pickup: boolean;
  bestSeller: boolean;
}

const EXPERIENCES: ExperienceListing[] = [
  {
    id: 1, name: "Angkor Wat Sunrise Tour", location: "Siem Reap", country: "Cambodia",
    price: 45, originalPrice: 65, currency: "$", rating: 4.9, reviews: 2847, duration: "6 hours",
    category: "Cultural & Historical", image: "🏛️",
    description: "Experience the magical sunrise at Angkor Wat with a professional local guide. Includes hotel pickup, breakfast, and visits to Bayon Temple and Ta Prohm.",
    features: ["Professional local guide", "Hotel pickup & drop-off", "Sunrise viewing", "Breakfast included", "Small group (max 8)"],
    languages: ["English", "Mandarin", "French"], maxGuests: 8, guideName: "Sophea K.",
    badge: "Best Seller", instantBooking: true, freeCancel: true, pickup: true, bestSeller: true,
  },
  {
    id: 2, name: "Phnom Penh Street Food Adventure", location: "Phnom Penh", country: "Cambodia",
    price: 35, currency: "$", rating: 4.8, reviews: 1523, duration: "3.5 hours",
    category: "Food & Culinary", image: "🍜",
    description: "Taste the authentic flavors of Cambodia with a local foodie guide. Visit hidden street food stalls, local markets, and taste 10+ dishes.",
    features: ["Local foodie guide", "10+ food tastings", "Central Market visit", "Vegetarian options", "Small group"],
    languages: ["English", "Khmer"], maxGuests: 12, guideName: "Channary M.",
    instantBooking: true, freeCancel: true, pickup: false, bestSeller: true,
  },
  {
    id: 3, name: "Tonle Sap Floating Village Cruise", location: "Siem Reap", country: "Cambodia",
    price: 55, currency: "$", rating: 4.7, reviews: 982, duration: "4 hours",
    category: "Water Activities", image: "🚤",
    description: "Cruise through the largest freshwater lake in Southeast Asia. Visit floating villages, schools, and markets built entirely on water.",
    features: ["Boat cruise", "Floating village visit", "Local community interaction", "Photo opportunities", "Refreshments"],
    languages: ["English", "Japanese"], maxGuests: 15, guideName: "Dara V.",
    badge: "Top Rated", instantBooking: true, freeCancel: true, pickup: true, bestSeller: false,
  },
  {
    id: 4, name: "Kampot Pepper Farm & Countryside", location: "Kampot", country: "Cambodia",
    price: 68, currency: "$", rating: 4.9, reviews: 645, duration: "Full day",
    category: "Day Trips", image: "🌿",
    description: "Full-day trip to the famous Kampot pepper plantations. Visit organic farms, taste world-renowned pepper varieties, and explore the riverside countryside.",
    features: ["Pepper farm tour", "Tasting session", "Countryside drive", "Lunch included", "Salt fields visit"],
    languages: ["English", "French"], maxGuests: 10, guideName: "Sokha T.",
    instantBooking: true, freeCancel: false, pickup: true, bestSeller: false,
  },
  {
    id: 5, name: "Phnom Penh Historical Walking Tour", location: "Phnom Penh", country: "Cambodia",
    price: 28, currency: "$", rating: 4.6, reviews: 1876, duration: "3 hours",
    category: "Walking & Sightseeing", image: "🚶",
    description: "Walk through Phnom Penh's most significant historical sites including the Royal Palace, Silver Pagoda, National Museum, and colonial architecture.",
    features: ["Expert historian guide", "Royal Palace entry", "National Museum", "Colonial quarter", "Photo stops"],
    languages: ["English", "Mandarin", "Korean"], maxGuests: 15, guideName: "Pisey L.",
    instantBooking: true, freeCancel: true, pickup: false, bestSeller: false,
  },
  {
    id: 6, name: "Angkor Temples Skip-the-Line Pass", location: "Siem Reap", country: "Cambodia",
    price: 37, currency: "$", rating: 4.5, reviews: 3241, duration: "1-3 days",
    category: "Tickets & Passes", image: "🎟️",
    description: "Skip the queue at Angkor Archaeological Park. Includes 1-day, 3-day or 7-day pass options with priority entrance and digital guide.",
    features: ["Skip-the-line entry", "Digital audio guide", "Offline maps", "1/3/7 day options", "QR code ticket"],
    languages: ["English", "Mandarin", "French", "Japanese", "Korean"], maxGuests: 999, guideName: "OnlineGuide.io",
    badge: "Most Popular", instantBooking: true, freeCancel: true, pickup: false, bestSeller: true,
  },
  {
    id: 7, name: "Kulen Mountain Waterfall Trek", location: "Siem Reap", country: "Cambodia",
    price: 75, currency: "$", rating: 4.8, reviews: 412, duration: "8 hours",
    category: "Adventure & Outdoor", image: "🏔️",
    description: "Trek through Phnom Kulen National Park to discover hidden waterfalls, ancient river carvings, and the reclining Buddha statue.",
    features: ["Waterfall swimming", "Ancient carvings", "Reclining Buddha", "Picnic lunch", "4x4 transport"],
    languages: ["English"], maxGuests: 8, guideName: "Narith K.",
    instantBooking: true, freeCancel: true, pickup: true, bestSeller: false,
  },
  {
    id: 8, name: "Battambang Bamboo Train & Temples", location: "Battambang", country: "Cambodia",
    price: 52, originalPrice: 70, currency: "$", rating: 4.7, reviews: 789, duration: "Full day",
    category: "Cultural & Historical", image: "🚂",
    description: "Ride the legendary Bamboo Train, explore ancient temples, and visit traditional villages in Cambodia's cultural heartland.",
    features: ["Bamboo train ride", "Wat Banan temple", "Bat caves", "Village visit", "Local lunch"],
    languages: ["English", "French"], maxGuests: 10, guideName: "Rattana S.",
    badge: "Special Offer", instantBooking: true, freeCancel: true, pickup: true, bestSeller: false,
  },
  {
    id: 9, name: "Siem Reap Cooking Class & Market Tour", location: "Siem Reap", country: "Cambodia",
    price: 42, currency: "$", rating: 4.9, reviews: 1156, duration: "4 hours",
    category: "Food & Culinary", image: "🥘",
    description: "Learn to cook authentic Khmer dishes with a local chef. Start at the morning market, then cook 4 dishes including amok and lok lak.",
    features: ["Market tour", "Cook 4 dishes", "Recipe booklet", "Eat your creations", "Vegetarian option"],
    languages: ["English", "Mandarin"], maxGuests: 10, guideName: "Maly P.",
    bestSeller: true, instantBooking: true, freeCancel: true, pickup: false,
  },
  {
    id: 10, name: "Koh Rong Island Day Trip & Snorkeling", location: "Sihanoukville", country: "Cambodia",
    price: 89, currency: "$", rating: 4.6, reviews: 534, duration: "Full day",
    category: "Water Activities", image: "🏝️",
    description: "Escape to pristine Koh Rong island. Snorkel in crystal-clear waters, relax on white sand beaches, and enjoy a fresh seafood BBQ lunch.",
    features: ["Speedboat transfer", "Snorkeling gear", "Beach time", "Seafood BBQ lunch", "Island hopping"],
    languages: ["English", "Khmer"], maxGuests: 20, guideName: "Vanny C.",
    instantBooking: true, freeCancel: false, pickup: true, bestSeller: false,
  },
  {
    id: 11, name: "Mondulkiri Elephant Sanctuary", location: "Mondulkiri", country: "Cambodia",
    price: 95, currency: "$", rating: 4.9, reviews: 367, duration: "Full day",
    category: "Adventure & Outdoor", image: "🐘",
    description: "Ethical elephant experience at a community-run sanctuary. Walk with elephants in their natural forest habitat, no riding.",
    features: ["Ethical sanctuary", "Forest walk with elephants", "Bunong village visit", "Waterfall swim", "Local lunch"],
    languages: ["English"], maxGuests: 6, guideName: "Chea B.",
    badge: "Eco-Certified", instantBooking: true, freeCancel: true, pickup: true, bestSeller: false,
  },
  {
    id: 12, name: "Chiang Mai Night Market & Temple Tour", location: "Chiang Mai", country: "Thailand",
    price: 32, currency: "$", rating: 4.7, reviews: 2134, duration: "4 hours",
    category: "Walking & Sightseeing", image: "🏯",
    description: "Explore Chiang Mai's illuminated temples at dusk, then dive into the vibrant Night Bazaar for street food and local crafts shopping.",
    features: ["3 temple visits", "Night market tour", "Street food tastings", "Shopping tips", "Photography spots"],
    languages: ["English", "Mandarin", "Thai"], maxGuests: 12, guideName: "Somchai N.",
    instantBooking: true, freeCancel: true, pickup: false, bestSeller: false,
  },
];

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating", "Most Popular"] as const;

export default function ToursExperiencesSection() {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]>("Recommended");
  const [showBookingModal, setShowBookingModal] = useState<ExperienceListing | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<ExperienceListing | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let result = EXPERIENCES.filter(e => {
      const matchCat = selectedCategory === "All" || e.category === selectedCategory;
      const matchSearch = !searchQuery || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Rating": result.sort((a, b) => b.rating - a.rating); break;
      case "Most Popular": result.sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalExperiences = EXPERIENCES.length;
  const avgRating = (EXPERIENCES.reduce((s, e) => s + e.rating, 0) / totalExperiences).toFixed(1);
  const totalReviews = EXPERIENCES.reduce((s, e) => s + e.reviews, 0);
  const bestSellers = EXPERIENCES.filter(e => e.bestSeller).length;

  const handleBook = () => {
    if (showBookingModal) {
      toast({ title: "Booking confirmed!", description: `"${showBookingModal.name}" booked for ${guestCount} guest(s).` });
      setShowBookingModal(null);
      setSelectedDate("");
      setGuestCount(2);
    }
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast({ title: savedIds.includes(id) ? "Removed from wishlist" : "Saved to wishlist!" });
  };

  const handleShare = (exp: ExperienceListing) => {
    if (navigator.share) {
      navigator.share({ title: exp.name, text: exp.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!", description: "Experience link copied to clipboard." });
    }
  };

  return (
    <div className="space-y-6" data-testid="tours-experiences-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#0081C9] to-[#006ba3] border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Compass className="h-3 w-3 mr-1.5" /> Tours & Experiences Marketplace
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-tours-title">
          Discover Things to Do
        </h2>
        <p className="text-sm text-slate-500">
          Book tours, activities, and travel experiences from verified local operators across Southeast Asia.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-[#0081C9]/10 to-[#0081C9]/5 border border-[#0081C9]/15 rounded-xl p-3 text-center">
          <Compass className="h-4 w-4 text-[#0081C9] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalExperiences}</div>
          <div className="text-[9px] text-slate-500">Experiences</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Star className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{avgRating}</div>
          <div className="text-[9px] text-slate-500">Avg Rating</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <Users className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalReviews.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Verified Reviews</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/15 rounded-xl p-3 text-center">
          <TrendingUp className="h-4 w-4 text-rose-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{bestSellers}</div>
          <div className="text-[9px] text-slate-500">Best Sellers</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tours, activities, or destinations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            data-testid="input-search-tours"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof SORT_OPTIONS[number])}
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700 outline-none"
            data-testid="select-sort-tours"
          >
            {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map(({ key, icon: Icon, color }) => {
          const isActive = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? "bg-[#0081C9] text-white border-[#0081C9] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/50 hover:bg-blue-50"
              }`}
              data-testid={`filter-tour-${key.toLowerCase().replace(/[\s&]/g, "-")}`}
            >
              <Icon className={`h-3 w-3 ${isActive ? "text-white" : color}`} /> {key}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800">
            {filtered.length} experience{filtered.length !== 1 ? "s" : ""} {selectedCategory !== "All" ? `in ${selectedCategory}` : "available"}
          </h3>
        </div>

        <div className="space-y-4">
          {filtered.map((exp) => (
            <Card key={exp.id} className="overflow-hidden border hover:border-[#0081C9]/30 transition-all hover:shadow-lg group">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-40 md:h-auto bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center relative flex-shrink-0">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{exp.image}</span>
                  {exp.badge && (
                    <Badge className={`absolute top-2 left-2 text-white border-0 text-[9px] ${
                      exp.badge === "Best Seller" ? "bg-rose-500" :
                      exp.badge === "Top Rated" ? "bg-amber-500" :
                      exp.badge === "Most Popular" ? "bg-[#0081C9]" :
                      exp.badge === "Special Offer" ? "bg-emerald-500" :
                      exp.badge === "Eco-Certified" ? "bg-green-600" : "bg-slate-500"
                    }`}>
                      {exp.badge === "Best Seller" && <TrendingUp className="h-2.5 w-2.5 mr-0.5" />}
                      {exp.badge === "Top Rated" && <Star className="h-2.5 w-2.5 mr-0.5" />}
                      {exp.badge === "Most Popular" && <Users className="h-2.5 w-2.5 mr-0.5" />}
                      {exp.badge === "Special Offer" && <Sparkles className="h-2.5 w-2.5 mr-0.5" />}
                      {exp.badge === "Eco-Certified" && <Shield className="h-2.5 w-2.5 mr-0.5" />}
                      {exp.badge}
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleSave(exp.id)}
                    className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                      savedIds.includes(exp.id) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-400 hover:text-rose-500"
                    }`}
                    data-testid={`btn-save-${exp.id}`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${savedIds.includes(exp.id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-500">
                          <MapPin className="h-3 w-3 text-[#0081C9]" /> {exp.location}, {exp.country}
                        </span>
                        <Badge variant="outline" className="text-[9px] px-1.5 text-slate-500 border-slate-200">{exp.category}</Badge>
                      </div>
                      <h3
                        className="text-sm font-bold text-slate-900 hover:text-[#0081C9] cursor-pointer transition-colors"
                        onClick={() => setShowDetailModal(exp)}
                        data-testid={`link-tour-${exp.id}`}
                      >
                        {exp.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{exp.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-slate-900">{exp.rating}</span>
                        <span className="text-[10px] text-slate-400">({exp.reviews.toLocaleString()})</span>
                      </div>
                      {exp.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">{exp.currency}{exp.originalPrice}</span>
                      )}
                      <div className="text-lg font-bold text-slate-900">
                        {exp.currency}{exp.price}
                        <span className="text-[10px] text-slate-400 font-normal"> /person</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exp.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Max {exp.maxGuests}</span>
                    <span className="flex items-center gap-1"><Languages className="h-3 w-3" /> {exp.languages.join(", ")}</span>
                    <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {exp.guideName}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {exp.instantBooking && (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] px-1.5 gap-0.5">
                        <Zap className="h-2.5 w-2.5" /> Instant Booking
                      </Badge>
                    )}
                    {exp.freeCancel && (
                      <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-[9px] px-1.5 gap-0.5">
                        <CheckCircle className="h-2.5 w-2.5" /> Free Cancellation
                      </Badge>
                    )}
                    {exp.pickup && (
                      <Badge className="bg-purple-50 text-purple-600 border-purple-100 text-[9px] px-1.5 gap-0.5">
                        <MapPin className="h-2.5 w-2.5" /> Hotel Pickup
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      onClick={() => setShowBookingModal(exp)}
                      className="bg-[#0081C9] hover:bg-[#006ba3] text-white h-8 text-xs font-bold rounded-lg px-4"
                      data-testid={`btn-book-${exp.id}`}
                    >
                      <Calendar className="h-3 w-3 mr-1" /> Book Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowDetailModal(exp)}
                      className="h-8 text-xs rounded-lg px-3"
                      data-testid={`btn-details-${exp.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleShare(exp)}
                      className="h-8 px-2"
                      data-testid={`btn-share-tour-${exp.id}`}
                    >
                      <Share2 className="h-3 w-3" />
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
            <p className="text-sm">No experiences found. Try a different category or search term.</p>
          </div>
        )}
      </div>

      <Card className="border-[#0081C9]/20 bg-gradient-to-r from-[#0081C9]/5 to-indigo-500/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Are you a tour operator?</h3>
              <p className="text-sm text-slate-500">List your tours and experiences on OnlineGuide.io. Reach millions of travelers worldwide through our global distribution network.</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Free to list</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Commission-based</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Global reach</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Booking tools</span>
              </div>
            </div>
            <Button className="bg-[#0081C9] hover:bg-[#006ba3] text-white font-semibold rounded-xl h-11 px-6 whitespace-nowrap" data-testid="btn-list-experience">
              List Your Experience <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-[#0081C9] flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Verified Operators</h3>
            <p className="text-xs text-slate-500 leading-relaxed">All tour operators are vetted and verified. Read real traveler reviews before you book.</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Instant Confirmation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Book instantly and receive your confirmation immediately. Flexible cancellation on most tours.</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Best Price Guarantee</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Find a lower price? We'll match it. Book with confidence on OnlineGuide.io.</p>
          </CardContent>
        </Card>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBookingModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0081C9] to-[#006ba3] px-6 py-4 text-white relative">
              <button onClick={() => setShowBookingModal(null)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-booking">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-5 w-5" />
                <span className="font-bold">Book Experience</span>
              </div>
              <p className="text-sm text-white/80 line-clamp-1">{showBookingModal.name}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="text-3xl">{showBookingModal.image}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{showBookingModal.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" /> {showBookingModal.location}</span>
                    <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {showBookingModal.duration}</span>
                    <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 text-amber-400" /> {showBookingModal.rating}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]"
                  data-testid="input-booking-date"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Number of Guests</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    data-testid="btn-guest-minus"
                  >-</button>
                  <span className="text-lg font-bold text-slate-900 w-8 text-center">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(Math.min(showBookingModal.maxGuests, guestCount + 1))}
                    className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    data-testid="btn-guest-plus"
                  >+</button>
                  <span className="text-[10px] text-slate-400 ml-2">Max {showBookingModal.maxGuests}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{showBookingModal.currency}{showBookingModal.price} x {guestCount} guest(s)</span>
                  <span className="font-bold text-slate-900">{showBookingModal.currency}{showBookingModal.price * guestCount}</span>
                </div>
                {showBookingModal.freeCancel && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600">
                    <CheckCircle className="h-3 w-3" /> Free cancellation up to 24 hours before
                  </div>
                )}
              </div>

              <Button
                onClick={handleBook}
                className="w-full bg-[#0081C9] hover:bg-[#006ba3] text-white font-bold h-11 rounded-xl text-sm"
                data-testid="btn-confirm-booking"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Book for {showBookingModal.currency}{showBookingModal.price * guestCount}
              </Button>
              <p className="text-[10px] text-slate-400 text-center">Secure payment. Instant confirmation. {showBookingModal.freeCancel ? "Free cancellation." : "Non-refundable."}</p>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative">
              <span className="text-7xl">{showDetailModal.image}</span>
              <button onClick={() => setShowDetailModal(null)} className="absolute top-3 right-3 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center" data-testid="btn-close-detail">
                <X className="h-4 w-4" />
              </button>
              {showDetailModal.badge && (
                <Badge className="absolute top-3 left-3 bg-[#0081C9] text-white border-0 text-[9px]">{showDetailModal.badge}</Badge>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin className="h-3 w-3 text-[#0081C9]" /> {showDetailModal.location}, {showDetailModal.country}
                  </span>
                  <Badge variant="outline" className="text-[9px]">{showDetailModal.category}</Badge>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{showDetailModal.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-sm">{showDetailModal.rating}</span>
                  <span className="text-xs text-slate-400">({showDetailModal.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{showDetailModal.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" /> {showDetailModal.duration}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /> Max {showDetailModal.maxGuests} guests</div>
                <div className="flex items-center gap-2"><Languages className="h-4 w-4 text-slate-400" /> {showDetailModal.languages.join(", ")}</div>
                <div className="flex items-center gap-2"><Award className="h-4 w-4 text-slate-400" /> Guide: {showDetailModal.guideName}</div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-800 mb-2">What's Included</h4>
                <div className="space-y-1.5">
                  {showDetailModal.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {showDetailModal.instantBooking && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px]"><Zap className="h-2.5 w-2.5 mr-0.5" /> Instant Booking</Badge>}
                {showDetailModal.freeCancel && <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-[9px]"><CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Free Cancellation</Badge>}
                {showDetailModal.pickup && <Badge className="bg-purple-50 text-purple-600 border-purple-100 text-[9px]"><MapPin className="h-2.5 w-2.5 mr-0.5" /> Hotel Pickup</Badge>}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  {showDetailModal.originalPrice && (
                    <span className="text-sm text-slate-400 line-through mr-2">{showDetailModal.currency}{showDetailModal.originalPrice}</span>
                  )}
                  <span className="text-xl font-bold text-slate-900">{showDetailModal.currency}{showDetailModal.price}</span>
                  <span className="text-xs text-slate-400"> /person</span>
                </div>
                <Button
                  onClick={() => { setShowDetailModal(null); setShowBookingModal(showDetailModal); }}
                  className="bg-[#0081C9] hover:bg-[#006ba3] text-white h-10 text-sm font-bold rounded-lg px-6"
                  data-testid="btn-book-from-detail"
                >
                  <Calendar className="h-4 w-4 mr-1.5" /> Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
