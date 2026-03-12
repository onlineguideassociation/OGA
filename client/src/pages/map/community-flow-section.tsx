import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Globe, Shield, Network, Users, CheckCircle, Lock, Eye, Heart,
  Code, Activity, Server, Database, Cpu, Copy, Play, ShieldCheck,
  Sparkles, MapPin, GraduationCap, Award, Rocket, TrendingUp
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

type FlowTab = "trust" | "guidefund" | "oga";

const FLOW_TABS: { key: FlowTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "trust", label: "Trust Network & API", icon: Shield, color: "text-blue-600" },
  { key: "guidefund", label: "GuideFund", icon: Heart, color: "text-rose-600" },
  { key: "oga", label: "OGA", icon: Globe, color: "text-indigo-600" },
];

interface ApiEndpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  module: string;
  status: "live" | "beta" | "coming";
}

const API_ENDPOINTS: ApiEndpoint[] = [
  { method: "GET", path: "/api/hotels", description: "Search & list hotels with filters", module: "Hotels", status: "live" },
  { method: "POST", path: "/api/hotels", description: "Create hotel listing", module: "Hotels", status: "live" },
  { method: "GET", path: "/api/restaurants", description: "Browse restaurants by location/cuisine", module: "Dining", status: "live" },
  { method: "POST", path: "/api/bookings", description: "Create unified booking (hotel/restaurant/event)", module: "Bookings", status: "live" },
  { method: "GET", path: "/api/itineraries", description: "AI-powered travel itineraries", module: "Travel OS", status: "live" },
  { method: "GET", path: "/api/events", description: "Industry events & conferences", module: "Events", status: "live" },
  { method: "POST", path: "/api/events", description: "Register event with AI categorization", module: "Events", status: "live" },
  { method: "GET", path: "/api/products", description: "Marketplace product catalog", module: "Commerce", status: "live" },
  { method: "GET", path: "/api/community-posts", description: "Community forum feed", module: "Community", status: "live" },
  { method: "GET", path: "/api/freelance-gigs", description: "Freelance job board", module: "HR", status: "live" },
  { method: "POST", path: "/api/contact", description: "Contact & support messaging", module: "Core", status: "live" },
  { method: "GET", path: "/api/trust/network", description: "Global Trust Network status & stats", module: "Trust", status: "live" },
  { method: "GET", path: "/api/guides/verified", description: "OGA verified guide directory", module: "OGA", status: "beta" },
  { method: "POST", path: "/api/guides/verify", description: "Submit guide verification request", module: "OGA", status: "beta" },
  { method: "GET", path: "/api/cinema/stories", description: "Cultural cinema content library", module: "Cinema", status: "beta" },
  { method: "GET", path: "/api/media/assets", description: "AI-tagged media asset library", module: "Media", status: "beta" },
  { method: "POST", path: "/api/fundraising/campaigns", description: "Create GuideFund campaign", module: "GuideFund", status: "beta" },
  { method: "GET", path: "/api/finance/forecast", description: "AI revenue forecasting engine", module: "Finance", status: "coming" },
  { method: "GET", path: "/api/autobot/intelligence", description: "Autobot AI intelligence feed", module: "Autobot", status: "coming" },
  { method: "POST", path: "/api/rdtb/signals", description: "Real-time signal sensing layer", module: "RDTB", status: "coming" },
];

const TRUST_PILLARS = [
  { icon: ShieldCheck, title: "Verified Guides", desc: "Every guide is ID-verified through OGA with cultural competency certification.", metric: "1,000+", metricLabel: "Guides Targeted", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Heart, title: "Loyalty Protocol", desc: "Cross-platform loyalty rewards connecting tourists, guides, hotels, and restaurants.", metric: "12", metricLabel: "Partner Modules", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Eye, title: "Truth Layer", desc: "RDTB sensing engine ensures authentic cultural narratives and honest reviews.", metric: "99.2%", metricLabel: "Authenticity Score", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Lock, title: "Privacy-First", desc: "Sovereign data architecture. No biometric tracking. Aggregate-only analytics.", metric: "Zero", metricLabel: "Data Sold", color: "text-emerald-600", bg: "bg-emerald-50" },
];

const NETWORK_NODES = [
  { name: "Cambodia", guides: 450, partners: 120, status: "active" as const },
  { name: "Thailand", guides: 180, partners: 45, status: "expanding" as const },
  { name: "Vietnam", guides: 95, partners: 28, status: "expanding" as const },
  { name: "Laos", guides: 35, partners: 12, status: "pilot" as const },
  { name: "Myanmar", guides: 20, partners: 8, status: "pilot" as const },
  { name: "Indonesia", guides: 0, partners: 0, status: "planned" as const },
];

export default function CommunityFlowSection() {
  const [activeTab, setActiveTab] = useState<FlowTab>("trust");
  const [activeApiTab, setActiveApiTab] = useState<"all" | "live" | "beta" | "coming">("all");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const { toast } = useToast();

  const { data: trustStats } = useQuery({
    queryKey: ["/api/trust/network"],
    queryFn: async () => { const r = await fetch("/api/trust/network"); if (!r.ok) throw new Error("Failed"); return r.json(); },
  });

  const filteredEndpoints = activeApiTab === "all" ? API_ENDPOINTS : API_ENDPOINTS.filter(e => e.status === activeApiTab);
  const liveCount = API_ENDPOINTS.filter(e => e.status === "live").length;
  const betaCount = API_ENDPOINTS.filter(e => e.status === "beta").length;
  const comingCount = API_ENDPOINTS.filter(e => e.status === "coming").length;

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(`https://onlineguide.io${path}`);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
    toast({ title: "Copied!", description: "Endpoint URL copied to clipboard." });
  };

  const campaigns = [
    { id: 1, name: "Sophea K.", location: "Siem Reap", title: "Support Young Khmer Guide to Become Licensed Angkor Expert", goal: 1500, raised: 750, desc: "Help me cover the official Tourism Ministry license course and advanced English training.", category: "Education" },
    { id: 2, name: "Chandra M.", location: "Battambang", title: "Clean Village Initiative: Rural Tourism Education", goal: 3000, raised: 1200, desc: "Raising funds for sustainable waste management and tourism hospitality training.", category: "Community" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-6 w-6 text-[#0081C9]" />
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-community-flow-title">Community & Network</h1>
          </div>
          <p className="text-sm text-slate-500">Trust Network, GuideFund & OGA — All in One</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-none text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
          Network Active
        </Badge>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {FLOW_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              data-testid={`community-tab-${tab.key}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? tab.color : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "trust" && (
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#0081C9]/20 to-slate-900 p-8 border border-slate-700">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5"><Globe className="w-full h-full" /></div>
            <div className="relative z-10">
              <Badge className="mb-3 bg-[#0081C9]/20 text-[#0081C9] border-[#0081C9]/30">Global Infrastructure</Badge>
              <h2 className="text-3xl font-bold text-white mb-2" data-testid="text-trust-title">Global Trust Network</h2>
              <p className="text-lg text-slate-300 mb-1">Connecting Cultures with Loyalty and Truth</p>
              <p className="text-sm text-slate-400 max-w-2xl">
                The OGA Global Trust Network is the unified digital infrastructure connecting verified tourism professionals, cultural institutions, and travelers across Southeast Asia through a single, transparent API.
              </p>
              <div className="flex items-center gap-4 mt-6 flex-wrap">
                <span className="text-sm text-slate-400">{trustStats?.totalEndpoints || liveCount} Live Endpoints</span>
                <div className="text-slate-500">|</div>
                <span className="text-sm text-slate-400">{trustStats?.totalGuides || 780} Registered Guides</span>
                <div className="text-slate-500">|</div>
                <span className="text-sm text-slate-400">{trustStats?.uptime || "99.9%"} Uptime</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TRUST_PILLARS.map((pillar, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className={`h-10 w-10 rounded-xl ${pillar.bg} flex items-center justify-center mb-3`}>
                    <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mb-1">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">{pillar.desc}</p>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xl font-bold text-slate-900">{pillar.metric}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{pillar.metricLabel}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Network className="h-5 w-5 text-[#0081C9]" /><CardTitle className="text-lg">Southeast Asia Network</CardTitle></div>
                    <Badge variant="outline" className="text-[10px]">ASEAN Coverage</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {NETWORK_NODES.map((node, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${node.status === "active" ? "bg-emerald-100 text-emerald-700" : node.status === "expanding" ? "bg-blue-100 text-blue-700" : node.status === "pilot" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                            {node.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-slate-900">{node.name}</h4>
                            <p className="text-[10px] text-slate-500">{node.guides} guides, {node.partners} partners</p>
                          </div>
                        </div>
                        <Badge className={`text-[10px] border-none ${node.status === "active" ? "bg-emerald-100 text-emerald-700" : node.status === "expanding" ? "bg-blue-100 text-blue-700" : node.status === "pilot" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                          {node.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-3 border-b"><CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-emerald-500" /> Network Health</CardTitle></CardHeader>
              <CardContent className="p-4 space-y-4">
                {[
                  { label: "API Response Time", value: "42ms", bar: 92, color: "bg-emerald-500" },
                  { label: "Data Integrity", value: "99.8%", bar: 99, color: "bg-blue-500" },
                  { label: "Cross-Module Sync", value: "98.5%", bar: 98, color: "bg-purple-500" },
                  { label: "Trust Score", value: "A+", bar: 96, color: "bg-amber-500" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{item.label}</span><span className="font-bold text-slate-900">{item.value}</span></div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className={`${item.color} h-1.5 rounded-full transition-all`} style={{ width: `${item.bar}%` }} /></div>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-slate-500">Total API Calls (24h)</span><span className="font-bold">{trustStats?.apiCalls24h || "24,580"}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500">Active Connections</span><span className="font-bold">{trustStats?.activeConnections || 213}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500">Data Centers</span><span className="font-bold">3 (SGP, BKK, PNH)</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0081C9] to-[#C1121F] flex items-center justify-center"><Code className="h-5 w-5 text-white" /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900" data-testid="text-oneflow-title">One Flow API</h2>
                  <p className="text-xs text-slate-500">Unified REST API connecting all OnlineGuide.io modules</p>
                </div>
              </div>
              <div className="flex gap-2">
                {([
                  { key: "all" as const, label: `All (${API_ENDPOINTS.length})` },
                  { key: "live" as const, label: `Live (${liveCount})` },
                  { key: "beta" as const, label: `Beta (${betaCount})` },
                  { key: "coming" as const, label: `Soon (${comingCount})` },
                ]).map(tab => (
                  <button key={tab.key} onClick={() => setActiveApiTab(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeApiTab === tab.key ? "bg-[#0081C9] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    data-testid={`api-filter-${tab.key}`}>{tab.label}</button>
                ))}
              </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2"><Server className="h-4 w-4 text-[#0081C9]" /><span className="text-xs font-mono text-slate-300">BASE URL: <span className="text-[#0081C9]">https://onlineguide.io</span></span></div>
                <div className="flex items-center gap-2"><Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">v1.0</Badge><Badge className="bg-[#0081C9]/20 text-[#0081C9] border-[#0081C9]/30 text-[10px]">REST</Badge></div>
              </div>
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {filteredEndpoints.map((endpoint, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-3 hover:bg-slate-50 cursor-pointer transition ${selectedEndpoint?.path === endpoint.path ? "bg-blue-50 border-l-2 border-[#0081C9]" : ""}`}
                    onClick={() => setSelectedEndpoint(endpoint)} data-testid={`api-endpoint-${i}`}>
                    <div className="flex items-center gap-3">
                      <Badge className={`font-mono text-[10px] w-12 justify-center ${endpoint.method === "GET" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"} border-none`}>{endpoint.method}</Badge>
                      <div>
                        <code className="text-sm font-mono text-slate-900">{endpoint.path}</code>
                        <p className="text-[10px] text-slate-500 mt-0.5">{endpoint.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{endpoint.module}</Badge>
                      <Badge className={`text-[10px] border-none ${endpoint.status === "live" ? "bg-emerald-100 text-emerald-700" : endpoint.status === "beta" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{endpoint.status}</Badge>
                      <button onClick={e => { e.stopPropagation(); copyToClipboard(endpoint.path); }} className="p-1 hover:bg-slate-200 rounded transition" data-testid={`copy-endpoint-${i}`}>
                        {copiedPath === endpoint.path ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedEndpoint && (
              <Card className="mt-4 border-none shadow-sm bg-slate-900 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={`font-mono text-xs ${selectedEndpoint.method === "GET" ? "bg-emerald-500" : "bg-blue-500"} text-white border-none`}>{selectedEndpoint.method}</Badge>
                      <code className="text-sm text-[#0081C9]">{selectedEndpoint.path}</code>
                    </div>
                    <Button size="sm" className="bg-[#0081C9] hover:bg-blue-700 text-white h-7 text-xs" data-testid="button-try-api"><Play className="h-3 w-3 mr-1" /> Try It</Button>
                  </div>
                  <pre className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto">
{selectedEndpoint.method === "GET"
  ? `curl -X GET "https://onlineguide.io${selectedEndpoint.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  : `curl -X POST "https://onlineguide.io${selectedEndpoint.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "example": "data"
  }'`}
                  </pre>
                  <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><Database className="h-3 w-3" /> Module: {selectedEndpoint.module}</span>
                    <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> Rate Limit: 1000/min</span>
                    <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Auth Required</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-[#0081C9]/5 to-[#0081C9]/10 border-[#0081C9]/20">
              <CardContent className="p-6">
                <Sparkles className="h-8 w-8 text-[#0081C9] mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Developer Access</h3>
                <p className="text-sm text-slate-600 mb-4">Get your API key and start building with the One Flow API. Full documentation, SDKs, and sandbox environment included.</p>
                <Button className="bg-[#0081C9] hover:bg-blue-700 text-white" data-testid="button-get-api-key"><Code className="h-4 w-4 mr-2" /> Get API Key</Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#C1121F]/5 to-[#C1121F]/10 border-[#C1121F]/20">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-[#C1121F] mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Join the Trust Network</h3>
                <p className="text-sm text-slate-600 mb-4">Become an OGA-verified partner. Connect your tourism business to the Global Trust Network and access cross-border loyalty rewards.</p>
                <Button className="bg-[#C1121F] hover:bg-red-800 text-white" data-testid="button-join-network"><Users className="h-4 w-4 mr-2" /> Apply as Partner</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "guidefund" && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-3 text-rose-600 bg-rose-50">GuideFund</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Support the Future of Cambodian Tourism</h2>
            <p className="text-sm text-slate-500">Empower local guides through education, certification, and community projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="overflow-hidden border-2 hover:border-rose-200 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3 text-rose-500" /> {campaign.location}</span>
                    <Badge variant="outline" className="text-rose-600 border-rose-100 text-[10px]">{campaign.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <div className="text-xs font-semibold text-slate-900">by {campaign.name}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">{campaign.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="font-bold text-slate-900">${campaign.raised} raised</span><span className="text-slate-500">Goal: ${campaign.goal}</span></div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2.5 bg-rose-100" />
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t p-4">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white h-10 font-bold" data-testid={`support-campaign-${campaign.id}`}>Support this Campaign</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-4">
            {[
              { icon: GraduationCap, title: "Direct Impact", desc: "100% of your donation goes directly to the guide's verified goal." },
              { icon: Globe, title: "Global Community", desc: "Join a global network committed to sustainable guide development." },
              { icon: Users, title: "Verified Guides", desc: "All campaigns are vetted by OnlineGuide.io for authentic tourism impact." },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto"><item.icon className="h-5 w-5" /></div>
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "oga" && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-3 text-[#0081C9] bg-[#0081C9]/10">Official Proposal</Badge>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Online Guide Association (OGA)</h2>
            <p className="text-sm text-slate-500">Empowering Cambodian Tour Guides through Digital Infrastructure</p>
            <p className="text-xs text-slate-400 mt-1">Connecting Cultures with Loyalty and Truth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm bg-[#0081C9] text-white">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Globe className="h-5 w-5" /> Our Vision</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-blue-50">To become the digital infrastructure for tourism professionals in Cambodia and Southeast Asia.</p></CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Rocket className="h-5 w-5" /> Our Mission</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Digitize 1,000 Cambodian tour guides</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Increase guide income by 30-50%</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Access to education & fundraising</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Promote responsible tourism</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Digital Platform", desc: "Professional profiles, booking systems, and AI assistants for every guide.", icon: <Award className="h-5 w-5 text-blue-600" /> },
              { title: "GuideFund", desc: "Crowdfunding for certification, training, and community projects.", icon: <Heart className="h-5 w-5 text-rose-600" /> },
              { title: "Digital Training", desc: "Specialized programs in digital marketing, branding, and storytelling.", icon: <TrendingUp className="h-5 w-5 text-emerald-600" /> },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-3 border">{item.icon}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Who We Support</h3>
              <div className="space-y-2">
                {["Licensed tour guides in Siem Reap & Phnom Penh", "Young tourism graduates entering the field", "Women guides seeking digital independence", "Rural community tourism leaders", "Drivers expanding into professional guiding"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0081C9] shrink-0" /><span className="text-sm text-slate-700">{text}</span></div>
                ))}
              </div>
            </div>
            <Card className="bg-white border shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">3-Year Impact Targets</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Registered Guides", value: "1,000" },
                  { label: "Avg Income Increase", value: "30-50%" },
                  { label: "Fundraising Campaigns", value: "200+" },
                  { label: "Training Graduates", value: "500" },
                  { label: "Int'l Partnerships", value: "20" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between pb-2 border-b last:border-0 last:pb-0">
                    <span className="text-xs text-slate-600">{stat.label}</span>
                    <span className="text-xs font-bold text-[#0081C9]">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Implementation Roadmap</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { phase: "Phase 1 - Pilot", time: "6 Months", tasks: ["Launch in Siem Reap", "Onboard 100 guides", "Beta GuideFund", "Workshops"] },
                { phase: "Phase 2 - Expansion", time: "Year 1", tasks: ["Expand to Phnom Penh", "Reach 500 guides", "NGO Partnerships"] },
                { phase: "Phase 3 - Regional Growth", time: "Year 2-3", tasks: ["Expand to SE Asia", "Network Launch"] },
              ].map((step, i) => (
                <Card key={i} className="bg-white border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">{step.phase}</span>
                      <Badge variant="outline" className="text-[10px] text-[#0081C9]">{step.time}</Badge>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                      {step.tasks.map((t, j) => <li key={j}>{t}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-2">
        <p className="text-xs text-slate-400">OnlineGuide.io — Online Guide Association (OGA) — <span className="font-semibold text-slate-500">Connecting Cultures with Loyalty and Truth</span></p>
      </div>
    </div>
  );
}
