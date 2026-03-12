import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Palette, Eye, Type, Layers, Sparkles, Download, Copy,
  Globe, Shield, Heart, Star, CheckCircle, Megaphone,
  Image as ImageIcon, PenTool, Target, Zap, BookOpen,
  ChevronRight, Layout, Hash, MessageSquare, Video, Camera,
  Feather, Award, TrendingUp, Users
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type BrandTab = "identity" | "guidelines" | "assets" | "voice" | "campaigns";

const BRAND_TABS: { key: BrandTab; label: string; icon: React.ElementType }[] = [
  { key: "identity", label: "Brand Identity", icon: Sparkles },
  { key: "guidelines", label: "Visual Guidelines", icon: Eye },
  { key: "assets", label: "Brand Assets", icon: ImageIcon },
  { key: "voice", label: "Tone & Voice", icon: Feather },
  { key: "campaigns", label: "Campaigns", icon: Megaphone },
];

const BRAND_COLORS = [
  { name: "Truth Red", hex: "#C1121F", rgb: "193, 18, 31", usage: "Primary action, urgency, passion" },
  { name: "Truth Blue", hex: "#0081C9", rgb: "0, 129, 201", usage: "Trust, technology, intelligence" },
  { name: "Deep Navy", hex: "#0F172A", rgb: "15, 23, 42", usage: "Dark backgrounds, authority" },
  { name: "Slate 800", hex: "#1E293B", rgb: "30, 41, 59", usage: "Sidebar, secondary backgrounds" },
  { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Content areas, typography" },
  { name: "Slate 100", hex: "#F1F5F9", rgb: "241, 245, 249", usage: "Light backgrounds, cards" },
];

const BRAND_GRADIENTS = [
  { name: "Hero Gradient", from: "#0081C9", to: "#C1121F", usage: "Hero banners, CTAs" },
  { name: "Trust Gradient", from: "#0081C9", to: "#005a8c", usage: "Trust indicators, tech panels" },
  { name: "Passion Gradient", from: "#C1121F", to: "#8b0d16", usage: "Mission cards, alerts" },
  { name: "Ecosystem Gradient", from: "#0081C9", via: "#6B21A8", to: "#C1121F", usage: "Ecosystem visuals" },
];

const TYPOGRAPHY = [
  { name: "Display", size: "text-3xl / 30px", weight: "Bold (700)", font: "System / Inter", usage: "Hero headings, page titles" },
  { name: "Heading", size: "text-xl / 20px", weight: "Bold (700)", font: "System / Inter", usage: "Section titles" },
  { name: "Subheading", size: "text-base / 16px", weight: "Semibold (600)", font: "System / Inter", usage: "Card titles, labels" },
  { name: "Body", size: "text-sm / 14px", weight: "Regular (400)", font: "System / Inter", usage: "Paragraphs, descriptions" },
  { name: "Caption", size: "text-xs / 12px", weight: "Medium (500)", font: "System / Inter", usage: "Badges, metadata" },
  { name: "Micro", size: "text-[10px]", weight: "Semibold (600)", font: "System / Inter", usage: "Tags, tiny labels" },
];

const BRAND_VALUES = [
  { icon: Shield, title: "Truth", description: "Transparent, verified, and honest in every interaction. No fake reviews, no hidden fees.", color: "text-[#0081C9]", bg: "from-[#0081C9]/10 to-[#0081C9]/5" },
  { icon: Heart, title: "Loyalty", description: "Deep commitment to communities, guides, and travelers. Long-term relationships over quick wins.", color: "text-[#C1121F]", bg: "from-[#C1121F]/10 to-[#C1121F]/5" },
  { icon: Globe, title: "Culture", description: "Connecting diverse cultures through authentic experiences. Celebrating heritage and tradition.", color: "text-emerald-600", bg: "from-emerald-500/10 to-emerald-500/5" },
  { icon: Zap, title: "Innovation", description: "AI-powered tools that empower, not replace. Technology serving humanity and tourism.", color: "text-amber-600", bg: "from-amber-500/10 to-amber-500/5" },
  { icon: Users, title: "Community", description: "Built by guides, for guides. Every feature shaped by real user needs and feedback.", color: "text-violet-600", bg: "from-violet-500/10 to-violet-500/5" },
  { icon: Star, title: "Excellence", description: "World-class quality in every touchpoint. From UI to UX, content to code.", color: "text-indigo-600", bg: "from-indigo-500/10 to-indigo-500/5" },
];

const TONE_PILLARS = [
  { title: "Confident, Not Arrogant", do: "We're building something transformative for tourism.", dont: "We're the best platform ever created.", example: "OnlineGuide empowers guides with AI tools that increase income by 30-50%." },
  { title: "Warm, Not Casual", do: "Welcome to a community that cares about your success.", dont: "Hey! Sup? Come check us out lol.", example: "Join 200+ guides who are shaping the future of Cambodia's tourism industry." },
  { title: "Clear, Not Oversimplified", do: "Our AI analyzes booking patterns to forecast demand.", dont: "AI does stuff to help you.", example: "The RDTB engine processes real-time data from 21 destinations to predict tourism trends." },
  { title: "Inspiring, Not Preachy", do: "Imagine a world where every guide has digital tools.", dont: "You need to use technology or you'll fail.", example: "From Angkor Wat to the Mekong, guides are transforming their careers with digital skills." },
];

const BRAND_ASSETS = [
  { name: "Truth Logo (Primary)", type: "SVG / PNG", size: "1200×400px", usage: "Headers, hero sections", category: "Logo" },
  { name: "Truth Icon (Mark)", type: "SVG / PNG", size: "512×512px", usage: "Favicon, app icon, avatars", category: "Logo" },
  { name: "OGA Badge", type: "SVG / PNG", size: "800×800px", usage: "Official documents, certificates", category: "Badge" },
  { name: "Truth Wordmark", type: "SVG", size: "Vector", usage: "Navigation, footers", category: "Logo" },
  { name: "Social Banner (Facebook)", type: "PNG / JPG", size: "1200×630px", usage: "Social media cover", category: "Social" },
  { name: "Social Banner (Twitter)", type: "PNG / JPG", size: "1500×500px", usage: "Twitter/X header", category: "Social" },
  { name: "Story Template", type: "PNG", size: "1080×1920px", usage: "Instagram/TikTok stories", category: "Social" },
  { name: "Email Header", type: "PNG", size: "600×200px", usage: "Newsletter headers", category: "Template" },
  { name: "Presentation Deck", type: "PPTX / PDF", size: "16:9", usage: "Investor & partner decks", category: "Template" },
  { name: "Brand Guide PDF", type: "PDF", size: "A4", usage: "Complete brand reference", category: "Document" },
];

const CAMPAIGNS = [
  { name: "Connecting Cultures", status: "active", reach: "125K", engagement: "8.2%", channels: ["Instagram", "Facebook", "TikTok"], description: "Showcasing authentic cultural connections between guides and travelers.", kpi: "Brand awareness +40%" },
  { name: "Truth in Tourism", status: "active", reach: "89K", engagement: "12.1%", channels: ["YouTube", "Blog", "LinkedIn"], description: "Thought leadership campaign on transparency and honest reviews in travel.", kpi: "Trust score +25%" },
  { name: "Guide Spotlight Series", status: "active", reach: "67K", engagement: "15.3%", channels: ["Instagram", "YouTube", "Newsletter"], description: "Weekly features on individual guides, their stories, and achievements.", kpi: "Guide signups +60%" },
  { name: "Digital Cambodia 2026", status: "planned", reach: "—", engagement: "—", channels: ["All Channels"], description: "Major campaign for Cambodia's digital tourism transformation launch.", kpi: "Platform registrations +200%" },
  { name: "AI Tourism Summit Promo", status: "planned", reach: "—", engagement: "—", channels: ["LinkedIn", "Email", "PR"], description: "Pre-event campaign for the AI & Global Tourism Summit 2026.", kpi: "Event registrations 2,500" },
];

export default function TruthBrandingSection() {
  const [activeTab, setActiveTab] = useState<BrandTab>("identity");
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${label} copied to clipboard.` });
  };

  return (
    <div className="space-y-5" data-testid="truth-branding-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#C1121F] to-[#0081C9] border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">Truth Branding Platform</Badge>
        <h2 className="text-2xl font-bold text-slate-900 mb-1" data-testid="text-branding-title">The Truth Brand</h2>
        <p className="text-sm text-slate-500">Complete brand identity, visual system, and campaign toolkit for OnlineGuide.io</p>
        <p className="text-xs text-slate-400 mt-1 italic">"Connecting Cultures with Loyalty and Truth"</p>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {BRAND_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${isActive ? "bg-white text-[#0081C9] shadow-sm border border-[#0081C9]/15" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}
              data-testid={`brand-tab-${tab.key}`}
            >
              <Icon className="h-3.5 w-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "identity" && (
        <div className="space-y-5">
          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0081C9, #C1121F)" }}>
            <div className="absolute inset-0 bg-black/15" />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white tracking-tight">OnlineGuide<span className="text-white/70">.io</span></h3>
                  <p className="text-xs text-white/60">The Truth Branding Platform</p>
                </div>
              </div>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-4">
                A brand built on transparency, cultural connection, and technological innovation. Every visual element, word, and interaction carries the weight of truth.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {["AI-Powered", "Community-Driven", "Culture-First", "Transparent"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/15 text-white border border-white/20">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Star className="h-4 w-4 text-[#C1121F]" /> Brand Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BRAND_VALUES.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div key={val.title} className={`bg-gradient-to-br ${val.bg} border border-slate-200/60 rounded-xl p-4 hover:shadow-sm transition-all`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`h-5 w-5 ${val.color}`} />
                        <h4 className="text-sm font-bold text-slate-900">{val.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Target className="h-4 w-4 text-[#0081C9]" /> Brand Positioning</h3>
              <Card className="border-[#0081C9]/10">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Tagline</div>
                    <p className="text-sm font-bold text-slate-900">"Connecting Cultures with Loyalty and Truth"</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Mission</div>
                    <p className="text-xs text-slate-600">Digitize and empower 1,000 Cambodian tour guides through AI, community, and transparent technology.</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Vision</div>
                    <p className="text-xs text-slate-600">The world's most trusted AI tourism platform, where every guide has a digital identity and every traveler has an honest experience.</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Audience</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["Tour Guides", "Travelers", "Hotels", "Creators", "NGOs", "Investors"].map((a) => (
                        <span key={a} className="px-2 py-0.5 bg-[#0081C9]/5 border border-[#0081C9]/10 rounded text-[10px] text-[#0081C9] font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Brand Personality</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["Trustworthy", "Innovative", "Warm", "Professional", "Bold"].map((p) => (
                        <span key={p} className="px-2 py-0.5 bg-[#C1121F]/5 border border-[#C1121F]/10 rounded text-[10px] text-[#C1121F] font-medium">{p}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "guidelines" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Palette className="h-4 w-4 text-[#0081C9]" /> Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BRAND_COLORS.map((color) => (
                <div key={color.hex} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group" data-testid={`color-swatch-${color.name.toLowerCase().replace(/\s/g, "-")}`}>
                  <div className="h-20 relative cursor-pointer" style={{ backgroundColor: color.hex }} onClick={() => copyToClipboard(color.hex, color.name)}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Copy className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold text-slate-900">{color.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{color.hex}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">RGB: {color.rgb}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{color.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Layers className="h-4 w-4 text-[#C1121F]" /> Gradients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BRAND_GRADIENTS.map((g) => (
                <div key={g.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-16 rounded-t-xl" style={{ background: `linear-gradient(135deg, ${g.from}, ${g.via || g.to}, ${g.to})` }} />
                  <div className="p-3">
                    <div className="text-xs font-bold text-slate-900">{g.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{g.from} → {g.via ? `${g.via} → ` : ""}{g.to}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{g.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Type className="h-4 w-4 text-[#0081C9]" /> Typography Scale</h3>
            <div className="space-y-2">
              {TYPOGRAPHY.map((t) => (
                <div key={t.name} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3 hover:border-[#0081C9]/20 transition-colors">
                  <div className="w-24 flex-shrink-0">
                    <div className="text-xs font-bold text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.size}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500"><span className="font-semibold text-slate-700">{t.weight}</span> · {t.font}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t.usage}</div>
                  </div>
                  <div className="hidden md:block text-right flex-shrink-0">
                    <span className={`${t.name === "Display" ? "text-2xl" : t.name === "Heading" ? "text-lg" : t.name === "Subheading" ? "text-base" : t.name === "Body" ? "text-sm" : t.name === "Caption" ? "text-xs" : "text-[10px]"} font-${t.name === "Display" || t.name === "Heading" ? "bold" : t.name === "Subheading" || t.name === "Micro" ? "semibold" : "medium"} text-slate-800`}>
                      Aa Bb Cc 123
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Layout className="h-4 w-4 text-emerald-600" /> Spacing & Layout</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Card Padding", value: "p-4 / p-5", px: "16-20px" },
                { label: "Section Gap", value: "gap-5 / gap-6", px: "20-24px" },
                { label: "Border Radius", value: "rounded-xl", px: "12px" },
                { label: "Icon Size", value: "h-4 w-4 / h-5 w-5", px: "16-20px" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-slate-900">{s.label}</div>
                  <div className="text-[10px] text-[#0081C9] font-mono mt-1">{s.value}</div>
                  <div className="text-[10px] text-slate-400">{s.px}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "assets" && (
        <div className="space-y-5">
          <div className="rounded-xl p-5 bg-gradient-to-r from-[#0081C9]/5 to-[#C1121F]/5 border border-[#0081C9]/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><ImageIcon className="h-4 w-4 text-[#0081C9]" /> Brand Asset Library</h3>
              <Badge className="bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 text-[9px]">{BRAND_ASSETS.length} Assets</Badge>
            </div>
            <p className="text-xs text-slate-500">Download official brand assets for consistent use across all channels and materials.</p>
          </div>

          {["Logo", "Badge", "Social", "Template", "Document"].map((cat) => {
            const assets = BRAND_ASSETS.filter((a) => a.category === cat);
            if (assets.length === 0) return null;
            return (
              <div key={cat}>
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">{cat}s</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {assets.map((asset) => (
                    <div key={asset.name} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-[#0081C9]/20 transition-all flex items-center gap-4" data-testid={`asset-${asset.name.toLowerCase().replace(/\s/g, "-")}`}>
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0081C9]/10 to-[#C1121F]/10 border border-[#0081C9]/15 flex items-center justify-center flex-shrink-0">
                        {cat === "Logo" ? <Globe className="h-5 w-5 text-[#0081C9]" /> :
                         cat === "Badge" ? <Award className="h-5 w-5 text-[#C1121F]" /> :
                         cat === "Social" ? <Hash className="h-5 w-5 text-violet-600" /> :
                         cat === "Template" ? <Layout className="h-5 w-5 text-amber-600" /> :
                         <BookOpen className="h-5 w-5 text-emerald-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900">{asset.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{asset.type} · {asset.size}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{asset.usage}</div>
                      </div>
                      <Button variant="outline" size="sm" className="text-[10px] h-7 px-2.5 border-[#0081C9]/20 text-[#0081C9] hover:bg-[#0081C9]/5" onClick={() => toast({ title: "Coming Soon", description: `${asset.name} download will be available soon.` })}>
                        <Download className="h-3 w-3 mr-1" /> Get
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="rounded-xl p-4 bg-gradient-to-r from-[#C1121F]/5 to-[#0081C9]/5 border border-[#C1121F]/10">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#C1121F] flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Brand Usage Policy</div>
                <p className="text-[10px] text-slate-500 mt-0.5">All assets must follow the Truth Branding Guidelines. Do not modify logos, alter colors, or use brand elements in ways that misrepresent OnlineGuide.io.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "voice" && (
        <div className="space-y-5">
          <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #C1121F, #0081C9)" }}>
            <div className="absolute inset-0 bg-black/15" />
            <div className="relative z-10 text-center">
              <Feather className="h-8 w-8 text-white/80 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">The Voice of Truth</h3>
              <p className="text-sm text-white/70 max-w-md mx-auto">How we speak defines who we are. Our voice is confident, warm, clear, and inspiring — always grounded in truth.</p>
            </div>
          </div>

          <div className="space-y-3">
            {TONE_PILLARS.map((pillar, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow" data-testid={`tone-pillar-${i}`}>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${i % 2 === 0 ? "bg-[#0081C9]" : "bg-[#C1121F]"}`}>{i + 1}</div>
                    {pillar.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-3">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Do</div>
                      <p className="text-xs text-emerald-800">{pillar.do}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200/60 rounded-lg p-3">
                      <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1"><span className="text-sm">✕</span> Don't</div>
                      <p className="text-xs text-red-800">{pillar.dont}</p>
                    </div>
                  </div>
                  <div className="bg-[#0081C9]/5 border border-[#0081C9]/10 rounded-lg p-3">
                    <div className="text-[10px] font-bold text-[#0081C9] uppercase tracking-wider mb-1">Example</div>
                    <p className="text-xs text-slate-700 italic">"{pillar.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Card className="border-[#C1121F]/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4 text-[#C1121F]" /> Key Messaging Framework</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { audience: "Tour Guides", message: "Your expertise deserves a digital stage. We're here to amplify your voice and income." },
                { audience: "Travelers", message: "Discover Cambodia through verified, honest experiences curated by real local guides." },
                { audience: "Businesses", message: "AI-powered tourism tools that drive bookings, manage operations, and grow your brand." },
                { audience: "Investors", message: "A scalable AI tourism platform targeting $456K ARR with 8 revenue streams across SE Asia." },
                { audience: "Partners/NGOs", message: "Together we're digitizing 1,000 guides and transforming Cambodia's tourism ecosystem." },
              ].map((m) => (
                <div key={m.audience} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <Badge className="bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 text-[9px] px-2 py-0.5 flex-shrink-0 mt-0.5">{m.audience}</Badge>
                  <p className="text-xs text-slate-700">{m.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "campaigns" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Megaphone className="h-4 w-4 text-[#C1121F]" /> Brand Campaigns</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[9px]">3 Active</Badge>
              <Badge className="bg-amber-100 text-amber-700 border-0 text-[9px]">2 Planned</Badge>
            </div>
          </div>

          <div className="space-y-3">
            {CAMPAIGNS.map((campaign, i) => (
              <div key={i} className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all ${campaign.status === "active" ? "border-emerald-200/60" : "border-slate-200"}`} data-testid={`campaign-${i}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{campaign.name}</h4>
                      <Badge className={`text-[9px] px-1.5 py-0 border-0 ${campaign.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </div>
                    {campaign.status === "active" && (
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-sm font-bold text-[#0081C9]">{campaign.reach}</div>
                          <div className="text-[9px] text-slate-400">Reach</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-[#C1121F]">{campaign.engagement}</div>
                          <div className="text-[9px] text-slate-400">Engagement</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{campaign.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {campaign.channels.map((ch) => (
                        <span key={ch} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-600 font-medium">{ch}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#0081C9]/5 border border-[#0081C9]/10 rounded-lg px-2 py-1">
                      <TrendingUp className="h-3 w-3 text-[#0081C9]" />
                      <span className="text-[9px] font-semibold text-[#0081C9]">{campaign.kpi}</span>
                    </div>
                  </div>
                </div>
                {campaign.status === "active" && (
                  <div className="px-5 pb-3">
                    <div className="flex items-center gap-2">
                      <Progress value={campaign.engagement === "8.2%" ? 65 : campaign.engagement === "12.1%" ? 78 : 82} className="h-1.5 flex-1" />
                      <span className="text-[9px] text-slate-400">Campaign Progress</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Camera, title: "Content Calendar", desc: "30-day content schedule across all channels", color: "text-[#0081C9]", bg: "from-[#0081C9]/5 to-transparent" },
              { icon: Video, title: "Video Templates", desc: "Pre-built video templates for social campaigns", color: "text-[#C1121F]", bg: "from-[#C1121F]/5 to-transparent" },
              { icon: PenTool, title: "Copy Templates", desc: "Ready-to-use marketing copy and captions", color: "text-violet-600", bg: "from-violet-500/5 to-transparent" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.title} className={`bg-gradient-to-br ${tool.bg} border-slate-200/60 hover:shadow-sm transition-all cursor-pointer`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <Icon className={`h-4 w-4 ${tool.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{tool.title}</div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{tool.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
