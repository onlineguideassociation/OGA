import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  ShoppingBag,
  Wand2,
  Package,
  Bot,
  Calendar,
  Heart,
  Network,
  Globe,
  DollarSign,
  ShieldCheck
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Mon", bookings: 4, revenue: 240 },
  { name: "Tue", bookings: 3, revenue: 190 },
  { name: "Wed", bookings: 7, revenue: 450 },
  { name: "Thu", bookings: 5, revenue: 310 },
  { name: "Fri", bookings: 8, revenue: 520 },
  { name: "Sat", bookings: 12, revenue: 890 },
  { name: "Sun", bookings: 10, revenue: 750 },
];

export default function DashboardOverview() {
  const [location] = useLocation();

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Management</h2>
          <nav className="space-y-2">
            <Link href="/dashboard">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Overview</span>
              </div>
            </Link>
            <Link href="/dashboard/graph">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard/graph' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Network className="h-4 w-4" />
                <span>Graph Explorer</span>
              </div>
            </Link>
            <Link href="/dashboard/tools">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard/tools' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Wand2 className="h-4 w-4" />
                <span>AI Tools</span>
              </div>
            </Link>
            <Link href="/dashboard/products">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard/products' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Package className="h-4 w-4" />
                <span>Digital Products</span>
              </div>
            </Link>
            <Link href="/dashboard/agents">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard/agents' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Bot className="h-4 w-4" />
                <span>AI Agents</span>
              </div>
            </Link>
            <Link href="/dashboard/fundraising">
              <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === '/dashboard/fundraising' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Heart className="h-4 w-4" />
                <span>GuideFund</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Guiding Intelligence Dashboard</h1>
              <div className="text-sm text-slate-500 flex items-center gap-2">
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Layer 0 Nodes Active</Badge>
                Knowledge Graph: <span className="font-mono text-primary">SYNCED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Graph Entities" value="12,482" icon={<Network className="h-5 w-5 text-[#C1121F]" />} change="Authority: High" />
              <StatsCard title="Debt Recovery" value="92%" icon={<DollarSign className="h-5 w-5 text-amber-600" />} change="Recovery Mode: ACTIVE" />
              <StatsCard title="Tourism OS" value="Connected" icon={<Globe className="h-5 w-5 text-[#2D9B51]" />} change="Global Signal: Active" />
              <StatsCard title="Community Impact" value="84/100" icon={<Users className="h-5 w-5 text-purple-600" />} change="Sustainable Growth" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" /> Revenue Streams & Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                          cursor={{fill: '#f1f5f9'}}
                        />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tourism" />
                        <Bar dataKey="revenue" fill="#a855f7" radius={[4, 4, 0, 0]} name="Media" />
                        <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} name="Commerce" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amber-500" /> Debt Recovery Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-xl border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600">Recovery Probability</span>
                        <span className="text-sm font-bold text-emerald-600">90.2%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm border-b pb-2">
                        <span className="text-slate-500">Amount Due</span>
                        <span className="font-bold">$12,450</span>
                      </div>
                      <div className="flex justify-between text-sm border-b pb-2">
                        <span className="text-slate-500">Days Overdue</span>
                        <span className="font-bold text-red-500">14 Days (Avg)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">AI Recommendation</span>
                        <span className="text-emerald-600 font-medium italic text-right">Instant settlement suggested</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-lg bg-slate-50 border flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
            {change} <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500">{title}</div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, subtitle, time, status }: { title: string, subtitle: string, time: string, status?: string }) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
        {time && <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{time}</div>}
      </div>
      {status && (
        <div className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
          status === 'New' ? 'bg-blue-100 text-blue-700' : 
          status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 
          'bg-amber-100 text-amber-700'
        }`}>
          {status}
        </div>
      )}
    </div>
  );
}
