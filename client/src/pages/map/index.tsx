import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import {
  MapPin, Plane, Hotel, Utensils, ShoppingBag, Landmark, Building,
  Filter, Layers, Zap, Star, Navigation, Globe, ChevronRight, X,
  Wifi, TrendingUp, Bot
} from "lucide-react";

interface MapNode {
  id: string;
  name: string;
  type: "airport" | "city" | "temple" | "market" | "hotel" | "restaurant" | "shop";
  lat: number;
  lng: number;
  description: string;
  rating?: number;
  aiRecommendation?: string;
  connections?: string[];
}

const CAMBODIA_NODES: MapNode[] = [
  { id: "pp-airport", name: "Phnom Penh International Airport", type: "airport", lat: 11.5465, lng: 104.8442, description: "Main international gateway to Cambodia", connections: ["pp-city"], aiRecommendation: "Best arrival hub for Southern Cambodia tour" },
  { id: "sr-airport", name: "Siem Reap International Airport", type: "airport", lat: 13.4107, lng: 103.8126, description: "Gateway to Angkor temples", connections: ["sr-city"], aiRecommendation: "Direct flights from Bangkok, Seoul, Singapore" },
  { id: "pp-city", name: "Phnom Penh", type: "city", lat: 11.5564, lng: 104.9282, description: "Capital city of Cambodia", connections: ["pp-airport", "royal-palace", "central-market", "malis"], aiRecommendation: "AI suggests 2-day cultural deep dive" },
  { id: "sr-city", name: "Siem Reap", type: "city", lat: 13.3633, lng: 103.8564, description: "Gateway to the Angkor temples", connections: ["sr-airport", "angkor-wat", "bayon", "old-market", "cuisine-wd"], aiRecommendation: "3-day temple circuit recommended by AI" },
  { id: "angkor-wat", name: "Angkor Wat", type: "temple", lat: 13.4125, lng: 103.8670, description: "World's largest religious monument, UNESCO Heritage", rating: 4.9, connections: ["sr-city", "bayon"], aiRecommendation: "Sunrise visit at 5:30am optimal. Avg 2.5hr visit." },
  { id: "bayon", name: "Bayon Temple", type: "temple", lat: 13.4411, lng: 103.8600, description: "Famous for its serene stone faces", rating: 4.8, connections: ["angkor-wat", "sr-city"], aiRecommendation: "Best lighting for photos: 7-9am" },
  { id: "royal-palace", name: "Royal Palace", type: "temple", lat: 11.5619, lng: 104.9312, description: "Official residence of the King of Cambodia", rating: 4.7, connections: ["pp-city"], aiRecommendation: "Pair with Silver Pagoda visit. Allow 2hrs." },
  { id: "ta-prohm", name: "Ta Prohm", type: "temple", lat: 13.4350, lng: 103.8891, description: "The 'Tomb Raider' temple with jungle roots", rating: 4.8, connections: ["angkor-wat"], aiRecommendation: "Less crowded after 3pm" },
  { id: "central-market", name: "Central Market", type: "market", lat: 11.5710, lng: 104.9224, description: "Art deco market with local goods", rating: 4.3, connections: ["pp-city"], aiRecommendation: "Best for silk, spices, and souvenirs" },
  { id: "old-market", name: "Old Market (Phsar Chas)", type: "market", lat: 13.3530, lng: 103.8573, description: "Bustling market in Siem Reap center", rating: 4.4, connections: ["sr-city"], aiRecommendation: "Morning visits best for fresh produce" },
  { id: "night-market", name: "Angkor Night Market", type: "market", lat: 13.3582, lng: 103.8553, description: "Evening shopping with crafts and food stalls", rating: 4.2, connections: ["sr-city", "old-market"], aiRecommendation: "Opens 5pm. Best souvenir prices after 8pm." },
  { id: "raffles", name: "Raffles Hotel Le Royal", type: "hotel", lat: 11.5730, lng: 104.9210, description: "Historic luxury hotel in Phnom Penh", rating: 4.9, connections: ["pp-city"], aiRecommendation: "Top pick for luxury travelers. Book 30d ahead." },
  { id: "shinta-mani", name: "Shinta Mani Angkor", type: "hotel", lat: 13.3610, lng: 103.8580, description: "Award-winning boutique hotel near temples", rating: 4.8, connections: ["sr-city"], aiRecommendation: "Best value luxury in Siem Reap" },
  { id: "malis", name: "Malis Restaurant", type: "restaurant", lat: 11.5599, lng: 104.9350, description: "Fine Khmer dining by celebrity chef Luu Meng", rating: 4.8, connections: ["pp-city"], aiRecommendation: "Reserve 2 days ahead. Try the Fish Amok." },
  { id: "cuisine-wd", name: "Cuisine Wat Damnak", type: "restaurant", lat: 13.3508, lng: 103.8571, description: "Innovative Cambodian cuisine with local ingredients", rating: 4.9, connections: ["sr-city"], aiRecommendation: "6-course tasting menu highly rated" },
  { id: "silk-shop", name: "Artisans Angkor", type: "shop", lat: 13.3555, lng: 103.8590, description: "Premium Cambodian silk and crafts workshop", rating: 4.7, connections: ["sr-city", "old-market"], aiRecommendation: "Free workshop tours available daily" },
];

const NODE_TYPES = [
  { type: "airport", label: "Airports", icon: Plane, color: "bg-blue-500", textColor: "text-blue-600" },
  { type: "city", label: "Cities", icon: Building, color: "bg-slate-700", textColor: "text-slate-700" },
  { type: "temple", label: "Temples", icon: Landmark, color: "bg-amber-500", textColor: "text-amber-600" },
  { type: "market", label: "Markets", icon: ShoppingBag, color: "bg-green-500", textColor: "text-green-600" },
  { type: "hotel", label: "Hotels", icon: Hotel, color: "bg-purple-500", textColor: "text-purple-600" },
  { type: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-red-500", textColor: "text-red-600" },
  { type: "shop", label: "Shops", icon: ShoppingBag, color: "bg-pink-500", textColor: "text-pink-600" },
] as const;

function getNodeConfig(type: string) {
  return NODE_TYPES.find(nt => nt.type === type) || NODE_TYPES[0];
}

export default function KnowledgeGraphMap() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(NODE_TYPES.map(n => n.type)));
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredNodes = CAMBODIA_NODES.filter(n => activeFilters.has(n.type));

  const mapBounds = { minLat: 10.5, maxLat: 14.5, minLng: 102.5, maxLng: 106.5 };
  const toX = (lng: number) => ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
  const toY = (lat: number) => ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;

  const getConnections = useCallback(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; }[] = [];
    filteredNodes.forEach(node => {
      (node.connections || []).forEach(connId => {
        const target = filteredNodes.find(n => n.id === connId);
        if (target) {
          lines.push({
            x1: toX(node.lng), y1: toY(node.lat),
            x2: toX(target.lng), y2: toY(target.lat),
          });
        }
      });
    });
    return lines;
  }, [filteredNodes]);

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900">
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-6 w-6 text-[#0081C9]" />
                <h2 className="text-xl font-bold text-white">Knowledge Graph</h2>
              </div>
              <p className="text-sm text-slate-400">AI-powered tourism intelligence map</p>
            </div>

            <div className="p-4 border-b border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter className="h-3 w-3" /> Node Filters
              </h3>
              <div className="space-y-2">
                {NODE_TYPES.map(nt => {
                  const Icon = nt.icon;
                  const active = activeFilters.has(nt.type);
                  return (
                    <button
                      key={nt.type}
                      onClick={() => toggleFilter(nt.type)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'}`}
                      data-testid={`filter-${nt.type}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${active ? nt.color : 'bg-slate-600'}`} />
                      <Icon className="h-4 w-4" />
                      <span>{nt.label}</span>
                      <Badge variant="outline" className={`ml-auto text-[10px] ${active ? 'border-slate-500 text-slate-300' : 'border-slate-600 text-slate-500'}`}>
                        {CAMBODIA_NODES.filter(n => n.type === nt.type).length}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="h-3 w-3" /> Nodes ({filteredNodes.length})
              </h3>
              <div className="space-y-2">
                {filteredNodes.map(node => {
                  const config = getNodeConfig(node.type);
                  const Icon = config.icon;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${selectedNode?.id === node.id ? 'bg-[#0081C9]/20 border border-[#0081C9]/50' : 'bg-slate-700/50 hover:bg-slate-700 border border-transparent'}`}
                      data-testid={`node-${node.id}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`h-4 w-4 ${config.textColor}`} />
                        <span className="text-sm font-medium text-white truncate">{node.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{node.description}</p>
                      {node.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-amber-400">{node.rating}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 bg-gradient-to-r from-[#0081C9]/10 to-[#C1121F]/10">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-[#0081C9]" />
                <span className="text-xs font-bold text-white">AI Insights</span>
              </div>
              <p className="text-xs text-slate-300">Peak tourism season detected. Siem Reap hotels at 87% occupancy. Book 2+ weeks ahead for best rates.</p>
            </div>
          </div>

          <div className="flex-1 relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                LIVE DATA
              </Badge>
              <Badge className="bg-[#0081C9]/20 text-[#0081C9] border-[#0081C9]/30 px-3 py-1">
                <Wifi className="h-3 w-3 mr-1" /> Graph Synced
              </Badge>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-slate-700/80 text-slate-300 border-slate-600 px-3 py-1">
                <Navigation className="h-3 w-3 mr-1" /> Cambodia • Southeast Asia
              </Badge>
            </div>

            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0081C9" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="100" height="100" fill="url(#mapGlow)" />

              <path d="M 40,15 Q 55,10 65,20 Q 72,30 68,45 Q 75,55 70,65 Q 65,75 55,80 Q 45,85 40,75 Q 30,70 32,60 Q 28,50 35,40 Q 30,30 40,15 Z"
                fill="none" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />

              <text x="52" y="50" textAnchor="middle" fill="#475569" fontSize="2" fontWeight="bold" opacity="0.3">CAMBODIA</text>

              {getConnections().map((line, i) => (
                <line
                  key={i}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="#0081C9"
                  strokeWidth="0.15"
                  strokeDasharray="0.5,0.5"
                  opacity="0.4"
                />
              ))}

              {filteredNodes.map(node => {
                const config = getNodeConfig(node.type);
                const x = toX(node.lng);
                const y = toY(node.lat);
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode === node.id;
                const isActive = isSelected || isHovered;

                const colorMap: Record<string, string> = {
                  airport: "#3b82f6", city: "#64748b", temple: "#f59e0b",
                  market: "#22c55e", hotel: "#a855f7", restaurant: "#ef4444", shop: "#ec4899",
                };
                const color = colorMap[node.type] || "#64748b";

                return (
                  <g key={node.id} className="cursor-pointer" filter={isActive ? "url(#glow)" : undefined}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {isActive && <circle cx={x} cy={y} r="2" fill={color} opacity="0.2">
                      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
                    </circle>}
                    <circle cx={x} cy={y} r={isActive ? "1" : "0.7"} fill={color} stroke={isActive ? "#fff" : "transparent"} strokeWidth="0.15" />
                    {isActive && (
                      <text x={x} y={y - 1.8} textAnchor="middle" fill="white" fontSize="1.2" fontWeight="bold">
                        {node.name.length > 20 ? node.name.slice(0, 20) + '…' : node.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {selectedNode && (
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <Card className="bg-slate-800/95 backdrop-blur-xl border-slate-700 text-white shadow-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const config = getNodeConfig(selectedNode.type);
                          const Icon = config.icon;
                          return <div className={`p-2 rounded-lg ${config.color}`}><Icon className="h-5 w-5 text-white" /></div>;
                        })()}
                        <div>
                          <h3 className="text-lg font-bold">{selectedNode.name}</h3>
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300 capitalize">{selectedNode.type}</Badge>
                        </div>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{selectedNode.description}</p>
                    {selectedNode.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-amber-400">{selectedNode.rating} / 5.0</span>
                      </div>
                    )}
                    {selectedNode.aiRecommendation && (
                      <div className="p-3 bg-[#0081C9]/10 border border-[#0081C9]/30 rounded-lg mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-[#0081C9]" />
                          <span className="text-xs font-bold text-[#0081C9]">AI Recommendation</span>
                        </div>
                        <p className="text-sm text-slate-300">{selectedNode.aiRecommendation}</p>
                      </div>
                    )}
                    {selectedNode.connections && selectedNode.connections.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Connected To:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedNode.connections.map(connId => {
                            const conn = CAMBODIA_NODES.find(n => n.id === connId);
                            return conn && (
                              <Badge
                                key={connId}
                                variant="outline"
                                className="text-xs border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700"
                                onClick={() => setSelectedNode(conn)}
                              >
                                {conn.name} <ChevronRight className="h-3 w-3 ml-1" />
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3 mt-4">
                      <Button size="sm" className="bg-[#0081C9] hover:bg-blue-700 text-white" data-testid="button-navigate-node">
                        <Navigation className="h-4 w-4 mr-1" /> Navigate
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" data-testid="button-add-itinerary">
                        <Zap className="h-4 w-4 mr-1" /> Add to Itinerary
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
