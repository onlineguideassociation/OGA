import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon, Upload, Share2, Tag, Film, Play, Video,
  Mic, Edit3, MapPin, Sparkles, Palette
} from "lucide-react";
import { useState } from "react";

type FlowTab = "media" | "cinema";

const FLOW_TABS: { key: FlowTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "media", label: "Content Generator", icon: ImageIcon, color: "text-pink-600" },
  { key: "cinema", label: "Cultural Cinema", icon: Film, color: "text-purple-600" },
];

interface MediaAsset {
  id: string;
  title: string;
  type: "photo" | "video";
  tags: string[];
  downloads: number;
  earnings: number;
  views: number;
  rating: number;
  thumbnail: string;
}

const mockMedia: MediaAsset[] = [
  { id: "m1", title: "Angkor Wat Sunrise 4K", type: "photo", tags: ["Temples", "Sunrise", "Architecture"], downloads: 234, earnings: 892.34, views: 5420, rating: 4.9, thumbnail: "📸" },
  { id: "m2", title: "Khmer Traditional Dance", type: "video", tags: ["Culture", "Dance", "Tradition"], downloads: 89, earnings: 1245.67, views: 3210, rating: 4.8, thumbnail: "🎥" },
  { id: "m3", title: "Floating Village Morning Mist", type: "photo", tags: ["Landscape", "Water", "Tonle Sap"], downloads: 156, earnings: 624.80, views: 2890, rating: 4.7, thumbnail: "🌅" },
  { id: "m4", title: "Street Food Cooking Masterclass", type: "video", tags: ["Food", "Tutorial", "Cooking"], downloads: 198, earnings: 1876.45, views: 6780, rating: 4.85, thumbnail: "🍲" },
  { id: "m5", title: "Royal Palace Gold Details", type: "photo", tags: ["Architecture", "Gold", "Phnom Penh"], downloads: 104, earnings: 456.23, views: 1920, rating: 4.6, thumbnail: "🏛️" },
  { id: "m6", title: "Night Markets & Street Life", type: "photo", tags: ["Street", "Night", "Markets"], downloads: 287, earnings: 1023.45, views: 7650, rating: 4.9, thumbnail: "🌃" },
];

export default function CreatorFlowSection() {
  const [activeTab, setActiveTab] = useState<FlowTab>("media");
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(mockMedia[0]);
  const [filterType, setFilterType] = useState<"all" | "photo" | "video">("all");

  const filteredMedia = filterType === "all" ? mockMedia : mockMedia.filter(m => m.type === filterType);
  const totalEarnings = mockMedia.reduce((sum, m) => sum + m.earnings, 0);
  const totalViews = mockMedia.reduce((sum, m) => sum + m.views, 0);
  const totalDownloads = mockMedia.reduce((sum, m) => sum + m.downloads, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Palette className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-creator-flow-title">Creator Studio</h1>
          </div>
          <p className="text-sm text-slate-500">Content Generator & Cultural Cinema — All in One</p>
        </div>
        <Badge className="bg-purple-100 text-purple-700 border-none text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span></span>
          Studio Active
        </Badge>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {FLOW_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              data-testid={`creator-tab-${tab.key}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? tab.color : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "media" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-white/80"><CardContent className="pt-4 pb-4"><p className="text-slate-500 text-xs">Assets</p><p className="text-xl font-bold">{mockMedia.length}</p></CardContent></Card>
            <Card className="bg-white/80"><CardContent className="pt-4 pb-4"><p className="text-slate-500 text-xs">Views</p><p className="text-xl font-bold">{(totalViews / 1000).toFixed(1)}k</p></CardContent></Card>
            <Card className="bg-white/80"><CardContent className="pt-4 pb-4"><p className="text-slate-500 text-xs">Downloads</p><p className="text-xl font-bold">{totalDownloads}</p></CardContent></Card>
            <Card className="bg-white/80"><CardContent className="pt-4 pb-4"><p className="text-slate-500 text-xs">Earnings</p><p className="text-xl font-bold text-emerald-600">${totalEarnings.toFixed(0)}</p></CardContent></Card>
          </div>

          <div className="flex gap-2 items-center">
            <Button size="sm" className="bg-pink-600 hover:bg-pink-700" data-testid="upload-media-button">
              <Upload className="h-3.5 w-3.5 mr-1" /> Upload Media
            </Button>
            {(["all", "photo", "video"] as const).map(ft => (
              <button key={ft} onClick={() => setFilterType(ft)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterType === ft ? "bg-pink-600 text-white" : "bg-white text-slate-600 hover:bg-pink-50"}`}>
                {ft === "all" ? "All" : ft === "photo" ? "Photos" : "Videos"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {filteredMedia.map(media => (
                <button key={media.id} onClick={() => setSelectedMedia(media)}
                  className={`p-3 rounded-lg border-2 transition text-left ${selectedMedia?.id === media.id ? 'border-pink-500 bg-pink-50' : 'border-slate-200 bg-white hover:border-pink-300'}`}
                  data-testid={`media-card-${media.id}`}
                >
                  <div className="text-3xl mb-1">{media.thumbnail}</div>
                  <h3 className="font-semibold text-xs text-slate-900 line-clamp-2">{media.title}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-[10px]">{media.type}</Badge>
                    <span className="text-[10px] text-slate-500">⭐ {media.rating}</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-medium mt-1">${media.earnings.toFixed(2)} earned</p>
                </button>
              ))}
            </div>
            <div>
              {selectedMedia && (
                <Card className="bg-white/80 sticky top-4">
                  <CardHeader className="pb-2"><CardTitle className="text-base">{selectedMedia.title}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      {[
                        { label: "Views", val: selectedMedia.views.toString() },
                        { label: "Downloads", val: selectedMedia.downloads.toString() },
                        { label: "Earnings", val: `$${selectedMedia.earnings.toFixed(2)}` },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between text-xs"><span className="text-slate-600">{item.label}</span><span className="font-bold">{item.val}</span></div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1 flex items-center gap-1"><Tag className="h-3 w-3" /> AI Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMedia.tags.map(tag => <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700 text-xs" data-testid="edit-media">Edit</Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs" data-testid="share-media"><Share2 className="h-3 w-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "cinema" && (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-2 bg-purple-500/20 text-purple-700 border-purple-500/30">Global Storytelling</Badge>
              <h2 className="text-2xl font-bold text-slate-900">Cultural Cinema Engine</h2>
              <p className="text-sm text-slate-500">Transforming guides into storytellers and destinations into cinematic narratives.</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" data-testid="cinema-upload"><Upload className="h-3.5 w-3.5 mr-1" /> Upload</Button>
              <Button size="sm" variant="outline" data-testid="cinema-ai-generate"><Sparkles className="h-3.5 w-3.5 mr-1" /> AI Generate</Button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-800 border border-slate-200 group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/60 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-30"><Film className="w-24 h-24 text-slate-500" /></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <Badge className="w-fit mb-3 bg-purple-500 hover:bg-purple-600 text-white border-none">In Production</Badge>
              <h2 className="text-xl font-bold text-white mb-1">The Hidden Temples of Koh Ker</h2>
              <p className="text-slate-300 text-sm max-w-xl mb-4">An immersive 4K documentary exploring the ancient capital, enhanced with AI-generated historical reconstructions.</p>
              <div className="flex items-center gap-3">
                <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-200" data-testid="cinema-preview"><Play className="h-4 w-4 mr-1 fill-current" /> Preview</Button>
                <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> Preah Vihear Province</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Production Studio</CardTitle></CardHeader>
                <CardContent className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700"><Video className="mr-2 h-3.5 w-3.5 text-purple-500" /> Documentary Builder</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700"><Mic className="mr-2 h-3.5 w-3.5 text-emerald-500" /> Voiceover Studio</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700"><ImageIcon className="mr-2 h-3.5 w-3.5 text-blue-500" /> Smart Galleries</Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700"><Edit3 className="mr-2 h-3.5 w-3.5 text-amber-500" /> AI Video Editing</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Monetization</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Digital Rights Sold</span><span className="font-bold">124</span></div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full w-[65%]"></div></div>
                  </div>
                  <div className="flex justify-between text-xs"><span className="text-slate-500">Course Revenue</span><span className="font-bold text-emerald-600">$4,250</span></div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Assets & Stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Angkor Wat Sunrise Timelapse", type: "Stock Footage", status: "Published", price: "$49", rev: "$1,200" },
                  { title: "Khmer Cuisine Masterclass", type: "Course Module", status: "Draft", price: "$89", rev: "-" },
                  { title: "Kampot Pepper Farm Tour", type: "Interactive Story", status: "Published", price: "Free", rev: "$340 (Ads)" },
                ].map((asset, i) => (
                  <Card key={i} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="aspect-video bg-slate-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <ImageIcon className="h-6 w-6 text-slate-400 group-hover:scale-110 transition-transform" />
                      <Badge className={`absolute top-2 right-2 ${asset.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} border-none text-[10px]`}>{asset.status}</Badge>
                    </div>
                    <CardContent className="p-3">
                      <div className="text-[10px] text-purple-600 font-medium mb-0.5">{asset.type}</div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2 line-clamp-1">{asset.title}</h4>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="text-slate-500">License: {asset.price}</span>
                        <span className="text-emerald-600 font-medium">{asset.rev}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center py-2">
        <p className="text-xs text-slate-400">OnlineGuide.io — <span className="font-semibold text-slate-500">Creator Studio — Connecting Cultures with Loyalty and Truth</span></p>
      </div>
    </div>
  );
}
