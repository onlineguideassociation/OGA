import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users, Mail, BarChart3, MessageSquare, Search, Phone, Calendar,
  TrendingUp, Target, Zap, Star, CheckCircle, ArrowRight, Globe,
  Bot, Send, Eye, MousePointer, Clock, Filter, ChevronRight,
  Megaphone, PieChart, Activity, Inbox, HeadphonesIcon, BookOpen,
  UserPlus, Heart, DollarSign, FileText, Settings, Sparkles,
  LayoutDashboard, Share2, Bell, X, Award, Briefcase
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type CrmTab = "dashboard" | "contacts" | "pipeline" | "marketing" | "support" | "ai";

const CRM_TABS: { key: CrmTab; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "contacts", label: "Contacts", icon: Users },
  { key: "pipeline", label: "Sales Pipeline", icon: Target },
  { key: "marketing", label: "Marketing", icon: Megaphone },
  { key: "support", label: "Support", icon: HeadphonesIcon },
  { key: "ai", label: "AI Tools", icon: Bot },
];

interface Contact {
  id: number;
  name: string;
  email: string;
  avatar: string;
  type: "Traveler" | "Tour Operator" | "Hotel" | "Agency" | "Creator";
  status: "Active" | "Lead" | "Prospect" | "VIP";
  bookings: number;
  totalSpent: number;
  lastActivity: string;
  location: string;
  score: number;
}

const CONTACTS: Contact[] = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@gmail.com", avatar: "👩", type: "Traveler", status: "VIP", bookings: 8, totalSpent: 2450, lastActivity: "2 hours ago", location: "Singapore", score: 95 },
  { id: 2, name: "Marco Rossi", email: "marco.r@outlook.com", avatar: "👨", type: "Traveler", status: "Active", bookings: 3, totalSpent: 890, lastActivity: "1 day ago", location: "Italy", score: 72 },
  { id: 3, name: "Angkor Adventures", email: "info@angkoradventures.com", avatar: "🏛️", type: "Tour Operator", status: "Active", bookings: 156, totalSpent: 0, lastActivity: "3 hours ago", location: "Siem Reap", score: 88 },
  { id: 4, name: "Sokha Beach Resort", email: "reservations@sokha.com", avatar: "🏨", type: "Hotel", status: "VIP", bookings: 342, totalSpent: 0, lastActivity: "30 min ago", location: "Sihanoukville", score: 94 },
  { id: 5, name: "Mekong Travel Co.", email: "hello@mekongtravel.co", avatar: "✈️", type: "Agency", status: "Active", bookings: 89, totalSpent: 0, lastActivity: "5 hours ago", location: "Phnom Penh", score: 81 },
  { id: 6, name: "Yuki Tanaka", email: "yuki.t@yahoo.jp", avatar: "👩‍💼", type: "Traveler", status: "Lead", bookings: 0, totalSpent: 0, lastActivity: "2 days ago", location: "Tokyo", score: 45 },
  { id: 7, name: "David Thompson", email: "david.t@travel.blog", avatar: "📸", type: "Creator", status: "Active", bookings: 5, totalSpent: 620, lastActivity: "6 hours ago", location: "Australia", score: 67 },
  { id: 8, name: "Rattanak Tours", email: "book@rattanaktours.kh", avatar: "🚐", type: "Tour Operator", status: "Prospect", bookings: 12, totalSpent: 0, lastActivity: "1 week ago", location: "Battambang", score: 55 },
];

interface PipelineDeal {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  probability: number;
  contact: string;
  daysInStage: number;
}

const PIPELINE_DEALS: PipelineDeal[] = [
  { id: 1, title: "Corporate Retreat Package", company: "TechCorp Asia", value: 12500, stage: "Proposal", probability: 60, contact: "James Liu", daysInStage: 3 },
  { id: 2, title: "Wedding Group Booking", company: "Private Client", value: 8200, stage: "Negotiation", probability: 75, contact: "Emily Park", daysInStage: 5 },
  { id: 3, title: "Annual Tourism Conference", company: "ASEAN Tourism Board", value: 35000, stage: "Qualified", probability: 40, contact: "Dr. Sokheng", daysInStage: 7 },
  { id: 4, title: "School Tour Program 2026", company: "International School PP", value: 4800, stage: "Lead", probability: 20, contact: "Maria Santos", daysInStage: 1 },
  { id: 5, title: "Luxury Angkor Experience", company: "Elite Travels UK", value: 18000, stage: "Proposal", probability: 55, contact: "Robert Hayes", daysInStage: 4 },
  { id: 6, title: "Photography Tour Series", company: "NatGeo Partners", value: 22000, stage: "Negotiation", probability: 80, contact: "Anna Schmidt", daysInStage: 2 },
  { id: 7, title: "Eco-Lodge Partnership", company: "Green Stays Network", value: 15000, stage: "Closed Won", probability: 100, contact: "Vuthy Khun", daysInStage: 0 },
  { id: 8, title: "Cultural Festival Sponsorship", company: "Cambodia Arts Council", value: 6000, stage: "Closed Lost", probability: 0, contact: "Pisey Lim", daysInStage: 0 },
];

interface Campaign {
  id: number;
  name: string;
  type: "Email" | "Social" | "SEO" | "Landing Page" | "Automation";
  status: "Active" | "Draft" | "Completed" | "Paused";
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
}

const CAMPAIGNS: Campaign[] = [
  { id: 1, name: "Angkor Wat Early Bird 2026", type: "Email", status: "Active", sent: 12500, opened: 4375, clicked: 1250, converted: 187, revenue: 8415 },
  { id: 2, name: "Monsoon Season Deals", type: "Email", status: "Completed", sent: 8200, opened: 2870, clicked: 820, converted: 98, revenue: 4410 },
  { id: 3, name: "Instagram Reels Campaign", type: "Social", status: "Active", sent: 0, opened: 45000, clicked: 3200, converted: 156, revenue: 7020 },
  { id: 4, name: "Siem Reap SEO Optimization", type: "SEO", status: "Active", sent: 0, opened: 0, clicked: 8900, converted: 445, revenue: 20025 },
  { id: 5, name: "Sunset Tour Landing Page", type: "Landing Page", status: "Active", sent: 0, opened: 0, clicked: 2100, converted: 210, revenue: 9450 },
  { id: 6, name: "Welcome Series Automation", type: "Automation", status: "Active", sent: 3400, opened: 2380, clicked: 680, converted: 102, revenue: 4590 },
];

interface Ticket {
  id: number;
  subject: string;
  customer: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Waiting" | "Resolved";
  channel: "Email" | "Chat" | "Phone" | "Social";
  created: string;
}

const TICKETS: Ticket[] = [
  { id: 1001, subject: "Booking confirmation not received", customer: "Sarah Chen", priority: "High", status: "In Progress", channel: "Chat", created: "2 hours ago" },
  { id: 1002, subject: "Request tour date change", customer: "Marco Rossi", priority: "Medium", status: "Open", channel: "Email", created: "4 hours ago" },
  { id: 1003, subject: "Group discount inquiry", customer: "TechCorp Asia", priority: "Low", status: "Waiting", channel: "Email", created: "1 day ago" },
  { id: 1004, subject: "Refund request - weather cancellation", customer: "Yuki Tanaka", priority: "Urgent", status: "Open", channel: "Phone", created: "30 min ago" },
  { id: 1005, subject: "Hotel transfer arrangement", customer: "David Thompson", priority: "Medium", status: "In Progress", channel: "Chat", created: "3 hours ago" },
  { id: 1006, subject: "Accessibility information needed", customer: "Emily Park", priority: "Low", status: "Resolved", channel: "Email", created: "2 days ago" },
];

export default function CrmMarketingSection() {
  const [activeTab, setActiveTab] = useState<CrmTab>("dashboard");
  const [contactFilter, setContactFilter] = useState<string>("All");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const { toast } = useToast();

  const pipelineStages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"] as const;
  const stageColors: Record<string, string> = {
    "Lead": "bg-slate-100 text-slate-700 border-slate-200",
    "Qualified": "bg-blue-50 text-blue-700 border-blue-200",
    "Proposal": "bg-amber-50 text-amber-700 border-amber-200",
    "Negotiation": "bg-purple-50 text-purple-700 border-purple-200",
    "Closed Won": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Closed Lost": "bg-red-50 text-red-700 border-red-200",
  };

  const totalRevenue = CAMPAIGNS.reduce((s, c) => s + c.revenue, 0);
  const totalContacts = CONTACTS.length;
  const openTickets = TICKETS.filter(t => t.status !== "Resolved").length;
  const pipelineValue = PIPELINE_DEALS.filter(d => d.stage !== "Closed Lost" && d.stage !== "Closed Won").reduce((s, d) => s + d.value, 0);
  const wonDeals = PIPELINE_DEALS.filter(d => d.stage === "Closed Won").reduce((s, d) => s + d.value, 0);

  const filteredContacts = contactFilter === "All" ? CONTACTS : CONTACTS.filter(c => c.type === contactFilter);

  return (
    <div className="space-y-6" data-testid="crm-marketing-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Briefcase className="h-3 w-3 mr-1.5" /> CRM & Marketing Platform
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-crm-title">
          Tourism Business Command Center
        </h2>
        <p className="text-sm text-slate-500">
          Manage contacts, track bookings, run marketing campaigns, and support travelers — all in one platform.
        </p>
      </div>

      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 flex-wrap">
        {CRM_TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === key
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
            data-testid={`tab-crm-${key}`}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="border-indigo-100">
              <CardContent className="pt-4 pb-3 text-center">
                <Users className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{totalContacts}</div>
                <div className="text-[9px] text-slate-500">Total Contacts</div>
                <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">+12% this month</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100">
              <CardContent className="pt-4 pb-3 text-center">
                <DollarSign className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
                <div className="text-[9px] text-slate-500">Campaign Revenue</div>
                <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">+23% vs last period</div>
              </CardContent>
            </Card>
            <Card className="border-amber-100">
              <CardContent className="pt-4 pb-3 text-center">
                <Target className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">${pipelineValue.toLocaleString()}</div>
                <div className="text-[9px] text-slate-500">Pipeline Value</div>
                <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">{PIPELINE_DEALS.filter(d => !["Closed Won","Closed Lost"].includes(d.stage)).length} active deals</div>
              </CardContent>
            </Card>
            <Card className="border-rose-100">
              <CardContent className="pt-4 pb-3 text-center">
                <HeadphonesIcon className="h-5 w-5 text-rose-500 mx-auto mb-1" />
                <div className="text-xl font-bold text-slate-900">{openTickets}</div>
                <div className="text-[9px] text-slate-500">Open Tickets</div>
                <div className="text-[9px] text-amber-600 font-semibold mt-0.5">1 urgent</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Activity className="h-4 w-4 text-indigo-500" /> Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: "New booking", detail: "Sarah Chen booked Angkor Sunrise Tour", time: "2h ago", icon: Calendar, color: "text-emerald-500" },
                  { action: "Lead scored", detail: "Yuki Tanaka scored 45 — nurture sequence started", time: "3h ago", icon: Zap, color: "text-amber-500" },
                  { action: "Campaign sent", detail: "Angkor Early Bird email sent to 12,500 contacts", time: "5h ago", icon: Send, color: "text-blue-500" },
                  { action: "Deal moved", detail: "Photography Tour Series moved to Negotiation", time: "6h ago", icon: ArrowRight, color: "text-purple-500" },
                  { action: "Ticket resolved", detail: "Accessibility inquiry resolved for Emily Park", time: "1d ago", icon: CheckCircle, color: "text-emerald-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`h-7 w-7 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-800">{item.action}</div>
                      <div className="text-[10px] text-slate-500 truncate">{item.detail}</div>
                    </div>
                    <span className="text-[9px] text-slate-400 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-indigo-500" /> Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {CAMPAIGNS.filter(c => c.status === "Active").slice(0, 4).map(c => (
                  <div key={c.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800 truncate">{c.name}</span>
                      <Badge variant="outline" className="text-[8px] px-1">{c.type}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] text-slate-500">
                      {c.sent > 0 && <span className="flex items-center gap-0.5"><Send className="h-2.5 w-2.5" /> {c.sent.toLocaleString()} sent</span>}
                      <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {c.opened > 0 ? c.opened.toLocaleString() : c.clicked.toLocaleString()} {c.opened > 0 ? "opened" : "views"}</span>
                      <span className="flex items-center gap-0.5"><MousePointer className="h-2.5 w-2.5" /> {c.converted} conversions</span>
                      <span className="font-bold text-emerald-600">${c.revenue.toLocaleString()}</span>
                    </div>
                    <Progress value={c.sent > 0 ? (c.opened / c.sent) * 100 : Math.min((c.converted / c.clicked) * 100 * 10, 100)} className="h-1.5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Target className="h-4 w-4 text-indigo-500" /> Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2">
                {pipelineStages.map(stage => {
                  const deals = PIPELINE_DEALS.filter(d => d.stage === stage);
                  const total = deals.reduce((s, d) => s + d.value, 0);
                  return (
                    <div key={stage} className={`rounded-lg border p-2.5 ${stageColors[stage]}`}>
                      <div className="text-[9px] font-bold uppercase tracking-wider mb-1">{stage}</div>
                      <div className="text-sm font-bold">{deals.length}</div>
                      <div className="text-[9px]">${total.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search contacts..." className="flex-1 text-sm bg-transparent outline-none text-slate-700" data-testid="input-search-contacts" />
            </div>
            <div className="flex items-center gap-1">
              {["All", "Traveler", "Tour Operator", "Hotel", "Agency", "Creator"].map(f => (
                <button
                  key={f}
                  onClick={() => setContactFilter(f)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${
                    contactFilter === f ? "bg-indigo-500 text-white border-indigo-500" : "bg-white text-slate-600 border-slate-200 hover:bg-indigo-50"
                  }`}
                  data-testid={`filter-contact-${f.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white h-9 text-xs rounded-lg" data-testid="btn-add-contact">
              <UserPlus className="h-3.5 w-3.5 mr-1" /> Add Contact
            </Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_80px_80px_90px_100px_60px] gap-2 px-4 py-2 bg-slate-50 border-b text-[9px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Contact</span><span>Type</span><span>Status</span><span>Bookings</span><span>Total Spent</span><span>Last Active</span><span>Score</span>
            </div>
            {filteredContacts.map(contact => (
              <div key={contact.id} className="grid grid-cols-[1fr_120px_80px_80px_90px_100px_60px] gap-2 px-4 py-3 border-b border-slate-100 hover:bg-slate-50 items-center cursor-pointer transition-colors" data-testid={`row-contact-${contact.id}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{contact.avatar}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">{contact.name}</div>
                    <div className="text-[9px] text-slate-400 truncate">{contact.email}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-[8px] w-fit">{contact.type}</Badge>
                <Badge className={`text-[8px] w-fit border-0 ${
                  contact.status === "VIP" ? "bg-amber-100 text-amber-700" :
                  contact.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                  contact.status === "Lead" ? "bg-blue-100 text-blue-700" :
                  "bg-slate-100 text-slate-700"
                }`}>{contact.status}</Badge>
                <span className="text-xs text-slate-700">{contact.bookings}</span>
                <span className="text-xs font-semibold text-slate-900">{contact.totalSpent > 0 ? `$${contact.totalSpent.toLocaleString()}` : "—"}</span>
                <span className="text-[10px] text-slate-500">{contact.lastActivity}</span>
                <div className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${contact.score >= 80 ? "bg-emerald-500" : contact.score >= 50 ? "bg-amber-500" : "bg-red-400"}`} />
                  <span className="text-xs font-bold text-slate-700">{contact.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "pipeline" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Sales Pipeline</h3>
              <p className="text-[10px] text-slate-500">Track deals from lead to close. Total pipeline: ${pipelineValue.toLocaleString()} | Won: ${wonDeals.toLocaleString()}</p>
            </div>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white h-9 text-xs rounded-lg" data-testid="btn-new-deal">
              <Plus className="h-3.5 w-3.5 mr-1" /> New Deal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pipelineStages.map(stage => {
              const deals = PIPELINE_DEALS.filter(d => d.stage === stage);
              return (
                <div key={stage} className="space-y-2">
                  <div className={`rounded-lg border px-3 py-2 ${stageColors[stage]}`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider">{stage}</div>
                    <div className="text-xs">{deals.length} deal{deals.length !== 1 ? "s" : ""} · ${deals.reduce((s, d) => s + d.value, 0).toLocaleString()}</div>
                  </div>
                  {deals.map(deal => (
                    <Card key={deal.id} className="border hover:shadow-md transition-shadow cursor-pointer" data-testid={`card-deal-${deal.id}`}>
                      <CardContent className="p-3 space-y-2">
                        <div className="text-xs font-bold text-slate-900">{deal.title}</div>
                        <div className="text-[10px] text-slate-500">{deal.company}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-emerald-600">${deal.value.toLocaleString()}</span>
                          <span className="text-[9px] text-slate-400">{deal.probability}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400">
                          <span className="flex items-center gap-0.5"><Users className="h-2.5 w-2.5" /> {deal.contact}</span>
                          <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {deal.daysInStage}d</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "marketing" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Marketing Campaigns</h3>
              <p className="text-[10px] text-slate-500">Email, social, SEO, and automation campaigns. Total revenue: ${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 text-xs rounded-lg" data-testid="btn-create-landing">
                <FileText className="h-3.5 w-3.5 mr-1" /> Landing Page
              </Button>
              <Button
                onClick={() => setShowComposeModal(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white h-9 text-xs rounded-lg"
                data-testid="btn-new-campaign"
              >
                <Megaphone className="h-3.5 w-3.5 mr-1" /> New Campaign
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-3 text-center">
              <Send className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">{CAMPAIGNS.reduce((s, c) => s + c.sent, 0).toLocaleString()}</div>
              <div className="text-[9px] text-slate-500">Emails Sent</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-3 text-center">
              <Eye className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">35%</div>
              <div className="text-[9px] text-slate-500">Avg Open Rate</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-3 text-center">
              <MousePointer className="h-4 w-4 text-amber-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">1,198</div>
              <div className="text-[9px] text-slate-500">Total Conversions</div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-xl p-3 text-center">
              <DollarSign className="h-4 w-4 text-rose-500 mx-auto mb-1" />
              <div className="text-lg font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
              <div className="text-[9px] text-slate-500">Total Revenue</div>
            </div>
          </div>

          <div className="space-y-3">
            {CAMPAIGNS.map(campaign => (
              <Card key={campaign.id} className="border hover:border-indigo-200 transition-all" data-testid={`card-campaign-${campaign.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                        campaign.type === "Email" ? "bg-blue-50 text-blue-500" :
                        campaign.type === "Social" ? "bg-pink-50 text-pink-500" :
                        campaign.type === "SEO" ? "bg-emerald-50 text-emerald-500" :
                        campaign.type === "Landing Page" ? "bg-amber-50 text-amber-500" :
                        "bg-purple-50 text-purple-500"
                      }`}>
                        {campaign.type === "Email" ? <Mail className="h-4 w-4" /> :
                         campaign.type === "Social" ? <Share2 className="h-4 w-4" /> :
                         campaign.type === "SEO" ? <Search className="h-4 w-4" /> :
                         campaign.type === "Landing Page" ? <FileText className="h-4 w-4" /> :
                         <Zap className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{campaign.name}</div>
                        <div className="text-[10px] text-slate-500">{campaign.type}</div>
                      </div>
                    </div>
                    <Badge className={`text-[9px] border-0 ${
                      campaign.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                      campaign.status === "Draft" ? "bg-slate-100 text-slate-600" :
                      campaign.status === "Completed" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{campaign.status}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{campaign.sent > 0 ? campaign.sent.toLocaleString() : "—"}</div>
                      <div className="text-[9px] text-slate-500">Sent</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{campaign.opened > 0 ? campaign.opened.toLocaleString() : campaign.clicked.toLocaleString()}</div>
                      <div className="text-[9px] text-slate-500">{campaign.opened > 0 ? "Opened" : "Views/Clicks"}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-600">{campaign.converted}</div>
                      <div className="text-[9px] text-slate-500">Conversions</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">${campaign.revenue.toLocaleString()}</div>
                      <div className="text-[9px] text-slate-500">Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "support" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Customer Support</h3>
              <p className="text-[10px] text-slate-500">{openTickets} open tickets · {TICKETS.filter(t => t.priority === "Urgent").length} urgent</p>
            </div>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white h-9 text-xs rounded-lg" data-testid="btn-new-ticket">
              <Inbox className="h-3.5 w-3.5 mr-1" /> New Ticket
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Open", count: TICKETS.filter(t => t.status === "Open").length, color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
              { label: "In Progress", count: TICKETS.filter(t => t.status === "In Progress").length, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
              { label: "Waiting", count: TICKETS.filter(t => t.status === "Waiting").length, color: "text-purple-500", bg: "bg-purple-50 border-purple-100" },
              { label: "Resolved", count: TICKETS.filter(t => t.status === "Resolved").length, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
            ].map(s => (
              <div key={s.label} className={`rounded-xl border p-3 text-center ${s.bg}`}>
                <div className={`text-xl font-bold ${s.color}`}>{s.count}</div>
                <div className="text-[9px] text-slate-600 font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {TICKETS.map(ticket => (
              <Card key={ticket.id} className={`border cursor-pointer hover:shadow-md transition-all ${ticket.priority === "Urgent" ? "border-red-200 bg-red-50/30" : ""}`} data-testid={`card-ticket-${ticket.id}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    ticket.channel === "Chat" ? "bg-emerald-50 text-emerald-500" :
                    ticket.channel === "Email" ? "bg-blue-50 text-blue-500" :
                    ticket.channel === "Phone" ? "bg-amber-50 text-amber-500" :
                    "bg-pink-50 text-pink-500"
                  }`}>
                    {ticket.channel === "Chat" ? <MessageSquare className="h-4 w-4" /> :
                     ticket.channel === "Email" ? <Mail className="h-4 w-4" /> :
                     ticket.channel === "Phone" ? <Phone className="h-4 w-4" /> :
                     <Globe className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">#{ticket.id}</span>
                      <span className="text-xs text-slate-700">{ticket.subject}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{ticket.customer} · {ticket.created}</div>
                  </div>
                  <Badge className={`text-[8px] border-0 ${
                    ticket.priority === "Urgent" ? "bg-red-100 text-red-700" :
                    ticket.priority === "High" ? "bg-orange-100 text-orange-700" :
                    ticket.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>{ticket.priority}</Badge>
                  <Badge className={`text-[8px] border-0 ${
                    ticket.status === "Open" ? "bg-blue-100 text-blue-700" :
                    ticket.status === "In Progress" ? "bg-amber-100 text-amber-700" :
                    ticket.status === "Waiting" ? "bg-purple-100 text-purple-700" :
                    "bg-emerald-100 text-emerald-700"
                  }`}>{ticket.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="space-y-4">
          <div className="text-center max-w-md mx-auto mb-2">
            <h3 className="text-sm font-bold text-slate-800 mb-1">AI-Powered Tourism Tools</h3>
            <p className="text-[10px] text-slate-500">Automate marketing, support, and sales with intelligent AI tools built for tourism.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Bot, title: "AI Travel Assistant", desc: "24/7 chatbot for traveler inquiries. Handles bookings, recommendations, and FAQs automatically.",
                stats: "2,340 conversations this month", badge: "Active", color: "text-blue-500", bg: "bg-blue-50",
              },
              {
                icon: Sparkles, title: "AI Content Generator", desc: "Generate marketing emails, tour descriptions, social posts, and SEO content in seconds.",
                stats: "156 pieces generated", badge: "Active", color: "text-purple-500", bg: "bg-purple-50",
              },
              {
                icon: Target, title: "AI Lead Scoring", desc: "Automatically score and prioritize leads based on traveler behavior, engagement, and booking intent.",
                stats: "8 contacts scored today", badge: "Active", color: "text-amber-500", bg: "bg-amber-50",
              },
              {
                icon: TrendingUp, title: "AI Booking Recommendations", desc: "Suggest personalized tours and experiences based on traveler preferences and past bookings.",
                stats: "42% increase in upsells", badge: "Active", color: "text-emerald-500", bg: "bg-emerald-50",
              },
              {
                icon: Mail, title: "AI Email Optimizer", desc: "Optimize subject lines, send times, and content for higher open and conversion rates.",
                stats: "+18% open rate improvement", badge: "Beta", color: "text-rose-500", bg: "bg-rose-50",
              },
              {
                icon: PieChart, title: "AI Revenue Forecasting", desc: "Predict future revenue, booking trends, and seasonal demand using historical data analysis.",
                stats: "Next month: $45K projected", badge: "Beta", color: "text-indigo-500", bg: "bg-indigo-50",
              },
            ].map((tool, i) => (
              <Card key={i} className="border hover:border-indigo-200 hover:shadow-md transition-all" data-testid={`card-ai-tool-${i}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center flex-shrink-0`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">{tool.title}</h4>
                        <Badge className={`text-[8px] border-0 ${tool.badge === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{tool.badge}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-2">{tool.desc}</p>
                      <div className="text-[10px] font-semibold text-slate-600 flex items-center gap-1">
                        <Activity className="h-3 w-3" /> {tool.stats}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <CardContent className="py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Globe, label: "Free for Small Operators", desc: "Basic CRM tools at no cost" },
              { icon: TrendingUp, label: "Starter Plans", desc: "For growing travel businesses" },
              { icon: Award, label: "Professional", desc: "Agencies & hotel groups" },
              { icon: Briefcase, label: "Enterprise", desc: "Tourism networks & chains" },
            ].map((plan, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
                  <plan.icon className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">{plan.label}</div>
                <div className="text-[10px] text-slate-500">{plan.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowComposeModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white relative">
              <button onClick={() => setShowComposeModal(false)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-compose">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Megaphone className="h-5 w-5" />
                <span className="font-bold">Create New Campaign</span>
              </div>
              <p className="text-sm text-white/80">Set up your marketing campaign</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Campaign Name</label>
                <input type="text" placeholder="e.g. Summer Tours Promotion" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500" data-testid="input-campaign-name" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Campaign Type</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white" data-testid="select-campaign-type">
                  <option>Email Campaign</option>
                  <option>Social Media</option>
                  <option>SEO Campaign</option>
                  <option>Landing Page</option>
                  <option>Automation Workflow</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Target Audience</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white" data-testid="select-audience">
                  <option>All Contacts</option>
                  <option>Travelers Only</option>
                  <option>Tour Operators</option>
                  <option>Hotels & Resorts</option>
                  <option>VIP Contacts</option>
                  <option>New Leads</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject Line</label>
                <input type="text" placeholder="Enter email subject..." className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500" data-testid="input-subject" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Content</label>
                <textarea placeholder="Write your campaign content..." rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 resize-none" data-testid="textarea-campaign-content" />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => { toast({ title: "Campaign created!", description: "Your campaign has been saved as draft." }); setShowComposeModal(false); }}
                  variant="outline"
                  className="flex-1 h-10 rounded-lg text-sm"
                  data-testid="btn-save-draft"
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => { toast({ title: "Campaign launched!", description: "Your campaign is now active and sending." }); setShowComposeModal(false); }}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold h-10 rounded-lg text-sm"
                  data-testid="btn-launch-campaign"
                >
                  <Send className="h-4 w-4 mr-1.5" /> Launch Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  );
}
