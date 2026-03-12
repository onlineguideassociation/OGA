import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Map, Ticket, Bot, Globe, Users, Sparkles,
  MapPin, TrendingUp, Star
} from "lucide-react";

interface HeroSectionProps {
  onExploreMap: () => void;
  onBookTours: () => void;
  onStartAI: () => void;
}

export default function HeroSection({ onExploreMap, onBookTours, onStartAI }: HeroSectionProps) {
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

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight" data-testid="hero-headline">
            Discover Cambodia Through AI, Maps,{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">and Cultural Truth</span>
          </h1>

          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed" data-testid="hero-subheadline">
            OnlineGuide.io connects tourism, AI intelligence, creators, and local businesses into one live network powered by interactive maps.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
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
              <MapPin className="h-3 w-3" /> 21 Destinations
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3 w-3" /> 200+ Guides
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3" /> 8 Revenue Streams
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-3 w-3" /> 4.8 Avg Rating
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
