import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe, Bot, Plane, Users, Sparkles, MapPin, TrendingUp, Star,
  Search, Calendar, ChevronDown, Shield, MessageSquare, Map, Ticket,
  Brain, BookOpen, Zap, ArrowRight, Layers, Database, Hotel,
  Train, Car, Award, Heart, BarChart3, Smartphone, Building2,
  Network, Lock, Eye, Compass, ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface HeroSectionProps {
  onExploreMap: () => void;
  onBookTours: () => void;
  onStartAI: () => void;
  onSearch?: (query: string, date: string, travelers: string) => void;
  onNavigate?: (view: string) => void;
}

export default function HeroSection({ onExploreMap, onBookTours, onStartAI, onSearch, onNavigate }: HeroSectionProps) {
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

  const nav = (view: string) => {
    if (onNavigate) onNavigate(view);
  };

  return (
    <div className="relative" data-testid="hero-section">
      <div style={{ background: "linear-gradient(135deg, #0b1f3a 0%, #0f2847 25%, #0081C9 55%, #C1121F 100%)" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#0081C9]/15 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-[#C1121F]/15 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b1f3a]/80 to-transparent" />
        </div>

        <div className="relative z-10 px-6 py-10 md:py-14">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Badge className="bg-white/15 text-white border-white/20 px-3 py-1 text-[10px] font-semibold backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                LIVE PLATFORM
              </Badge>
              <Badge className="bg-white/10 text-white/70 border-white/15 px-2 py-0.5 text-[9px]">
                <Globe className="h-3 w-3 mr-1" /> Global Trust Network
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-2 py-0.5 text-[9px]">
                <Database className="h-3 w-3 mr-1" /> 1M+ AI World Listings
              </Badge>
            </div>

            <div className="mb-2 text-lg md:text-xl text-white/60 font-medium tracking-wide">
              Strengthen the World Through Cultural Truth
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight" data-testid="hero-headline">
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent">OnlineGuide.io</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-2 leading-relaxed font-medium" data-testid="hero-subheadline">
              A Global Trust Network built on Loyalty, Truth, and Real Connection
            </p>
            <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
              Empowering travelers, guides, and tourism businesses while preserving cultural intelligence. Stand forever with ancient knowledge, transformed into modern infrastructure.
            </p>

            <div className="max-w-3xl mx-auto mb-6">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl shadow-black/20 flex flex-col md:flex-row items-stretch gap-2" data-testid="hero-search-box">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <MapPin className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                  <input type="text" placeholder="Where are you going?" value={destination} onChange={e => setDestination(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none" data-testid="input-hero-destination" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-w-[150px]">
                  <Calendar className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-transparent text-sm text-slate-900 outline-none" data-testid="input-hero-date" />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors min-w-[140px]">
                  <Users className="h-4 w-4 text-[#0081C9] flex-shrink-0" />
                  <select value={travelers} onChange={e => setTravelers(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 outline-none cursor-pointer appearance-none" data-testid="select-hero-travelers">
                    <option value="1">1 Traveler</option><option value="2">2 Travelers</option><option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option><option value="5">5 Travelers</option><option value="6">6+ Travelers</option>
                  </select>
                  <ChevronDown className="h-3 w-3 text-slate-400 flex-shrink-0" />
                </div>
                <Button onClick={handleSearch} className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-6 h-11 text-sm rounded-xl shadow-md shadow-emerald-500/20 whitespace-nowrap" data-testid="btn-hero-search">
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
              <Button onClick={onExploreMap} className="bg-white text-slate-900 hover:bg-white/90 font-semibold px-5 h-10 text-sm shadow-lg shadow-white/10" data-testid="btn-explore-map">
                <Brain className="h-4 w-4 mr-2" /> Platform Dashboard
              </Button>
              <Button onClick={onBookTours} variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-5 h-10 text-sm backdrop-blur-sm bg-white/5" data-testid="btn-book-tours">
                <Compass className="h-4 w-4 mr-2" /> Explore Tours
              </Button>
              <Button onClick={onStartAI} variant="outline" className="border-[#0081C9]/50 text-white hover:bg-[#0081C9]/20 font-semibold px-5 h-10 text-sm backdrop-blur-sm bg-[#0081C9]/10" data-testid="btn-start-ai">
                <Bot className="h-4 w-4 mr-2" /> AI Powerhouse
              </Button>
              <Button onClick={() => nav("travelbooking")} variant="outline" className="border-emerald-500/40 text-white hover:bg-emerald-500/20 font-semibold px-5 h-10 text-sm backdrop-blur-sm bg-emerald-500/10" data-testid="btn-travel-booking">
                <Plane className="h-4 w-4 mr-2" /> Book Travel
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 flex-wrap text-white/50 text-[10px]">
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {stats?.totalTours || 0} Tours</span>
              <span className="flex items-center gap-1.5"><Hotel className="h-3 w-3" /> {stats?.totalHotels || 0} Hotels</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> {stats?.totalProducts || 0} Products</span>
              <span className="flex items-center gap-1.5"><Star className="h-3 w-3" /> {stats?.totalReviews || 0} Reviews</span>
              <span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {stats?.totalCommunityPosts || 0} Community</span>
              <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> AI-Powered</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="bg-gradient-to-b from-[#0b1f3a] to-slate-900 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-10">

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-[#0081C9]" />
              <span className="text-[10px] font-bold text-[#0081C9] uppercase tracking-wider">Dashboards & Infrastructure</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Explore the Ecosystem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => nav("intelligence")} className="group text-left" data-testid="card-platform-dashboard">
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 hover:border-[#0081C9]/40 transition-all hover:bg-slate-800 group-hover:shadow-lg group-hover:shadow-[#0081C9]/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-[#0081C9]/15 flex items-center justify-center"><BarChart3 className="h-5 w-5 text-[#0081C9]" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Platform Dashboard</h4>
                      <p className="text-[10px] text-slate-400">Unified command center</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 ml-auto group-hover:text-[#0081C9] transition-colors" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Monitor and manage tours, bookings, guides, hotels, and AI insights from one unified interface.</p>
                </div>
              </button>
              <button onClick={() => nav("management")} className="group text-left" data-testid="card-infrastructure">
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 hover:border-amber-500/40 transition-all hover:bg-slate-800 group-hover:shadow-lg group-hover:shadow-amber-500/5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/15 flex items-center justify-center"><Layers className="h-5 w-5 text-amber-500" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Infrastructure Layer</h4>
                      <p className="text-[10px] text-slate-400">Ecosystem AI Tourism OS</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 ml-auto group-hover:text-amber-500 transition-colors" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">A national-level, Web3 + AI architecture designed for tourism optimization and cultural preservation.</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-violet-500" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Core Technology</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Powered by Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: "Knowledge Graph Core", desc: "Layer 0 engine mapping entity relationships between temples, guides, hotels, and global signals for structured authority.", icon: Network, color: "text-violet-400", bg: "bg-violet-500/15", border: "hover:border-violet-500/40", view: "intelligence" },
                { title: "Tourism Intelligence", desc: "AI-native reasoning detects traveler hesitation and sentiment, converting emotional cues into structured decisions.", icon: Brain, color: "text-blue-400", bg: "bg-blue-500/15", border: "hover:border-blue-500/40", view: "intelligence" },
                { title: "Tourism OS", desc: "Operating system connecting guides, hotels, and airlines while monitoring global signals from TripAdvisor and TikTok.", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/15", border: "hover:border-emerald-500/40", view: "tourism" },
                { title: "Digital Book Infrastructure", desc: "Transforms cultural knowledge into structured, monetizable assets that preserve civilizational memory.", icon: BookOpen, color: "text-amber-400", bg: "bg-amber-500/15", border: "hover:border-amber-500/40", view: "creator" },
              ].map(tech => (
                <button key={tech.title} onClick={() => nav(tech.view)} className="group text-left" data-testid={`card-${tech.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className={`bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 ${tech.border} transition-all hover:bg-slate-800 h-full`}>
                    <div className={`h-9 w-9 rounded-lg ${tech.bg} flex items-center justify-center mb-3`}>
                      <tech.icon className={`h-4.5 w-4.5 ${tech.color}`} />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">{tech.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{tech.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-[#25D366]" />
              <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider">WhatsApp-First Platform</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Built for Real Guides</h3>
            <button onClick={() => nav("guidescrm")} className="w-full group text-left" data-testid="card-whatsapp-guides">
              <div className="bg-gradient-to-r from-slate-800/80 to-[#25D366]/10 border border-slate-700/50 rounded-xl p-5 hover:border-[#25D366]/40 transition-all">
                <div className="flex flex-col md:flex-row items-start gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center"><MessageSquare className="h-5 w-5 text-[#25D366]" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Guide & Driver CRM</h4>
                        <p className="text-[10px] text-slate-400">Siem Reap & Phnom Penh guides</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">Designed for real guides, not marketers or developers. Optimized for Angkor Wat tour operators with WhatsApp & Telegram direct sync.</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {["Angkor Wat Optimized", "WhatsApp & Telegram Sync", "Mobile-First CRM", "White-Label Ready", "Easy SDK"].map(f => (
                        <Badge key={f} className="bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 text-[8px] px-2 py-0.5">{f}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 min-w-[200px]">
                    {[
                      { label: "Guides Online", value: "6", icon: Users },
                      { label: "Response Time", value: "< 5 min", icon: Zap },
                      { label: "Tours Done", value: "6.8K+", icon: Compass },
                      { label: "Avg Rating", value: "4.8", icon: Star },
                    ].map(s => (
                      <div key={s.label} className="bg-slate-800 rounded-lg p-2.5 text-center border border-slate-700/50">
                        <s.icon className="h-3 w-3 text-[#25D366] mx-auto mb-0.5" />
                        <div className="text-xs font-bold text-white">{s.value}</div>
                        <div className="text-[8px] text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-violet-500" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">AI Powerhouse</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Your 24/7 Digital Marketing Assistant</h3>
            <p className="text-xs text-slate-400 mb-4 max-w-2xl">Stop staring at a blank screen — our AI models are fine-tuned on high-converting tourism content.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: "Review Reply AI", desc: "Draft empathetic, professional responses to TripAdvisor and Google reviews instantly.", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/15" },
                { title: "Itinerary Generator", desc: "Create detailed day-by-day itineraries for any destination based on user preferences.", icon: Map, color: "text-emerald-400", bg: "bg-emerald-500/15" },
                { title: "AI Tools Interface", desc: "Generate marketing copy, social media content, promotions, and more — all from one dashboard.", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/15" },
              ].map(tool => (
                <button key={tool.title} onClick={() => nav("aitools")} className="group text-left" data-testid={`card-${tool.title.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 hover:border-violet-500/40 transition-all hover:bg-slate-800 h-full">
                    <div className={`h-9 w-9 rounded-lg ${tool.bg} flex items-center justify-center mb-3`}>
                      <tool.icon className={`h-4.5 w-4.5 ${tool.color}`} />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">{tool.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{tool.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-[#0081C9]" />
              <span className="text-[10px] font-bold text-[#0081C9] uppercase tracking-wider">Integrated Travel Booking</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">One-Stop Travel Experience</h3>
            <button onClick={() => nav("travelbooking")} className="w-full group text-left" data-testid="card-travel-booking">
              <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 hover:border-[#0081C9]/40 transition-all">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
                  {[
                    { icon: Plane, label: "Flights", emoji: "✈️" },
                    { icon: Hotel, label: "Hotels", emoji: "🏨" },
                    { icon: Train, label: "Trains", emoji: "🚆" },
                    { icon: Car, label: "Car Rental", emoji: "🚗" },
                    { icon: Ticket, label: "Attractions", emoji: "🎟" },
                    { icon: Globe, label: "Packages", emoji: "🌍" },
                  ].map(item => (
                    <div key={item.label} className="text-center bg-slate-700/30 rounded-xl p-3 group-hover:bg-[#0081C9]/10 transition-colors">
                      <span className="text-2xl block mb-1">{item.emoji}</span>
                      <span className="text-[9px] font-bold text-white">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {["All-in-One Booking", "Smart Itinerary", "Multi-Language & Currency", "Price Alerts", "Rewards & Loyalty"].map(f => (
                    <div key={f} className="flex items-center gap-1 text-[10px] text-slate-300">
                      <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Zap className="h-2 w-2 text-emerald-400" /></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">AI Worlds</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">1 Million Curated Listings</h3>
            <div className="bg-gradient-to-r from-slate-800/80 to-amber-500/10 border border-slate-700/50 rounded-xl p-5">
              <div className="flex flex-col md:flex-row items-start gap-5">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    A dynamic, interactive, animated database of 1 million curated travel, cultural, and tour entities — guides, temples, attractions, hotels, tours, cultural events, and local experiences.
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {[
                      "AI-generated lists and recommendations updated in real-time",
                      "Animated, visually engaging dashboards to attract global users",
                      "Sponsored listings and partner promotions for revenue generation",
                      "Gamified interactions increase engagement and visibility",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-[10px] text-slate-300">
                        <Sparkles className="h-3 w-3 text-amber-400 flex-shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[9px]">Monetization Ready</Badge>
                    <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/20 text-[9px]">Sponsor Highlights</Badge>
                    <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/20 text-[9px]">Gamified</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 min-w-[200px]">
                  {[
                    { label: "Total Listings", value: "1M+", icon: Database, color: "text-amber-400" },
                    { label: "Countries", value: "11", icon: Globe, color: "text-blue-400" },
                    { label: "Categories", value: "24", icon: Layers, color: "text-violet-400" },
                    { label: "Daily Updates", value: "10K+", icon: TrendingUp, color: "text-emerald-400" },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-800 rounded-lg p-2.5 text-center border border-slate-700/50">
                      <s.icon className={`h-3 w-3 ${s.color} mx-auto mb-0.5`} />
                      <div className="text-xs font-bold text-white">{s.value}</div>
                      <div className="text-[8px] text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-6 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Global Connection & Independence</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Why OnlineGuide.io Matters</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Authentic Experiences", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/15" },
                { label: "Cultural Heritage", icon: Building2, color: "text-amber-400", bg: "bg-amber-500/15" },
                { label: "Guide Income", icon: Award, color: "text-emerald-400", bg: "bg-emerald-500/15" },
                { label: "AI Marketing Tools", icon: Bot, color: "text-violet-400", bg: "bg-violet-500/15" },
                { label: "ASEAN Connected", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/15" },
                { label: "1M AI Listings", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/15" },
              ].map(item => (
                <div key={item.label} className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-center">
                  <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-[9px] font-bold text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0081C9]/20 via-slate-800/50 to-[#C1121F]/20 border border-slate-700/50 rounded-xl p-6 text-center">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Tagline</p>
            <p className="text-lg md:text-xl font-bold text-white mb-3 italic">
              "Connecting Cultures with Loyalty and Truth"
            </p>
            <p className="text-xs text-slate-400 max-w-lg mx-auto mb-4">
              Bridging Cambodia to ASEAN and global markets through alliances of guides and AI builders. A private, ecosystem tech infrastructure built for growth, digital empowerment, and personal control.
            </p>
            <Button onClick={onExploreMap} className="bg-[#0081C9] hover:bg-[#006da8] text-white font-semibold px-6 h-10 text-sm rounded-xl" data-testid="btn-enter-platform">
              Enter the Platform <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
