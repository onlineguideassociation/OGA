import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Bot, Sparkles, MessageSquare, Zap, Cpu, Search, Database, ArrowRight, CheckCircle,
  ShieldCheck, Microscope, Globe, Radio, BarChart3, DollarSign, TrendingUp, Target,
  AlertCircle, User, Briefcase, Building2
} from "lucide-react";
import { useState } from "react";
import ScenarioPlannerSection from "./scenario-planner-section";

type SubTab = "autobot" | "rdtb" | "forecasting" | "whatif" | "integration";

const SUB_TABS: { key: SubTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "autobot", label: "AutoBot AI", icon: Bot, color: "text-indigo-600" },
  { key: "rdtb", label: "RDTB Intelligence", icon: Radio, color: "text-[#0081C9]" },
  { key: "forecasting", label: "Forecasting Engine", icon: DollarSign, color: "text-purple-600" },
  { key: "whatif", label: "What If?", icon: Target, color: "text-[#C1121F]" },
  { key: "integration", label: "Integration Status", icon: Globe, color: "text-emerald-600" },
];

const revenueData = [
  { month: "Jan", tourism: 4200, media: 2400, commerce: 2210, real_estate: 2290 },
  { month: "Feb", tourism: 3800, media: 2210, commerce: 2290, real_estate: 2000 },
  { month: "Mar", tourism: 5200, media: 3200, commerce: 3100, real_estate: 3500 },
  { month: "Apr", tourism: 6100, media: 3800, commerce: 3900, real_estate: 4200 },
];

const debtData = [
  { name: "Recovered", value: 92, fill: "#22c55e" },
  { name: "Pending", value: 8, fill: "#f59e0b" },
];

const agents = [
  { type: "personal" as const, name: "Personal Finance AI", desc: "Budgeting, debt tracking, investment planning", icon: <User className="h-5 w-5" />, metrics: [{ label: "Monthly Budget", value: "$4,200" }, { label: "Savings Goal", value: "45%" }, { label: "Debt Recovery", value: "92%" }, { label: "Investment Portfolio", value: "$12,450" }] },
  { type: "business" as const, name: "Business Finance AI", desc: "Revenue optimization, growth strategy for SMEs", icon: <Briefcase className="h-5 w-5" />, metrics: [{ label: "Monthly Revenue", value: "$28,540" }, { label: "Profit Margin", value: "34%" }, { label: "Growth Rate", value: "+18% MoM" }, { label: "Customer LTV", value: "$3,240" }] },
  { type: "enterprise" as const, name: "Enterprise Finance AI", desc: "IPO readiness, corporate investments, compliance", icon: <Building2 className="h-5 w-5" />, metrics: [{ label: "Enterprise ARR", value: "$1.2M" }, { label: "Gross Margin", value: "72%" }, { label: "Runway", value: "24 months" }, { label: "Valuation", value: "$45M" }] },
];

const signalSources = [
  { name: "Google momentum", value: "High", trend: "+12%" },
  { name: "Meta platforms", value: "Steady", trend: "+2.4%" },
  { name: "TikTok velocity", value: "Peak", trend: "+45%" },
  { name: "YouTube data", value: "Growing", trend: "+8%" },
];

function AutobotContent() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20"><Bot className="w-32 h-32" /></div>
        <div className="relative z-10">
          <Badge className="mb-3 bg-indigo-500/30 text-indigo-200 border-indigo-500/50">Unified AI Workspace</Badge>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            Hello, I am Autobot <Sparkles className="h-5 w-5 text-amber-400" />
          </h2>
          <p className="text-sm text-indigo-100 mb-4 max-w-xl">
            Your personal AI super-agent. I mine data, automate workflows, optimize networks, and generate insights across travel, commerce, crypto, and HR.
          </p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
            <input type="text" placeholder="Ask me to research trends, draft an itinerary, or analyze crypto..."
              className="w-full pl-9 pr-24 py-2 bg-white/10 border border-indigo-500/30 rounded-lg text-sm text-white placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              data-testid="input-autobot-query" />
            <Button size="sm" className="absolute right-1 top-1 bg-indigo-500 hover:bg-indigo-600 h-7 text-xs">Generate</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Database, title: "Data Mining", desc: "Scrape travel deals & trends", color: "border-t-blue-500", iconColor: "text-blue-500" },
          { icon: Cpu, title: "Multi-Model AI", desc: "GPT-5, Claude, DeepSeek", color: "border-t-purple-500", iconColor: "text-purple-500" },
          { icon: Zap, title: "Task Automation", desc: "Cron jobs & marketing", color: "border-t-amber-500", iconColor: "text-amber-500" },
          { icon: MessageSquare, title: "Content Engine", desc: "Auto-generate posts", color: "border-t-emerald-500", iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className={`bg-white border-none shadow-sm border-t-4 ${item.color}`}>
            <CardContent className="p-4">
              <item.icon className={`h-6 w-6 ${item.iconColor} mb-2`} />
              <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
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
            <CardHeader className="pb-2"><CardTitle className="text-base">Active Automated Workflows</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "Daily Competitor Price Scrape", status: "Running", freq: "Every 24h" },
                { name: "Social Media Post Generation", status: "Running", freq: "3x Weekly" },
                { name: "Network Security Scan", status: "Running", freq: "Continuous" },
                { name: "Crypto Portfolio Rebalance", status: "Paused", freq: "On 5% deviation" },
              ].map((flow, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 text-xs">{flow.name}</p>
                    <p className="text-[10px] text-slate-500">{flow.freq}</p>
                  </div>
                  <span className={`text-[10px] font-bold ${flow.status === "Running" ? "text-emerald-500" : "text-slate-400"}`}>{flow.status}</span>
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
    </div>
  );
}

function RDTBContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900 text-white border-none shadow-lg overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-lg bg-[#0081C9]/20 flex items-center justify-center border border-[#0081C9]/30">
                <Radio className="h-5 w-5 text-[#0081C9] animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-white">AI AutoBot Learning Engine</CardTitle>
                <CardDescription className="text-slate-400 font-mono text-[10px]">REAL-TIME SIGNAL SENSING ACTIVE</CardDescription>
              </div>
            </div>
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
              <h4 className="font-bold text-sm flex items-center gap-2 mb-1"><ShieldCheck className="h-4 w-4 text-[#0081C9]" /> Governance: Privacy-by-Design</h4>
              <p className="text-xs text-slate-400">Aggregated geospatial signals only. No biometric tracking. No identity storage. Sovereign tourism signal modeling.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center mb-2 border border-purple-100">
              <Microscope className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-base">RDTB Lab</CardTitle>
            <CardDescription className="text-xs">Research & Development Tourism Bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-2">
              {["Infrastructure Stress Simulation", "Climate Exposure Modeling", "Demand Elasticity Index", "Tourism Shock Scenarios"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />{item}
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Validated Processing Partners</div>
              <div className="flex gap-3 opacity-50 grayscale">
                <Globe className="h-5 w-5" title="Google Cloud" />
                <Database className="h-5 w-5" title="AWS" />
                <Zap className="h-5 w-5" title="OpenAI" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Financial Activation</Badge>
          <h3 className="text-lg font-bold text-slate-900">National Payment Activation Layer</h3>
          <p className="text-sm text-slate-600">
            When RDTB detects demand shifts, the infrastructure triggers instant booking workflows across ABA Bank, Wing Bank, and global rails.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-white shadow-sm">
              <div className="text-xl font-bold text-slate-900">$2.4M</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Flash Inventory Value</div>
            </div>
            <div className="p-4 rounded-xl border bg-white shadow-sm">
              <div className="text-xl font-bold text-slate-900">12.8k</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Auto-Triggers / Mo</div>
            </div>
          </div>
        </div>

        <Card className="bg-slate-200 border-none overflow-hidden relative h-[280px]">
          <div className="absolute top-0 left-0 p-6 text-slate-500 font-mono text-[10px] space-y-2">
            <div>&gt; ANALYZING SIEM REAP DEMAND...</div>
            <div>&gt; CLIMATE SIGNAL DETECTED: +2.4C...</div>
            <div>&gt; TRIGGERING ABA SETTLEMENTS...</div>
            <div className="animate-pulse text-[#C1121F]">&gt; SYSTEM ACTIVE</div>
          </div>
          <BarChart3 className="h-36 w-36 text-[#C1121F]/10 absolute -bottom-8 -right-8" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="p-5 bg-white rounded-xl shadow-2xl border flex flex-col items-center gap-3 max-w-[220px]">
              <div className="h-12 w-12 rounded-full bg-[#C1121F]/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-[#C1121F]" />
              </div>
              <div className="text-center">
                <div className="font-bold text-sm text-slate-900">AutoBot Machine</div>
                <div className="text-xs text-slate-500">Real-Time Learning Active</div>
              </div>
              <Button size="sm" className="w-full bg-[#C1121F] hover:bg-red-800 text-xs">Initialize Settlement</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ForecastingContent() {
  const [selectedAgent, setSelectedAgent] = useState<"personal" | "business" | "enterprise">("business");
  const currentAgent = agents.find(a => a.type === selectedAgent)!;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-900">National Forecasting Engine</h2>
        </div>
        <p className="text-sm text-slate-500">AI-powered revenue optimization, debt management, and investment planning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {agents.map(agent => (
          <button key={agent.type} onClick={() => setSelectedAgent(agent.type)}
            className={`p-3 rounded-lg border-2 transition text-left ${selectedAgent === agent.type ? "border-purple-500 bg-purple-50" : "border-slate-200 bg-white hover:border-purple-300"}`}
            data-testid={`agent-${agent.type}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={selectedAgent === agent.type ? "text-purple-600" : "text-slate-600"}>{agent.icon}</div>
              <h3 className="font-semibold text-sm">{agent.name}</h3>
            </div>
            <p className="text-xs text-slate-500">{agent.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {currentAgent.metrics.map((metric, idx) => (
          <Card key={idx} className="bg-white/80">
            <CardContent className="pt-4 pb-4">
              <p className="text-slate-500 text-xs">{metric.label}</p>
              <p className="text-xl font-bold text-slate-900">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Multi-Sector Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend wrapperStyle={{ fontSize: "11px" }} />
                    <Bar dataKey="tourism" fill="#3b82f6" name="Tourism" />
                    <Bar dataKey="media" fill="#a855f7" name="Media" />
                    <Bar dataKey="commerce" fill="#22c55e" name="Commerce" />
                    <Bar dataKey="real_estate" fill="#f97316" name="Real Estate" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4" /> Debt Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={debtData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                    {debtData.map((entry, idx) => <Cell key={idx} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs"><span className="text-slate-600">Recovered:</span><span className="font-bold text-emerald-600">92%</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-600">Pending:</span><span className="font-bold text-amber-600">8%</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> AI Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            "Commerce revenue trending +12% - recommend increasing product inventory",
            "Media revenue stabilizing - consider bundle promotions",
            "Real estate pipeline shows 3 high-potential deals",
            "Debt recovery approaching 95% - reset target to 98%",
          ].map((insight, idx) => (
            <div key={idx} className="flex gap-2 p-2 bg-slate-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">{insight}</p>
            </div>
          ))}
          <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700" data-testid="generate-analysis-button">
            <Zap className="h-3.5 w-3.5 mr-1" /> Generate Full Analysis Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function IntegrationContent() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="secondary" className="mb-3 text-emerald-600 bg-emerald-50">System Connectivity</Badge>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Integration Status</h2>
        <p className="text-sm text-slate-500">Real-time connectivity status across all platform modules and external systems</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Marketplace Sync", status: "Connected", statusColor: "bg-emerald-100 text-emerald-700", desc: "Product catalog, orders, and inventory" },
          { name: "Knowledge Graph", status: "Synced", statusColor: "bg-emerald-100 text-emerald-700", desc: "Tourism node relationships & AI signals" },
          { name: "Bank APIs", status: "Pending", statusColor: "bg-amber-100 text-amber-700", desc: "ABA Bank, Wing Bank payment rails" },
          { name: "ERP/CRM", status: "Pending", statusColor: "bg-amber-100 text-amber-700", desc: "Enterprise resource & customer management" },
        ].map((item, i) => (
          <Card key={i} className="bg-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                <Badge className={`${item.statusColor} border-none text-[10px]`}>{item.status}</Badge>
              </div>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Data Pipeline Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "RDTB Signal Ingestion", value: "99.7%", bar: 99, color: "bg-[#0081C9]" },
              { label: "Forecasting Model Sync", value: "98.2%", bar: 98, color: "bg-purple-500" },
              { label: "AutoBot Task Queue", value: "100%", bar: 100, color: "bg-indigo-500" },
              { label: "External API Latency", value: "38ms", bar: 94, color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{item.label}</span><span className="font-bold text-slate-900">{item.value}</span></div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.bar}%` }} /></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-none shadow-lg">
          <CardHeader className="pb-2"><CardTitle className="text-base text-white">Cross-Module Data Flow</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { from: "RDTB Signals", to: "Forecasting Engine", status: "Active", freq: "Real-time" },
              { from: "AutoBot Insights", to: "Knowledge Graph", status: "Active", freq: "Every 5 min" },
              { from: "Forecasting", to: "Financial Reports", status: "Active", freq: "Hourly" },
              { from: "Tourism Map", to: "RDTB Demand Layer", status: "Active", freq: "Real-time" },
              { from: "Bank Settlement", to: "Finance Engine", status: "Pending", freq: "On trigger" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-slate-300">{item.from}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500" />
                  <span className="font-medium text-white">{item.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">{item.freq}</span>
                  <div className={`h-1.5 w-1.5 rounded-full ${item.status === "Active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ForecastingRDTBSection() {
  const [activeTab, setActiveTab] = useState<SubTab>("autobot");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="h-6 w-6 text-[#0081C9]" />
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-forecast-rdtb-title">Forecasting & RDTB</h1>
          </div>
          <p className="text-sm text-slate-500">National Forecasting Engine, RDTB Intelligence & AutoBot — All in One</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-none text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
          Systems Active
        </Badge>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {SUB_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              data-testid={`forecast-rdtb-tab-${tab.key}`}>
              <Icon className={`h-3.5 w-3.5 ${isActive ? tab.color : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "autobot" && <AutobotContent />}
      {activeTab === "rdtb" && <RDTBContent />}
      {activeTab === "forecasting" && <ForecastingContent />}
      {activeTab === "whatif" && <ScenarioPlannerSection />}
      {activeTab === "integration" && <IntegrationContent />}

      <div className="text-center py-2">
        <p className="text-xs text-slate-400">OnlineGuide.io — <span className="font-semibold text-slate-500">Forecasting Engine & RDTB Intelligence Layer — All in One Flow</span></p>
      </div>
    </div>
  );
}
