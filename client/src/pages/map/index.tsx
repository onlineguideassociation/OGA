import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import {
  Globe, Bot, Plane, Shield,
  Film, Image as ImageIcon, Heart, Brain
} from "lucide-react";

import IntelligenceFlowSection from "./intelligence-flow-section";
import TourismFlowSection from "./tourism-flow-section";
import CinemaSection from "./cinema-section";
import MediaSection from "./media-section";
import FundraisingSection from "./fundraising-section";
import AssociationSection from "./association-section";
import GlobalTrustSection from "./global-trust-section";

type ViewMode = "intelligence" | "tourism" | "cinema" | "media" | "trust" | "fundraising" | "association";

const VIEW_TABS: { key: ViewMode; label: string; icon: React.ElementType; group: string }[] = [
  { key: "intelligence", label: "Intelligence", icon: Brain, group: "Intelligence" },
  { key: "tourism", label: "Tourism Flow", icon: Plane, group: "Tourism" },
  { key: "media", label: "Content Generator", icon: ImageIcon, group: "Creator" },
  { key: "cinema", label: "Cultural Cinema", icon: Film, group: "Creator" },
  { key: "trust", label: "Trust Network & API", icon: Shield, group: "Network" },
  { key: "fundraising", label: "GuideFund", icon: Heart, group: "Community" },
  { key: "association", label: "OGA", icon: Globe, group: "Community" },
];

const GROUPS = ["Intelligence", "Tourism", "Creator", "Network", "Community"];

export default function KnowledgeGraphMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("intelligence");

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900">
        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-5 w-5 text-[#0081C9]" />
                <h2 className="text-base font-bold text-white">OnlineGuide Hub</h2>
              </div>
              <p className="text-[10px] text-slate-400">All-in-One Tourism Super-App</p>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {GROUPS.map(group => (
                <div key={group} className="mb-1">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{group}</div>
                  {VIEW_TABS.filter(t => t.group === group).map(vt => {
                    const Icon = vt.icon;
                    const isActive = viewMode === vt.key;
                    return (
                      <button
                        key={vt.key}
                        onClick={() => setViewMode(vt.key)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium transition-all ${isActive ? "bg-[#0081C9]/20 text-[#0081C9] border-r-2 border-[#0081C9]" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}`}
                        data-testid={`toggle-${vt.key}-view`}
                      >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0" /> {vt.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-700 bg-gradient-to-r from-[#0081C9]/10 to-[#C1121F]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <Bot className="h-3.5 w-3.5 text-[#0081C9]" />
                <span className="text-[10px] font-bold text-white">AI Insights</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Peak tourism season. Siem Reap 87% occupancy. Angkor Wat content 3.2x engagement. Book 2+ weeks ahead.
              </p>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-2.5 py-0.5 text-[10px]">
                <span className="relative flex h-1.5 w-1.5 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                LIVE
              </Badge>
            </div>

            {viewMode === "intelligence" ? (
              <div className="w-full h-full bg-slate-50 p-4">
                <IntelligenceFlowSection />
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto bg-slate-50 p-6">
                <div className="max-w-5xl mx-auto">
                  {viewMode === "tourism" && <TourismFlowSection />}
                  {viewMode === "cinema" && <CinemaSection />}
                  {viewMode === "media" && <MediaSection />}
                  {viewMode === "fundraising" && <FundraisingSection />}
                  {viewMode === "association" && <AssociationSection />}
                  {viewMode === "trust" && <GlobalTrustSection />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
