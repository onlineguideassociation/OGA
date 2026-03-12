import React, { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, Navigation, ChevronRight, X, Bot, DollarSign, Zap, Search, Wifi, Map as MapIcon, GitBranch
} from "lucide-react";
import { Link } from "wouter";
import { CAMBODIA_NODES, NODE_TYPES, getNodeConfig, toX, toY, type MapNode } from "./map/map-data";

export default function ToursMapPage() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(NODE_TYPES.map(n => n.type)));
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="min-h-screen bg-slate-900">
        <div className="border-b border-slate-700 bg-slate-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#0081C9]/20 flex items-center justify-center">
                  <MapIcon className="h-5 w-5 text-[#0081C9]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white" data-testid="text-tours-map-title">Tourism Map</h1>
                  <p className="text-xs text-slate-400">Interactive Cambodia Tourism Intelligence Network</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-2.5 py-1 text-[10px]">
                  <span className="relative flex h-1.5 w-1.5 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  LIVE
                </Badge>
                <Badge className="bg-[#0081C9]/20 text-[#0081C9] border-[#0081C9]/30 px-2.5 py-1 text-[10px]">
                  <Wifi className="h-3 w-3 mr-1" /> {filteredNodes.length} Nodes
                </Badge>
                <Link href="/graph-explorer">
                  <Button size="sm" variant="outline" className="text-xs h-8 border-slate-600 text-slate-300 hover:bg-slate-700" data-testid="link-graph-explorer">
                    <GitBranch className="h-3.5 w-3.5 mr-1.5" /> Graph Explorer
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input type="text" placeholder="Search nodes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-400 outline-none focus:border-[#0081C9] focus:ring-1 focus:ring-[#0081C9]/30"
                  data-testid="input-search-map-nodes" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {NODE_TYPES.map(nt => {
                  const active = activeFilters.has(nt.type);
                  return (
                    <button key={nt.type} onClick={() => toggleFilter(nt.type)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition border ${active ? "bg-slate-700 border-slate-500 text-white shadow-sm" : "bg-slate-800 border-transparent text-slate-500 hover:text-slate-300"}`}
                      data-testid={`map-filter-${nt.type}`}>
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? nt.color : "bg-slate-600"}`} />
                      <span className="hidden lg:inline">{nt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative" style={{ height: "calc(100vh - 200px)" }}>
          <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="mapGlowFull" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0081C9" stopOpacity="0.08" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
                <filter id="glowFull"><feGaussianBlur stdDeviation="0.3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <rect width="100" height="100" fill="url(#mapGlowFull)" />
              <path d="M 42,12 Q 50,8 58,14 Q 66,22 64,32 Q 70,38 68,48 Q 72,55 67,65 Q 62,72 55,78 Q 48,82 42,76 Q 34,72 36,62 Q 30,55 33,45 Q 28,38 34,28 Q 30,20 42,12 Z" fill="none" stroke="#334155" strokeWidth="0.25" strokeDasharray="0.8,0.8" opacity="0.4" />
              <text x="52" y="50" textAnchor="middle" fill="#475569" fontSize="1.8" fontWeight="bold" opacity="0.2">CAMBODIA</text>
              <text x="52" y="53" textAnchor="middle" fill="#475569" fontSize="0.9" opacity="0.15">SOUTHEAST ASIA</text>
              {getConnections().map((line, i) => (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#0081C9" strokeWidth="0.12" strokeDasharray="0.4,0.4" opacity="0.35" />
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
                        <rect x={x - (Math.min(node.name.length, 22) * 0.32)} y={y - 2.8} width={Math.min(node.name.length, 22) * 0.64} height="1.6" rx="0.4" fill="rgba(0,0,0,0.7)" />
                        <text x={x} y={y - 1.7} textAnchor="middle" fill="white" fontSize="0.95" fontWeight="bold">{node.name.length > 22 ? node.name.slice(0, 22) + "…" : node.name}</text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {selectedNode && nodeConfig && (
              <div className="absolute bottom-4 left-4 right-4 z-10 max-w-2xl mx-auto">
                <Card className="bg-slate-800/95 backdrop-blur-xl border-slate-700 text-white shadow-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {(() => { const Icon = nodeConfig.icon; return <div className={`p-1.5 rounded-lg ${nodeConfig.color}`}><Icon className="h-4 w-4 text-white" /></div>; })()}
                        <div>
                          <h3 className="text-sm font-bold">{selectedNode.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-[10px] capitalize border-slate-600 text-slate-300">{selectedNode.type}</Badge>
                            {selectedNode.rating && <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[10px] text-amber-500 font-medium">{selectedNode.rating}</span></span>}
                            {selectedNode.revenue && <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3 text-emerald-500" /><span className="text-[10px] text-emerald-500 font-medium">{selectedNode.revenue}</span></span>}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                    </div>
                    <p className="text-xs mb-2 text-slate-300">{selectedNode.description}</p>
                    {selectedNode.aiRecommendation && (
                      <div className="p-2.5 rounded-lg mb-2 bg-[#0081C9]/10 border border-[#0081C9]/30">
                        <div className="flex items-center gap-1.5 mb-0.5"><Bot className="h-3 w-3 text-[#0081C9]" /><span className="text-[10px] font-bold text-[#0081C9]">AI Recommendation</span></div>
                        <p className="text-xs text-slate-300">{selectedNode.aiRecommendation}</p>
                      </div>
                    )}
                    {selectedNode.connections && selectedNode.connections.length > 0 && (
                      <div className="mb-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Connected To:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedNode.connections.map(connId => {
                            const conn = CAMBODIA_NODES.find(n => n.id === connId);
                            return conn && <Badge key={connId} variant="outline" className="text-[10px] cursor-pointer border-slate-600 text-slate-300 hover:bg-slate-700" onClick={() => setSelectedNode(conn)}>{conn.name} <ChevronRight className="h-2.5 w-2.5 ml-0.5" /></Badge>;
                          })}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#0081C9] hover:bg-blue-700 text-white text-xs h-7" data-testid="button-navigate-map"><Navigation className="h-3 w-3 mr-1" /> Navigate</Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 border-slate-600 text-slate-300 hover:bg-slate-700" data-testid="button-itinerary-map"><Zap className="h-3 w-3 mr-1" /> Itinerary</Button>
                      <Button size="sm" variant="outline" className="text-xs h-7 border-slate-600 text-slate-300 hover:bg-slate-700" data-testid="button-agent-map"><Bot className="h-3 w-3 mr-1" /> AI Agent</Button>
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
