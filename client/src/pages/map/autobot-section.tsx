import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageSquare, Zap, Cpu, Search, Database, ArrowRight, CheckCircle, ShieldCheck, Microscope, Globe, Radio, BarChart3 } from "lucide-react";

export default function AutobotSection() {
  const signalSources = [
    { name: "Google momentum", value: "High", trend: "+12%" },
    { name: "Meta platforms", value: "Steady", trend: "+2.4%" },
    { name: "TikTok velocity", value: "Peak", trend: "+45%" },
    { name: "YouTube data", value: "Growing", trend: "+8%" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Bot className="w-32 h-32" /></div>
        <div className="relative z-10">
          <Badge className="mb-3 bg-indigo-500/30 text-indigo-200 border-indigo-500/50">Unified AI Workspace</Badge>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            Hello, I am Autobot <Sparkles className="h-5 w-5 text-amber-400" />
          </h1>
          <p className="text-sm text-indigo-100 mb-4 max-w-xl">
            Your personal AI super-agent. I mine data, automate workflows, optimize networks, and generate insights across travel, commerce, crypto, and HR.
          </p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
            <input
              type="text"
              placeholder="Ask me to research trends, draft an itinerary, or analyze crypto..."
              className="w-full pl-9 pr-24 py-2 bg-white/10 border border-indigo-500/30 rounded-lg text-sm text-white placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-indigo-500 hover:bg-indigo-600 h-7 text-xs">Generate</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-white border-none shadow-sm border-t-4 border-t-blue-500">
          <CardContent className="p-4">
            <Database className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="font-bold text-sm text-slate-900">Data Mining</h3>
            <p className="text-xs text-slate-500 mt-0.5">Scrape travel deals & trends</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm border-t-4 border-t-purple-500">
          <CardContent className="p-4">
            <Cpu className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="font-bold text-sm text-slate-900">Multi-Model AI</h3>
            <p className="text-xs text-slate-500 mt-0.5">GPT-5, Claude, DeepSeek</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm border-t-4 border-t-amber-500">
          <CardContent className="p-4">
            <Zap className="h-6 w-6 text-amber-500 mb-2" />
            <h3 className="font-bold text-sm text-slate-900">Task Automation</h3>
            <p className="text-xs text-slate-500 mt-0.5">Cron jobs & marketing</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-none shadow-sm border-t-4 border-t-emerald-500">
          <CardContent className="p-4">
            <MessageSquare className="h-6 w-6 text-emerald-500 mb-2" />
            <h3 className="font-bold text-sm text-slate-900">Content Engine</h3>
            <p className="text-xs text-slate-500 mt-0.5">Auto-generate posts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2 border-b border-slate-100">
            <CardTitle className="text-base">Recent Autobot Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            {[
              { badge: "Commerce Insight", badgeColor: "bg-blue-100 text-blue-700", time: "10 mins ago", title: "Trending Dropshipping Niche Detected", desc: "TikTok shop data shows 400% spike in 'Eco-friendly travel adapters'. Average margin is $22.", btnColor: "text-blue-700 bg-blue-50 border-blue-200" },
              { badge: "Crypto Alert", badgeColor: "bg-emerald-100 text-emerald-700", time: "2 hours ago", title: "Defi Yield Opportunity", desc: "New liquidity pool for ETH/USDC offering 12.5% APY. Smart contract audited.", btnColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
              { badge: "Travel Alert", badgeColor: "bg-amber-100 text-amber-700", time: "5 hours ago", title: "Flight Price Drop", desc: "SIN to REP round trip dropped by $140 for tracked November dates.", btnColor: "text-amber-700 bg-amber-50 border-amber-200" },
            ].map((item, i) => (
              <div key={i} className="p-4 hover:bg-slate-50">
                <div className="flex justify-between items-start mb-1">
                  <Badge className={`${item.badgeColor} border-none text-[10px]`}>{item.badge}</Badge>
                  <span className="text-[10px] text-slate-400">{item.time}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 mb-2">{item.desc}</p>
                <Button variant="outline" size="sm" className={`text-xs h-7 ${item.btnColor}`}>View <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Active Automated Workflows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Daily Competitor Price Scrape", status: "Running", freq: "Every 24h" },
                { name: "Social Media Post Generation", status: "Running", freq: "3x Weekly" },
                { name: "Network Security Scan", status: "Running", freq: "Continuous" },
                { name: "Crypto Portfolio Rebalance", status: "Paused", freq: "On 5% deviation" }
              ].map((flow, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 text-xs">{flow.name}</p>
                    <p className="text-[10px] text-slate-500">{flow.freq}</p>
                  </div>
                  <span className={`text-[10px] font-bold ${flow.status === 'Running' ? 'text-emerald-500' : 'text-slate-400'}`}>{flow.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-indigo-50 border-none shadow-sm">
            <CardContent className="p-4">
              <h4 className="font-bold text-sm text-indigo-900 mb-1">Model Configuration</h4>
              <select className="w-full p-2 rounded-lg border border-indigo-200 bg-white text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 mb-2">
                <option>GPT-5 Turbo (Default)</option>
                <option>Claude 3.5 Sonnet</option>
                <option>DeepSeek Coder</option>
              </select>
              <p className="text-[10px] text-indigo-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> API Keys Connected</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-slate-900 text-white border-none shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-[#0081C9] animate-pulse" />
            <CardTitle className="text-base text-white">RDTB Intelligence Layer</CardTitle>
          </div>
          <p className="text-xs text-slate-400 font-mono">REAL-TIME SIGNAL SENSING ACTIVE</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {signalSources.map((source, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">{source.name}</div>
                <div className="text-sm font-bold">{source.value}</div>
                <div className="text-xs text-emerald-400">{source.trend}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[#0081C9]/10 border border-[#0081C9]/20">
            <h4 className="font-bold text-sm flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-[#0081C9]" /> Privacy-by-Design</h4>
            <p className="text-xs text-slate-400">Aggregated geospatial signals only. No biometric tracking. Sovereign tourism signal modeling.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
              <div className="text-lg font-bold">$2.4M</div>
              <div className="text-[10px] text-slate-500 uppercase">Flash Inventory Value</div>
            </div>
            <div className="p-3 rounded-lg border border-white/10 bg-white/5">
              <div className="text-lg font-bold">12.8k</div>
              <div className="text-[10px] text-slate-500 uppercase">Auto-Triggers / Mo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}