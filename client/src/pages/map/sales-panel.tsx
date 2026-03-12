import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plane, Hotel, Utensils, ShoppingBag, Sparkles,
  Laptop, Building2, Bot, Star, MapPin,
  ChevronRight, Clock, Users, Flame, DollarSign
} from "lucide-react";
import { useState } from "react";

type Category = "all" | "tours" | "hotels" | "restaurants" | "shops" | "experiences" | "digital" | "realestate" | "ai";

const CATEGORIES: { key: Category; label: string; icon: React.ElementType; color: string; revenue: string }[] = [
  { key: "all", label: "All", icon: Sparkles, color: "text-white bg-gradient-to-r from-[#0081C9] to-[#C1121F]", revenue: "" },
  { key: "tours", label: "Tours", icon: Plane, color: "text-[#0081C9] bg-[#0081C9]/10", revenue: "10-25% commission" },
  { key: "hotels", label: "Hotels", icon: Hotel, color: "text-indigo-600 bg-indigo-100", revenue: "Booking fees" },
  { key: "restaurants", label: "Restaurants", icon: Utensils, color: "text-amber-600 bg-amber-100", revenue: "$30/mo featured" },
  { key: "shops", label: "Shops", icon: ShoppingBag, color: "text-emerald-600 bg-emerald-100", revenue: "$20/mo listing" },
  { key: "experiences", label: "Experiences", icon: Star, color: "text-rose-600 bg-rose-100", revenue: "20% commission" },
  { key: "digital", label: "Digital Services", icon: Laptop, color: "text-violet-600 bg-violet-100", revenue: "15% platform fee" },
  { key: "realestate", label: "Real Estate", icon: Building2, color: "text-sky-600 bg-sky-100", revenue: "$99/listing" },
  { key: "ai", label: "AI Services", icon: Bot, color: "text-[#C1121F] bg-[#C1121F]/10", revenue: "$9-99/mo SaaS" },
];

const FEATURED_ITEMS = [
  { category: "tours", name: "Angkor Sunrise Tour", location: "Siem Reap", price: "$65", rating: 4.9, reviews: 342, badge: "BESTSELLER", badgeColor: "bg-amber-100 text-amber-700", commission: "$10", image: "🌅" },
  { category: "tours", name: "Phnom Penh City Walk", location: "Phnom Penh", price: "$35", rating: 4.7, reviews: 189, badge: "POPULAR", badgeColor: "bg-blue-100 text-blue-700", commission: "$6", image: "🏛️" },
  { category: "tours", name: "Mekong River Cruise", location: "Kampong Cham", price: "$85", rating: 4.8, reviews: 256, badge: "NEW", badgeColor: "bg-emerald-100 text-emerald-700", commission: "$15", image: "🚢" },
  { category: "hotels", name: "Raffles Hotel Le Royal", location: "Phnom Penh", price: "$350/night", rating: 4.9, reviews: 1284, badge: "LUXURY", badgeColor: "bg-violet-100 text-violet-700", commission: "$35", image: "🏨" },
  { category: "hotels", name: "Shinta Mani Angkor", location: "Siem Reap", price: "$220/night", rating: 4.8, reviews: 956, badge: "BOUTIQUE", badgeColor: "bg-indigo-100 text-indigo-700", commission: "$22", image: "🌴" },
  { category: "restaurants", name: "Khmer Kitchen", location: "Siem Reap", price: "$$", rating: 4.8, reviews: 845, badge: "FEATURED", badgeColor: "bg-amber-100 text-amber-700", commission: "$30/mo", image: "🥘" },
  { category: "restaurants", name: "Malis Restaurant", location: "Phnom Penh", price: "$$$", rating: 4.9, reviews: 1240, badge: "PREMIUM", badgeColor: "bg-rose-100 text-rose-700", commission: "$50/mo", image: "🍲" },
  { category: "experiences", name: "Khmer Cooking Class", location: "Siem Reap", price: "$40", rating: 4.9, reviews: 567, badge: "TOP RATED", badgeColor: "bg-emerald-100 text-emerald-700", commission: "$8", image: "👨‍🍳" },
  { category: "experiences", name: "Silk Weaving Workshop", location: "Siem Reap", price: "$25", rating: 4.7, reviews: 234, badge: "CULTURAL", badgeColor: "bg-violet-100 text-violet-700", commission: "$5", image: "🧶" },
  { category: "shops", name: "Artisans Angkor", location: "Siem Reap", price: "$$", rating: 4.6, reviews: 412, badge: "ARTISAN", badgeColor: "bg-amber-100 text-amber-700", commission: "$20/mo", image: "🎨" },
  { category: "digital", name: "Website Design Package", location: "Remote", price: "$500", rating: 4.8, reviews: 89, badge: "SERVICE", badgeColor: "bg-violet-100 text-violet-700", commission: "$75", image: "💻" },
  { category: "digital", name: "SEO & Marketing", location: "Remote", price: "$300/mo", rating: 4.7, reviews: 67, badge: "GROWTH", badgeColor: "bg-blue-100 text-blue-700", commission: "$45/mo", image: "📈" },
  { category: "realestate", name: "Boutique Hotel for Sale", location: "Siem Reap", price: "$450K", rating: 0, reviews: 0, badge: "PREMIUM", badgeColor: "bg-sky-100 text-sky-700", commission: "$99", image: "🏘️" },
  { category: "ai", name: "AI Travel Planner", location: "Platform", price: "$9/mo", rating: 4.9, reviews: 892, badge: "AI TOOL", badgeColor: "bg-[#C1121F]/10 text-[#C1121F]", commission: "SaaS", image: "🤖" },
  { category: "ai", name: "AI Marketing Assistant", location: "Platform", price: "$29/mo", rating: 4.8, reviews: 345, badge: "PRO", badgeColor: "bg-[#0081C9]/10 text-[#0081C9]", commission: "SaaS", image: "📊" },
];

export function CategoryFilterBar({ activeCategory, onCategoryChange }: { activeCategory: Category; onCategoryChange: (c: Category) => void }) {
  return (
    <div className="bg-slate-900/95 border-b border-slate-700 px-3 py-2 overflow-x-auto" data-testid="category-filter-bar">
      <div className="flex items-center gap-1.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#0081C9] to-[#C1121F] text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
              data-testid={`filter-${cat.key}`}
            >
              <Icon className="h-3 w-3" /> {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SalesPanel({ activeCategory }: { activeCategory: Category }) {
  const filtered = activeCategory === "all"
    ? FEATURED_ITEMS
    : FEATURED_ITEMS.filter(i => i.category === activeCategory);

  const topItems = filtered.slice(0, 6);

  return (
    <div className="w-72 bg-slate-800 border-l border-slate-700 flex flex-col overflow-hidden" data-testid="sales-panel">
      <div className="p-3 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold text-white">Featured Today</span>
          <Badge className="bg-[#C1121F]/20 text-[#C1121F] border-[#C1121F]/30 text-[8px] px-1.5 py-0 ml-auto">{filtered.length}</Badge>
        </div>
        <p className="text-[9px] text-slate-500">Click to book or list your business</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {topItems.map((item, i) => (
            <div
              key={i}
              className="bg-slate-750 border border-slate-700 rounded-lg p-3 hover:bg-slate-700/80 hover:border-[#0081C9]/30 transition-all cursor-pointer group"
              data-testid={`sales-item-${i}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="text-2xl flex-shrink-0">{item.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold text-white truncate">{item.name}</span>
                    <Badge className={`${item.badgeColor} text-[7px] px-1 py-0 border-0 flex-shrink-0`}>{item.badge}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin className="h-2.5 w-2.5 text-slate-500" />
                    <span className="text-[9px] text-slate-500">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0081C9]">{item.price}</span>
                    {item.rating > 0 && (
                      <span className="flex items-center gap-0.5 text-[9px] text-amber-400">
                        <Star className="h-2.5 w-2.5 fill-amber-400" /> {item.rating}
                        <span className="text-slate-500 ml-0.5">({item.reviews})</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" className="h-6 text-[9px] px-2.5 bg-[#0081C9] hover:bg-[#0081C9]/80 flex-1">
                  {item.category === "restaurants" ? "Reserve" : item.category === "ai" || item.category === "digital" ? "Subscribe" : item.category === "realestate" ? "Inquire" : "Book Now"}
                </Button>
                <span className="text-[8px] text-slate-500 flex items-center gap-0.5">
                  <DollarSign className="h-2.5 w-2.5" /> {item.commission}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-slate-700 space-y-2">
        <Button variant="outline" size="sm" className="w-full h-7 text-[10px] border-[#C1121F]/30 text-[#C1121F] hover:bg-[#C1121F]/10" data-testid="btn-list-business">
          <Building2 className="h-3 w-3 mr-1.5" /> List Your Business
        </Button>
        <Button variant="outline" size="sm" className="w-full h-7 text-[10px] border-[#0081C9]/30 text-[#0081C9] hover:bg-[#0081C9]/10" data-testid="btn-ai-planner">
          <Bot className="h-3 w-3 mr-1.5" /> AI Travel Planner
        </Button>
      </div>
    </div>
  );
}
