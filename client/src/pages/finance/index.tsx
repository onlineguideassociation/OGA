import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, PieChart as PieIcon, DollarSign, Target, AlertCircle, Zap, User, Briefcase, Building2 } from "lucide-react";
import { useState } from "react";

interface FinancialAgent {
  type: "personal" | "business" | "enterprise";
  name: string;
  description: string;
  icon: JSX.Element;
  metrics: { label: string; value: string }[];
}

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

const agents: FinancialAgent[] = [
  {
    type: "personal",
    name: "Personal Finance AI",
    description: "Budgeting, debt tracking, investment planning for individuals",
    icon: <User className="h-6 w-6" />,
    metrics: [
      { label: "Monthly Budget", value: "$4,200" },
      { label: "Savings Goal", value: "45%" },
      { label: "Debt Recovery", value: "92%" },
      { label: "Investment Portfolio", value: "$12,450" }
    ]
  },
  {
    type: "business",
    name: "Business Finance AI",
    description: "Revenue optimization, departmental budgets, growth strategy for SMEs",
    icon: <Briefcase className="h-6 w-6" />,
    metrics: [
      { label: "Monthly Revenue", value: "$28,540" },
      { label: "Profit Margin", value: "34%" },
      { label: "Growth Rate", value: "+18% MoM" },
      { label: "Customer LTV", value: "$3,240" }
    ]
  },
  {
    type: "enterprise",
    name: "Enterprise Finance AI",
    description: "IPO readiness, corporate investments, risk & compliance management",
    icon: <Building2 className="h-6 w-6" />,
    metrics: [
      { label: "Enterprise ARR", value: "$1.2M" },
      { label: "Gross Margin", value: "72%" },
      { label: "Runway", value: "24 months" },
      { label: "Valuation", value: "$45M" }
    ]
  }
];

export default function FinanceModule() {
  const [selectedAgent, setSelectedAgent] = useState<"personal" | "business" | "enterprise">("business");
  const [insights, setInsights] = useState<string[]>([
    "Commerce revenue trending +12% - recommend increasing product inventory",
    "Media revenue stabilizing - consider bundle promotions",
    "Real estate pipeline shows 3 high-potential deals",
    "Debt recovery approaching 95% - reset target to 98%"
  ]);

  const currentAgent = agents.find(a => a.type === selectedAgent)!;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-slate-900">Financial AI Assistant</h1>
            </div>
            <p className="text-slate-600">AI-powered revenue optimization, debt management, and investment planning</p>
          </div>

          {/* Agent Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {agents.map(agent => (
              <button
                key={agent.type}
                onClick={() => setSelectedAgent(agent.type)}
                className={`p-4 rounded-lg border-2 transition text-left ${
                  selectedAgent === agent.type
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
                data-testid={`agent-${agent.type}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={selectedAgent === agent.type ? 'text-purple-600' : 'text-slate-600'}>
                    {agent.icon}
                  </div>
                  <h3 className="font-semibold">{agent.name}</h3>
                </div>
                <p className="text-sm text-slate-500">{agent.description}</p>
              </button>
            ))}
          </div>

          {/* Agent Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {currentAgent.metrics.map((metric, idx) => (
              <Card key={idx} className="bg-white/60 backdrop-blur">
                <CardContent className="pt-6">
                  <p className="text-slate-600 text-sm mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Revenue Trends */}
            <div className="lg:col-span-2">
              <Card className="bg-white/60 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" /> Multi-Sector Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
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

            {/* Debt Recovery */}
            <Card className="bg-white/60 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" /> Debt Recovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={debtData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                        {debtData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Recovered:</span>
                    <span className="font-bold text-emerald-600">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Pending:</span>
                    <span className="font-bold text-amber-600">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="bg-white/60 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" /> AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">{insight}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700" data-testid="generate-analysis-button">
                <Zap className="h-4 w-4 mr-2" /> Generate Full Analysis Report
              </Button>
            </CardContent>
          </Card>

          {/* Integration Status */}
          <Card className="bg-white/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Marketplace Sync</p>
                  <Badge className="bg-emerald-100 text-emerald-700">Connected</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Knowledge Graph</p>
                  <Badge className="bg-emerald-100 text-emerald-700">Synced</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Bank APIs</p>
                  <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">ERP/CRM</p>
                  <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
