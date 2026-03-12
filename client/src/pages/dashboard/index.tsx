import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Users, TrendingUp, ArrowUpRight, ShoppingBag, Bot, Heart, Network, Globe,
  DollarSign, ShieldCheck, MapPin, Hotel, Utensils, Briefcase, Calendar,
  Package, Wand2, MessageSquare, Loader2, Map
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Product, Hotel as HotelType, Restaurant, CommunityPost, Booking, FreelanceGig, Event } from "@shared/schema";

const revenueData = [
  { name: "Mon", tourism: 240, commerce: 140, media: 80 },
  { name: "Tue", tourism: 190, commerce: 180, media: 60 },
  { name: "Wed", tourism: 450, commerce: 220, media: 120 },
  { name: "Thu", tourism: 310, commerce: 160, media: 90 },
  { name: "Fri", tourism: 520, commerce: 340, media: 150 },
  { name: "Sat", tourism: 890, commerce: 420, media: 200 },
  { name: "Sun", tourism: 750, commerce: 380, media: 170 },
];

const pieData = [
  { name: "Travel", value: 35, color: "#22c55e" },
  { name: "Hotels", value: 25, color: "#3b82f6" },
  { name: "Commerce", value: 20, color: "#a855f7" },
  { name: "Dining", value: 12, color: "#ef4444" },
  { name: "Other", value: 8, color: "#64748b" },
];

export default function DashboardOverview() {
  const [location] = useLocation();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => { const r = await fetch("/api/products"); return r.json(); },
  });
  const { data: hotels = [] } = useQuery<HotelType[]>({
    queryKey: ["/api/hotels"],
    queryFn: async () => { const r = await fetch("/api/hotels"); return r.json(); },
  });
  const { data: restaurants = [] } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
    queryFn: async () => { const r = await fetch("/api/restaurants"); return r.json(); },
  });
  const { data: posts = [] } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community-posts"],
    queryFn: async () => { const r = await fetch("/api/community-posts"); return r.json(); },
  });
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    queryFn: async () => { const r = await fetch("/api/bookings"); return r.json(); },
  });
  const { data: gigs = [] } = useQuery<FreelanceGig[]>({
    queryKey: ["/api/freelance-gigs"],
    queryFn: async () => { const r = await fetch("/api/freelance-gigs"); return r.json(); },
  });
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => { const r = await fetch("/api/events"); return r.json(); },
  });

  const totalRevenue = products.reduce((sum, p) => sum + p.price * (p.sales || 0), 0);
  const totalBookings = bookings.length;
  const totalListings = products.length + hotels.length + restaurants.length;

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Management</h2>
          <nav className="space-y-1">
            {[
              { href: "/dashboard", icon: TrendingUp, label: "Overview" },
              { href: "/map", icon: Map, label: "Knowledge Graph & Map" },
              { href: "/dashboard/tools", icon: Wand2, label: "AI Tools" },
              { href: "/dashboard/products", icon: Package, label: "Digital Products" },
              { href: "/dashboard/agents", icon: Bot, label: "AI Agents" },
              { href: "/dashboard/fundraising", icon: Heart, label: "GuideFund" },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${location === item.href ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8">Modules</h2>
          <nav className="space-y-1">
            {[
              { href: "/travel", icon: MapPin, label: "Travel OS", color: "text-green-600" },
              { href: "/hotels", icon: Hotel, label: "Hotels", color: "text-blue-600" },
              { href: "/restaurants", icon: Utensils, label: "Dining", color: "text-red-600" },
              { href: "/marketplace", icon: ShoppingBag, label: "Marketplace", color: "text-amber-600" },
              { href: "/freelance", icon: Briefcase, label: "Freelance", color: "text-orange-600" },
              { href: "/events", icon: Calendar, label: "Events", color: "text-indigo-600" },
              { href: "/community", icon: MessageSquare, label: "Community", color: "text-purple-600" },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-slate-600 hover:bg-slate-100 transition-colors">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900" data-testid="text-dashboard-title">Guiding Intelligence Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Real-time platform analytics and AI insights</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  All Systems Active
                </Badge>
                <Link href="/map">
                  <Button variant="outline" size="sm" className="gap-2" data-testid="button-open-map">
                    <Map className="h-4 w-4" /> Open Map
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard title="Total Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}k`} icon={<DollarSign className="h-5 w-5 text-emerald-600" />} change="+12.3% this week" />
              <StatsCard title="Active Listings" value={totalListings.toString()} icon={<Package className="h-5 w-5 text-blue-600" />} change={`${products.length} products, ${hotels.length} hotels`} />
              <StatsCard title="Bookings" value={totalBookings.toString()} icon={<Calendar className="h-5 w-5 text-purple-600" />} change="Across all modules" />
              <StatsCard title="Community" value={posts.length.toString()} icon={<Users className="h-5 w-5 text-amber-600" />} change={`${posts.reduce((s, p) => s + (p.likes || 0), 0)} total likes`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" /> Revenue by Module (Weekly)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="tourism" fill="#22c55e" radius={[4, 4, 0, 0]} name="Tourism" />
                        <Bar dataKey="commerce" fill="#a855f7" radius={[4, 4, 0, 0]} name="Commerce" />
                        <Bar dataKey="media" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Media" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" /> Revenue Split
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                          {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-2">
                    {pieData.map(item => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-600">{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Bot className="h-5 w-5 text-indigo-500" /> AI Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { text: "Siem Reap hotel demand projected +23% next month. Consider increasing channel inventory.", type: "trend", color: "bg-blue-50 border-blue-200 text-blue-800" },
                    { text: `${gigs.length} active freelance gigs attracting ${gigs.reduce((s, g) => s + (g.proposals || 0), 0)} proposals. High engagement on tech roles.`, type: "community", color: "bg-purple-50 border-purple-200 text-purple-800" },
                    { text: `${events.length} upcoming events. AI & Tourism Summit trending with high registration potential.`, type: "events", color: "bg-amber-50 border-amber-200 text-amber-800" },
                    { text: "Marketplace commission optimization: AI suggests 5% price adjustment on Art & Souvenirs category.", type: "commerce", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
                  ].map((insight, i) => (
                    <div key={i} className={`p-3 rounded-lg border text-sm ${insight.color}`}>
                      <div className="flex items-start gap-2">
                        <Wand2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{insight.text}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amber-500" /> Module Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { module: "Travel OS", status: "Active", metric: "4 itineraries", color: "text-emerald-600", bg: "bg-emerald-100" },
                    { module: "Hotels", status: "Active", metric: `${hotels.length} properties`, color: "text-blue-600", bg: "bg-blue-100" },
                    { module: "Restaurants", status: "Active", metric: `${restaurants.length} venues`, color: "text-red-600", bg: "bg-red-100" },
                    { module: "Marketplace", status: "Active", metric: `${products.length} products`, color: "text-amber-600", bg: "bg-amber-100" },
                    { module: "Community", status: "Active", metric: `${posts.length} posts`, color: "text-purple-600", bg: "bg-purple-100" },
                    { module: "Freelance", status: "Active", metric: `${gigs.length} gigs`, color: "text-orange-600", bg: "bg-orange-100" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={`${item.bg} ${item.color} border-none text-xs`}>{item.module}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">{item.metric}</span>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 text-xs">{item.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" /> Latest Community Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">{post.authorAvatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{post.authorName}</span>
                          <Badge variant="secondary" className="text-[10px]">{post.authorRole}</Badge>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mt-1">{post.title}</p>
                        <div className="flex gap-3 mt-2 text-xs text-slate-500">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/community">
                  <Button variant="outline" className="w-full mt-4" data-testid="button-view-community">View All Posts</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatsCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-10 w-10 rounded-lg bg-slate-50 border flex items-center justify-center">{icon}</div>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">{change}</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500">{title}</div>
      </CardContent>
    </Card>
  );
}
