import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Map, Ticket, Bot, Globe, Users, Sparkles,
  MapPin, TrendingUp, Star, Search, Calendar, UserPlus, ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface HeroSectionProps {
  onExploreMap: () => void;
  onBookTours: () => void;
  onStartAI: () => void;
  onSearch?: (query: string, date: string, travelers: string) => void;
}

export default function HeroSection({ onExploreMap, onBookTours, onStartAI, onSearch }: HeroSectionProps) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      return res.json();
    },
  });

  const handleSearch = () => {
    if (onSearch) onSearch(destination, date, travelers);
    onBookTours();
  };

  return (
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0081C9 40%, #C1121F 100%)" }}>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-[#0081C9]/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[#C1121F]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-white/15 text-white border-white/20 px-3 py-1 text-[10px] font-semibold backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5 mr-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              LIVE PLATFORM
            </Badge>
            <Badge className="bg-white/10 text-white/70 border-white/15 px-2 py-0.5 text-[9px]">
              <Globe className="h-3 w-3 mr-1" /> SE Asia Network
            </Badge>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight" data-testid="hero-headline">
            Your growth,{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent italic">your way.</span>
          </h1>

          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed" data-testid="hero-subheadline">
            Connect with 30K+ trusted brands and 1M+ approved partners who support your marketing goals and deliver results.
          </p>

          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl shadow-black/20 flex flex-col md:flex-row items-stretch gap-2" data-testid="hero-search-box">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <MapPin className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  data-testid="input-hero-destination"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-w-[150px]">
                <Calendar className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  data-testid="input-hero-date"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-w-[140px]">
                <Users className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                <select
                  value={travelers}
                  onChange={e => setTravelers(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 outline-none cursor-pointer appearance-none"
                  data-testid="select-hero-travelers"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5 Travelers</option>
                  <option value="6">6+ Travelers</option>
                </select>
                <ChevronDown className="h-3 w-3 text-slate-400 flex-shrink-0" />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 h-11 text-sm rounded-xl shadow-md shadow-emerald-500/20 whitespace-nowrap"
                data-testid="btn-hero-search"
              >
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
            <Button
              onClick={onExploreMap}
              className="bg-white text-slate-900 hover:bg-white/90 font-semibold px-5 h-10 text-sm shadow-lg shadow-white/10"
              data-testid="btn-explore-map"
            >
              <Map className="h-4 w-4 mr-2" /> Explore Tourism Map
            </Button>
            <Button
              onClick={onBookTours}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-5 h-10 text-sm backdrop-blur-sm bg-white/5"
              data-testid="btn-book-tours"
            >
              <Ticket className="h-4 w-4 mr-2" /> Book Tours
            </Button>
            <Button
              onClick={onStartAI}
              variant="outline"
              className="border-[#0081C9]/50 text-white hover:bg-[#0081C9]/20 font-semibold px-5 h-10 text-sm backdrop-blur-sm bg-[#0081C9]/10"
              data-testid="btn-start-ai"
            >
              <Bot className="h-4 w-4 mr-2" /> Start AI Assistant
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap text-white/50 text-[10px]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> {stats?.totalTours || 0} Tours Live
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3 w-3" /> {stats?.totalHotels || 0} Hotels
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" /> {stats?.totalProducts || 0} Products
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-3 w-3" /> {stats?.totalReviews || 0} Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> AI-Powered
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
