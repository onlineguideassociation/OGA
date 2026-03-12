import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare, Phone, Users, MapPin, Star, Clock, CheckCircle, Globe,
  Smartphone, Send, Bot, Zap, Shield, ArrowRight, Calendar, DollarSign,
  Bell, Settings, Search, TrendingUp, Award, Eye, Plus, X, BarChart3,
  UserPlus, MessageCircle, Navigation
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type GuideTab = "dashboard" | "bookings" | "contacts" | "broadcast" | "settings";

interface Guide {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviews: number;
  tours: number;
  revenue: number;
  status: "online" | "busy" | "offline";
  languages: string[];
  specialties: string[];
  whatsapp: string;
  responseTime: string;
}

const GUIDES: Guide[] = [
  { id: 1, name: "Sokha Vannak", avatar: "🧭", location: "Siem Reap", rating: 4.9, reviews: 487, tours: 1240, revenue: 45600, status: "online", languages: ["English", "Khmer", "Mandarin"], specialties: ["Angkor Temples", "Sunrise Tours", "Photography"], whatsapp: "+855 12 345 678", responseTime: "< 5 min" },
  { id: 2, name: "Dara Pich", avatar: "📸", location: "Siem Reap", rating: 4.8, reviews: 312, tours: 890, revenue: 32100, status: "busy", languages: ["English", "Khmer", "French"], specialties: ["Photography Tours", "Countryside", "Food Tours"], whatsapp: "+855 12 456 789", responseTime: "< 15 min" },
  { id: 3, name: "Channary Mao", avatar: "🗺️", location: "Phnom Penh", rating: 5.0, reviews: 421, tours: 1560, revenue: 58900, status: "online", languages: ["English", "Khmer", "Japanese"], specialties: ["City Tours", "History", "Street Food"], whatsapp: "+855 12 567 890", responseTime: "< 10 min" },
  { id: 4, name: "Virak Sok", avatar: "🏛️", location: "Siem Reap", rating: 4.7, reviews: 234, tours: 670, revenue: 24500, status: "online", languages: ["English", "Khmer"], specialties: ["Temple Expert", "Licensed Guide", "Group Tours"], whatsapp: "+855 12 678 901", responseTime: "< 5 min" },
  { id: 5, name: "Kosal Nhem", avatar: "🛺", location: "Siem Reap", rating: 4.6, reviews: 189, tours: 2100, revenue: 19800, status: "offline", languages: ["English", "Khmer"], specialties: ["Tuk-Tuk Driver", "Airport Transfer", "Day Trips"], whatsapp: "+855 12 789 012", responseTime: "< 30 min" },
  { id: 6, name: "Panha Lim", avatar: "🌿", location: "Kampot", rating: 4.8, reviews: 156, tours: 430, revenue: 18700, status: "online", languages: ["English", "Khmer", "French"], specialties: ["Eco Tours", "Kayaking", "Pepper Farms"], whatsapp: "+855 12 890 123", responseTime: "< 10 min" },
];

const BOOKINGS = [
  { id: 1, guest: "Sarah Johnson", tour: "Angkor Sunrise Tour", date: "Mar 15, 2026", guests: 2, price: 50, status: "confirmed", source: "WhatsApp", guide: "Sokha Vannak" },
  { id: 2, guest: "Chen Wei", tour: "Phnom Penh City Tour", date: "Mar 16, 2026", guests: 4, price: 120, status: "pending", source: "Telegram", guide: "Channary Mao" },
  { id: 3, guest: "Marie Dupont", tour: "Countryside Cycling", date: "Mar 17, 2026", guests: 2, price: 40, status: "confirmed", source: "WhatsApp", guide: "Dara Pich" },
  { id: 4, guest: "Tanaka Yuki", tour: "Temple Photography Tour", date: "Mar 18, 2026", guests: 1, price: 65, status: "confirmed", source: "Website", guide: "Dara Pich" },
  { id: 5, guest: "Mike Thompson", tour: "Airport Transfer", date: "Mar 15, 2026", guests: 3, price: 15, status: "completed", source: "WhatsApp", guide: "Kosal Nhem" },
  { id: 6, guest: "Lisa Park", tour: "Kampot Kayaking", date: "Mar 19, 2026", guests: 2, price: 70, status: "pending", source: "Telegram", guide: "Panha Lim" },
];

const MESSAGES = [
  { id: 1, from: "Sarah Johnson", preview: "Hi! Can we start the sunrise tour at 4:30 instead of 5?", time: "2 min ago", unread: true, platform: "WhatsApp" },
  { id: 2, from: "Chen Wei", preview: "我们一行4人，可以安排中文导游吗？", time: "15 min ago", unread: true, platform: "WhatsApp" },
  { id: 3, from: "Marie Dupont", preview: "Merci! Can you recommend a restaurant after the tour?", time: "1 hour ago", unread: false, platform: "Telegram" },
  { id: 4, from: "New inquiry via website", preview: "Looking for a 3-day temple tour for a family of 5...", time: "2 hours ago", unread: true, platform: "Website" },
  { id: 5, from: "Mike Thompson", preview: "Thanks for the great ride! Will leave a 5-star review.", time: "3 hours ago", unread: false, platform: "WhatsApp" },
];

const statusColors: Record<string, string> = {
  online: "bg-emerald-500",
  busy: "bg-amber-500",
  offline: "bg-slate-300",
};

const bookingStatusColors: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  pending: "bg-amber-50 text-amber-600 border-amber-100",
  completed: "bg-blue-50 text-blue-600 border-blue-100",
  cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function WhatsAppGuideSection() {
  const [activeTab, setActiveTab] = useState<GuideTab>("dashboard");
  const { toast } = useToast();

  const totalRevenue = GUIDES.reduce((s, g) => s + g.revenue, 0);
  const totalTours = GUIDES.reduce((s, g) => s + g.tours, 0);
  const avgRating = (GUIDES.reduce((s, g) => s + g.rating, 0) / GUIDES.length).toFixed(1);
  const onlineGuides = GUIDES.filter(g => g.status === "online").length;
  const unreadMessages = MESSAGES.filter(m => m.unread).length;
  const pendingBookings = BOOKINGS.filter(b => b.status === "pending").length;

  const TABS: { key: GuideTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { key: "dashboard", label: "Dashboard", icon: BarChart3 },
    { key: "bookings", label: "Bookings", icon: Calendar, badge: pendingBookings },
    { key: "contacts", label: "Messages", icon: MessageCircle, badge: unreadMessages },
    { key: "broadcast", label: "Broadcast", icon: Send },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="space-y-6" data-testid="whatsapp-guide-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#25D366] to-emerald-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <MessageSquare className="h-3 w-3 mr-1.5" /> WhatsApp-First Platform
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-whatsapp-title">
          Guide & Driver CRM
        </h2>
        <p className="text-sm text-slate-500">
          Built for real guides in Siem Reap & Phnom Penh. WhatsApp & Telegram sync, mobile-first CRM, and instant booking management.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/15 rounded-xl p-3 text-center">
          <Users className="h-4 w-4 text-[#25D366] mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{GUIDES.length}</div>
          <div className="text-[9px] text-slate-500">Active Guides ({onlineGuides} online)</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-center">
          <Navigation className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalTours.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Tours Completed</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <DollarSign className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-[9px] text-slate-500">Total Revenue</div>
        </div>
        <div className="bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/15 rounded-xl p-3 text-center">
          <Star className="h-4 w-4 text-rose-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{avgRating}</div>
          <div className="text-[9px] text-slate-500">Average Rating</div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-all border-b-2 -mb-[5px] ${
              activeTab === tab.key ? "border-[#25D366] text-[#25D366]" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
            data-testid={`tab-guide-${tab.key}`}>
            <tab.icon className="h-3.5 w-3.5" /> {tab.label}
            {tab.badge && tab.badge > 0 && <span className="bg-[#C1121F] text-white text-[8px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center px-1">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Registered Guides & Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDES.map(guide => (
              <Card key={guide.id} className="hover:shadow-lg transition-all" data-testid={`card-guide-${guide.id}`}>
                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-3xl">{guide.avatar}</span>
                      <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${statusColors[guide.status]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900">{guide.name}</div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3" /> {guide.location}</div>
                    </div>
                    <Badge className={`text-[8px] border-0 capitalize ${guide.status === "online" ? "bg-emerald-50 text-emerald-600" : guide.status === "busy" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}>{guide.status}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div><div className="text-sm font-bold text-slate-900">{guide.tours}</div><div className="text-[8px] text-slate-400">Tours</div></div>
                    <div><div className="text-sm font-bold text-slate-900">{guide.rating}</div><div className="text-[8px] text-slate-400">Rating</div></div>
                    <div><div className="text-sm font-bold text-slate-900">${(guide.revenue / 1000).toFixed(1)}K</div><div className="text-[8px] text-slate-400">Revenue</div></div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">{guide.specialties.map(s => <Badge key={s} variant="outline" className="text-[8px] px-1.5 py-0">{s}</Badge>)}</div>

                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                    <Globe className="h-3 w-3" /> {guide.languages.join(", ")}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <Button size="sm" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold h-8 rounded-lg" data-testid={`btn-wa-${guide.id}`}>
                      <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg text-xs" data-testid={`btn-call-${guide.id}`}>
                      <Phone className="h-3 w-3 mr-1" /> Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">{BOOKINGS.length} bookings</h3>
            <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold h-8 rounded-lg" data-testid="btn-new-booking"><Plus className="h-3 w-3 mr-1" /> New Booking</Button>
          </div>
          {BOOKINGS.map(b => (
            <Card key={b.id} className="hover:border-emerald-200 transition-all" data-testid={`card-booking-guide-${b.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{b.tour}</span>
                      <Badge className={`text-[8px] border ${bookingStatusColors[b.status]}`}>{b.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-0.5"><Users className="h-3 w-3" /> {b.guest} ({b.guests} pax)</span>
                      <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {b.date}</span>
                      <span className="flex items-center gap-0.5"><MessageSquare className="h-3 w-3" /> via {b.source}</span>
                      <span>Guide: {b.guide}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#25D366]">${b.price}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] rounded"><MessageSquare className="h-3 w-3" /></Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] rounded"><Phone className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">{MESSAGES.length} messages ({unreadMessages} unread)</h3>
          </div>
          {MESSAGES.map(m => (
            <Card key={m.id} className={`hover:border-emerald-200 transition-all cursor-pointer ${m.unread ? "border-l-4 border-l-[#25D366]" : ""}`} data-testid={`card-msg-${m.id}`}>
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                    {m.platform === "WhatsApp" ? "💬" : m.platform === "Telegram" ? "✈️" : "🌐"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${m.unread ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>{m.from}</span>
                      <Badge variant="outline" className="text-[7px] px-1">{m.platform}</Badge>
                    </div>
                    <p className={`text-xs truncate ${m.unread ? "text-slate-700" : "text-slate-400"}`}>{m.preview}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] text-slate-400">{m.time}</span>
                    {m.unread && <div className="h-2 w-2 rounded-full bg-[#25D366] ml-auto mt-1" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "broadcast" && (
        <Card>
          <CardContent className="pt-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Send className="h-4 w-4 text-[#25D366]" /> Broadcast Message</h3>
            <p className="text-xs text-slate-500">Send a message to all guides, specific groups, or individual contacts via WhatsApp or Telegram.</p>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Recipients</label>
              <div className="flex items-center gap-2 flex-wrap">
                {["All Guides", "Siem Reap Guides", "Phnom Penh Guides", "Drivers Only", "Online Now"].map(g => (
                  <button key={g} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs hover:border-[#25D366] hover:bg-emerald-50" data-testid={`btn-group-${g.toLowerCase().replace(/\s/g, "-")}`}>{g}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {[{ label: "WhatsApp", icon: "💬" }, { label: "Telegram", icon: "✈️" }, { label: "Both", icon: "📱" }].map(c => (
                  <button key={c.label} className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg border border-slate-200 text-xs font-medium hover:border-[#25D366]" data-testid={`btn-channel-${c.label.toLowerCase()}`}>
                    <span>{c.icon}</span> {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Message</label>
              <textarea placeholder="Type your broadcast message..." rows={4} className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#25D366] resize-none" data-testid="textarea-broadcast" />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => toast({ title: "Broadcast sent!", description: "Message delivered to all selected guides." })}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-10 px-6 rounded-xl" data-testid="btn-send-broadcast">
                <Send className="h-4 w-4 mr-2" /> Send Broadcast
              </Button>
              <Button variant="outline" className="h-10 px-4 rounded-xl text-sm"><Clock className="h-4 w-4 mr-1" /> Schedule</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "WhatsApp Business API", desc: "Connect your WhatsApp Business account to sync messages and automate replies.", icon: MessageSquare, color: "text-[#25D366]", connected: true },
            { title: "Telegram Bot", desc: "Set up a Telegram bot for automated booking confirmations and guide notifications.", icon: Send, color: "text-blue-500", connected: true },
            { title: "White-Label SDK", desc: "Embed booking engine and WhatsApp buttons on any website with our easy SDK.", icon: Settings, color: "text-purple-500", connected: false },
            { title: "Payment Integration", desc: "Accept payments via Wing, ABA Pay, credit cards, and PayPal.", icon: DollarSign, color: "text-amber-500", connected: true },
          ].map(setting => (
            <Card key={setting.title}>
              <CardContent className="pt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <setting.icon className={`h-6 w-6 ${setting.color}`} />
                  <Badge className={`text-[8px] border-0 ${setting.connected ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                    {setting.connected ? <><CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Connected</> : "Not Connected"}
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{setting.title}</h4>
                <p className="text-xs text-slate-500">{setting.desc}</p>
                <Button variant="outline" size="sm" className="text-xs">{setting.connected ? "Configure" : "Connect"}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto"><Smartphone className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">Mobile-First CRM</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Manage bookings, contacts, and messages right from your phone. Designed for guides on the go.</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto"><Zap className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">Instant Sync</h3>
            <p className="text-xs text-slate-500 leading-relaxed">WhatsApp & Telegram messages sync in real-time. Never miss a booking inquiry.</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mx-auto"><Shield className="h-5 w-5" /></div>
            <h3 className="font-bold text-sm text-slate-900">White-Label Ready</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Drop booking engines and WhatsApp buttons on any website with our easy SDK integration.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
