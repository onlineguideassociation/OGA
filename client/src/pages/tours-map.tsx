import React, { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, Navigation, ChevronRight, X, Bot, DollarSign, Zap, Search, Wifi, Map as MapIcon, GitBranch,
  Plane, Hotel, Utensils, ShoppingBag, Ticket, Sparkles, Clock, Users, MapPin, Filter
} from "lucide-react";
import { Link } from "wouter";
import { CAMBODIA_NODES, NODE_TYPES, getNodeConfig, toX, toY, type MapNode } from "./map/map-data";

const TOUR_CARDS = [
  { name: "Angkor Sunrise Tour", price: "$25", duration: "4h", rating: 4.9, reviews: 342, badge: "BESTSELLER", lat: 13.4125, lng: 103.8667 },
  { name: "Temple Bike Tour", price: "$15", duration: "3h", rating: 4.7, reviews: 189, badge: "POPULAR", lat: 13.36, lng: 103.86 },
  { name: "Sunset Cruise", price: "$35", duration: "2.5h", rating: 4.8, reviews: 256, badge: "NEW", lat: 13.35, lng: 103.85 },
  { name: "Phnom Penh City Walk", price: "$20", duration: "3h", rating: 4.6, reviews: 178, badge: "", lat: 11.5564, lng: 104.9282 },
  { name: "Mekong River Cruise", price: "$45", duration: "6h", rating: 4.8, reviews: 134, badge: "PREMIUM", lat: 11.98, lng: 105.45 },
  { name: "Kampot Pepper Tour", price: "$30", duration: "5h", rating: 4.7, reviews: 98, badge: "", lat: 10.6, lng: 104.18 },
];

export default function ToursMapPage() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(NODE_TYPES.map(n => n.type)));
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTourCards, setShowTourCards] = useState(true);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  const filteredNodes = CAMBODIA_NODES.filter(n =>
    activeFilters.has(n.type) &&
    (searchQuery === "" || n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getConnections = useCallback(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const seen = new Set<string>();
    filteredNodes.forEach(node => {
      (node.connections || []).forEach(connId => {
        const key = [node.id, connId].sort().join("-");
        if (seen.has(key)) return;
        const target = filteredNodes.find(n => n.id === connId);
        if (target) { seen.add(key); lines.push({ x1: toX(node.lng), y1: toY(node.lat), x2: toX(target.lng), y2: toY(target.lat) }); }
      });
    });
    return lines;
  }, [filteredNodes]);

  const nodeConfig = selectedNode ? getNodeConfig(selectedNode.type) : null;

  return (
    <Layout>
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b, #020617)" }}>
        <div className="text-center py-10 px-4 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-6 left-1/4 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-6 right-1/4 h-32 w-32 rounded-full bg-[#00AF87]/10 blur-3xl" />
          </div>
          <div className="relative z-10">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1 text-[10px] mb-4 inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              LIVE TOURS
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-tours-map-title" style={{ background: "linear-gradient(90deg, #22c55e, #00AF87)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Explore Tours
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto mb-6">
              Discover Angkor Wat, Siem Reap & Cambodia with OnlineGuide
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button className="font-semibold px-5 h-10 text-sm shadow-lg" style={{ background: "linear-gradient(135deg, #22c55e, #00AF87)" }} data-testid="btn-search-tours">
                <Search className="h-4 w-4 mr-2" /> Search Tours
              </Button>
              <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-semibold px-5 h-10 text-sm" data-testid="btn-book-tour">
                <Ticket className="h-4 w-4 mr-2" /> Book a Tour
              </Button>
              <Link href="/graph-explorer">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold px-5 h-10 text-sm" data-testid="link-graph-explorer">
                  <GitBranch className="h-4 w-4 mr-2" /> Graph Explorer
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-5 mt-5 text-slate-500 text-[10px] flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> 21 Destinations</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 200+ Guides</span>
              <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 4.8 Avg Rating</span>
              <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI-Powered</span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="max-w-6xl mx-auto flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input type="text" placeholder="Search destinations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-white/5 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                data-testid="input-search-map-nodes" />
            </div>
            <div className="flex gap-1 flex-wrap">
              {NODE_TYPES.map(nt => {
                const active = activeFilters.has(nt.type);
                return (
                  <button key={nt.type} onClick={() => toggleFilter(nt.type)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${active ? "bg-slate-700/80 border-white/10 text-white shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800"}`}
                    data-testid={`map-filter-${nt.type}`}>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? nt.color : "bg-slate-600"}`} />
                    <span className="hidden lg:inline">{nt.label}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setShowTourCards(!showTourCards)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${showTourCards ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-transparent text-slate-500 hover:text-slate-300"}`}
              data-testid="toggle-tour-cards">
              <DollarSign className="h-3 w-3" /> Tour Prices
            </button>
            <Badge className="bg-slate-800 text-slate-400 border-white/5 text-[10px] ml-auto">
              <Wifi className="h-3 w-3 mr-1" /> {filteredNodes.length} Nodes
            </Badge>
          </div>
        </div>

        <div className="px-4 pb-6">
          <div className="max-w-6xl mx-auto rounded-2xl p-3 shadow-2xl" style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
            <div className="relative rounded-xl overflow-hidden" style={{ height: "80vh" }}>
              <div className="w-full h-full bg-gradient-to-br from-slate-800/80 via-[#0f172a] to-slate-800/80 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="mapGlowFull" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.06" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
                    <filter id="glowFull"><feGaussianBlur stdDeviation="0.3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <filter id="priceShadow"><feDropShadow dx="0" dy="0.15" stdDeviation="0.2" floodColor="#000" floodOpacity="0.5" /></filter>
                  </defs>
                  <rect width="100" height="100" fill="url(#mapGlowFull)" />
                  <path d="M 42,12 Q 50,8 58,14 Q 66,22 64,32 Q 70,38 68,48 Q 72,55 67,65 Q 62,72 55,78 Q 48,82 42,76 Q 34,72 36,62 Q 30,55 33,45 Q 28,38 34,28 Q 30,20 42,12 Z" fill="none" stroke="#334155" strokeWidth="0.25" strokeDasharray="0.8,0.8" opacity="0.4" />
                  <text x="52" y="50" textAnchor="middle" fill="#475569" fontSize="1.8" fontWeight="bold" opacity="0.15">CAMBODIA</text>
                  <text x="52" y="53" textAnchor="middle" fill="#475569" fontSize="0.9" opacity="0.1">SOUTHEAST ASIA</text>

                  {getConnections().map((line, i) => (
                    <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#22c55e" strokeWidth="0.1" strokeDasharray="0.4,0.4" opacity="0.25" />
                  ))}

                  {filteredNodes.map(node => {
                    const x = toX(node.lng), y = toY(node.lat);
                    const isSelected = selectedNode?.id === node.id;
                    const isHovered = hoveredNode === node.id;
                    const isActive = isSelected || isHovered;
                    const colorMap: Record<string, string> = { airport: "#3b82f6", city: "#64748b", temple: "#f59e0b", market: "#22c55e", hotel: "#a855f7", restaurant: "#ef4444", shop: "#ec4899", media: "#8b5cf6", commerce: "#10b981", realestate: "#f97316", agriculture: "#65a30d", skills: "#06b6d4" };
                    const color = colorMap[node.type] || "#64748b";
                    return (
                      <g key={node.id} className="cursor-pointer" filter={isActive ? "url(#glowFull)" : undefined}
                        onClick={() => setSelectedNode(node)} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}>
                        {isActive && <circle cx={x} cy={y} r="2" fill={color} opacity="0.15"><animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" /></circle>}
                        <circle cx={x} cy={y} r={isActive ? "0.9" : "0.6"} fill={color} stroke={isActive ? "#fff" : "transparent"} strokeWidth="0.12" />
                        {isActive && (
                          <>
                            <rect x={x - (Math.min(node.name.length, 22) * 0.32)} y={y - 2.8} width={Math.min(node.name.length, 22) * 0.64} height="1.6" rx="0.4" fill="rgba(0,0,0,0.8)" />
                            <text x={x} y={y - 1.7} textAnchor="middle" fill="white" fontSize="0.95" fontWeight="bold">{node.name.length > 22 ? node.name.slice(0, 22) + "…" : node.name}</text>
                          </>
                        )}
                      </g>
                    );
                  })}

                  {showTourCards && TOUR_CARDS.map((tour, i) => {
                    const x = toX(tour.lng), y = toY(tour.lat);
                    const labelWidth = tour.price.length * 0.7 + 1.2;
                    return (
                      <g key={`tour-${i}`} filter="url(#priceShadow)" className="cursor-pointer">
                        <rect x={x - labelWidth / 2} y={y - 4.5} width={labelWidth} height="1.8" rx="0.5" fill="#22c55e" />
                        <polygon points={`${x - 0.4},${y - 2.7} ${x + 0.4},${y - 2.7} ${x},${y - 2}`} fill="#22c55e" />
                        <text x={x} y={y - 3.3} textAnchor="middle" fill="white" fontSize="0.9" fontWeight="bold">{tour.price}</text>
                      </g>
                    );
                  })}
                </svg>

                {showTourCards && (
                  <div className="absolute top-4 right-4 w-56 space-y-2 z-10" data-testid="floating-tour-cards">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> Top Tours Today
                    </div>
                    {TOUR_CARDS.slice(0, 4).map((tour, i) => (
                      <div key={i} className="rounded-xl p-3 backdrop-blur-xl border transition-all hover:border-emerald-500/30 cursor-pointer" style={{ background: "rgba(15,23,42,0.9)", borderColor: "rgba(255,255,255,0.05)" }} data-testid={`floating-tour-${i}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-white truncate">{tour.name}</span>
                          {tour.badge && <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[7px] px-1 py-0">{tour.badge}</Badge>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: "#22c55e" }}>{tour.price}</span>
                            <span className="text-[9px] text-slate-500 flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {tour.duration}</span>
                          </div>
                          <span className="flex items-center gap-0.5 text-[9px] text-amber-400">
                            <Star className="h-2.5 w-2.5 fill-amber-400" /> {tour.rating}
                          </span>
                        </div>
                        <Button size="sm" className="w-full h-6 text-[9px] mt-2 font-semibold" style={{ background: "linear-gradient(135deg, #22c55e, #00AF87)" }} data-testid={`btn-book-tour-${i}`}>
                          Book Now
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedNode && nodeConfig && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 max-w-2xl mx-auto">
                    <Card className="backdrop-blur-xl border shadow-2xl text-white" style={{ background: "rgba(15,23,42,0.95)", borderColor: "rgba(255,255,255,0.05)" }}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {(() => { const Icon = nodeConfig.icon; return <div className={`p-1.5 rounded-lg ${nodeConfig.color}`}><Icon className="h-4 w-4 text-white" /></div>; })()}
                            <div>
                              <h3 className="text-sm font-bold">{selectedNode.name}</h3>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="outline" className="text-[10px] capitalize border-white/10 text-slate-300">{selectedNode.type}</Badge>
                                {selectedNode.rating && <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[10px] text-amber-500 font-medium">{selectedNode.rating}</span></span>}
                                {selectedNode.revenue && <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3 text-emerald-500" /><span className="text-[10px] text-emerald-500 font-medium">{selectedNode.revenue}</span></span>}
                              </div>
                            </div>
                          </div>
                          <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                        </div>
                        <p className="text-xs mb-2 text-slate-400">{selectedNode.description}</p>
                        {selectedNode.aiRecommendation && (
                          <div className="p-2.5 rounded-lg mb-2" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                            <div className="flex items-center gap-1.5 mb-0.5"><Bot className="h-3 w-3 text-emerald-400" /><span className="text-[10px] font-bold text-emerald-400">AI Recommendation</span></div>
                            <p className="text-xs text-slate-300">{selectedNode.aiRecommendation}</p>
                          </div>
                        )}
                        {selectedNode.connections && selectedNode.connections.length > 0 && (
                          <div className="mb-2">
                            <span className="text-[10px] font-bold uppercase text-slate-500">Connected To:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedNode.connections.map(connId => {
                                const conn = CAMBODIA_NODES.find(n => n.id === connId);
                                return conn && <Badge key={connId} variant="outline" className="text-[10px] cursor-pointer border-white/10 text-slate-300 hover:bg-slate-700" onClick={() => setSelectedNode(conn)}>{conn.name} <ChevronRight className="h-2.5 w-2.5 ml-0.5" /></Badge>;
                              })}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" className="text-xs h-7 font-semibold" style={{ background: "linear-gradient(135deg, #22c55e, #00AF87)" }} data-testid="button-navigate-map"><Navigation className="h-3 w-3 mr-1" /> Navigate</Button>
                          <Button size="sm" variant="outline" className="text-xs h-7 border-white/10 text-slate-300 hover:bg-slate-700" data-testid="button-itinerary-map"><Zap className="h-3 w-3 mr-1" /> Itinerary</Button>
                          <Button size="sm" variant="outline" className="text-xs h-7 border-white/10 text-slate-300 hover:bg-slate-700" data-testid="button-agent-map"><Bot className="h-3 w-3 mr-1" /> AI Agent</Button>
                          <Button size="sm" variant="outline" className="text-xs h-7 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" data-testid="button-book-map"><Ticket className="h-3 w-3 mr-1" /> Book Tour</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
