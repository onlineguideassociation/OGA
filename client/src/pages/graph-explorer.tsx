import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge, Background, Controls, MiniMap,
  Connection, Edge, Node, MarkerType
} from "reactflow";
import "reactflow/dist/style.css";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star, Navigation, ChevronRight, X, Bot, DollarSign, Zap, Search, Wifi,
  Map as MapIcon, GitBranch
} from "lucide-react";
import { Link } from "wouter";
import { CAMBODIA_NODES, NODE_TYPES, getNodeConfig, type MapNode } from "./map/map-data";

function buildReactFlowNodes(nodes: MapNode[]): Node[] {
  const typePositions: Record<string, { col: number; row: number }> = {};
  let colIndex = 0;
  const typeRowCounters: Record<string, number> = {};
  return nodes.map((node) => {
    if (!typePositions[node.type]) {
      typePositions[node.type] = { col: colIndex++, row: 0 };
      typeRowCounters[node.type] = 0;
    }
    const row = typeRowCounters[node.type]++;
    const col = typePositions[node.type].col;
    const config = getNodeConfig(node.type);
    return {
      id: node.id, type: "default",
      data: { label: node.name, type: node.type, revenue: node.revenue || "N/A", original: node },
      position: { x: col * 220 + (row % 2) * 40, y: row * 120 + (col % 2) * 60 },
      style: { background: config.graphBg, border: `2px solid ${config.graphColor}`, borderRadius: "12px", padding: "10px", width: 180, fontSize: "12px", fontWeight: 600 },
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
        edges.push({ id: `e-${key}`, source: node.id, target: connId, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: config.graphColor, strokeWidth: 1.5 }, animated: true });
      }
    });
  });
  return edges;
}

export default function GraphExplorerPage() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(NODE_TYPES.map(n => n.type)));
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
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

  const rfNodes = useMemo(() => buildReactFlowNodes(filteredNodes), [filteredNodes]);
  const rfEdges = useMemo(() => buildReactFlowEdges(filteredNodes), [filteredNodes]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const onConnect = useCallback((params: Connection | Edge) => setFlowEdges(eds => addEdge(params, eds)), []);
  const mergedEdges = useMemo(() => [...rfEdges, ...flowEdges], [rfEdges, flowEdges]);
  const onNodeClick = (_: any, node: any) => { setSelectedNode(node.data.original as MapNode); };
  const nodeConfig = selectedNode ? getNodeConfig(selectedNode.type) : null;

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <GitBranch className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900" data-testid="text-graph-explorer-title">Graph Explorer</h1>
                  <p className="text-xs text-slate-500">Interactive Knowledge Graph — Tourism Node Relationships</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 px-2.5 py-1 text-[10px]">
                  <Wifi className="h-3 w-3 mr-1" /> {filteredNodes.length} Nodes
                </Badge>
                <Link href="/tours-map">
                  <Button size="sm" variant="outline" className="text-xs h-8" data-testid="link-tours-map">
                    <MapIcon className="h-3.5 w-3.5 mr-1.5" /> Tourism Map
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input type="text" placeholder="Search nodes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0081C9] focus:ring-1 focus:ring-[#0081C9]/30"
                  data-testid="input-search-graph-nodes" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {NODE_TYPES.map(nt => {
                  const active = activeFilters.has(nt.type);
                  return (
                    <button key={nt.type} onClick={() => toggleFilter(nt.type)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition border ${active ? "bg-white border-slate-300 text-slate-800 shadow-sm" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"}`}
                      data-testid={`graph-filter-${nt.type}`}>
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? nt.color : "bg-slate-300"}`} />
                      <span className="hidden lg:inline">{nt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative" style={{ height: "calc(100vh - 200px)" }}>
          <ReactFlow nodes={rfNodes} edges={mergedEdges} onConnect={onConnect} onNodeClick={onNodeClick} fitView className="bg-slate-50">
            <Background /><Controls /><MiniMap />
          </ReactFlow>

          {selectedNode && nodeConfig && (
            <div className="absolute bottom-4 left-4 right-4 z-10 max-w-2xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {(() => { const Icon = nodeConfig.icon; return <div className={`p-1.5 rounded-lg ${nodeConfig.color}`}><Icon className="h-4 w-4 text-white" /></div>; })()}
                      <div>
                        <h3 className="text-sm font-bold">{selectedNode.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[10px] capitalize border-slate-300 text-slate-600">{selectedNode.type}</Badge>
                          {selectedNode.rating && <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-[10px] text-amber-500 font-medium">{selectedNode.rating}</span></span>}
                          {selectedNode.revenue && <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3 text-emerald-500" /><span className="text-[10px] text-emerald-500 font-medium">{selectedNode.revenue}</span></span>}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-900"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="text-xs mb-2 text-slate-600">{selectedNode.description}</p>
                  {selectedNode.aiRecommendation && (
                    <div className="p-2.5 rounded-lg mb-2 bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-1.5 mb-0.5"><Bot className="h-3 w-3 text-[#0081C9]" /><span className="text-[10px] font-bold text-[#0081C9]">AI Recommendation</span></div>
                      <p className="text-xs text-slate-600">{selectedNode.aiRecommendation}</p>
                    </div>
                  )}
                  {selectedNode.connections && selectedNode.connections.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Connected To:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedNode.connections.map(connId => {
                          const conn = CAMBODIA_NODES.find(n => n.id === connId);
                          return conn && <Badge key={connId} variant="outline" className="text-[10px] cursor-pointer border-slate-300 text-slate-600 hover:bg-slate-100" onClick={() => setSelectedNode(conn)}>{conn.name} <ChevronRight className="h-2.5 w-2.5 ml-0.5" /></Badge>;
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-[#0081C9] hover:bg-blue-700 text-white text-xs h-7" data-testid="button-navigate-graph"><Navigation className="h-3 w-3 mr-1" /> Navigate</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 border-slate-300" data-testid="button-itinerary-graph"><Zap className="h-3 w-3 mr-1" /> Itinerary</Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 border-slate-300" data-testid="button-agent-graph"><Bot className="h-3 w-3 mr-1" /> AI Agent</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
