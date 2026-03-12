import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Database, TrendingUp, Users, ShoppingCart, DollarSign, Activity,
  Settings, LayoutDashboard, Building2, Key, LineChart, Globe,
  Bed, CreditCard, MessageSquare, BookOpen, Trophy, Award,
  Heart, Send, Briefcase, Star, Clock, Filter, Search,
  Leaf, TreePine, Droplets, Map as MapIcon, Info, ShieldCheck,
  Terminal, Play, FolderTree, FileCode, Package, Loader2, Wrench
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { CommunityPost, FreelanceGig } from "@shared/schema";

type FlowTab = "erp" | "hospitality" | "community" | "freelance" | "sustainability" | "ide";

const FLOW_TABS: { key: FlowTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "erp", label: "ERP / CRM", icon: Database, color: "text-teal-600" },
  { key: "hospitality", label: "Hospitality PMS", icon: Building2, color: "text-blue-600" },
  { key: "community", label: "Community Hub", icon: Users, color: "text-purple-600" },
  { key: "freelance", label: "Freelance", icon: Briefcase, color: "text-amber-600" },
  { key: "sustainability", label: "Sustainability", icon: Leaf, color: "text-emerald-600" },
  { key: "ide", label: "WebOS IDE", icon: Terminal, color: "text-cyan-500" },
];

function ERPContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Database className="h-7 w-7 text-teal-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Unified ERP / CRM Dashboard</h2>
            <p className="text-sm text-slate-600">Centralized management for tourism, commerce, and content</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="bg-white text-slate-600 py-1">Amazon Seller API</Badge>
          <Badge variant="outline" className="bg-white text-slate-600 py-1">Shopify CRM</Badge>
          <Badge variant="outline" className="bg-white text-slate-600 py-1">ABA PayWay</Badge>
          <Button variant="ghost" size="icon"><Settings className="h-5 w-5 text-slate-500" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Gross Volume", value: "$142,500", change: "+12.5%", icon: DollarSign, iconBg: "bg-teal-50", iconColor: "text-teal-600" },
          { label: "Active Customers", value: "8,240", change: "+5.2%", icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
          { label: "Total Orders/Bookings", value: "1,845", change: "+18.1%", icon: ShoppingCart, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
          { label: "System Health", value: "99.9%", change: "All APIs Synced", icon: Activity, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", isHealth: true },
        ].map((m, i) => (
          <Card key={i} className="bg-white border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div><p className="text-sm font-medium text-slate-500 mb-1">{m.label}</p><h3 className={`text-2xl font-bold ${m.isHealth ? "text-emerald-500" : "text-slate-900"}`}>{m.value}</h3></div>
                <div className={`w-9 h-9 rounded-lg ${m.iconBg} flex items-center justify-center`}><m.icon className={`h-4 w-4 ${m.iconColor}`} /></div>
              </div>
              <div className="mt-3 flex items-center text-sm">{!m.isHealth && <TrendingUp className="h-3.5 w-3.5 text-emerald-500 mr-1" />}<span className="text-emerald-500 font-medium">{m.change}</span>{!m.isHealth && <span className="text-slate-400 ml-2">vs last month</span>}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-none shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3"><CardTitle className="text-base flex items-center justify-between">Recent Multi-Channel Transactions<Button variant="ghost" size="sm" className="text-teal-600 h-7 text-xs">View All</Button></CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { id: "ORD-9921", customer: "Sarah Jenkins", amount: 145.00, channel: "Shopify Store", status: "Paid", type: "Product", emoji: "📦" },
                { id: "BKG-4412", customer: "Michael Chen", amount: 299.00, channel: "TravelOS App", status: "Paid", type: "Tour Booking", emoji: "🗺️" },
                { id: "SUB-1002", customer: "Emma Wilson", amount: 29.00, channel: "Creator Hub", status: "Recurring", type: "Membership", emoji: "⭐" },
                { id: "ORD-9920", customer: "David Smith", amount: 89.50, channel: "Amazon FBA", status: "Pending", type: "Product", emoji: "📦" },
                { id: "BKG-4411", customer: "Lisa Taylor", amount: 120.00, channel: "Restaurant POS", status: "Paid", type: "Dining", emoji: "🍽️" },
              ].map((tx, i) => (
                <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-sm">{tx.emoji}</div>
                    <div><p className="font-semibold text-sm text-slate-900">{tx.customer}</p><div className="flex items-center gap-1.5 text-[10px] text-slate-500"><span>{tx.id}</span><span>·</span><span className="text-teal-600 font-medium">{tx.channel}</span></div></div>
                  </div>
                  <div className="text-right"><p className="font-bold text-sm text-slate-900">${tx.amount.toFixed(2)}</p><Badge variant="outline" className={`text-[10px] ${tx.status === "Paid" || tx.status === "Recurring" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{tx.status}</Badge></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-sm">
            <CardHeader><CardTitle className="text-base text-white">Revenue by Segment</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "E-commerce & Dropshipping", value: 45, amount: "$64,125", color: "bg-indigo-500" },
                  { name: "Tourism Bookings", value: 35, amount: "$49,875", color: "bg-green-500" },
                  { name: "Creator Memberships", value: 12, amount: "$17,100", color: "bg-purple-500" },
                  { name: "Restaurant POS", value: 8, amount: "$11,400", color: "bg-amber-500" },
                ].map((seg, i) => (
                  <div key={i}><div className="flex justify-between text-xs mb-1"><span className="text-slate-300">{seg.name}</span><span className="font-bold">{seg.amount}</span></div><div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`${seg.color} h-1.5 rounded-full`} style={{ width: `${seg.value}%` }} /></div></div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white border-none shadow-sm hover:ring-2 hover:ring-teal-500 transition-all cursor-pointer"><CardContent className="p-5 text-center"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2"><LayoutDashboard className="h-5 w-5 text-slate-700" /></div><h3 className="font-semibold text-sm text-slate-900">Custom Reports</h3><p className="text-[10px] text-slate-500 mt-0.5">Generate unified analytics</p></CardContent></Card>
            <Card className="bg-white border-none shadow-sm hover:ring-2 hover:ring-teal-500 transition-all cursor-pointer"><CardContent className="p-5 text-center"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2"><Database className="h-5 w-5 text-slate-700" /></div><h3 className="font-semibold text-sm text-slate-900">API Gateway</h3><p className="text-[10px] text-slate-500 mt-0.5">Manage external connections</p></CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function HospitalityContent() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-7 w-7 text-blue-600" />
          <div><h2 className="text-2xl font-bold text-slate-900">Hospitality PMS & Channel Manager</h2><p className="text-sm text-slate-600">Unified cloud platform for accommodation providers</p></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 text-xs" data-testid="btn-sync-channels">Sync Channels</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs" data-testid="btn-new-booking">New Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><p className="text-sm font-medium text-slate-500 mb-1">Today's Occupancy</p><div className="flex items-center justify-between"><h3 className="text-2xl font-bold text-slate-900">85%</h3><div className="flex items-center text-sm text-emerald-500 font-medium"><LineChart className="h-3.5 w-3.5 mr-1"/>+5%</div></div><div className="w-full bg-slate-100 h-2 rounded-full mt-3"><div className="bg-blue-500 h-2 rounded-full w-[85%]" /></div></CardContent></Card>
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><p className="text-sm font-medium text-slate-500 mb-1">Arrivals / Departures</p><div className="flex items-center justify-between"><h3 className="text-2xl font-bold text-slate-900">12 / 8</h3><Users className="h-5 w-5 text-indigo-500" /></div></CardContent></Card>
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><p className="text-sm font-medium text-slate-500 mb-1">Direct RevPAR</p><div className="flex items-center justify-between"><h3 className="text-2xl font-bold text-slate-900">$124.50</h3><DollarSign className="h-5 w-5 text-emerald-500" /></div></CardContent></Card>
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><p className="text-sm font-medium text-slate-500 mb-1">Active Channels</p><div className="flex items-center justify-between"><h3 className="text-2xl font-bold text-slate-900">6</h3><Globe className="h-5 w-5 text-amber-500" /></div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="border-b border-slate-100"><CardTitle className="flex items-center gap-2 text-base"><Key className="h-4 w-4 text-blue-500" /> Front Desk Operations</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { room: "101", guest: "Alice Johnson", status: "Checking In", time: "14:00", channel: "Direct", type: "arrival" as const },
                  { room: "204", guest: "Marcus Chen", status: "Checking Out", time: "11:00", channel: "Booking.com", type: "departure" as const },
                  { room: "305", guest: "Sarah Smith", status: "In-House", time: "Stayover", channel: "Expedia", type: "stayover" as const },
                  { room: "108", guest: "James Wilson", status: "Checking In", time: "15:30", channel: "Agoda", type: "arrival" as const },
                ].map((g, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center border text-[10px] ${g.type === "arrival" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : g.type === "departure" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-blue-200 bg-blue-50 text-blue-700"}`}><span className="font-bold">RM</span><span className="font-bold">{g.room}</span></div>
                      <div><p className="font-semibold text-sm text-slate-900">{g.guest}</p><div className="flex items-center gap-1.5 text-[10px] text-slate-500"><Badge variant="outline" className="text-[10px] bg-slate-100">{g.channel}</Badge><span>·</span><span>{g.time}</span></div></div>
                    </div>
                    <Button variant="ghost" size="sm" className={`text-xs ${g.type === "arrival" ? "text-emerald-600" : g.type === "departure" ? "text-rose-600" : "text-slate-600"}`}>{g.type === "arrival" ? "Check In" : g.type === "departure" ? "Check Out" : "Manage"}</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader><CardTitle className="text-sm">Room Status</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[{ label: "Clean & Ready", count: 42, color: "bg-emerald-500" }, { label: "Dirty (Needs Cleaning)", count: 12, color: "bg-amber-500" }, { label: "Cleaning in Progress", count: 4, color: "bg-blue-500" }, { label: "Out of Order", count: 2, color: "bg-rose-500" }].map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />{r.label}</div><span className="font-bold">{r.count}</span></div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-slate-900 text-white border-none shadow-sm">
              <CardHeader><CardTitle className="text-sm text-white">Direct Booking Engine</CardTitle></CardHeader>
              <CardContent><p className="text-xs text-slate-400 mb-3">Accept zero-commission bookings directly from your website. Integrated with Google Hotel Ads.</p><Button className="w-full bg-blue-500 hover:bg-blue-600 border-none text-xs mb-2">Manage Promotions</Button><Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs">Copy Widget Code</Button></CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Globe className="h-4 w-4 text-indigo-500" /> Channel Manager</CardTitle><CardDescription className="text-xs">Live inventory & rate synchronization</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Booking.com", last: "Just now", color: "bg-blue-100 text-blue-700" },
                { name: "Expedia Group", last: "2m ago", color: "bg-yellow-100 text-yellow-700" },
                { name: "Airbnb", last: "5m ago", color: "bg-rose-100 text-rose-700" },
                { name: "Agoda", last: "1m ago", color: "bg-purple-100 text-purple-700" },
              ].map((ota, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                  <div className="font-medium text-xs text-slate-900">{ota.name}</div>
                  <div className="text-right"><Badge variant="outline" className={`text-[10px] border-none ${ota.color}`}>Synced</Badge><p className="text-[10px] text-slate-400 mt-0.5">Last: {ota.last}</p></div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-xs">Manage Channels</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-4 w-4 text-emerald-500" /> Fintech Integrations</CardTitle></CardHeader>
            <CardContent><div className="space-y-2">{["ABA PayWay (Primary)", "Stripe / Global Cards", "WeChat / Alipay"].map((name, i) => (<div key={i} className="flex items-center justify-between p-2"><span className="text-xs font-medium text-slate-700">{name}</span><div className="w-2 h-2 bg-emerald-500 rounded-full" /></div>))}</div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CommunityContent() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: posts = [], isLoading } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community-posts"],
    queryFn: async () => { const r = await fetch("/api/community-posts"); if (!r.ok) throw new Error("Failed"); return r.json(); },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const r = await fetch("/api/community-posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ authorName: "You", authorRole: "Community Member", authorAvatar: "👤", title: newTitle, content: newContent, tags: newTags.split(",").map(t => t.trim()).filter(Boolean) }) });
      if (!r.ok) throw new Error("Failed"); return r.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/community-posts"] }); setShowCreateForm(false); setNewTitle(""); setNewContent(""); setNewTags(""); toast({ title: "Post Published!", description: "Your post is now live." }); },
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: number) => { const r = await fetch(`/api/community-posts/${postId}/like`, { method: "POST" }); if (!r.ok) throw new Error("Failed"); return r.json(); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/community-posts"] }); },
  });

  const formatTime = (date: string | Date | null) => { if (!date) return "just now"; const h = Math.floor((Date.now() - new Date(date).getTime()) / 3600000); if (h < 1) return "just now"; if (h < 24) return `${h}h ago`; return `${Math.floor(h / 24)}d ago`; };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><Users className="h-7 w-7 text-purple-600" /><div><h2 className="text-2xl font-bold text-slate-900" data-testid="text-community-title">Community & Creators Hub</h2><p className="text-sm text-slate-600">Connect, learn, and grow with the ecosystem</p></div></div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-xs" onClick={() => setShowCreateForm(!showCreateForm)} data-testid="button-create-post">{showCreateForm ? "Cancel" : "Create Post"}</Button>
      </div>

      {showCreateForm && (
        <Card className="bg-white border-purple-200 shadow-md">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-bold text-base">Create a New Post</h3>
            <input type="text" placeholder="Post title..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" data-testid="input-post-title" />
            <textarea placeholder="Share your thoughts..." value={newContent} onChange={e => setNewContent(e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none text-sm" data-testid="input-post-content" />
            <input type="text" placeholder="Tags (comma-separated)" value={newTags} onChange={e => setNewTags(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm" data-testid="input-post-tags" />
            <Button className="bg-purple-600 hover:bg-purple-700 text-xs" onClick={() => createMutation.mutate()} disabled={createMutation.isPending || !newTitle || !newContent} data-testid="button-submit-post"><Send className="h-3.5 w-3.5 mr-1.5" />{createMutation.isPending ? "Publishing..." : "Publish Post"}</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-5">
              <div className="text-center mb-4"><div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">👩‍💻</div><h3 className="font-bold text-base">Alex Developer</h3><p className="text-xs text-slate-500">Level 42 Creator</p></div>
              <div className="space-y-3"><div className="flex justify-between text-xs"><span className="text-slate-500">Reputation</span><span className="font-bold text-purple-600">8,450 XP</span></div><div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-[75%]" /></div><div className="flex justify-between text-xs"><span className="text-slate-500">Followers</span><span className="font-medium">1.2k</span></div></div>
            </CardContent>
          </Card>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start text-purple-700 bg-purple-50 text-xs"><MessageSquare className="mr-2 h-3.5 w-3.5" /> Discussion Forums</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:bg-slate-100 text-xs"><BookOpen className="mr-2 h-3.5 w-3.5" /> Masterclasses</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:bg-slate-100 text-xs"><Trophy className="mr-2 h-3.5 w-3.5" /> Challenges</Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:bg-slate-100 text-xs"><Award className="mr-2 h-3.5 w-3.5" /> Memberships</Button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-purple-500" /><span className="ml-3 text-slate-600 text-sm">Loading posts...</span></div>
          ) : (
            posts.map(post => (
              <Card key={post.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow" data-testid={`community-post-${post.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-lg">{post.authorAvatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-sm text-slate-900">{post.authorName}</h4><Badge variant="secondary" className="text-[10px] bg-slate-100">{post.authorRole}</Badge><span className="text-[10px] text-slate-400 ml-auto">{formatTime(post.createdAt)}</span></div>
                      <h3 className="text-base font-bold text-slate-800 mb-1">{post.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{post.content}</p>
                      <div className="flex items-center gap-1.5 mb-3">{(post.tags || []).map(tag => <Badge key={tag} variant="outline" className="text-[10px] border-purple-100 text-purple-700 bg-purple-50">#{tag}</Badge>)}</div>
                      <div className="flex items-center gap-5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors" onClick={() => likeMutation.mutate(post.id)} data-testid={`button-like-post-${post.id}`}><Heart className="h-3.5 w-3.5" /> {post.likes}</button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageSquare className="h-3.5 w-3.5" /> {post.comments}</button>
                        <button className="flex items-center gap-1 hover:text-green-500 transition-colors ml-auto"><TrendingUp className="h-3.5 w-3.5" /> Share</button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FreelanceContent() {
  const { data: gigs = [], isLoading } = useQuery<FreelanceGig[]>({
    queryKey: ["/api/freelance-gigs"],
    queryFn: async () => { const r = await fetch("/api/freelance-gigs"); if (!r.ok) throw new Error("Failed"); return r.json(); },
  });

  const formatTime = (date: string | Date | null) => { if (!date) return "recently"; const h = Math.floor((Date.now() - new Date(date).getTime()) / 3600000); if (h < 1) return "just now"; if (h < 24) return `${h}h ago`; return `${Math.floor(h / 24)}d ago`; };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Briefcase className="h-7 w-7 text-amber-600" /><div><h2 className="text-2xl font-bold text-slate-900" data-testid="text-freelance-title">Freelance & Creator Network</h2><p className="text-sm text-slate-600">Find gigs, hire talent, and build your digital agency</p></div></div>
        <div className="flex gap-2"><Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 text-xs" data-testid="button-post-job">Post a Job</Button><Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs" data-testid="button-find-work">Find Work</Button></div>
      </div>

      <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input type="text" placeholder="Search for skills, roles, or project keywords..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 outline-none text-sm" data-testid="input-search-gigs" /></div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Loader2 className="h-7 w-7 animate-spin text-amber-500" /><span className="ml-3 text-slate-600 text-sm">Loading gigs...</span></div>
      ) : (
        <div className="space-y-3">
          {gigs.map(gig => (
            <Card key={gig.id} className="bg-white border-none shadow-sm hover:shadow-md transition-all cursor-pointer group" data-testid={`gig-card-${gig.id}`}>
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">{gig.title}</h3>
                    <p className="text-xs text-slate-500 mb-1.5">Posted by <span className="font-medium text-slate-700">{gig.client}</span> · {formatTime(gig.createdAt)}</p>
                    {gig.description && <p className="text-sm text-slate-600 mb-2">{gig.description}</p>}
                    <div className="flex flex-wrap gap-1.5">{(gig.tags || []).map(tag => <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 text-[10px]">{tag}</Badge>)}</div>
                  </div>
                  <div className="flex flex-col gap-1.5 md:items-end min-w-[180px]">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg"><DollarSign className="h-3.5 w-3.5 text-slate-400" /><span className="font-semibold">{gig.budget}</span><span className="text-[10px] text-slate-500">({gig.type})</span></div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 px-2.5"><Clock className="h-3.5 w-3.5" />{gig.duration}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 px-2.5"><Users className="h-3.5 w-3.5" />{gig.proposals} proposals</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><Star className="h-3.5 w-3.5 fill-emerald-600" /> Payment Verified</div>
                  <Button variant="ghost" className="text-amber-600 hover:bg-amber-50 text-xs" data-testid={`button-apply-gig-${gig.id}`}>Submit Proposal</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function SustainabilityContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><Leaf className="h-7 w-7 text-emerald-500" /><div><h2 className="text-2xl font-bold text-slate-900">Sustainability & ESG Mapping</h2><p className="text-sm text-slate-600">Track, verify, and highlight eco-friendly tourism initiatives</p></div></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-none shadow-md"><CardContent className="p-5"><div className="flex justify-between items-start"><div><p className="text-emerald-100 font-medium mb-1 text-sm">Total Carbon Offset</p><h3 className="text-3xl font-bold mb-1">12,450t</h3><p className="text-xs text-emerald-100">Across 450 verified partners in 2025</p></div><TreePine className="h-7 w-7 text-emerald-200" /></div></CardContent></Card>
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><div className="flex justify-between items-start"><div><p className="text-slate-500 font-medium mb-1 text-sm">Active Eco-Grants</p><h3 className="text-3xl font-bold text-slate-900 mb-1">$1.2M</h3><p className="text-xs text-emerald-600 flex items-center"><LineChart className="h-3 w-3 mr-1"/>+15% from last quarter</p></div><ShieldCheck className="h-7 w-7 text-blue-500" /></div></CardContent></Card>
        <Card className="bg-white border-none shadow-sm"><CardContent className="p-5"><div className="flex justify-between items-start"><div><p className="text-slate-500 font-medium mb-1 text-sm">Water Conserved</p><h3 className="text-3xl font-bold text-slate-900 mb-1">45M L</h3><p className="text-xs text-slate-500">Via smart-meter implementations</p></div><Droplets className="h-7 w-7 text-cyan-500" /></div></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white border-none shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
            <CardHeader className="border-b border-slate-100"><div className="flex justify-between items-center"><CardTitle className="flex items-center gap-2 text-base"><MapIcon className="h-4 w-4 text-emerald-600" /> Interactive Impact Map</CardTitle><div className="flex gap-1.5"><Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer text-[10px]">All Impact</Badge><Badge variant="outline" className="bg-white text-slate-600 cursor-pointer text-[10px]">Carbon</Badge><Badge variant="outline" className="bg-white text-slate-600 cursor-pointer text-[10px]">Community</Badge></div></div></CardHeader>
            <div className="flex-1 bg-slate-100 relative">
              <div className="absolute top-1/4 left-1/4">
                <div className="relative group cursor-pointer"><div className="w-5 h-5 bg-emerald-500 rounded-full border-3 border-white shadow-lg z-10 relative flex items-center justify-center"><span className="w-1.5 h-1.5 bg-white rounded-full" /></div><div className="absolute w-10 h-10 bg-emerald-500/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" /><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-white p-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"><p className="font-bold text-xs text-slate-900">Eco-Lodge Siem Reap</p><p className="text-[10px] text-slate-500">100% Solar Powered</p><span className="text-[10px] text-emerald-600 font-medium">Verified: Level 3</span></div></div>
              </div>
              <div className="absolute top-1/2 left-2/3">
                <div className="relative group cursor-pointer"><div className="w-7 h-7 bg-blue-500 rounded-full border-3 border-white shadow-lg z-10 relative flex items-center justify-center"><span className="text-[9px] text-white font-bold">12</span></div><div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-white p-2.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"><p className="font-bold text-xs text-slate-900">Koh Rong Marine Reserve</p><p className="text-[10px] text-slate-500">12 Active Conservation Projects</p></div></div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader><CardTitle className="text-base">Recent Verifications</CardTitle><CardDescription className="text-xs">Newly audited sustainable partners</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Phnom Penh Green Transport", type: "Mobility", score: "94/100", status: "Gold" },
                { name: "Kampot Zero-Waste Hub", type: "Hospitality", score: "88/100", status: "Silver" },
                { name: "Cardamom Canopy Tours", type: "Operator", score: "96/100", status: "Gold" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg"><div><p className="font-medium text-slate-900 text-xs">{item.name}</p><p className="text-[10px] text-slate-500">{item.type}</p></div><div className="text-right"><Badge variant="outline" className={item.status === "Gold" ? "bg-amber-50 text-amber-700 border-amber-200 text-[10px]" : "bg-slate-100 text-slate-700 text-[10px]"}>{item.status}</Badge><p className="text-[10px] font-bold text-emerald-600 mt-0.5">{item.score}</p></div></div>
              ))}
              <Button variant="outline" className="w-full mt-2 text-xs">View All Partners</Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 text-white border-none">
            <CardContent className="p-5"><div className="flex items-start gap-3"><Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /><div><h4 className="font-bold text-sm mb-1">Automated ESG Reporting</h4><p className="text-xs text-slate-400 mb-3">Connect your utility APIs and booking data to automatically generate certified sustainability reports.</p><Button className="bg-blue-500 hover:bg-blue-600 w-full text-xs">Configure Integrations</Button></div></div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function IDEContent() {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-[#1e1e1e] text-slate-300 font-mono" style={{ height: "calc(100vh - 280px)" }}>
      <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center justify-between px-3">
        <div className="flex items-center gap-3"><div className="flex items-center gap-1.5 text-white font-medium text-sm"><Terminal className="h-4 w-4 text-blue-400" /><span>WebOS Builder</span></div><div className="h-3.5 w-px bg-[#444] mx-1" /><div className="flex text-xs"><button className="px-2 py-0.5 hover:bg-[#333] rounded">File</button><button className="px-2 py-0.5 hover:bg-[#333] rounded">Edit</button><button className="px-2 py-0.5 hover:bg-[#333] rounded">View</button></div></div>
        <div className="flex items-center gap-2"><button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-sans transition-colors"><Play className="h-3.5 w-3.5" /> Run</button><button className="p-1 hover:bg-[#333] rounded text-slate-400"><Settings className="h-4 w-4" /></button></div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100% - 40px)" }}>
        <div className="w-10 bg-[#333333] flex flex-col items-center py-3 gap-4 border-r border-[#252526]">
          <button className="text-white hover:text-white"><FolderTree className="h-5 w-5" /></button>
          <button className="text-slate-500 hover:text-white"><Search className="h-5 w-5" /></button>
          <button className="text-slate-500 hover:text-white"><Package className="h-5 w-5" /></button>
          <button className="text-slate-500 hover:text-white"><Database className="h-5 w-5" /></button>
        </div>

        <div className="w-52 bg-[#252526] border-r border-[#333] flex flex-col">
          <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Explorer</div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-0.5 py-1 text-xs">
              <div className="px-3 py-0.5 font-bold text-white flex items-center gap-1 cursor-pointer"><span className="text-[9px]">▼</span> super-app-workspace</div>
              <div className="pl-5 space-y-0.5">
                <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="text-[9px] text-slate-400">▼</span><FolderTree className="h-3.5 w-3.5 text-blue-300" /> client</div>
                <div className="pl-4 space-y-0.5">
                  <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="text-[9px] text-slate-400">▼</span><FolderTree className="h-3.5 w-3.5 text-blue-300" /> src</div>
                  <div className="pl-4 space-y-0.5">
                    <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="text-[9px] text-slate-400">▶</span><FolderTree className="h-3.5 w-3.5 text-blue-300" /> pages</div>
                    <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="text-[9px] text-slate-400">▶</span><FolderTree className="h-3.5 w-3.5 text-blue-300" /> components</div>
                    <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer bg-[#37373d] text-blue-300"><span className="w-2" /><span className="text-blue-400 text-sm leading-none">⚛</span> App.tsx</div>
                    <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="w-2" /><span className="text-blue-400 text-sm leading-none">⚛</span> main.tsx</div>
                  </div>
                </div>
                <div className="px-2 py-0.5 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]"><span className="text-[9px] text-slate-400">▶</span><FolderTree className="h-3.5 w-3.5 text-blue-300" /> server</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="flex bg-[#2d2d2d] overflow-x-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e] border-t-2 border-blue-500 text-white text-xs"><span className="text-blue-400 leading-none">⚛</span> App.tsx <span className="ml-auto text-slate-500 hover:text-white cursor-pointer">×</span></div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:bg-[#252526] cursor-pointer border-t-2 border-transparent text-xs"><span className="text-yellow-400 leading-none">{`{}`}</span> package.json</div>
          </div>
          <div className="flex-1 p-3 overflow-auto text-xs leading-relaxed" style={{ color: "#d4d4d4" }}>
            <pre className="m-0">
<span style={{color:"#c586c0"}}>import</span> {"{"} <span style={{color:"#4fc1ff"}}>Switch</span>, <span style={{color:"#4fc1ff"}}>Route</span> {"}"} <span style={{color:"#c586c0"}}>from</span> <span style={{color:"#ce9178"}}>"wouter"</span>;{"\n"}
<span style={{color:"#c586c0"}}>import</span> {"{"} <span style={{color:"#4fc1ff"}}>queryClient</span> {"}"} <span style={{color:"#c586c0"}}>from</span> <span style={{color:"#ce9178"}}>"./lib/queryClient"</span>;{"\n"}
<span style={{color:"#c586c0"}}>import</span> {"{"} <span style={{color:"#4fc1ff"}}>QueryClientProvider</span> {"}"} <span style={{color:"#c586c0"}}>from</span> <span style={{color:"#ce9178"}}>"@tanstack/react-query"</span>;{"\n"}
<span style={{color:"#c586c0"}}>import</span> <span style={{color:"#4fc1ff"}}>Home</span> <span style={{color:"#c586c0"}}>from</span> <span style={{color:"#ce9178"}}>"@/pages/home"</span>;{"\n"}
{"\n"}
<span style={{color:"#569cd6"}}>function</span> <span style={{color:"#dcdcaa"}}>Router</span>() {"{"}{"\n"}
{"  "}<span style={{color:"#c586c0"}}>return</span> ({"\n"}
{"    "}<span style={{color:"#808080"}}>&lt;</span><span style={{color:"#569cd6"}}>Switch</span><span style={{color:"#808080"}}>&gt;</span>{"\n"}
{"      "}<span style={{color:"#808080"}}>&lt;</span><span style={{color:"#569cd6"}}>Route</span> <span style={{color:"#9cdcfe"}}>path</span>=<span style={{color:"#ce9178"}}>"/"</span> <span style={{color:"#808080"}}>/&gt;</span>{"\n"}
{"      "}<span style={{color:"#6a9955"}}>{"// All modules unified in /map"}</span>{"\n"}
{"    "}<span style={{color:"#808080"}}>&lt;/</span><span style={{color:"#569cd6"}}>Switch</span><span style={{color:"#808080"}}>&gt;</span>{"\n"}
{"  );"}{"\n"}
{"}"}{"\n"}
{"\n"}
<span style={{color:"#c586c0"}}>export default</span> <span style={{color:"#4fc1ff"}}>App</span>;
            </pre>
          </div>

          <div className="h-32 border-t border-[#333] bg-[#1e1e1e] flex flex-col">
            <div className="flex bg-[#252526] px-3"><button className="px-2 py-0.5 text-[10px] border-b-2 border-blue-500 text-white">Terminal</button><button className="px-2 py-0.5 text-[10px] border-b-2 border-transparent text-slate-400 hover:text-white">Output</button><button className="px-2 py-0.5 text-[10px] border-b-2 border-transparent text-slate-400 hover:text-white">Problems <span className="bg-[#4d4d4d] rounded-full px-1 py-0.5 text-[8px] ml-0.5">0</span></button></div>
            <div className="flex-1 p-2 text-[11px] overflow-auto text-slate-300">
              <div className="text-emerald-400">➜  super-app git:(main) ✗ npm run dev</div>
              <div className="text-slate-400 mt-0.5">&gt; super-app@0.1.0 dev</div>
              <div className="mt-1 text-emerald-400 font-bold">  VITE v5.0.0  ready in 432 ms</div>
              <div className="mt-1"><span className="text-emerald-400">  ➜</span>  <span className="font-bold text-white">Local:</span>   <span className="text-cyan-400">http://localhost:5000/</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ManagementFlowSection() {
  const [activeTab, setActiveTab] = useState<FlowTab>("erp");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="h-6 w-6 text-teal-600" />
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-management-flow-title">Management</h1>
          </div>
          <p className="text-sm text-slate-500">ERP, Hospitality, Community, Freelance, Sustainability & IDE — All in One</p>
        </div>
        <Badge className="bg-teal-100 text-teal-700 border-none text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span></span>
          Systems Online
        </Badge>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {FLOW_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              data-testid={`management-tab-${tab.key}`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? tab.color : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "erp" && <ERPContent />}
      {activeTab === "hospitality" && <HospitalityContent />}
      {activeTab === "community" && <CommunityContent />}
      {activeTab === "freelance" && <FreelanceContent />}
      {activeTab === "sustainability" && <SustainabilityContent />}
      {activeTab === "ide" && <IDEContent />}

      <div className="text-center py-2">
        <p className="text-xs text-slate-400">OnlineGuide.io — <span className="font-semibold text-slate-500">Management Suite — Connecting Cultures with Loyalty and Truth</span></p>
      </div>
    </div>
  );
}
