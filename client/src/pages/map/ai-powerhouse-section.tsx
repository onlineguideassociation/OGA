import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot, MessageSquare, Map, Sparkles, PenTool, BarChart3, Mail,
  Star, Copy, RefreshCw, Send, Zap, CheckCircle, Clock, Globe,
  TrendingUp, Users, Lightbulb, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type AITool = "review-reply" | "itinerary" | "marketing" | "social" | "email" | "analytics";

const AI_TOOLS: { key: AITool; label: string; icon: React.ElementType; description: string; color: string; gradient: string }[] = [
  { key: "review-reply", label: "Review Reply AI", icon: MessageSquare, description: "Draft empathetic, professional responses to TripAdvisor and Google reviews instantly.", color: "text-blue-500", gradient: "from-blue-500 to-blue-600" },
  { key: "itinerary", label: "Itinerary Generator", icon: Map, description: "Create detailed day-by-day itineraries for any destination based on user preferences.", color: "text-emerald-500", gradient: "from-emerald-500 to-emerald-600" },
  { key: "marketing", label: "Marketing Copy", icon: PenTool, description: "Generate tourism marketing copy, headlines, descriptions, and CTAs.", color: "text-amber-500", gradient: "from-amber-500 to-amber-600" },
  { key: "social", label: "Social Media AI", icon: Globe, description: "Create engaging social media posts, captions, and hashtag strategies for tourism.", color: "text-pink-500", gradient: "from-pink-500 to-pink-600" },
  { key: "email", label: "Email Optimizer", icon: Mail, description: "Craft high-converting email campaigns for tourism promotions and newsletters.", color: "text-purple-500", gradient: "from-purple-500 to-purple-600" },
  { key: "analytics", label: "Insights Generator", icon: BarChart3, description: "Analyze booking data and generate actionable tourism business insights.", color: "text-indigo-500", gradient: "from-indigo-500 to-indigo-600" },
];

const SAMPLE_REVIEWS = [
  { platform: "TripAdvisor", rating: 2, reviewer: "TravelJane22", text: "The tour guide was late and seemed disorganized. The van was too small for our group. Temples were beautiful but the experience was below expectations for the price paid.", date: "2 days ago" },
  { platform: "Google", rating: 4, reviewer: "Mark_Explorer", text: "Great sunrise tour at Angkor Wat! Our guide Sokha was incredibly knowledgeable. Only issue was the pickup was 20 minutes late. Would recommend to friends.", date: "1 week ago" },
  { platform: "TripAdvisor", rating: 1, reviewer: "DisappointedGuest", text: "Terrible experience. No air conditioning in the van, lunch was cold, and the guide barely spoke English. Complete waste of money.", date: "3 days ago" },
];

const GENERATED_REPLIES: Record<number, string> = {
  0: "Dear TravelJane22,\n\nThank you for taking the time to share your feedback. We sincerely apologize for the inconvenience caused by the late start and the vehicle size. We've already addressed this with our operations team to ensure proper vehicle assignment and punctuality.\n\nWe agree — the temples are extraordinary, and we want every guest to have an experience that matches their beauty. We'd love the opportunity to make this right. Please reach out to us directly, and we'll arrange a complimentary follow-up experience.\n\nWarm regards,\nThe OnlineGuide Team",
  1: "Dear Mark_Explorer,\n\nThank you so much for your wonderful review! We're thrilled to hear that Sokha made your Angkor Wat sunrise tour memorable with his knowledge and passion.\n\nWe appreciate your honest feedback about the pickup timing — we've flagged this with our transport team and are implementing stricter scheduling to avoid delays. Your recommendation means the world to us!\n\nWe hope to welcome you back for another adventure soon.\n\nBest regards,\nThe OnlineGuide Team",
  2: "Dear Guest,\n\nWe are deeply sorry to hear about your experience. This falls far below our standards, and we take your feedback very seriously.\n\nWe have immediately investigated the issues you raised — vehicle maintenance, meal quality, and guide qualifications. Corrective actions have been taken, including additional language training and vehicle inspections.\n\nWe would like to offer you a full refund and a complimentary tour to demonstrate the experience we truly provide. Please contact us at support@onlineguide.io.\n\nSincerely,\nManagement Team",
};

const ITINERARY_RESULT = {
  title: "Cambodia 5-Day Cultural & Adventure Itinerary",
  days: [
    { day: 1, title: "Arrive in Siem Reap", activities: ["Airport pickup & hotel check-in", "Afternoon visit to Angkor National Museum", "Sunset at Phnom Bakheng temple", "Dinner at Cuisine Wat Damnak"], meals: "Dinner included" },
    { day: 2, title: "Angkor Temple Circuit", activities: ["Sunrise at Angkor Wat (5:00 AM)", "Explore Bayon & Terrace of Elephants", "Lunch at temple-side restaurant", "Afternoon at Ta Prohm (Tomb Raider temple)", "Evening Phare Circus show"], meals: "Breakfast, Lunch" },
    { day: 3, title: "Floating Village & Countryside", activities: ["Morning visit to Tonle Sap floating village", "Khmer cooking class with market tour", "Afternoon cycling through rice paddies", "Sunset drinks at rooftop bar"], meals: "Breakfast, Lunch" },
    { day: 4, title: "Transfer to Phnom Penh", activities: ["Scenic drive to Phnom Penh (6 hours)", "Check in at boutique hotel", "Visit Royal Palace & Silver Pagoda", "Evening riverside walk & street food tour"], meals: "Breakfast, Dinner" },
    { day: 5, title: "Phnom Penh & Departure", activities: ["Morning visit to Central Market", "S-21 & Killing Fields memorial", "Farewell lunch at Malis Restaurant", "Airport transfer for departure"], meals: "Breakfast, Lunch" },
  ],
};

export default function AIPowerhouseSection() {
  const [activeTool, setActiveTool] = useState<AITool>("review-reply");
  const [selectedReview, setSelectedReview] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [marketingInput, setMarketingInput] = useState("");
  const [marketingResult, setMarketingResult] = useState("");
  const [socialResult, setSocialResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = (type: string) => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      if (type === "review") setShowReply(true);
      if (type === "itinerary") setShowItinerary(true);
      if (type === "marketing") setMarketingResult("🏛️ Discover the Magic of Angkor\n\nStep beyond the guidebooks and into a world where ancient stone whispers stories of kings and gods. Our expert local guides reveal hidden corners of Angkor Wat that most tourists never see.\n\n✨ Private sunrise experience\n✨ Off-the-beaten-path temples\n✨ Authentic Khmer lunch included\n\nBook now and save 20% on early bird pricing.\n\n→ Limited to 8 guests per tour for an intimate experience.");
      if (type === "social") setSocialResult("📸 Instagram Post:\n\nWhen the first light hits Angkor Wat, time stands still ✨🏛️\n\nOur guests captured this magical moment at 5:47 AM — before the crowds, before the heat, just pure ancient wonder.\n\nWant this experience? Link in bio 👆\n\n#AngkorWat #Cambodia #SiemReap #SunriseTour #TravelCambodia #BucketList #TempleRun #CulturalHeritage #SoutheastAsia #OnlineGuide\n\n---\n\n🐦 Twitter Thread:\n\n1/ Just got back from an incredible sunrise at Angkor Wat with @OnlineGuide 🏛️\n\n2/ Our guide Sokha explained the meaning behind every carving. Did you know the entire temple is an astronomical calendar? 🌅\n\n3/ Pro tip: Go to Bayon FIRST in the afternoon. Way fewer crowds, and the faces look incredible in golden hour light 📸");
      toast({ title: "Content generated!", description: "AI has generated your content." });
    }, 1500);
  };

  return (
    <div className="space-y-6" data-testid="ai-powerhouse-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-violet-500 to-purple-600 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Bot className="h-3 w-3 mr-1.5" /> AI Powerhouse
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-ai-title">
          Your 24/7 Digital Marketing Assistant
        </h2>
        <p className="text-sm text-slate-500">
          AI models fine-tuned on high-converting tourism content. Generate review replies, itineraries, marketing copy, and more.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/15 rounded-xl p-3 text-center">
          <Bot className="h-4 w-4 text-violet-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">6</div>
          <div className="text-[9px] text-slate-500">AI Tools</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-center">
          <Sparkles className="h-4 w-4 text-blue-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">24/7</div>
          <div className="text-[9px] text-slate-500">Always Available</div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/15 rounded-xl p-3 text-center">
          <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">3x</div>
          <div className="text-[9px] text-slate-500">Faster Content</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center">
          <Users className="h-4 w-4 text-amber-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-slate-900">2.4K+</div>
          <div className="text-[9px] text-slate-500">Active Users</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {AI_TOOLS.map(tool => (
          <button key={tool.key} onClick={() => setActiveTool(tool.key)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              activeTool === tool.key ? `bg-gradient-to-r ${tool.gradient} text-white border-transparent shadow-md` : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
            }`}
            data-testid={`btn-tool-${tool.key}`}>
            <tool.icon className={`h-5 w-5 ${activeTool === tool.key ? "text-white" : tool.color}`} />
            <span className="text-[9px] font-bold text-center leading-tight">{tool.label}</span>
          </button>
        ))}
      </div>

      {activeTool === "review-reply" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-blue-500" /> Select a Review to Reply
              </h3>
              {SAMPLE_REVIEWS.map((r, i) => (
                <button key={i} onClick={() => { setSelectedReview(i); setShowReply(false); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${selectedReview === i ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-200"}`}
                  data-testid={`btn-review-${i}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="outline" className="text-[8px]">{r.platform}</Badge>
                      <span className="text-[10px] font-bold text-slate-700">{r.reviewer}</span>
                    </div>
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`h-3 w-3 ${j < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />)}</div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{r.text}</p>
                  <span className="text-[9px] text-slate-400 mt-1 block">{r.date}</span>
                </button>
              ))}
              <Button onClick={() => handleGenerate("review")} disabled={generating}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold h-10 rounded-xl" data-testid="btn-generate-reply">
                {generating ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate AI Reply</>}
              </Button>
            </CardContent>
          </Card>
          <Card className={showReply ? "border-blue-200" : ""}>
            <CardContent className="pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <PenTool className="h-4 w-4 text-blue-500" /> AI-Generated Reply
              </h3>
              {showReply ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed">{GENERATED_REPLIES[selectedReview]}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(GENERATED_REPLIES[selectedReview]); toast({ title: "Copied!" }); }} className="text-xs" data-testid="btn-copy-reply"><Copy className="h-3 w-3 mr-1" /> Copy</Button>
                    <Button variant="outline" size="sm" className="text-xs" data-testid="btn-edit-reply"><PenTool className="h-3 w-3 mr-1" /> Edit</Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs" data-testid="btn-send-reply"><Send className="h-3 w-3 mr-1" /> Send Reply</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-300">
                  <Bot className="h-10 w-10 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Select a review and click "Generate AI Reply"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTool === "itinerary" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Map className="h-4 w-4 text-emerald-500" /> Itinerary Generator</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Destination</label>
                  <input placeholder="e.g. Cambodia" className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500" data-testid="input-itin-dest" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Duration</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white" data-testid="select-itin-days">
                    <option>3 days</option><option>5 days</option><option>7 days</option><option>10 days</option><option>14 days</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Travel Style</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white" data-testid="select-itin-style">
                    <option>Cultural & Heritage</option><option>Adventure</option><option>Relaxation</option><option>Food & Culinary</option><option>Budget</option><option>Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Budget</label>
                  <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white" data-testid="select-itin-budget">
                    <option>$50-100/day</option><option>$100-200/day</option><option>$200-500/day</option><option>$500+/day</option>
                  </select>
                </div>
              </div>
              <Button onClick={() => handleGenerate("itinerary")} disabled={generating}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-10 px-6 rounded-xl" data-testid="btn-generate-itinerary">
                {generating ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Itinerary</>}
              </Button>
            </CardContent>
          </Card>
          {showItinerary && (
            <Card className="border-emerald-200">
              <CardContent className="pt-5">
                <h3 className="text-base font-bold text-slate-900 mb-4">{ITINERARY_RESULT.title}</h3>
                <div className="space-y-4">
                  {ITINERARY_RESULT.days.map(d => (
                    <div key={d.day} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">{d.day}</div>
                        {d.day < ITINERARY_RESULT.days.length && <div className="w-px flex-1 bg-emerald-200 mt-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="text-sm font-bold text-slate-900">{d.title}</h4>
                        <div className="space-y-1 mt-1.5">{d.activities.map((a, i) => <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600"><CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" /> {a}</div>)}</div>
                        <Badge variant="outline" className="mt-2 text-[8px] text-amber-600 border-amber-200">🍽️ {d.meals}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="text-xs" data-testid="btn-copy-itin"><Copy className="h-3 w-3 mr-1" /> Copy</Button>
                  <Button variant="outline" size="sm" className="text-xs"><RefreshCw className="h-3 w-3 mr-1" /> Regenerate</Button>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs" data-testid="btn-export-itin"><Send className="h-3 w-3 mr-1" /> Export PDF</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTool === "marketing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><PenTool className="h-4 w-4 text-amber-500" /> Marketing Copy Generator</h3>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Content Type</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white" data-testid="select-content-type">
                  <option>Tour Description</option><option>Hotel Listing</option><option>Ad Headline</option><option>Landing Page</option><option>Promotion</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Describe your service</label>
                <textarea placeholder="e.g. Private sunrise tour of Angkor Wat with expert local guide..." rows={4} value={marketingInput} onChange={e => setMarketingInput(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-500 resize-none" data-testid="textarea-marketing-input" />
              </div>
              <Button onClick={() => handleGenerate("marketing")} disabled={generating}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-10 rounded-xl" data-testid="btn-generate-marketing">
                {generating ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Copy</>}
              </Button>
            </CardContent>
          </Card>
          <Card className={marketingResult ? "border-amber-200" : ""}>
            <CardContent className="pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-amber-500" /> Generated Copy</h3>
              {marketingResult ? (
                <div className="space-y-3">
                  <div className="bg-amber-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed">{marketingResult}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs"><Copy className="h-3 w-3 mr-1" /> Copy</Button>
                    <Button variant="outline" size="sm" className="text-xs"><RefreshCw className="h-3 w-3 mr-1" /> Regenerate</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-300"><PenTool className="h-10 w-10 mx-auto mb-2" /><p className="text-sm text-slate-400">Describe your service and click generate</p></div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTool === "social" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Globe className="h-4 w-4 text-pink-500" /> Social Media Content</h3>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Instagram", "Facebook", "Twitter/X"].map(p => (
                    <button key={p} className="p-2 rounded-lg border border-slate-200 text-xs font-medium hover:border-pink-300 hover:bg-pink-50" data-testid={`btn-platform-${p.toLowerCase()}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Topic</label>
                <textarea placeholder="e.g. Promote our sunrise Angkor Wat tour..." rows={3} className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-pink-500 resize-none" data-testid="textarea-social-input" />
              </div>
              <Button onClick={() => handleGenerate("social")} disabled={generating}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold h-10 rounded-xl" data-testid="btn-generate-social">
                {generating ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate Posts</>}
              </Button>
            </CardContent>
          </Card>
          <Card className={socialResult ? "border-pink-200" : ""}>
            <CardContent className="pt-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Generated Posts</h3>
              {socialResult ? (
                <div className="bg-pink-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed">{socialResult}</div>
              ) : (
                <div className="text-center py-12 text-slate-300"><Globe className="h-10 w-10 mx-auto mb-2" /><p className="text-sm text-slate-400">Select a platform and describe your topic</p></div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTool === "email" && (
        <Card>
          <CardContent className="pt-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Mail className="h-4 w-4 text-purple-500" /> Email Campaign Optimizer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Campaign Type</label><select className="w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white"><option>Promotional</option><option>Newsletter</option><option>Welcome Series</option><option>Re-engagement</option><option>Booking Confirmation</option></select></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Subject Line</label><input placeholder="e.g. Your Angkor Wat adventure awaits!" className="w-full border rounded-lg px-3 py-2 text-sm outline-none" data-testid="input-email-subject" /></div>
                <div><label className="text-xs font-medium text-slate-600 mb-1 block">Key Points</label><textarea placeholder="Main offers, discounts, CTAs..." rows={3} className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none resize-none" data-testid="textarea-email-points" /></div>
                <Button disabled={generating} className="bg-purple-500 hover:bg-purple-600 text-white font-bold h-10 px-6 rounded-xl" data-testid="btn-generate-email"><Sparkles className="h-4 w-4 mr-2" /> Generate Email</Button>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-center py-8 text-slate-300"><Mail className="h-10 w-10 mx-auto mb-2" /><p className="text-sm text-slate-400">Fill in the details and generate your email</p></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTool === "analytics" && (
        <Card>
          <CardContent className="pt-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-indigo-500" /> AI Business Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Booking Trend Analysis", desc: "Identify peak seasons, slow periods, and emerging trends from your booking data.", icon: TrendingUp, color: "text-emerald-500" },
                { title: "Revenue Optimization", desc: "AI recommendations for pricing adjustments, upsells, and package bundling.", icon: Zap, color: "text-amber-500" },
                { title: "Customer Segmentation", desc: "Automatically segment travelers by behavior, preferences, and spending patterns.", icon: Users, color: "text-blue-500" },
              ].map(insight => (
                <Card key={insight.title} className="border-indigo-100">
                  <CardContent className="pt-5 space-y-2">
                    <insight.icon className={`h-6 w-6 ${insight.color}`} />
                    <h4 className="text-sm font-bold text-slate-900">{insight.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{insight.desc}</p>
                    <Button variant="outline" size="sm" className="text-xs" data-testid={`btn-insight-${insight.title.toLowerCase().replace(/\s/g, "-")}`}><Sparkles className="h-3 w-3 mr-1" /> Run Analysis</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-violet-100 bg-gradient-to-r from-violet-500/5 to-purple-500/5">
        <CardContent className="py-5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 mb-1">Stop staring at a blank screen</h3>
              <p className="text-sm text-slate-500">Our AI models are fine-tuned on high-converting tourism content. Let AI do the heavy lifting while you focus on delivering amazing experiences.</p>
            </div>
            <Button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl h-11 px-6 whitespace-nowrap" data-testid="btn-upgrade-ai">
              Upgrade to Pro <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
