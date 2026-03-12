import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star, Search, MapPin, Clock, DollarSign, Heart, Share2, CheckCircle,
  Palette, Code, PenTool, Megaphone, Camera, Mic, BarChart3, Globe,
  Users, TrendingUp, Shield, Zap, ArrowRight, X, MessageSquare,
  ChevronRight, Award, Briefcase, Languages, Play, BookOpen, Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

type ServiceCategory = "All" | "Design & Creative" | "Marketing & Planning" | "Writing & Translation" | "Tech & Development" | "Audio & Video" | "Business & Data" | "Guide Services";

const CATEGORIES: { key: ServiceCategory; icon: React.ElementType; color: string }[] = [
  { key: "All", icon: Globe, color: "text-slate-600" },
  { key: "Design & Creative", icon: Palette, color: "text-pink-600" },
  { key: "Marketing & Planning", icon: Megaphone, color: "text-blue-600" },
  { key: "Writing & Translation", icon: PenTool, color: "text-amber-600" },
  { key: "Tech & Development", icon: Code, color: "text-emerald-600" },
  { key: "Audio & Video", icon: Mic, color: "text-purple-600" },
  { key: "Business & Data", icon: BarChart3, color: "text-indigo-600" },
  { key: "Guide Services", icon: MapPin, color: "text-rose-600" },
];

interface ServiceGig {
  id: number;
  title: string;
  provider: string;
  avatar: string;
  location: string;
  country: string;
  category: ServiceCategory;
  rating: number;
  reviews: number;
  startingPrice: number;
  deliveryTime: string;
  description: string;
  tags: string[];
  level: "New" | "Rising" | "Top Rated" | "Pro";
  ordersInQueue: number;
  portfolio: string;
  languages: string[];
  responseTime: string;
}

const GIGS: ServiceGig[] = [
  {
    id: 1, title: "Custom Travel Itinerary Design for Cambodia & SE Asia",
    provider: "Sophea Design Studio", avatar: "🎨", location: "Siem Reap", country: "Cambodia",
    category: "Design & Creative", rating: 4.9, reviews: 312, startingPrice: 45, deliveryTime: "3 days",
    description: "I'll create a beautifully designed, personalized travel itinerary with maps, photos, and day-by-day plans for your Cambodia trip.",
    tags: ["Itinerary Design", "Travel Planning", "Graphic Design"], level: "Top Rated", ordersInQueue: 8,
    portfolio: "🖼️", languages: ["English", "Khmer"], responseTime: "1 hour",
  },
  {
    id: 2, title: "Professional Travel Photography Tour in Angkor Wat",
    provider: "Dara Visuals", avatar: "📸", location: "Siem Reap", country: "Cambodia",
    category: "Design & Creative", rating: 4.8, reviews: 189, startingPrice: 120, deliveryTime: "Same day",
    description: "Professional photography session at Angkor Wat temples. 50+ edited photos delivered digitally. Sunrise or sunset sessions available.",
    tags: ["Photography", "Angkor Wat", "Portrait"], level: "Pro", ordersInQueue: 3,
    portfolio: "📷", languages: ["English", "French", "Khmer"], responseTime: "30 min",
  },
  {
    id: 3, title: "SEO Optimization for Tourism Websites & Tour Listings",
    provider: "TravelRank Agency", avatar: "🔍", location: "Phnom Penh", country: "Cambodia",
    category: "Marketing & Planning", rating: 4.7, reviews: 156, startingPrice: 75, deliveryTime: "5 days",
    description: "Boost your tourism website's Google ranking. Full SEO audit, keyword research, meta optimization, and content strategy for travel businesses.",
    tags: ["SEO", "Tourism Marketing", "Google Ranking"], level: "Top Rated", ordersInQueue: 12,
    portfolio: "📊", languages: ["English", "Mandarin"], responseTime: "2 hours",
  },
  {
    id: 4, title: "Social Media Management for Hotels & Tour Operators",
    provider: "Digital Nomad Co.", avatar: "📱", location: "Chiang Mai", country: "Thailand",
    category: "Marketing & Planning", rating: 4.6, reviews: 98, startingPrice: 200, deliveryTime: "Monthly",
    description: "Complete social media management for tourism businesses. Content creation, scheduling, engagement, and analytics for Instagram, Facebook & TikTok.",
    tags: ["Social Media", "Content Creation", "Instagram"], level: "Rising", ordersInQueue: 5,
    portfolio: "📲", languages: ["English", "Thai"], responseTime: "3 hours",
  },
  {
    id: 5, title: "Travel Blog Posts & Destination Guides in English",
    provider: "Wanderwords", avatar: "✍️", location: "Battambang", country: "Cambodia",
    category: "Writing & Translation", rating: 4.9, reviews: 245, startingPrice: 35, deliveryTime: "2 days",
    description: "Engaging, SEO-optimized travel blog posts and destination guides. 1000-2000 words with research, photos suggestions, and internal linking.",
    tags: ["Blog Writing", "SEO Content", "Travel Writing"], level: "Top Rated", ordersInQueue: 6,
    portfolio: "📝", languages: ["English", "Khmer"], responseTime: "1 hour",
  },
  {
    id: 6, title: "Translate Tourism Materials: Khmer, English, Mandarin",
    provider: "LinguaTravel", avatar: "🌐", location: "Phnom Penh", country: "Cambodia",
    category: "Writing & Translation", rating: 4.8, reviews: 167, startingPrice: 25, deliveryTime: "1 day",
    description: "Professional translation of tourism brochures, menus, signage, websites, and tour descriptions. Native speakers for accuracy.",
    tags: ["Translation", "Khmer", "Mandarin"], level: "Pro", ordersInQueue: 15,
    portfolio: "🔤", languages: ["English", "Khmer", "Mandarin", "French"], responseTime: "45 min",
  },
  {
    id: 7, title: "Build a Custom Tour Booking Website with React",
    provider: "CamboTech Labs", avatar: "💻", location: "Phnom Penh", country: "Cambodia",
    category: "Tech & Development", rating: 4.7, reviews: 78, startingPrice: 500, deliveryTime: "14 days",
    description: "Full-stack tour booking website with availability calendar, payment integration, multi-language support, and mobile-responsive design.",
    tags: ["React", "Web Development", "Booking System"], level: "Top Rated", ordersInQueue: 2,
    portfolio: "🖥️", languages: ["English", "Khmer"], responseTime: "2 hours",
  },
  {
    id: 8, title: "Mobile Travel App Development (iOS & Android)",
    provider: "AppVenture Studio", avatar: "📲", location: "Bangkok", country: "Thailand",
    category: "Tech & Development", rating: 4.5, reviews: 45, startingPrice: 1200, deliveryTime: "30 days",
    description: "Custom mobile travel app with GPS maps, offline guides, booking features, push notifications, and multi-language support.",
    tags: ["Mobile App", "React Native", "iOS/Android"], level: "Rising", ordersInQueue: 1,
    portfolio: "📱", languages: ["English", "Thai"], responseTime: "4 hours",
  },
  {
    id: 9, title: "Professional Audio Walking Guide for Your City",
    provider: "SoundTrail Productions", avatar: "🎧", location: "Siem Reap", country: "Cambodia",
    category: "Audio & Video", rating: 4.9, reviews: 134, startingPrice: 150, deliveryTime: "7 days",
    description: "Studio-quality audio walking guide with narration, ambient sounds, and music. Perfect for museums, heritage sites, and city tours.",
    tags: ["Audio Guide", "Narration", "Walking Tour"], level: "Pro", ordersInQueue: 4,
    portfolio: "🎵", languages: ["English", "French", "Mandarin"], responseTime: "1 hour",
  },
  {
    id: 10, title: "Cinematic Tour Promotional Video Production",
    provider: "Mekong Media", avatar: "🎬", location: "Phnom Penh", country: "Cambodia",
    category: "Audio & Video", rating: 4.8, reviews: 89, startingPrice: 300, deliveryTime: "10 days",
    description: "Cinematic promotional video for your tour, hotel, or restaurant. Drone footage, interviews, b-roll, and professional editing included.",
    tags: ["Video Production", "Drone", "Promotional"], level: "Top Rated", ordersInQueue: 3,
    portfolio: "🎥", languages: ["English", "Khmer"], responseTime: "2 hours",
  },
  {
    id: 11, title: "Tourism Market Research & Competitor Analysis",
    provider: "InsightTravel Analytics", avatar: "📈", location: "Singapore", country: "Singapore",
    category: "Business & Data", rating: 4.7, reviews: 56, startingPrice: 180, deliveryTime: "5 days",
    description: "Comprehensive market research for tourism businesses. Competitor analysis, traveler demographics, pricing strategies, and growth opportunities.",
    tags: ["Market Research", "Analytics", "Strategy"], level: "Top Rated", ordersInQueue: 2,
    portfolio: "📊", languages: ["English", "Mandarin"], responseTime: "3 hours",
  },
  {
    id: 12, title: "Private Local Guide: Hidden Gems of Phnom Penh",
    provider: "Channary Guides", avatar: "🧭", location: "Phnom Penh", country: "Cambodia",
    category: "Guide Services", rating: 5.0, reviews: 421, startingPrice: 40, deliveryTime: "Same day",
    description: "Discover Phnom Penh's hidden gems with a passionate local guide. Off-the-beaten-path neighborhoods, street food, art galleries, and local stories.",
    tags: ["Local Guide", "Walking Tour", "Hidden Gems"], level: "Pro", ordersInQueue: 7,
    portfolio: "🗺️", languages: ["English", "Khmer", "French"], responseTime: "15 min",
  },
  {
    id: 13, title: "Personalized Travel Planning & Concierge Service",
    provider: "Luxury SE Asia Travel", avatar: "✈️", location: "Siem Reap", country: "Cambodia",
    category: "Guide Services", rating: 4.9, reviews: 203, startingPrice: 85, deliveryTime: "2 days",
    description: "Full-service travel planning and concierge. Custom itinerary, hotel/restaurant reservations, transfers, and 24/7 WhatsApp support during your trip.",
    tags: ["Travel Planning", "Concierge", "Luxury"], level: "Top Rated", ordersInQueue: 9,
    portfolio: "🏝️", languages: ["English", "Mandarin", "Japanese"], responseTime: "30 min",
  },
  {
    id: 14, title: "Travel Brand Logo & Visual Identity Design",
    provider: "Khmer Creative Co.", avatar: "🎯", location: "Phnom Penh", country: "Cambodia",
    category: "Design & Creative", rating: 4.6, reviews: 72, startingPrice: 95, deliveryTime: "4 days",
    description: "Professional logo and brand identity for tourism businesses. Includes logo concepts, color palette, typography, and brand guidelines.",
    tags: ["Logo Design", "Branding", "Visual Identity"], level: "Rising", ordersInQueue: 4,
    portfolio: "🎨", languages: ["English", "Khmer"], responseTime: "2 hours",
  },
];

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviews"] as const;

export default function ServicesMarketplaceSection() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<typeof SORT_OPTIONS[number]>("Recommended");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showOrderModal, setShowOrderModal] = useState<ServiceGig | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<ServiceGig | null>(null);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let result = GIGS.filter(g => {
      const matchCat = selectedCategory === "All" || g.category === selectedCategory;
      const matchSearch = !searchQuery || g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.provider.toLowerCase().includes(searchQuery.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.startingPrice - b.startingPrice); break;
      case "Price: High to Low": result.sort((a, b) => b.startingPrice - a.startingPrice); break;
      case "Top Rated": result.sort((a, b) => b.rating - a.rating); break;
      case "Most Reviews": result.sort((a, b) => b.reviews - a.reviews); break;
    }
    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalProviders = new Set(GIGS.map(g => g.provider)).size;
  const totalReviews = GIGS.reduce((s, g) => s + g.reviews, 0);
  const avgRating = (GIGS.reduce((s, g) => s + g.rating, 0) / GIGS.length).toFixed(1);

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast({ title: savedIds.includes(id) ? "Removed from favorites" : "Added to favorites!" });
  };

  const handleOrder = () => {
    if (showOrderModal) {
      toast({ title: "Order placed!", description: `Your order with "${showOrderModal.provider}" has been confirmed.` });
      setShowOrderModal(null);
    }
  };

  const levelColors: Record<string, string> = {
    "New": "bg-slate-100 text-slate-600",
    "Rising": "bg-blue-100 text-blue-700",
    "Top Rated": "bg-amber-100 text-amber-700",
    "Pro": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="space-y-6" data-testid="services-marketplace-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-emerald-500 to-teal-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Briefcase className="h-3 w-3 mr-1.5" /> Tourism Services Marketplace
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-services-title">
          Find Tourism Professionals & Services
        </h2>
        <p className="text-sm text-slate-500">
          Connect with local guides, photographers, designers, developers, and creative professionals across Southeast Asia.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <Briefcase className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{GIGS.length}</div>
          <div className="text-[9px] text-slate-500">Services Available</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-center">
          <Users className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalProviders}</div>
          <div className="text-[9px] text-slate-500">Verified Providers</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Star className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{avgRating}</div>
          <div className="text-[9px] text-slate-500">Avg Rating</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/15 rounded-xl p-3 text-center">
          <MessageSquare className="h-4 w-4 text-rose-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalReviews.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Reviews</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services, skills, or providers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            data-testid="input-search-services"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof SORT_OPTIONS[number])}
          className="border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700 outline-none"
          data-testid="select-sort-services"
        >
          {SORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
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
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
              data-testid={`filter-svc-${key.toLowerCase().replace(/[\s&]/g, "-")}`}
            >
              <Icon className={`h-3 w-3 ${isActive ? "text-white" : color}`} /> {key}
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800">
            {filtered.length} service{filtered.length !== 1 ? "s" : ""} {selectedCategory !== "All" ? `in ${selectedCategory}` : "available"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((gig) => (
            <Card key={gig.id} className="overflow-hidden border hover:border-emerald-200 transition-all hover:shadow-lg group flex flex-col">
              <div className="h-36 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform">{gig.portfolio}</span>
                <Badge className={`absolute top-2 left-2 text-[9px] border-0 ${levelColors[gig.level]}`}>
                  {gig.level === "Pro" && <Award className="h-2.5 w-2.5 mr-0.5" />}
                  {gig.level === "Top Rated" && <Star className="h-2.5 w-2.5 mr-0.5" />}
                  {gig.level === "Rising" && <TrendingUp className="h-2.5 w-2.5 mr-0.5" />}
                  {gig.level}
                </Badge>
                <button
                  onClick={() => toggleSave(gig.id)}
                  className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition-all ${
                    savedIds.includes(gig.id) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-400 hover:text-rose-500"
                  }`}
                  data-testid={`btn-save-svc-${gig.id}`}
                >
                  <Heart className={`h-3.5 w-3.5 ${savedIds.includes(gig.id) ? "fill-current" : ""}`} />
                </button>
              </div>

              <CardContent className="p-4 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{gig.avatar}</span>
                  <div className="min-w-0">
                    <div
                      className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer truncate"
                      onClick={() => setShowProfileModal(gig)}
                      data-testid={`link-provider-${gig.id}`}
                    >
                      {gig.provider}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-slate-400">
                      <MapPin className="h-2.5 w-2.5" /> {gig.location}, {gig.country}
                    </div>
                  </div>
                </div>

                <h3
                  className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-emerald-600 cursor-pointer transition-colors"
                  onClick={() => setShowProfileModal(gig)}
                  data-testid={`link-gig-${gig.id}`}
                >
                  {gig.title}
                </h3>

                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-900">{gig.rating}</span>
                  <span className="text-[10px] text-slate-400">({gig.reviews})</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {gig.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[8px] px-1.5 py-0 text-slate-500 border-slate-200">{tag}</Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 border-t p-3 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase">Starting at</span>
                  <div className="text-base font-bold text-slate-900">${gig.startingPrice}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {gig.deliveryTime}</span>
                  <Button
                    onClick={() => setShowOrderModal(gig)}
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold h-8 px-3 rounded-lg"
                    data-testid={`btn-order-${gig.id}`}
                  >
                    Order
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No services found. Try a different category or search term.</p>
          </div>
        )}
      </div>

      <Card className="border-emerald-100 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Offer your skills to travelers worldwide</h3>
              <p className="text-sm text-slate-500">Join as a service provider. List your tourism services, set your prices, and reach a global audience of travelers and businesses.</p>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Free to join</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Secure payments</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Global reach</span>
                <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Escrow protection</span>
              </div>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl h-11 px-6 whitespace-nowrap" data-testid="btn-become-provider">
              Become a Provider <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Secure Escrow Payments</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Funds held safely until service is delivered and approved. Protection for both buyers and providers.</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Verified Professionals</h3>
            <p className="text-xs text-slate-500 leading-relaxed">All providers are vetted with verified portfolios, reviews, and identity checks.</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Local & Remote Services</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Find in-person guides and photographers or hire remote designers and developers worldwide.</p>
          </CardContent>
        </Card>
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOrderModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-white relative">
              <button onClick={() => setShowOrderModal(null)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-order">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-5 w-5" />
                <span className="font-bold">Place Order</span>
              </div>
              <p className="text-sm text-white/80 line-clamp-1">{showOrderModal.title}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <span className="text-3xl">{showOrderModal.avatar}</span>
                <div>
                  <div className="text-sm font-bold text-slate-900">{showOrderModal.provider}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" /> {showOrderModal.location}</span>
                    <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 text-amber-400" /> {showOrderModal.rating}</span>
                    <Badge className={`text-[8px] border-0 ${levelColors[showOrderModal.level]}`}>{showOrderModal.level}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Select Package</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Basic", price: showOrderModal.startingPrice, delivery: showOrderModal.deliveryTime },
                    { label: "Standard", price: Math.round(showOrderModal.startingPrice * 1.8), delivery: showOrderModal.deliveryTime },
                    { label: "Premium", price: Math.round(showOrderModal.startingPrice * 3), delivery: showOrderModal.deliveryTime },
                  ].map((pkg, i) => (
                    <button
                      key={pkg.label}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        i === 0 ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-300"
                      }`}
                      data-testid={`btn-pkg-${pkg.label.toLowerCase()}`}
                    >
                      <div className="text-xs font-bold text-slate-900">{pkg.label}</div>
                      <div className="text-lg font-bold text-emerald-600">${pkg.price}</div>
                      <div className="text-[9px] text-slate-400">{pkg.delivery}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Project Details</label>
                <textarea placeholder="Describe your project requirements..." rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500 resize-none" data-testid="textarea-order-details" />
              </div>

              <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Service fee</span>
                  <span className="font-bold text-slate-900">${showOrderModal.startingPrice}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Processing fee</span>
                  <span>${Math.round(showOrderModal.startingPrice * 0.05)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-emerald-600">${showOrderModal.startingPrice + Math.round(showOrderModal.startingPrice * 0.05)}</span>
                </div>
              </div>

              <Button
                onClick={handleOrder}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-11 rounded-xl text-sm"
                data-testid="btn-confirm-order"
              >
                <Zap className="h-4 w-4 mr-2" /> Place Order — ${showOrderModal.startingPrice + Math.round(showOrderModal.startingPrice * 0.05)}
              </Button>
              <p className="text-[10px] text-slate-400 text-center">Funds held in escrow until delivery is approved. Secure payment processing.</p>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowProfileModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-40 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center relative">
              <span className="text-7xl">{showProfileModal.portfolio}</span>
              <button onClick={() => setShowProfileModal(null)} className="absolute top-3 right-3 bg-white/80 rounded-full h-8 w-8 flex items-center justify-center" data-testid="btn-close-profile">
                <X className="h-4 w-4" />
              </button>
              <Badge className={`absolute top-3 left-3 text-[9px] border-0 ${levelColors[showProfileModal.level]}`}>{showProfileModal.level}</Badge>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{showProfileModal.avatar}</span>
                <div>
                  <div className="text-base font-bold text-slate-900">{showProfileModal.provider}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" /> {showProfileModal.location}, {showProfileModal.country}
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{showProfileModal.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{showProfileModal.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-400" /> {showProfileModal.rating} ({showProfileModal.reviews} reviews)</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" /> {showProfileModal.deliveryTime}</div>
                <div className="flex items-center gap-2"><Languages className="h-4 w-4 text-slate-400" /> {showProfileModal.languages.join(", ")}</div>
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-slate-400" /> Responds in {showProfileModal.responseTime}</div>
                <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-slate-400" /> {showProfileModal.ordersInQueue} orders in queue</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-slate-400" /> From ${showProfileModal.startingPrice}</div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {showProfileModal.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[9px] px-2 text-slate-500">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Button
                  onClick={() => { setShowProfileModal(null); setShowOrderModal(showProfileModal); }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-10 text-sm font-bold rounded-lg"
                  data-testid="btn-order-from-profile"
                >
                  <Zap className="h-4 w-4 mr-1.5" /> Order Now — From ${showProfileModal.startingPrice}
                </Button>
                <Button variant="outline" className="h-10 px-4 rounded-lg text-sm" data-testid="btn-contact-provider">
                  <MessageSquare className="h-4 w-4 mr-1" /> Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
