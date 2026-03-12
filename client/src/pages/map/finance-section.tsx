import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Target, AlertCircle, Zap, User, Briefcase, Building2 } from "lucide-react";
import { useState } from "react";

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

export default function FinanceSection() {
  const [selectedAgent, setSelectedAgent] = useState<"personal" | "business" | "enterprise">("business");
  const currentAgent = agents.find(a => a.type === selectedAgent)!;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-slate-900">National Forecasting Engine</h1>
        </div>
        <p className="text-sm text-slate-500">AI-powered revenue optimization, debt management, and investment planning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {agents.map(agent => (
          <button key={agent.type} onClick={() => setSelectedAgent(agent.type)}
            className={`p-3 rounded-lg border-2 transition text-left ${selectedAgent === agent.type ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-white hover:border-purple-300'}`}
            data-testid={`agent-${agent.type}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={selectedAgent === agent.type ? 'text-purple-600' : 'text-slate-600'}>{agent.icon}</div>
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
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
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
            "Debt recovery approaching 95% - reset target to 98%"
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