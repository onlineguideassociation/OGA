import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge, Background, Controls, MiniMap,
  Connection, Edge, Node, MarkerType
} from "reactflow";
import "reactflow/dist/style.css";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Plane, Hotel, Utensils, ShoppingBag, Landmark, Building,
  Filter, Layers, Zap, Star, Navigation, Globe, ChevronRight, X,
  Wifi, TrendingUp, Bot, Network, Info, DollarSign, Map as MapIcon,
  GitBranch, Search, Calendar, Users, Loader2, Gift, Building2
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Hotel as HotelType, Restaurant } from "@shared/schema";

type ViewMode = "map" | "graph" | "hotels" | "dining";

interface MapNode {
  id: string;
  name: string;
  type: "airport" | "city" | "temple" | "market" | "hotel" | "restaurant" | "shop" | "media" | "commerce" | "realestate" | "agriculture" | "skills";
  lat: number;
  lng: number;
  description: string;
  rating?: number;
  revenue?: string;
  aiRecommendation?: string;
  connections?: string[];
}

const CAMBODIA_NODES: MapNode[] = [
  { id: "pp-airport", name: "Phnom Penh International Airport", type: "airport", lat: 11.5465, lng: 104.8442, description: "Main international gateway to Cambodia", revenue: "$8.2M", connections: ["pp-city"], aiRecommendation: "Best arrival hub for Southern Cambodia tour" },
  { id: "sr-airport", name: "Siem Reap International Airport", type: "airport", lat: 13.4107, lng: 103.8126, description: "Gateway to Angkor temples", revenue: "$5.1M", connections: ["sr-city"], aiRecommendation: "Direct flights from Bangkok, Seoul, Singapore" },
  { id: "pp-city", name: "Phnom Penh", type: "city", lat: 11.5564, lng: 104.9282, description: "Capital city of Cambodia", revenue: "$24M", connections: ["pp-airport", "royal-palace", "central-market", "malis", "raffles"], aiRecommendation: "AI suggests 2-day cultural deep dive" },
  { id: "sr-city", name: "Siem Reap", type: "city", lat: 13.3633, lng: 103.8564, description: "Gateway to the Angkor temples", revenue: "$32M", connections: ["sr-airport", "angkor-wat", "bayon", "old-market", "cuisine-wd", "shinta-mani", "silk-shop"], aiRecommendation: "3-day temple circuit recommended by AI" },
  { id: "angkor-wat", name: "Angkor Wat", type: "temple", lat: 13.4125, lng: 103.8670, description: "World's largest religious monument, UNESCO Heritage", rating: 4.9, revenue: "$2.4k", connections: ["sr-city", "bayon", "ta-prohm", "heritage-photo"], aiRecommendation: "Sunrise visit at 5:30am optimal. Avg 2.5hr visit." },
  { id: "bayon", name: "Bayon Temple", type: "temple", lat: 13.4411, lng: 103.8600, description: "Famous for its serene stone faces", rating: 4.8, revenue: "$1.8k", connections: ["angkor-wat", "sr-city"], aiRecommendation: "Best lighting for photos: 7-9am" },
  { id: "royal-palace", name: "Royal Palace", type: "temple", lat: 11.5619, lng: 104.9312, description: "Official residence of the King of Cambodia", rating: 4.7, revenue: "$1.2k", connections: ["pp-city"], aiRecommendation: "Pair with Silver Pagoda visit. Allow 2hrs." },
  { id: "ta-prohm", name: "Ta Prohm", type: "temple", lat: 13.4350, lng: 103.8891, description: "The 'Tomb Raider' temple with jungle roots", rating: 4.8, revenue: "$1.6k", connections: ["angkor-wat"], aiRecommendation: "Less crowded after 3pm" },
  { id: "central-market", name: "Central Market", type: "market", lat: 11.5710, lng: 104.9224, description: "Art deco market with local goods", rating: 4.3, revenue: "$890", connections: ["pp-city", "artisan-shop"], aiRecommendation: "Best for silk, spices, and souvenirs" },
  { id: "old-market", name: "Old Market (Phsar Chas)", type: "market", lat: 13.3530, lng: 103.8573, description: "Bustling market in Siem Reap center", rating: 4.4, revenue: "$1.1k", connections: ["sr-city", "night-market", "silk-shop"], aiRecommendation: "Morning visits best for fresh produce" },
  { id: "night-market", name: "Angkor Night Market", type: "market", lat: 13.3582, lng: 103.8553, description: "Evening shopping with crafts and food stalls", rating: 4.2, revenue: "$720", connections: ["sr-city", "old-market"], aiRecommendation: "Opens 5pm. Best souvenir prices after 8pm." },
  { id: "raffles", name: "Raffles Hotel Le Royal", type: "hotel", lat: 11.5730, lng: 104.9210, description: "Historic luxury hotel in Phnom Penh", rating: 4.9, revenue: "$4.5M", connections: ["pp-city"], aiRecommendation: "Top pick for luxury travelers. Book 30d ahead." },
  { id: "shinta-mani", name: "Shinta Mani Angkor", type: "hotel", lat: 13.3610, lng: 103.8580, description: "Award-winning boutique hotel near temples", rating: 4.8, revenue: "$2.8M", connections: ["sr-city"], aiRecommendation: "Best value luxury in Siem Reap" },
  { id: "malis", name: "Malis Restaurant", type: "restaurant", lat: 11.5599, lng: 104.9350, description: "Fine Khmer dining by celebrity chef Luu Meng", rating: 4.8, revenue: "$320k", connections: ["pp-city"], aiRecommendation: "Reserve 2 days ahead. Try the Fish Amok." },
  { id: "cuisine-wd", name: "Cuisine Wat Damnak", type: "restaurant", lat: 13.3508, lng: 103.8571, description: "Innovative Cambodian cuisine with local ingredients", rating: 4.9, revenue: "$280k", connections: ["sr-city"], aiRecommendation: "6-course tasting menu highly rated" },
  { id: "silk-shop", name: "Artisans Angkor", type: "shop", lat: 13.3555, lng: 103.8590, description: "Premium Cambodian silk and crafts workshop", rating: 4.7, revenue: "$450k", connections: ["sr-city", "old-market"], aiRecommendation: "Free workshop tours available daily" },
  { id: "heritage-photo", name: "Heritage Photo Tours", type: "media", lat: 13.39, lng: 103.84, description: "Professional photography tours across Angkor complex", revenue: "$450", connections: ["angkor-wat", "artisan-shop"], aiRecommendation: "High content-to-commerce conversion rate" },
  { id: "artisan-shop", name: "Artisan Commerce Hub", type: "commerce", lat: 11.56, lng: 104.95, description: "E-commerce platform for Cambodian artisan products", revenue: "$1.1k", connections: ["central-market", "heritage-photo"], aiRecommendation: "Product listings growing 18% month-over-month" },
  { id: "resort-land", name: "Coastal Resort Development", type: "realestate", lat: 10.63, lng: 103.52, description: "Eco-resort development on Koh Rong Sanloem", revenue: "$50k", connections: ["eco-farm"], aiRecommendation: "Sustainable tourism investment opportunity" },
  { id: "eco-farm", name: "Battambang Eco Farm", type: "agriculture", lat: 13.10, lng: 103.20, description: "Organic farm-to-table experience near Battambang", revenue: "$3.2k", connections: ["resort-land"], aiRecommendation: "Agro-tourism growing 25% YoY in region" },
  { id: "ai-mentor", name: "AI Tourism Mentor", type: "skills", lat: 12.50, lng: 105.50, description: "AI-powered guide training and certification platform", revenue: "$5k", connections: ["angkor-wat", "sr-city", "pp-city"], aiRecommendation: "Upskilling 200+ guides with AI-assisted certification" },
];

const NODE_TYPES = [
  { type: "airport", label: "Airports", icon: Plane, color: "bg-blue-500", textColor: "text-blue-600", graphColor: "#3b82f6", graphBg: "#eff6ff" },
  { type: "city", label: "Cities", icon: Building, color: "bg-slate-700", textColor: "text-slate-700", graphColor: "#64748b", graphBg: "#f8fafc" },
  { type: "temple", label: "Temples", icon: Landmark, color: "bg-amber-500", textColor: "text-amber-600", graphColor: "#f59e0b", graphBg: "#fffbeb" },
  { type: "market", label: "Markets", icon: ShoppingBag, color: "bg-green-500", textColor: "text-green-600", graphColor: "#22c55e", graphBg: "#f0fdf4" },
  { type: "hotel", label: "Hotels", icon: Hotel, color: "bg-purple-500", textColor: "text-purple-600", graphColor: "#a855f7", graphBg: "#faf5ff" },
  { type: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-red-500", textColor: "text-red-600", graphColor: "#ef4444", graphBg: "#fef2f2" },
  { type: "shop", label: "Shops", icon: ShoppingBag, color: "bg-pink-500", textColor: "text-pink-600", graphColor: "#ec4899", graphBg: "#fdf2f8" },
  { type: "media", label: "Media", icon: MapPin, color: "bg-violet-500", textColor: "text-violet-600", graphColor: "#8b5cf6", graphBg: "#f5f3ff" },
  { type: "commerce", label: "Commerce", icon: ShoppingBag, color: "bg-emerald-500", textColor: "text-emerald-600", graphColor: "#10b981", graphBg: "#ecfdf5" },
  { type: "realestate", label: "Real Estate", icon: Building, color: "bg-orange-500", textColor: "text-orange-600", graphColor: "#f97316", graphBg: "#fff7ed" },
  { type: "agriculture", label: "Agriculture", icon: MapPin, color: "bg-lime-600", textColor: "text-lime-600", graphColor: "#65a30d", graphBg: "#f7fee7" },
  { type: "skills", label: "Skills & AI", icon: Bot, color: "bg-cyan-500", textColor: "text-cyan-600", graphColor: "#06b6d4", graphBg: "#ecfeff" },
] as const;

function getNodeConfig(type: string) {
  return NODE_TYPES.find(nt => nt.type === type) || NODE_TYPES[0];
}

function buildReactFlowNodes(nodes: MapNode[]): Node[] {
  const typePositions: Record<string, { col: number; row: number }> = {};
  let colIndex = 0;
  const typeRowCounters: Record<string, number> = {};

  return nodes.map((node, i) => {
    if (!typePositions[node.type]) {
      typePositions[node.type] = { col: colIndex++, row: 0 };
      typeRowCounters[node.type] = 0;
    }
    const row = typeRowCounters[node.type]++;
    const col = typePositions[node.type].col;
    const config = getNodeConfig(node.type);

    return {
      id: node.id,
      type: "default",
      data: { label: `${node.name}`, type: node.type, revenue: node.revenue || "N/A", original: node },
      position: { x: col * 220 + (row % 2) * 40, y: row * 120 + (col % 2) * 60 },
      style: {
        background: config.graphBg,
        border: `2px solid ${config.graphColor}`,
        borderRadius: "12px",
        padding: "10px",
        width: 180,
        fontSize: "12px",
        fontWeight: 600,
      },
    };
  });
}

function buildReactFlowEdges(nodes: MapNode[]): Edge[] {
  const edges: Edge[] = [];
  const seen = new Set<string>();
  nodes.forEach(node => {
    (node.connections || []).forEach(connId => {
      const key = [node.id, connId].sort().join("-");
      if (!seen.has(key) && nodes.find(n => n.id === connId)) {
        seen.add(key);
        const config = getNodeConfig(node.type);
        edges.push({
          id: `e-${key}`,
          source: node.id,
          target: connId,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: config.graphColor, strokeWidth: 1.5 },
          animated: true,
        });
      }
    });
  });
  return edges;
}

function HotelsSidebar({ searchLocation, setSearchLocation }: { searchLocation: string; setSearchLocation: (v: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search destination..."
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#0081C9] transition-colors"
          data-testid="input-hotel-sidebar-search"
        />
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Filter className="h-3 w-3" /> Property Type
        </h3>
        <div className="space-y-1.5">
          {["Hotels", "Resorts", "Villas", "Apartments"].map(type => (
            <label key={type} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-white">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-[#0081C9] focus:ring-[#0081C9]" /> {type}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Price Range</h3>
        <input type="range" className="w-full accent-[#0081C9]" />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>$0</span><span>$1000+</span>
        </div>
      </div>
    </div>
  );
}

function DiningSidebar({ searchLocation, setSearchLocation }: { searchLocation: string; setSearchLocation: (v: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#C1121F] transition-colors"
          data-testid="input-dining-sidebar-search"
        />
      </div>

      <Card className="bg-gradient-to-br from-red-600/30 to-rose-600/20 border-red-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center">
              <Gift className="h-5 w-5 text-red-300" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Your Rewards</h3>
              <p className="text-xs text-red-200">Gold Tier</p>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-bold text-white">2,450</span>
            <span className="text-red-200 text-sm ml-1">pts</span>
          </div>
          <p className="text-xs text-red-200 mb-3">50 pts away from a $20 dining voucher</p>
          <Button size="sm" className="w-full bg-white/20 text-white hover:bg-white/30 border-none text-xs" data-testid="button-view-offers">View Offers</Button>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Filter className="h-3 w-3" /> Cuisine Types
        </h3>
        <div className="space-y-1.5">
          {['Khmer Authentic', 'French Fine Dining', 'Asian Fusion', 'Seafood', 'Vegetarian'].map(type => (
            <label key={type} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-white">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-[#C1121F] focus:ring-[#C1121F]" /> {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeGraphMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(NODE_TYPES.map(n => n.type)));
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("Oct 15 - Oct 20");
  const [guests, setGuests] = useState("2 Adults, 1 Room");
  const { toast } = useToast();

  const { data: hotels = [], isLoading: hotelsLoading } = useQuery<HotelType[]>({
    queryKey: ["/api/hotels", searchLocation],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchLocation) params.set("location", searchLocation);
      const res = await fetch(`/api/hotels?${params}`);
      if (!res.ok) throw new Error("Failed to fetch hotels");
      return res.json();
    },
    enabled: viewMode === "hotels" || viewMode === "dining",
  });

  const { data: restaurants = [], isLoading: restaurantsLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants", searchLocation],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchLocation) params.set("location", searchLocation);
      const res = await fetch(`/api/restaurants?${params}`);
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      return res.json();
    },
    enabled: viewMode === "hotels" || viewMode === "dining",
  });

  const hotelBookMutation = useMutation({
    mutationFn: async (hotel: HotelType) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hotel",
          referenceId: hotel.id,
          referenceName: hotel.name,
          checkIn: "2026-10-15",
          checkOut: "2026-10-20",
          guests: 2,
          totalPrice: hotel.price * 5,
          status: "confirmed",
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Booking Confirmed!", description: "Your hotel reservation has been created." });
    },
  });

  const restaurantBookMutation = useMutation({
    mutationFn: async ({ restaurant, time }: { restaurant: Restaurant; time: string }) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "restaurant",
          referenceId: restaurant.id,
          referenceName: restaurant.name,
          checkIn: `Today ${time}`,
          guests: 2,
          status: "confirmed",
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Table Reserved!", description: "Your reservation has been confirmed." });
    },
  });

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredNodes = CAMBODIA_NODES.filter(n =>
    activeFilters.has(n.type) &&
    (searchQuery === "" || n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const mapBounds = { minLat: 10.0, maxLat: 14.8, minLng: 102.0, maxLng: 107.0 };
  const toX = (lng: number) => ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
  const toY = (lat: number) => ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;

  const getConnections = useCallback(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const seen = new Set<string>();
    filteredNodes.forEach(node => {
      (node.connections || []).forEach(connId => {
        const key = [node.id, connId].sort().join("-");
        if (seen.has(key)) return;
        const target = filteredNodes.find(n => n.id === connId);
        if (target) {
          seen.add(key);
          lines.push({ x1: toX(node.lng), y1: toY(node.lat), x2: toX(target.lng), y2: toY(target.lat) });
        }
      });
    });
    return lines;
  }, [filteredNodes]);

  const rfNodes = useMemo(() => buildReactFlowNodes(filteredNodes), [filteredNodes]);
  const rfEdges = useMemo(() => buildReactFlowEdges(filteredNodes), [filteredNodes]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const onConnect = useCallback((params: Connection | Edge) => setFlowEdges(eds => addEdge(params, eds)), []);
  const mergedEdges = useMemo(() => [...rfEdges, ...flowEdges], [rfEdges, flowEdges]);

  const onNodeClick = (_: any, node: any) => {
    const original = node.data.original as MapNode;
    setSelectedNode(original);
  };

  const nodeConfig = selectedNode ? getNodeConfig(selectedNode.type) : null;
  const isGraphView = viewMode === "map" || viewMode === "graph";

  const VIEW_TABS: { key: ViewMode; label: string; icon: React.ElementType; color: string }[] = [
    { key: "map", label: "Tourism Map", icon: MapIcon, color: "#0081C9" },
    { key: "graph", label: "Graph Explorer", icon: GitBranch, color: "#0081C9" },
    { key: "hotels", label: "Hotels", icon: Hotel, color: "#3b82f6" },
    { key: "dining", label: "Dining", icon: Utensils, color: "#C1121F" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900">
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-6 w-6 text-[#0081C9]" />
                <h2 className="text-lg font-bold text-white">Knowledge Hub</h2>
              </div>
              <p className="text-xs text-slate-400 mb-4">Maps, graph intelligence, hotels & dining</p>
              <div className="grid grid-cols-2 gap-1 bg-slate-700/50 rounded-lg p-1">
                {VIEW_TABS.map(vt => {
                  const Icon = vt.icon;
                  return (
                    <button
                      key={vt.key}
                      onClick={() => setViewMode(vt.key)}
                      className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-[11px] font-medium transition-all ${viewMode === vt.key ? "text-white shadow" : "text-slate-400 hover:text-white"}`}
                      style={viewMode === vt.key ? { backgroundColor: vt.color } : {}}
                      data-testid={`toggle-${vt.key}-view`}
                    >
                      <Icon className="h-3.5 w-3.5" /> {vt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {isGraphView ? (
              <>
                <div className="px-4 pt-4 pb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search nodes..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#0081C9] transition-colors"
                      data-testid="input-search-nodes"
                    />
                  </div>
                </div>

                <div className="p-4 border-b border-slate-700">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Filter className="h-3 w-3" /> Filters
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {NODE_TYPES.map(nt => {
                      const Icon = nt.icon;
                      const active = activeFilters.has(nt.type);
                      const count = CAMBODIA_NODES.filter(n => n.type === nt.type).length;
                      return (
                        <button
                          key={nt.type}
                          onClick={() => toggleFilter(nt.type)}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] transition-all ${active ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                          data-testid={`filter-${nt.type}`}
                        >
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? nt.color : "bg-slate-600"}`} />
                          <span className="truncate">{nt.label}</span>
                          <span className="text-[10px] text-slate-500 ml-auto">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="h-3 w-3" /> Nodes ({filteredNodes.length})
                  </h3>
                  <div className="space-y-1.5">
                    {filteredNodes.map(node => {
                      const config = getNodeConfig(node.type);
                      const Icon = config.icon;
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          className={`w-full text-left p-2.5 rounded-lg transition-all ${selectedNode?.id === node.id ? "bg-[#0081C9]/20 border border-[#0081C9]/50" : "bg-slate-700/30 hover:bg-slate-700/60 border border-transparent"}`}
                          data-testid={`node-${node.id}`}
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <Icon className={`h-3.5 w-3.5 ${config.textColor} flex-shrink-0`} />
                            <span className="text-sm font-medium text-white truncate">{node.name}</span>
                          </div>
                          <div className="flex items-center gap-2 pl-5.5">
                            {node.rating && (
                              <div className="flex items-center gap-0.5">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-[11px] text-amber-400">{node.rating}</span>
                              </div>
                            )}
                            {node.revenue && (
                              <span className="text-[11px] text-emerald-400">{node.revenue}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : viewMode === "hotels" ? (
              <HotelsSidebar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
            ) : (
              <DiningSidebar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
            )}

            <div className="p-4 border-t border-slate-700 bg-gradient-to-r from-[#0081C9]/10 to-[#C1121F]/10">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-[#0081C9]" />
                <span className="text-xs font-bold text-white">AI Insights</span>
              </div>
              <p className="text-xs text-slate-300">
                {isGraphView
                  ? "Peak tourism season detected. Siem Reap hotels at 87% occupancy. Angkor Wat content generates 3.2x higher engagement."
                  : viewMode === "hotels"
                  ? `${hotels.length} properties available. Avg rate $${hotels.length > 0 ? Math.round(hotels.reduce((s, h) => s + h.price, 0) / hotels.length) : 0}/night. Book 2+ weeks ahead for best rates.`
                  : `${restaurants.length} restaurants listed. Peak dining hours 18:00-20:30. Khmer cuisine trending +15% in bookings.`
                }
              </p>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                LIVE
              </Badge>
              {isGraphView ? (
                <>
                  <Badge className="bg-[#0081C9]/20 text-[#0081C9] border-[#0081C9]/30 px-3 py-1">
                    <Wifi className="h-3 w-3 mr-1" /> {filteredNodes.length} Nodes
                  </Badge>
                  <Badge className="bg-slate-700/80 text-slate-300 border-slate-600 px-3 py-1">
                    <Navigation className="h-3 w-3 mr-1" /> Cambodia
                  </Badge>
                </>
              ) : viewMode === "hotels" ? (
                <>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                    <Hotel className="h-3 w-3 mr-1" /> {hotels.length} Hotels
                  </Badge>
                  <Badge className="bg-slate-700/80 text-slate-300 border-slate-600 px-3 py-1">
                    <Navigation className="h-3 w-3 mr-1" /> SE Asia
                  </Badge>
                </>
              ) : (
                <>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-3 py-1">
                    <Utensils className="h-3 w-3 mr-1" /> {restaurants.length} Restaurants
                  </Badge>
                  <Badge className="bg-slate-700/80 text-slate-300 border-slate-600 px-3 py-1">
                    <Navigation className="h-3 w-3 mr-1" /> SE Asia
                  </Badge>
                </>
              )}
            </div>

            {viewMode === "map" ? (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0081C9" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                      <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <rect width="100" height="100" fill="url(#mapGlow)" />

                  <path d="M 42,12 Q 50,8 58,14 Q 66,22 64,32 Q 70,38 68,48 Q 72,55 67,65 Q 62,72 55,78 Q 48,82 42,76 Q 34,72 36,62 Q 30,55 33,45 Q 28,38 34,28 Q 30,20 42,12 Z"
                    fill="none" stroke="#334155" strokeWidth="0.25" strokeDasharray="0.8,0.8" opacity="0.4" />
                  <text x="52" y="50" textAnchor="middle" fill="#475569" fontSize="1.8" fontWeight="bold" opacity="0.2">CAMBODIA</text>
                  <text x="52" y="53" textAnchor="middle" fill="#475569" fontSize="0.9" opacity="0.15">SOUTHEAST ASIA</text>

                  {getConnections().map((line, i) => (
                    <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                      stroke="#0081C9" strokeWidth="0.12" strokeDasharray="0.4,0.4" opacity="0.35" />
                  ))}

                  {filteredNodes.map(node => {
                    const x = toX(node.lng);
                    const y = toY(node.lat);
                    const isSelected = selectedNode?.id === node.id;
                    const isHovered = hoveredNode === node.id;
                    const isActive = isSelected || isHovered;
                    const colorMap: Record<string, string> = {
                      airport: "#3b82f6", city: "#64748b", temple: "#f59e0b", market: "#22c55e",
                      hotel: "#a855f7", restaurant: "#ef4444", shop: "#ec4899", media: "#8b5cf6",
                      commerce: "#10b981", realestate: "#f97316", agriculture: "#65a30d", skills: "#06b6d4",
                    };
                    const color = colorMap[node.type] || "#64748b";

                    return (
                      <g key={node.id} className="cursor-pointer" filter={isActive ? "url(#glow)" : undefined}
                        onClick={() => setSelectedNode(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {isActive && (
                          <circle cx={x} cy={y} r="2" fill={color} opacity="0.15">
                            <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle cx={x} cy={y} r={isActive ? "0.9" : "0.6"} fill={color}
                          stroke={isActive ? "#fff" : "transparent"} strokeWidth="0.12" />
                        {isActive && (
                          <>
                            <rect x={x - (Math.min(node.name.length, 22) * 0.32)} y={y - 2.8}
                              width={Math.min(node.name.length, 22) * 0.64} height="1.6"
                              rx="0.4" fill="rgba(0,0,0,0.7)" />
                            <text x={x} y={y - 1.7} textAnchor="middle" fill="white" fontSize="0.95" fontWeight="bold">
                              {node.name.length > 22 ? node.name.slice(0, 22) + "…" : node.name}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            ) : viewMode === "graph" ? (
              <div className="w-full h-full bg-slate-50">
                <ReactFlow
                  nodes={rfNodes}
                  edges={mergedEdges}
                  onConnect={onConnect}
                  onNodeClick={onNodeClick}
                  fitView
                  className="bg-slate-50"
                >
                  <Background />
                  <Controls />
                  <MiniMap />
                </ReactFlow>
              </div>
            ) : viewMode === "hotels" ? (
              <div className="w-full h-full overflow-y-auto bg-slate-50 p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                        <Building2 className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900" data-testid="text-hotels-title">Hotel Search</h1>
                        <p className="text-sm text-slate-500">Find & book accommodations across SE Asia</p>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-white/80 backdrop-blur border-none shadow-md">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-slate-700">Destination</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Where are you going?"
                              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                              value={searchLocation}
                              onChange={(e) => setSearchLocation(e.target.value)}
                              data-testid="input-hotel-destination"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-slate-700">Dates</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Check-in - Check-out"
                              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              data-testid="input-hotel-dates"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-slate-700">Guests</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Guests & Rooms"
                              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              data-testid="input-hotel-guests"
                            />
                          </div>
                        </div>
                        <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-search-hotels">
                          <Search className="h-4 w-4 mr-2" /> Search
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {hotelsLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      <span className="ml-3 text-slate-600">Searching hotels...</span>
                    </div>
                  ) : hotels.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">No hotels found. Try adjusting your search.</div>
                  ) : (
                    <div className="space-y-4">
                      {hotels.map(hotel => (
                        <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`hotel-card-${hotel.id}`}>
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-56 bg-slate-100 flex items-center justify-center text-5xl h-44 sm:h-auto border-r border-slate-100">
                              {hotel.image}
                            </div>
                            <div className="flex-1 p-5 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="outline" className="text-xs bg-slate-50">{hotel.type}</Badge>
                                      {hotel.ecoCertified && (
                                        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">Eco-Certified</Badge>
                                      )}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                                    <p className="text-sm text-slate-500 flex items-center mt-1">
                                      <MapPin className="h-3 w-3 mr-1" /> {hotel.location}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 mb-1">
                                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                      <span className="font-bold text-slate-900">{hotel.rating}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{hotel.reviews} reviews</span>
                                  </div>
                                </div>
                                {hotel.description && <p className="text-sm text-slate-600 mt-2">{hotel.description}</p>}
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {(hotel.amenities || []).slice(0, 4).map(amenity => (
                                    <Badge key={amenity} variant="outline" className="text-xs text-slate-600 border-slate-200">{amenity}</Badge>
                                  ))}
                                  {(hotel.amenities || []).length > 4 && (
                                    <Badge variant="outline" className="text-xs text-slate-500 border-slate-200 bg-slate-50">+{(hotel.amenities || []).length - 4} more</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-100">
                                <div>
                                  <p className="text-2xl font-bold text-slate-900">${hotel.price}</p>
                                  <p className="text-xs text-slate-500">per night, incl. taxes</p>
                                </div>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                                  onClick={() => hotelBookMutation.mutate(hotel)}
                                  disabled={hotelBookMutation.isPending}
                                  data-testid={`button-book-hotel-${hotel.id}`}
                                >
                                  {hotelBookMutation.isPending ? "Booking..." : "Book Now"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto bg-slate-50 p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-red-100 to-rose-50 rounded-xl">
                        <Utensils className="h-7 w-7 text-red-600" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900" data-testid="text-dining-title">Dining & Loyalty</h1>
                        <p className="text-sm text-slate-500">Book tables, earn rewards, discover cuisines</p>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-white border-none shadow-md">
                    <CardContent className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-slate-700">Search Restaurants</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Location, cuisine, or name"
                              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                              value={searchLocation}
                              onChange={(e) => setSearchLocation(e.target.value)}
                              data-testid="input-search-restaurants"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-slate-700">Date & Time</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Today, 19:00" className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm" data-testid="input-restaurant-date" />
                          </div>
                        </div>
                        <Button className="w-full h-10 bg-red-600 hover:bg-red-700 text-white" data-testid="button-find-table">
                          Find a Table
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {restaurantsLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                      <span className="ml-3 text-slate-600">Loading restaurants...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {restaurants.map(restaurant => (
                        <Card key={restaurant.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`restaurant-card-${restaurant.id}`}>
                          <div className="h-44 bg-slate-100 flex items-center justify-center text-5xl relative">
                            {restaurant.image}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold shadow-sm">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {restaurant.rating}
                            </div>
                          </div>
                          <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">{restaurant.name}</h3>
                                <p className="text-sm text-slate-500">{restaurant.cuisine} • {restaurant.priceRange}</p>
                              </div>
                            </div>
                            {restaurant.description && <p className="text-sm text-slate-600 mb-3">{restaurant.description}</p>}
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {restaurant.location}</span>
                              <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {restaurant.reviews} reviews</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {(restaurant.features || []).map(f => (
                                <Badge key={f} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">
                                  {f === 'Loyalty Rewards' && <Gift className="h-3 w-3 mr-1" />}
                                  {f}
                                </Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {['18:00', '19:00', '20:30'].map(time => (
                                <Button
                                  key={time}
                                  variant="outline"
                                  className="border-red-200 text-red-600 hover:bg-red-50 w-full text-sm h-9"
                                  onClick={() => restaurantBookMutation.mutate({ restaurant, time })}
                                  disabled={restaurantBookMutation.isPending}
                                  data-testid={`button-book-${restaurant.id}-${time}`}
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {isGraphView && selectedNode && nodeConfig && (
              <div className="absolute bottom-4 left-4 right-4 z-10 max-w-2xl mx-auto">
                <Card className={`${viewMode === "map" ? "bg-slate-800/95 backdrop-blur-xl border-slate-700 text-white" : "bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900"} shadow-2xl`}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Icon = nodeConfig.icon;
                          return <div className={`p-2 rounded-lg ${nodeConfig.color}`}><Icon className="h-5 w-5 text-white" /></div>;
                        })()}
                        <div>
                          <h3 className="text-base font-bold">{selectedNode.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className={`text-[10px] capitalize ${viewMode === "map" ? "border-slate-600 text-slate-300" : "border-slate-300 text-slate-600"}`}>{selectedNode.type}</Badge>
                            {selectedNode.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs text-amber-500 font-medium">{selectedNode.rating}</span>
                              </div>
                            )}
                            {selectedNode.revenue && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-emerald-500" />
                                <span className="text-xs text-emerald-500 font-medium">{selectedNode.revenue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className={`${viewMode === "map" ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"}`}>
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <p className={`text-sm mb-3 ${viewMode === "map" ? "text-slate-300" : "text-slate-600"}`}>{selectedNode.description}</p>

                    {selectedNode.aiRecommendation && (
                      <div className={`p-3 rounded-lg mb-3 ${viewMode === "map" ? "bg-[#0081C9]/10 border border-[#0081C9]/30" : "bg-blue-50 border border-blue-200"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-3.5 w-3.5 text-[#0081C9]" />
                          <span className="text-[11px] font-bold text-[#0081C9]">AI Recommendation</span>
                        </div>
                        <p className={`text-sm ${viewMode === "map" ? "text-slate-300" : "text-slate-600"}`}>{selectedNode.aiRecommendation}</p>
                      </div>
                    )}

                    {selectedNode.connections && selectedNode.connections.length > 0 && (
                      <div className="mb-3">
                        <span className={`text-[11px] font-bold uppercase ${viewMode === "map" ? "text-slate-400" : "text-slate-500"}`}>Connected To:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {selectedNode.connections.map(connId => {
                            const conn = CAMBODIA_NODES.find(n => n.id === connId);
                            return conn && (
                              <Badge
                                key={connId}
                                variant="outline"
                                className={`text-[11px] cursor-pointer ${viewMode === "map" ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-600 hover:bg-slate-100"}`}
                                onClick={() => setSelectedNode(conn)}
                              >
                                {conn.name} <ChevronRight className="h-3 w-3 ml-0.5" />
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#0081C9] hover:bg-blue-700 text-white" data-testid="button-navigate-node">
                        <Navigation className="h-3.5 w-3.5 mr-1" /> Navigate
                      </Button>
                      <Button size="sm" variant="outline" className={`${viewMode === "map" ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300"}`} data-testid="button-add-itinerary">
                        <Zap className="h-3.5 w-3.5 mr-1" /> Add to Itinerary
                      </Button>
                      <Button size="sm" variant="outline" className={`${viewMode === "map" ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300"}`} data-testid="button-deploy-agent">
                        <Bot className="h-3.5 w-3.5 mr-1" /> Deploy AI Agent
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