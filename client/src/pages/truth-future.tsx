import React from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot, Globe, Video, Coins, Wifi, Rocket, Shield, Sparkles,
  Brain, Map, Users, Zap, ArrowRight, Star, Network, Eye,
  TrendingUp, Lightbulb, ChevronRight, Cpu, Layers, Radio
} from "lucide-react";
import { Link } from "wouter";

const VISION_CARDS = [
  {
    icon: Bot,
    title: "AI Super Agents",
    description: "Automated AI agents powering travel, business, research, and real-time tourism intelligence across Southeast Asia.",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    stats: "12 Active Agents",
  },
  {
    icon: Globe,
    title: "Global Tourism OS",
    description: "Unified tourism platform connecting destinations, creators, guides, and travelers into one intelligent network.",
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    stats: "21 Destinations",
  },
  {
    icon: Video,
    title: "Creator Economy",
    description: "Tools for media production, storytelling, digital entrepreneurship, and content-to-commerce conversion.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    stats: "500+ Creators",
  },
];

const FUTURE_SECTIONS = [
  {
    icon: Globe,
    title: "Global Tourism Intelligence",
    description: "AI-powered tourism analytics spanning Cambodia, Thailand, Vietnam, and beyond. Real-time traveler insights and predictive demand forecasting.",
    badge: "LIVE",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    icon: Brain,
    title: "AI Super Agent Network",
    description: "Autonomous AI agents that plan itineraries, recommend experiences, manage bookings, and optimize tourism operations 24/7.",
    badge: "ACTIVE",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    icon: Video,
    title: "Creator Media Network",
    description: "A decentralized creator ecosystem for tourism storytelling, destination marketing, and digital content monetization.",
    badge: "GROWING",
    badgeColor: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  },
  {
    icon: Coins,
    title: "Web3 Economy",
    description: "Blockchain-powered loyalty tokens, transparent guide payments, and decentralized tourism marketplace infrastructure.",
    badge: "BETA",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    icon: Wifi,
    title: "Global Connectivity",
    description: "Connecting rural tourism destinations with digital infrastructure, enabling remote guides and communities to participate in the global economy.",
    badge: "EXPANDING",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
];

const ROADMAP = [
  { phase: "Phase 1", title: "Foundation", status: "complete", items: ["Knowledge Hub Launch", "Tourism Map & Graph Explorer", "AI Dashboard & AutoBot"] },
  { phase: "Phase 2", title: "Intelligence", status: "active", items: ["RDTB Payment Network", "Forecasting Engine", "Creator Economy Tools"] },
  { phase: "Phase 3", title: "Scale", status: "upcoming", items: ["Global Tourism OS", "AI Super Agent Network", "Web3 Token Economy"] },
  { phase: "Phase 4", title: "Vision", status: "upcoming", items: ["Full Autonomous AI Guides", "Cross-border Tourism Protocol", "Decentralized Creator DAO"] },
];

export default function TruthFuturePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#0b0f19] text-white">

        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #081b33, #0c1f4d)" }}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute top-40 right-1/4 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative container mx-auto px-4 py-24 md:py-36 text-center">
            <Badge className="bg-cyan-500/10 text-[#00d4ff] border-cyan-500/30 px-4 py-1.5 text-xs mb-6 inline-flex items-center gap-2" data-testid="badge-truth-future">
              <Sparkles className="h-3.5 w-3.5" />
              Truth Future Initiative
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="text-truth-future-title">
              <span className="text-white">Truth </span>
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#8ec5ff] bg-clip-text text-transparent">Future</span>
            </h1>

            <p className="text-lg md:text-xl text-[#b5c9ff] max-w-2xl mx-auto mb-4 leading-relaxed">
              Building a transparent digital future powered by AI, tourism, creators, and global connectivity.
            </p>
            <p className="text-sm text-[#8ec5ff]/60 max-w-lg mx-auto mb-10">
              Connecting Cultures with Loyalty and Truth — OnlineGuide.io
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/map">
                <Button className="bg-[#00d4ff] hover:bg-[#00bde0] text-[#001224] font-bold px-8 py-3 rounded-full text-sm h-auto shadow-lg shadow-cyan-500/25" data-testid="button-explore-future">
                  <Rocket className="h-4 w-4 mr-2" />
                  Explore the Future
                </Button>
              </Link>
              <Link href="/tours-map">
                <Button variant="outline" className="border-[#1d2a4d] text-[#8ec5ff] hover:bg-[#0f1b33] px-8 py-3 rounded-full text-sm h-auto" data-testid="button-view-map">
                  <Map className="h-4 w-4 mr-2" />
                  View Tourism Map
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 mt-16 text-sm text-[#8ec5ff]/70">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI Systems Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>200+ Guides Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Southeast Asia Network</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-white">The </span>
                <span className="text-[#00d4ff]">Vision</span>
              </h2>
              <p className="text-[#8ec5ff]/60 max-w-xl mx-auto text-sm">Three pillars powering the future of transparent tourism and AI intelligence</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {VISION_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className={`bg-[#0f1b33] border border-[#1d2a4d] rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-all duration-300 hover:shadow-xl ${card.glow} group`} data-testid={`card-vision-${card.title.toLowerCase().replace(/\s/g, "-")}`}>
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-[#8ec5ff]/70 text-sm leading-relaxed mb-4">{card.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                      <span className="text-xs text-[#00d4ff]/80 font-medium">{card.stats}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #0b0f19 0%, #081b33 50%, #0b0f19 100%)" }}>
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1 text-xs mb-4">
                <Layers className="h-3 w-3 mr-1.5" /> Ecosystem
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-white">Future </span>
                <span className="text-[#00d4ff]">Ecosystem</span>
              </h2>
              <p className="text-[#8ec5ff]/60 max-w-xl mx-auto text-sm">Five interconnected systems building the transparent digital future</p>
            </div>

            <div className="space-y-4">
              {FUTURE_SECTIONS.map((section, i) => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="bg-[#0f1b33]/80 border border-[#1d2a4d] rounded-xl p-6 flex items-start gap-5 hover:border-[#00d4ff]/20 transition-all group" data-testid={`section-future-${i}`}>
                    <div className="h-11 w-11 rounded-lg bg-[#081b33] border border-[#1d2a4d] flex items-center justify-center flex-shrink-0 group-hover:border-[#00d4ff]/30 transition-colors">
                      <Icon className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-lg font-bold text-white">{section.title}</h3>
                        <Badge className={`${section.badgeColor} text-[9px] px-2 py-0.5`}>{section.badge}</Badge>
                      </div>
                      <p className="text-sm text-[#8ec5ff]/60 leading-relaxed">{section.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#1d2a4d] group-hover:text-[#00d4ff]/50 flex-shrink-0 mt-1 transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/30 px-3 py-1 text-xs mb-4">
                <TrendingUp className="h-3 w-3 mr-1.5" /> Roadmap
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-white">Development </span>
                <span className="text-[#00d4ff]">Roadmap</span>
              </h2>
              <p className="text-[#8ec5ff]/60 max-w-xl mx-auto text-sm">Our phased approach to building the Truth Future platform</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {ROADMAP.map((phase, i) => (
                <div key={phase.phase} className={`relative bg-[#0f1b33] border rounded-xl p-6 ${phase.status === "active" ? "border-[#00d4ff]/40 shadow-lg shadow-cyan-500/10" : "border-[#1d2a4d]"}`} data-testid={`roadmap-phase-${i}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${phase.status === "complete" ? "bg-emerald-500/20 text-emerald-400" : phase.status === "active" ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "bg-slate-700/50 text-slate-400"}`}>
                      {phase.phase}
                    </span>
                    {phase.status === "complete" && <Star className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />}
                    {phase.status === "active" && <div className="h-2 w-2 rounded-full bg-[#00d4ff] animate-pulse" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#8ec5ff]/70">
                        <div className={`h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0 ${phase.status === "complete" ? "bg-emerald-400" : phase.status === "active" ? "bg-[#00d4ff]" : "bg-slate-600"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #081b33, #0c1f4d)" }}>
          <div className="container mx-auto max-w-3xl text-center">
            <div className="bg-[#0f1b33]/60 border border-[#1d2a4d] rounded-2xl p-10 md:p-14 backdrop-blur-sm">
              <Cpu className="h-10 w-10 text-[#00d4ff] mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Join the </span>
                <span className="text-[#00d4ff]">Future</span>
              </h2>
              <p className="text-[#8ec5ff]/60 mb-8 text-sm leading-relaxed max-w-lg mx-auto">
                Be part of the transparent digital revolution. Connect with AI-powered tourism, join the creator economy, and help build the future of Southeast Asia.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/map">
                  <Button className="bg-[#00d4ff] hover:bg-[#00bde0] text-[#001224] font-bold px-8 py-3 rounded-full text-sm h-auto" data-testid="button-get-started-future">
                    Get Started Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/graph-explorer">
                  <Button variant="outline" className="border-[#1d2a4d] text-[#8ec5ff] hover:bg-[#0f1b33] px-8 py-3 rounded-full text-sm h-auto" data-testid="button-explore-graph">
                    <Network className="h-4 w-4 mr-2" />
                    Explore the Graph
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#1d2a4d] py-8 px-4">
          <div className="container mx-auto text-center">
            <p className="text-sm text-[#8ec5ff]/40">&copy; 2026 OnlineGuide.io &middot; Truth Future Initiative</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
