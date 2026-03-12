import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, MapPin, Clock, Users, ChevronRight, Search, Filter,
  Plane, Hotel, Utensils, Ticket, ShoppingBag, Sparkles,
  Heart, Share2, DollarSign, CheckCircle, Bot, Navigation,
  X, ChevronDown, SlidersHorizontal, ArrowUpDown
} from "lucide-react";
import { useState, useCallback } from "react";
import { CAMBODIA_NODES, NODE_TYPES, getNodeConfig, toX, toY, type MapNode } from "./map-data";

type BookingCategory = "all" | "tours" | "hotels" | "restaurants" | "experiences" | "transport";

const BOOKING_CATEGORIES: { key: BookingCategory; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "tours", label: "Tours", icon: Plane },
  { key: "hotels", label: "Hotels", icon: Hotel },
  { key: "restaurants", label: "Restaurants", icon: Utensils },
  { key: "experiences", label: "Things To Do", icon: Ticket },
  { key: "transport", label: "Transport", icon: Navigation },
];

type SortOption = "popular" | "price-low" | "price-high" | "rating";

const BOOKABLE_ITEMS = [
  { id: 1, category: "tours", name: "Angkor Wat Sunrise Tour", location: "Siem Reap", price: 65, currency: "$", rating: 4.9, reviews: 342, duration: "4h", badge: "BESTSELLER", image: "🌅", description: "Watch the sunrise over the iconic Angkor Wat temple. Includes guide, transport, and breakfast.", lat: 13.4125, lng: 103.8667, features: ["Pick-up included", "Licensed guide", "Breakfast"] },
  { id: 2, category: "tours", name: "Temple Bike Tour", location: "Siem Reap", price: 18, currency: "$", rating: 4.8, reviews: 189, duration: "3h", badge: "POPULAR", image: "🚴", description: "Cycle through ancient temples at your own pace with expert local guide.", lat: 13.36, lng: 103.86, features: ["Bike included", "Small group", "Water provided"] },
  { id: 3, category: "tours", name: "Mekong River Cruise", location: "Kampong Cham", price: 85, currency: "$", rating: 4.8, reviews: 256, duration: "6h", badge: "PREMIUM", image: "🚢", description: "Full-day cruise along the Mekong with floating village visits and local lunch.", lat: 11.98, lng: 105.45, features: ["Lunch included", "Village visit", "Sunset views"] },
  { id: 4, category: "tours", name: "Phnom Penh City Walk", location: "Phnom Penh", price: 35, currency: "$", rating: 4.7, reviews: 178, duration: "3h", badge: "", image: "🏛️", description: "Discover the capital's royal palace, markets, and street food scene.", lat: 11.5564, lng: 104.9282, features: ["Street food", "History guide", "Small group"] },
  { id: 5, category: "tours", name: "Kampot Pepper Tour", location: "Kampot", price: 30, currency: "$", rating: 4.7, reviews: 98, duration: "5h", badge: "CULTURAL", image: "🌶️", description: "Visit world-famous Kampot pepper farms and learn traditional cultivation.", lat: 10.6, lng: 104.18, features: ["Farm visit", "Tasting", "Transport"] },
  { id: 6, category: "hotels", name: "Raffles Hotel Le Royal", location: "Phnom Penh", price: 350, currency: "$", rating: 4.9, reviews: 1284, duration: "per night", badge: "LUXURY", image: "🏨", description: "Historic 5-star colonial hotel in the heart of Phnom Penh.", lat: 11.5684, lng: 104.9222, features: ["Pool", "Spa", "Free WiFi"] },
  { id: 7, category: "hotels", name: "Shinta Mani Angkor", location: "Siem Reap", price: 220, currency: "$", rating: 4.8, reviews: 956, duration: "per night", badge: "BOUTIQUE", image: "🌴", description: "Award-winning boutique hotel with social enterprise mission.", lat: 13.36, lng: 103.86, features: ["Pool", "Restaurant", "Social impact"] },
  { id: 8, category: "hotels", name: "Mad Monkey Hostel", location: "Siem Reap", price: 12, currency: "$", rating: 4.5, reviews: 2340, duration: "per night", badge: "BUDGET", image: "🐒", description: "Popular backpacker hostel with rooftop pool and social events.", lat: 13.355, lng: 103.855, features: ["Pool", "Bar", "Events"] },
  { id: 9, category: "restaurants", name: "Khmer Kitchen", location: "Siem Reap", price: 8, currency: "$", rating: 4.8, reviews: 845, duration: "avg meal", badge: "FEATURED", image: "🥘", description: "Authentic Khmer cuisine in a traditional wooden house setting.", lat: 13.352, lng: 103.858, features: ["Traditional", "Vegetarian options", "Local favorite"] },
  { id: 10, category: "restaurants", name: "Malis Restaurant", location: "Phnom Penh", price: 25, currency: "$", rating: 4.9, reviews: 1240, duration: "avg meal", badge: "FINE DINING", image: "🍲", description: "Cambodia's most celebrated chef showcasing modern Khmer cuisine.", lat: 11.56, lng: 104.93, features: ["Fine dining", "Cocktails", "Garden seating"] },
  { id: 11, category: "experiences", name: "Khmer Cooking Class", location: "Siem Reap", price: 40, currency: "$", rating: 4.9, reviews: 567, duration: "4h", badge: "TOP RATED", image: "👨‍🍳", description: "Learn to cook traditional Cambodian dishes with market visit.", lat: 13.358, lng: 103.862, features: ["Market tour", "Recipe book", "Tastings"] },
  { id: 12, category: "experiences", name: "Silk Weaving Workshop", location: "Siem Reap", price: 25, currency: "$", rating: 4.7, reviews: 234, duration: "2h", badge: "CULTURAL", image: "🧶", description: "Hands-on silk weaving with master artisans at Artisans Angkor.", lat: 13.365, lng: 103.855, features: ["Hands-on", "Souvenir", "Expert artisan"] },
  { id: 13, category: "experiences", name: "Apsara Dance Show", location: "Siem Reap", price: 35, currency: "$", rating: 4.6, reviews: 412, duration: "2h", badge: "", image: "💃", description: "Traditional Khmer dance performance with buffet dinner.", lat: 13.35, lng: 103.85, features: ["Dinner included", "Live music", "Photo ops"] },
  { id: 14, category: "transport", name: "Airport Transfer", location: "Siem Reap", price: 15, currency: "$", rating: 4.8, reviews: 890, duration: "30min", badge: "ESSENTIAL", image: "🚐", description: "Private car from Siem Reap airport to your hotel.", lat: 13.4067, lng: 103.8133, features: ["Private car", "Meet & greet", "24/7"] },
  { id: 15, category: "transport", name: "Tuk-Tuk Day Hire", location: "Siem Reap", price: 20, currency: "$", rating: 4.6, reviews: 567, duration: "full day", badge: "LOCAL", image: "🛺", description: "Hire a tuk-tuk and driver for a full day of temple exploration.", lat: 13.37, lng: 103.87, features: ["Flexible route", "Local driver", "Bargain stops"] },
];

export default function BookingSection() {
  const [activeCategory, setActiveCategory] = useState<BookingCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedItem, setSelectedItem] = useState<typeof BOOKABLE_ITEMS[0] | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());

  const toggleSave = (id: number) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filtered = BOOKABLE_ITEMS
    .filter(item => activeCategory === "all" || item.category === activeCategory)
    .filter(item => searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const getConnections = useCallback(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const items = filtered.slice(0, 10);
    for (let i = 0; i < items.length - 1; i++) {
      const a = items[i], b = items[i + 1];
      if (a.lat && b.lat) {
        lines.push({ x1: toX(a.lng), y1: toY(a.lat), x2: toX(b.lng), y2: toY(b.lat) });
      }
    }
    return lines;
  }, [filtered]);

  return (
    <div className="h-full flex flex-col" data-testid="booking-section">
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {BOOKING_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            const count = cat.key === "all" ? BOOKABLE_ITEMS.length : BOOKABLE_ITEMS.filter(i => i.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${isActive ? "bg-[#0081C9] text-white border-[#0081C9] shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/30 hover:bg-slate-50"}`}
                data-testid={`booking-filter-${cat.key}`}
              >
                <Icon className="h-3.5 w-3.5" /> {cat.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-slate-100"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tours, hotels, restaurants..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0081C9] focus:ring-1 focus:ring-[#0081C9]/20"
              data-testid="input-booking-search"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#0081C9] cursor-pointer"
            data-testid="select-booking-sort"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[10px]">
            {filtered.length} results
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[45%] overflow-y-auto bg-slate-50 border-r border-slate-200" data-testid="booking-list">
          <div className="p-3 space-y-3">
            {filtered.map((item) => {
              const isHovered = hoveredItem === item.id;
              const isSelected = selectedItem?.id === item.id;
              const isSaved = savedItems.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border overflow-hidden transition-all cursor-pointer group ${isSelected ? "border-[#0081C9] shadow-md ring-1 ring-[#0081C9]/20" : isHovered ? "border-[#0081C9]/40 shadow-sm" : "border-slate-200 hover:shadow-sm"}`}
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  data-testid={`booking-card-${item.id}`}
                >
                  <div className="flex">
                    <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl flex-shrink-0 relative">
                      {item.image}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSave(item.id); }}
                        className={`absolute top-1.5 left-1.5 p-1 rounded-full transition-all ${isSaved ? "bg-[#C1121F] text-white" : "bg-white/80 text-slate-400 hover:text-[#C1121F]"}`}
                        data-testid={`btn-save-${item.id}`}
                      >
                        <Heart className={`h-3 w-3 ${isSaved ? "fill-white" : ""}`} />
                      </button>
                      {item.badge && (
                        <Badge className="absolute bottom-1.5 left-1.5 bg-[#0081C9] text-white border-0 text-[7px] px-1.5 py-0 shadow-sm">{item.badge}</Badge>
                      )}
                    </div>
                    <div className="flex-1 p-3 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <MapPin className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                            <span className="text-[10px] text-slate-500">{item.location}</span>
                            <span className="text-[10px] text-slate-400">·</span>
                            <Clock className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
                            <span className="text-[10px] text-slate-500">{item.duration}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold text-[#22c55e]">{item.currency}{item.price}</div>
                          <div className="flex items-center gap-0.5 justify-end">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-semibold text-slate-700">{item.rating}</span>
                            <span className="text-[10px] text-slate-400">({item.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1.5 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        {item.features.slice(0, 3).map(f => (
                          <span key={f} className="flex items-center gap-0.5 text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <CheckCircle className="h-2 w-2" /> {f}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" className="h-7 text-[10px] px-3 bg-[#0081C9] hover:bg-[#006ba3] font-semibold" data-testid={`btn-book-${item.id}`}>
                          {item.category === "hotels" ? "Reserve" : item.category === "restaurants" ? "Book Table" : item.category === "transport" ? "Book Ride" : "Book Now"}
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-[10px] px-2.5 border-slate-200 text-slate-500 hover:text-[#0081C9]" data-testid={`btn-details-${item.id}`}>
                          Details <ChevronRight className="h-3 w-3 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No results found</p>
                <p className="text-xs mt-1">Try adjusting your filters or search</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-[55%] relative bg-gradient-to-br from-slate-800 via-[#0f172a] to-slate-800" data-testid="booking-map">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="bookingMapGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0081C9" stopOpacity="0.06" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
              <filter id="bookingGlow"><feGaussianBlur stdDeviation="0.3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="bookingPriceShadow"><feDropShadow dx="0" dy="0.15" stdDeviation="0.15" floodColor="#000" floodOpacity="0.6" /></filter>
            </defs>
            <rect width="100" height="100" fill="url(#bookingMapGlow)" />
            <path d="M 42,12 Q 50,8 58,14 Q 66,22 64,32 Q 70,38 68,48 Q 72,55 67,65 Q 62,72 55,78 Q 48,82 42,76 Q 34,72 36,62 Q 30,55 33,45 Q 28,38 34,28 Q 30,20 42,12 Z" fill="none" stroke="#334155" strokeWidth="0.25" strokeDasharray="0.8,0.8" opacity="0.4" />
            <text x="52" y="50" textAnchor="middle" fill="#475569" fontSize="1.8" fontWeight="bold" opacity="0.15">CAMBODIA</text>

            {getConnections().map((line, i) => (
              <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#0081C9" strokeWidth="0.08" strokeDasharray="0.3,0.3" opacity="0.2" />
            ))}

            {filtered.map(item => {
              if (!item.lat || !item.lng) return null;
              const x = toX(item.lng), y = toY(item.lat);
              const isActive = selectedItem?.id === item.id || hoveredItem === item.id;
              const priceLabel = `${item.currency}${item.price}`;
              const labelWidth = priceLabel.length * 0.7 + 1.2;
              return (
                <g key={item.id} className="cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}>
                  {isActive && (
                    <circle cx={x} cy={y} r="2.5" fill="#0081C9" opacity="0.12">
                      <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <g filter="url(#bookingPriceShadow)">
                    <rect x={x - labelWidth / 2} y={y - 3.5} width={labelWidth} height="2" rx="0.5" fill={isActive ? "#0081C9" : "#22c55e"} />
                    <polygon points={`${x - 0.4},${y - 1.5} ${x + 0.4},${y - 1.5} ${x},${y - 0.8}`} fill={isActive ? "#0081C9" : "#22c55e"} />
                    <text x={x} y={y - 2.2} textAnchor="middle" fill="white" fontSize="1" fontWeight="bold">{priceLabel}</text>
                  </g>
                </g>
              );
            })}
          </svg>

          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 z-10 max-w-lg mx-auto">
              <Card className="backdrop-blur-xl border shadow-2xl text-white" style={{ background: "rgba(15,23,42,0.95)", borderColor: "rgba(255,255,255,0.08)" }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{selectedItem.image}</div>
                      <div>
                        <h3 className="text-sm font-bold">{selectedItem.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] text-slate-400">{selectedItem.location}</span>
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] text-amber-400">{selectedItem.rating} ({selectedItem.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">{selectedItem.description}</p>
                  <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                    {selectedItem.features.map(f => (
                      <span key={f} className="flex items-center gap-0.5 text-[8px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-1.5 py-0.5 rounded-full">
                        <CheckCircle className="h-2 w-2" /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-[#22c55e]">{selectedItem.currency}{selectedItem.price}</span>
                    <span className="text-[10px] text-slate-500">/ {selectedItem.duration}</span>
                    <div className="ml-auto flex gap-2">
                      <Button size="sm" className="h-8 text-xs px-4 bg-[#0081C9] hover:bg-[#006ba3] font-semibold" data-testid="btn-book-selected">
                        {selectedItem.category === "hotels" ? "Reserve Now" : selectedItem.category === "restaurants" ? "Book Table" : "Book Now"}
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs border-white/10 text-slate-300 hover:bg-slate-700" data-testid="btn-share-selected">
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-slate-900/90 text-slate-300 border-white/10 text-[9px] backdrop-blur-sm">
              <MapPin className="h-3 w-3 mr-1 text-[#0081C9]" /> {filtered.length} locations shown
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
