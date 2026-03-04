import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  Connection,
  Edge,
  Node,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Network, 
  Globe, 
  User, 
  Building2, 
  Info,
  DollarSign,
  TrendingUp,
  Zap
} from "lucide-react";

const initialNodes: Node[] = [
  {
    id: 'temple-1',
    type: 'default',
    data: { label: '🌅 Angkor Wat', type: 'Temple', revenue: '$2.4k' },
    position: { x: 250, y: 0 },
    style: { background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', padding: '10px', width: 150 },
  },
  {
    id: 'guide-1',
    type: 'default',
    data: { label: '🧑‍🏫 Sokha Guide', type: 'Guide', revenue: '$850' },
    position: { x: 100, y: 150 },
    style: { background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '10px', width: 150 },
  },
  {
    id: 'guide-2',
    type: 'default',
    data: { label: '🧑‍🏫 Vannak Guide', type: 'Guide', revenue: '$920' },
    position: { x: 400, y: 150 },
    style: { background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px', padding: '10px', width: 150 },
  },
  {
    id: 'traveler-1',
    type: 'default',
    data: { label: '🌍 Global Traveler', type: 'Traveler', revenue: '$1.2k' },
    position: { x: 250, y: 300 },
    style: { background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '12px', padding: '10px', width: 150 },
  },
  {
    id: 'business-1',
    type: 'default',
    data: { label: '🏨 Heritage Hotel', type: 'Business', revenue: '$5.6k' },
    position: { x: 100, y: 450 },
    style: { background: '#fafaf9', border: '1px solid #f5f5f4', borderRadius: '12px', padding: '10px', width: 150 },
  },
  {
    id: 'business-2',
    type: 'default',
    data: { label: '🛍 Artisan Shop', type: 'Business', revenue: '$1.1k' },
    position: { x: 400, y: 450 },
    style: { background: '#fafaf9', border: '1px solid #f5f5f4', borderRadius: '12px', padding: '10px', width: 150 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'temple-1', target: 'guide-1', label: 'EXPERTISE', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-3', source: 'temple-1', target: 'guide-2', label: 'EXPERTISE', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-4', source: 'guide-1', target: 'traveler-1', label: 'GUIDING', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: 'guide-2', target: 'traveler-1', label: 'GUIDING', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-5', source: 'traveler-1', target: 'business-1', label: 'BOOKING', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-6', source: 'traveler-1', target: 'business-2', label: 'PURCHASE', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-5', source: 'temple-1', target: 'business-1', label: 'PROXIMITY', style: { strokeDasharray: '5,5' } },
];

export default function GraphExplorer() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), []);

  const onNodeClick = (_: any, node: any) => {
    setSelectedNode(node.data);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-64px)] bg-slate-50">
        <div className="flex-1 relative">
          <div className="absolute top-6 left-6 z-10 space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 bg-white/80 backdrop-blur p-2 rounded-lg shadow-sm">
              <Network className="h-6 w-6 text-primary" /> Knowledge Graph Explorer
            </h1>
            <Badge variant="outline" className="bg-white/80 backdrop-blur">
              Visualizing: Temples → Guides → Travelers → Business
            </Badge>
          </div>
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
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

        <div className="w-80 bg-white border-l p-6 overflow-y-auto">
          {selectedNode ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Badge className={
                  selectedNode.type === 'Temple' ? 'bg-red-500' :
                  selectedNode.type === 'Guide' ? 'bg-blue-500' :
                  selectedNode.type === 'Traveler' ? 'bg-emerald-500' :
                  'bg-slate-500'
                }>
                  {selectedNode.type}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900">{selectedNode.label}</h2>
              </div>

              <Card className="border-slate-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" /> AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="text-xs text-emerald-600 font-bold uppercase mb-1">Revenue Potential</div>
                    <div className="text-xl font-bold text-emerald-700">{selectedNode.revenue}</div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This {selectedNode.type.toLowerCase()} is a high-authority node in the tourism ecosystem. 
                    {selectedNode.type === 'Temple' ? ' It generates indirect revenue through nearby accommodations.' : 
                     selectedNode.type === 'Guide' ? ' Their expertise converts emotional interest into verified bookings.' :
                     selectedNode.type === 'Traveler' ? ' They represent high-value segment data with 92% retention.' :
                     ' It serves as a vital revenue capture point for the tourism network.'}
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Properties</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-emerald-600">Active</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-500">Authority</span>
                    <span className="font-medium">9.4/10</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-500">Last Sync</span>
                    <span className="font-medium">2 mins ago</span>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Zap className="h-4 w-4" /> Deploy AI Agent
              </Button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center">
                <Info className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Select a Node</h3>
                <p className="text-sm text-slate-500">Click on any element in the graph to view AI insights and revenue mapping.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
