import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Heart, MapPin, GraduationCap, Users, Globe, Search, Filter,
  Plus, Share2, Clock, TrendingUp, DollarSign, CheckCircle,
  Camera, Video, Leaf, Landmark, Music, BookOpen, Shield,
  ArrowRight, Star, Sparkles, Calendar, CreditCard, Wallet,
  Smartphone, X, ExternalLink, ChevronRight, Award
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

type CampaignCategory = "All" | "Cultural Heritage" | "Community" | "Education" | "Eco-Tourism" | "Guide Support" | "Documentary" | "Festival" | "Infrastructure";

interface Campaign {
  id: number;
  name: string;
  avatar: string;
  location: string;
  country: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  category: CampaignCategory;
  image: string;
  featured: boolean;
  verified: boolean;
  updates: number;
}

const CAMPAIGNS: Campaign[] = [
  {
    id: 1, name: "Sophea K.", avatar: "🧑‍🏫", location: "Siem Reap", country: "Cambodia",
    title: "Restore Traditional Village Tours in Siem Reap",
    description: "Help us rebuild and preserve the traditional village tour route near Angkor Wat. Funds will support local families, restore heritage structures, and create sustainable tourism jobs for 50+ villagers.",
    goal: 15000, raised: 9750, donors: 234, daysLeft: 18, category: "Cultural Heritage", image: "🏛️", featured: true, verified: true, updates: 8,
  },
  {
    id: 2, name: "Chandra M.", avatar: "👩‍🌾", location: "Battambang", country: "Cambodia",
    title: "Eco-Tourism Community Garden & Heritage Trail",
    description: "Creating a sustainable community garden and heritage walking trail connecting three villages. Includes waste management training, organic farming, and tourism hospitality education.",
    goal: 8000, raised: 5600, donors: 142, daysLeft: 24, category: "Eco-Tourism", image: "🌿", featured: true, verified: true, updates: 5,
  },
  {
    id: 3, name: "Dara V.", avatar: "🎬", location: "Phnom Penh", country: "Cambodia",
    title: "Cambodia Through Young Eyes - Travel Documentary",
    description: "Producing a 45-minute travel documentary showcasing Cambodia's hidden cultural gems through the lens of young Cambodian filmmakers. Will be submitted to international film festivals.",
    goal: 12000, raised: 3600, donors: 89, daysLeft: 45, category: "Documentary", image: "🎥", featured: false, verified: true, updates: 3,
  },
  {
    id: 4, name: "Sokha T.", avatar: "🧭", location: "Kampot", country: "Cambodia",
    title: "Support Independent Tour Guides During Off-Season",
    description: "Providing emergency financial support and advanced training for 25 independent tour guides in Kampot and Kep provinces during the tourism low season.",
    goal: 5000, raised: 4200, donors: 178, daysLeft: 7, category: "Guide Support", image: "🧭", featured: false, verified: true, updates: 12,
  },
  {
    id: 5, name: "Pisey L.", avatar: "🎓", location: "Siem Reap", country: "Cambodia",
    title: "Young Khmer Guide Licensing & Language Program",
    description: "Help 15 aspiring young guides cover the official Tourism Ministry licensing course, advanced English and Mandarin training, and first aid certification.",
    goal: 4500, raised: 2250, donors: 67, daysLeft: 30, category: "Education", image: "📚", featured: false, verified: true, updates: 4,
  },
  {
    id: 6, name: "Rattana S.", avatar: "🎭", location: "Angkor", country: "Cambodia",
    title: "Revive the Angkor Traditional Dance Festival",
    description: "Funding the annual Apsara dance festival near Angkor Wat temple complex. Supports 40 performers, traditional costume restoration, and a new community stage.",
    goal: 20000, raised: 14000, donors: 312, daysLeft: 12, category: "Festival", image: "🎭", featured: true, verified: true, updates: 15,
  },
  {
    id: 7, name: "Narith K.", avatar: "🌱", location: "Mondulkiri", country: "Cambodia",
    title: "Indigenous Eco-Lodge & Nature Trail Project",
    description: "Building eco-friendly lodges and nature trails in Mondulkiri's forests. Supports indigenous Bunong community tourism and wildlife conservation.",
    goal: 25000, raised: 8500, donors: 95, daysLeft: 60, category: "Infrastructure", image: "🏕️", featured: false, verified: true, updates: 2,
  },
  {
    id: 8, name: "Maly P.", avatar: "📖", location: "Chiang Mai", country: "Thailand",
    title: "Documenting Hill Tribe Cultural Heritage",
    description: "Recording and preserving the oral histories, traditional crafts, and cultural practices of northern Thailand's hill tribe communities for a digital tourism archive.",
    goal: 7500, raised: 3000, donors: 56, daysLeft: 35, category: "Cultural Heritage", image: "🏔️", featured: false, verified: true, updates: 3,
  },
];

const CATEGORIES: CampaignCategory[] = ["All", "Cultural Heritage", "Community", "Education", "Eco-Tourism", "Guide Support", "Documentary", "Festival", "Infrastructure"];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "All": Globe,
  "Cultural Heritage": Landmark,
  "Community": Users,
  "Education": GraduationCap,
  "Eco-Tourism": Leaf,
  "Guide Support": Shield,
  "Documentary": Video,
  "Festival": Music,
  "Infrastructure": Landmark,
};

export default function FundraisingSection() {
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState<Campaign | null>(null);
  const [donateAmount, setDonateAmount] = useState(25);
  const { toast } = useToast();

  const filteredCampaigns = useMemo(() => {
    return CAMPAIGNS.filter(c => {
      const matchCategory = selectedCategory === "All" || c.category === selectedCategory;
      const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredCampaigns = CAMPAIGNS.filter(c => c.featured);

  const totalRaised = CAMPAIGNS.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = CAMPAIGNS.reduce((sum, c) => sum + c.donors, 0);
  const totalCampaigns = CAMPAIGNS.length;

  const handleDonate = () => {
    if (showDonateModal) {
      toast({ title: "Thank you for your support!", description: `$${donateAmount} donation to "${showDonateModal.title}" is being processed.` });
      setShowDonateModal(null);
      setDonateAmount(25);
    }
  };

  const handleShare = (campaign: Campaign) => {
    if (navigator.share) {
      navigator.share({ title: campaign.title, text: campaign.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!", description: "Campaign link copied to clipboard." });
    }
  };

  const handleCreateCampaign = () => {
    toast({ title: "Campaign submitted!", description: "Your campaign is under review. You'll receive confirmation within 24 hours." });
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6" data-testid="fundraising-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-rose-500 to-pink-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Heart className="h-3 w-3 mr-1.5" /> Tourism Crowdfunding
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-crowdfunding-title">
          Support the Future of Tourism
        </h2>
        <p className="text-sm text-slate-500">
          Fund cultural preservation, community projects, and tourism development. Every donation makes a direct impact.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/15 rounded-xl p-3 text-center">
          <Heart className="h-4 w-4 text-rose-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">${totalRaised.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Raised</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-center">
          <Users className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalDonors.toLocaleString()}</div>
          <div className="text-[9px] text-slate-500">Total Supporters</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">{totalCampaigns}</div>
          <div className="text-[9px] text-slate-500">Active Campaigns</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Globe className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">6</div>
          <div className="text-[9px] text-slate-500">Countries Supported</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns by name or location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            data-testid="input-search-campaigns"
          />
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl h-10 px-5"
          data-testid="btn-start-campaign"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Start a Campaign
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat] || Globe;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                isActive
                  ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:bg-rose-50"
              }`}
              data-testid={`filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
            >
              <Icon className="h-3 w-3" /> {cat}
            </button>
          );
        })}
      </div>

      {featuredCampaigns.length > 0 && selectedCategory === "All" && !searchQuery && (
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Featured Campaigns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden border-2 border-amber-200/50 hover:border-amber-300 transition-all hover:shadow-lg group">
                <div className="h-32 bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center relative">
                  <span className="text-5xl">{campaign.image}</span>
                  <Badge className="absolute top-2 right-2 bg-amber-500 text-white border-0 text-[9px]">
                    <Star className="h-2.5 w-2.5 mr-0.5" /> Featured
                  </Badge>
                  {campaign.verified && (
                    <Badge className="absolute top-2 left-2 bg-emerald-500 text-white border-0 text-[9px]">
                      <CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Verified
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2 pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin className="h-3 w-3 text-rose-400" /> {campaign.location}, {campaign.country}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock className="h-3 w-3" /> {campaign.daysLeft}d left
                    </span>
                  </div>
                  <CardTitle className="text-sm leading-snug line-clamp-2">{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2 space-y-2">
                  <p className="text-xs text-slate-500 line-clamp-2">{campaign.description}</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-rose-600">${campaign.raised.toLocaleString()} raised</span>
                      <span className="text-slate-400">${campaign.goal.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 bg-rose-100" />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{Math.round((campaign.raised / campaign.goal) * 100)}% funded</span>
                      <span>{campaign.donors} supporters</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t p-3 flex gap-2">
                  <Button
                    onClick={() => setShowDonateModal(campaign)}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white h-9 text-xs font-bold rounded-lg"
                    data-testid={`btn-donate-${campaign.id}`}
                  >
                    <Heart className="h-3 w-3 mr-1" /> Donate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare(campaign)}
                    className="h-9 px-3 rounded-lg"
                    data-testid={`btn-share-${campaign.id}`}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        {(selectedCategory !== "All" || searchQuery) && (
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? "s" : ""} found
          </h3>
        )}
        {selectedCategory === "All" && !searchQuery && (
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#0081C9]" /> All Campaigns
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden border hover:border-rose-200 transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{campaign.avatar}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{campaign.name}</div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <MapPin className="h-2.5 w-2.5" /> {campaign.location}, {campaign.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {campaign.verified && (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] px-1.5">
                        <CheckCircle className="h-2.5 w-2.5 mr-0.5" /> Verified
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-rose-500 border-rose-100 text-[9px] px-1.5">
                      {campaign.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-sm leading-snug">{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <p className="text-xs text-slate-500 leading-relaxed">{campaign.description}</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-rose-600">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-slate-400">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2.5 bg-rose-100" />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-600">{Math.round((campaign.raised / campaign.goal) * 100)}% funded</span>
                    <span>{campaign.donors} supporters</span>
                    <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {campaign.daysLeft} days left</span>
                    <span className="flex items-center gap-0.5"><BookOpen className="h-2.5 w-2.5" /> {campaign.updates} updates</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t p-3 flex gap-2">
                <Button
                  onClick={() => setShowDonateModal(campaign)}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white h-9 text-xs font-bold rounded-lg"
                  data-testid={`btn-donate-${campaign.id}`}
                >
                  <Heart className="h-3 w-3 mr-1" /> Support this Campaign
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare(campaign)}
                  className="h-9 px-3 rounded-lg text-xs"
                  data-testid={`btn-share-${campaign.id}`}
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No campaigns found matching your criteria.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Card className="border-rose-100 bg-gradient-to-br from-rose-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">100% Direct Impact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">All donations go directly to verified campaign goals. Small processing fee applies.</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Verified & Trusted</h3>
            <p className="text-xs text-slate-500 leading-relaxed">All campaigns are vetted by OnlineGuide.io for authentic tourism and community impact.</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <CardContent className="pt-5 text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Global Community</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Join supporters worldwide funding cultural preservation, tourism, and community development.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 bg-gradient-to-r from-[#0081C9]/5 to-rose-500/5">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Have a tourism project that needs funding?</h3>
              <p className="text-sm text-slate-500">Create a free campaign and reach supporters worldwide. Cultural preservation, eco-tourism, guide support, documentaries, and more.</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#0081C9] hover:bg-[#006ba3] text-white font-semibold rounded-xl h-11 px-6 whitespace-nowrap"
              data-testid="btn-start-campaign-bottom"
            >
              <Plus className="h-4 w-4 mr-1.5" /> Start Your Campaign
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDonateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDonateModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 text-white relative">
              <button onClick={() => setShowDonateModal(null)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-donate">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-5 w-5" />
                <span className="font-bold">Support this Campaign</span>
              </div>
              <p className="text-sm text-white/80 line-clamp-1">{showDonateModal.title}</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-rose-600">${showDonateModal.raised.toLocaleString()} raised</span>
                  <span className="text-slate-400">of ${showDonateModal.goal.toLocaleString()}</span>
                </div>
                <Progress value={(showDonateModal.raised / showDonateModal.goal) * 100} className="h-2 bg-rose-100" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Choose donation amount</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setDonateAmount(amt)}
                      className={`py-2 rounded-lg text-sm font-bold transition-all border ${
                        donateAmount === amt
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white text-slate-700 border-slate-200 hover:border-rose-300"
                      }`}
                      data-testid={`btn-amount-${amt}`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={donateAmount}
                    onChange={e => setDonateAmount(Number(e.target.value))}
                    className="flex-1 text-sm bg-transparent outline-none text-slate-700"
                    min={1}
                    data-testid="input-custom-amount"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Payment method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: CreditCard, label: "Card" },
                    { icon: Wallet, label: "Digital Wallet" },
                    { icon: Smartphone, label: "Mobile Pay" },
                    { icon: DollarSign, label: "Bank Transfer" },
                  ].map((method, i) => (
                    <button
                      key={method.label}
                      className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium border transition-all ${
                        i === 0 ? "bg-slate-50 border-[#0081C9] text-[#0081C9]" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                      data-testid={`btn-pay-${method.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <method.icon className="h-4 w-4" /> {method.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleDonate}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold h-11 rounded-xl text-sm"
                data-testid="btn-confirm-donate"
              >
                <Heart className="h-4 w-4 mr-2" /> Donate ${donateAmount}
              </Button>
              <p className="text-[10px] text-slate-400 text-center">Secure payment. A small processing fee may apply. By donating you agree to our Terms.</p>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0081C9] to-[#006ba3] px-6 py-4 text-white relative">
              <button onClick={() => setShowCreateModal(false)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-create">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Plus className="h-5 w-5" />
                <span className="font-bold">Start a Crowdfunding Campaign</span>
              </div>
              <p className="text-sm text-white/80">Raise funds for your tourism or cultural project</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Campaign Title</label>
                <input type="text" placeholder="e.g. Restore Heritage Village Tours" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9] focus:ring-1 focus:ring-[#0081C9]/20" data-testid="input-campaign-title" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Category</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9] bg-white" data-testid="select-campaign-category">
                  {CATEGORIES.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Funding Goal ($)</label>
                  <input type="number" placeholder="5000" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]" data-testid="input-campaign-goal" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Duration (days)</label>
                  <input type="number" placeholder="30" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]" data-testid="input-campaign-duration" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Location</label>
                <input type="text" placeholder="e.g. Siem Reap, Cambodia" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]" data-testid="input-campaign-location" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Your Story</label>
                <textarea placeholder="Describe your project, why it matters, and how the funds will be used..." rows={4} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9] resize-none" data-testid="textarea-campaign-story" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Photos / Videos</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-[#0081C9] transition-colors cursor-pointer">
                  <Camera className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Click or drag to upload campaign media</p>
                </div>
              </div>
              <Button
                onClick={handleCreateCampaign}
                className="w-full bg-[#0081C9] hover:bg-[#006ba3] text-white font-bold h-11 rounded-xl text-sm"
                data-testid="btn-submit-campaign"
              >
                <Sparkles className="h-4 w-4 mr-2" /> Submit Campaign for Review
              </Button>
              <p className="text-[10px] text-slate-400 text-center">All campaigns are reviewed within 24 hours. Free to create. Small processing fee on donations.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
