import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Upload, DollarSign, Eye, Download, Share2, Tag } from "lucide-react";
import { useState } from "react";

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

export default function MediaSection() {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(mockMedia[0]);
  const [filterType, setFilterType] = useState<"all" | "photo" | "video">("all");

  const filteredMedia = filterType === "all" ? mockMedia : mockMedia.filter(m => m.type === filterType);
  const totalEarnings = mockMedia.reduce((sum, m) => sum + m.earnings, 0);
  const totalViews = mockMedia.reduce((sum, m) => sum + m.views, 0);
  const totalDownloads = mockMedia.reduce((sum, m) => sum + m.downloads, 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ImageIcon className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-bold text-slate-900">AI Content Generator</h1>
        </div>
        <p className="text-sm text-slate-500">Capture, monetize, and manage cultural content with AI auto-tagging</p>
      </div>

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
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-bold">{item.val}</span>
                    </div>
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
  );
}