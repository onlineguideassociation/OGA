import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Users, TrendingUp, ShoppingBag, Bot, Globe,
  DollarSign, ShieldCheck, MapPin, Hotel, Utensils, Briefcase, Calendar,
  Package, Wand2, MessageSquare, Heart
} from "lucide-react";
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

export default function DashboardSection() {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="text-dashboard-title">Guiding Intelligence Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">Real-time platform analytics and AI insights</p>
        </div>
        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          All Systems Active
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatsCard title="Total Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}k`} icon={<DollarSign className="h-4 w-4 text-emerald-600" />} change="+12.3% this week" />
        <StatsCard title="Active Listings" value={totalListings.toString()} icon={<Package className="h-4 w-4 text-blue-600" />} change={`${products.length} products, ${hotels.length} hotels`} />
        <StatsCard title="Bookings" value={totalBookings.toString()} icon={<Calendar className="h-4 w-4 text-purple-600" />} change="Across all modules" />
        <StatsCard title="Community" value={posts.length.toString()} icon={<Users className="h-4 w-4 text-amber-600" />} change={`${posts.reduce((s, p) => s + (p.likes || 0), 0)} total likes`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-500" /> Revenue by Module (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                  <Bar dataKey="tourism" fill="#22c55e" radius={[4, 4, 0, 0]} name="Tourism" />
                  <Bar dataKey="commerce" fill="#a855f7" radius={[4, 4, 0, 0]} name="Commerce" />
                  <Bar dataKey="media" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Media" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4 text-blue-500" /> Revenue Split</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[160px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-1">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-slate-600">{item.name}</span></div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Bot className="h-4 w-4 text-indigo-500" /> AI Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { text: "Siem Reap hotel demand projected +23% next month. Consider increasing channel inventory.", color: "bg-blue-50 border-blue-200 text-blue-800" },
              { text: `${gigs.length} active freelance gigs attracting ${gigs.reduce((s, g) => s + (g.proposals || 0), 0)} proposals. High engagement on tech roles.`, color: "bg-purple-50 border-purple-200 text-purple-800" },
              { text: `${events.length} upcoming events. AI & Tourism Summit trending with high registration potential.`, color: "bg-amber-50 border-amber-200 text-amber-800" },
              { text: "Marketplace commission optimization: AI suggests 5% price adjustment on Art & Souvenirs category.", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
            ].map((insight, i) => (
              <div key={i} className={`p-2.5 rounded-lg border text-xs ${insight.color}`}>
                <div className="flex items-start gap-1.5"><Wand2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" /><span>{insight.text}</span></div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-500" /> Module Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { module: "Travel OS", metric: "4 itineraries", color: "text-emerald-600", bg: "bg-emerald-100" },
              { module: "Hotels", metric: `${hotels.length} properties`, color: "text-blue-600", bg: "bg-blue-100" },
              { module: "Restaurants", metric: `${restaurants.length} venues`, color: "text-red-600", bg: "bg-red-100" },
              { module: "Marketplace", metric: `${products.length} products`, color: "text-amber-600", bg: "bg-amber-100" },
              { module: "Community", metric: `${posts.length} posts`, color: "text-purple-600", bg: "bg-purple-100" },
              { module: "Freelance", metric: `${gigs.length} gigs`, color: "text-orange-600", bg: "bg-orange-100" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <Badge className={`${item.bg} ${item.color} border-none text-[10px]`}>{item.module}</Badge>
                <div className="flex items-center gap-2"><span className="text-xs text-slate-500">{item.metric}</span><Badge variant="outline" className="text-emerald-600 border-emerald-200 text-[10px]">Active</Badge></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4 text-purple-500" /> Latest Community Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.slice(0, 3).map(post => (
              <div key={post.id} className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-base">{post.authorAvatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5"><span className="font-semibold text-xs">{post.authorName}</span><Badge variant="secondary" className="text-[10px]">{post.authorRole}</Badge></div>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">{post.title}</p>
                  <div className="flex gap-3 mt-1.5 text-[10px] text-slate-500"><span>❤️ {post.likes}</span><span>💬 {post.comments}</span></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, change, icon }: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-none bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-8 w-8 rounded-lg bg-slate-50 border flex items-center justify-center">{icon}</div>
          <span className="text-[10px] font-medium text-slate-500">{change}</span>
        </div>
        <div className="text-xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{title}</div>
      </CardContent>
    </Card>
  );
}
