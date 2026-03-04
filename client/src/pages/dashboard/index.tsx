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
  Globe
} from "lucide-react";
import { Link } from "wouter";
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
  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Management</h2>
          <nav className="space-y-2">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Overview</span>
              </div>
            </Link>
            <Link href="/dashboard/tools">
              <div className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
                <Wand2 className="h-4 w-4" />
                <span>AI Tools</span>
              </div>
            </Link>
            <Link href="/dashboard/products">
              <div className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
                <Package className="h-4 w-4" />
                <span>Digital Products</span>
              </div>
            </Link>
            <Link href="/dashboard/agents">
              <div className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
                <Bot className="h-4 w-4" />
                <span>AI Agents</span>
              </div>
            </Link>
            <Link href="/dashboard/graph">
              <div className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
                <Network className="h-4 w-4" />
                <span>Graph Explorer</span>
              </div>
            </Link>
            <Link href="/dashboard/fundraising">
              <div className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
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
              <StatsCard title="Sensing Events" value="8.2k" icon={<Bot className="h-5 w-5 text-[#0081C9]" />} change="+18% demand spike" />
              <StatsCard title="Tourism OS" value="Connected" icon={<Globe className="h-5 w-5 text-[#2D9B51]" />} change="Global Signal: Active" />
              <StatsCard title="Asset Revenue" value="$4.2k" icon={<TrendingUp className="h-5 w-5 text-emerald-600" />} change="Books & Licenses" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Booking & Revenue Trends</CardTitle>
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
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ActivityItem 
                      title="New Booking Request" 
                      subtitle="Angkor Wat Sunrise Tour - John Doe" 
                      time="2 hours ago" 
                      status="New"
                    />
                    <ActivityItem 
                      title="Digital Product Sold" 
                      subtitle="'Hidden Meanings' Ebook - Sarah J." 
                      time="5 hours ago" 
                      status="Success"
                    />
                    <ActivityItem 
                      title="Donation Received" 
                      subtitle="$50 from Global Support Program" 
                      time="1 day ago" 
                      status="Success"
                    />
                  </div>
                  <Button variant="ghost" className="w-full mt-4 text-primary">View All Activity <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
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
