import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Upload, Zap, DollarSign, TrendingUp, Eye, Download, Share2, Tag } from "lucide-react";
import { useState } from "react";

interface MediaAsset {
  id: string;
  title: string;
  type: "photo" | "video";
  tags: string[];
  size: string;
  downloads: number;
  earnings: number;
  views: number;
  rating: number;
  thumbnail: string;
}

const mockMedia: MediaAsset[] = [
  {
    id: "m1",
    title: "Angkor Wat Sunrise 4K",
    type: "photo",
    tags: ["Temples", "Sunrise", "Architecture", "Landscape"],
    size: "45MB",
    downloads: 234,
    earnings: 892.34,
    views: 5420,
    rating: 4.9,
    thumbnail: "📸"
  },
  {
    id: "m2",
    title: "Khmer Traditional Dance Performance",
    type: "video",
    tags: ["Culture", "Dance", "Tradition", "Performance"],
    size: "280MB",
    downloads: 89,
    earnings: 1245.67,
    views: 3210,
    rating: 4.8,
    thumbnail: "🎥"
  },
  {
    id: "m3",
    title: "Floating Village Morning Mist",
    type: "photo",
    tags: ["Landscape", "Water", "Nature", "Tonle Sap"],
    size: "52MB",
    downloads: 156,
    earnings: 624.80,
    views: 2890,
    rating: 4.7,
    thumbnail: "🌅"
  },
  {
    id: "m4",
    title: "Street Food Cooking Masterclass",
    type: "video",
    tags: ["Food", "Culture", "Tutorial", "Cooking"],
    size: "320MB",
    downloads: 198,
    earnings: 1876.45,
    views: 6780,
    rating: 4.85,
    thumbnail: "🍲"
  },
  {
    id: "m5",
    title: "Royal Palace Gold Details",
    type: "photo",
    tags: ["Architecture", "Gold", "Royal", "Phnom Penh"],
    size: "38MB",
    downloads: 104,
    earnings: 456.23,
    views: 1920,
    rating: 4.6,
    thumbnail: "🏛️"
  },
  {
    id: "m6",
    title: "Night Markets & Street Life",
    type: "photo",
    tags: ["Street", "Night", "Markets", "Urban"],
    size: "48MB",
    downloads: 287,
    earnings: 1023.45,
    views: 7650,
    rating: 4.9,
    thumbnail: "🌃"
  }
];

export default function MediaModule() {
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(mockMedia[0]);
  const [filterType, setFilterType] = useState<"all" | "photo" | "video">("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const filteredMedia = filterType === "all"
    ? mockMedia
    : mockMedia.filter(m => m.type === filterType);

  const totalEarnings = mockMedia.reduce((sum, m) => sum + m.earnings, 0);
  const totalViews = mockMedia.reduce((sum, m) => sum + m.views, 0);
  const totalDownloads = mockMedia.reduce((sum, m) => sum + m.downloads, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="h-8 w-8 text-pink-600" />
              <h1 className="text-4xl font-bold text-slate-900">Media Ecosystem</h1>
            </div>
            <p className="text-slate-600">Capture, monetize, and manage your cultural content with AI auto-tagging</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Total Assets</p>
                    <p className="text-2xl font-bold">{mockMedia.length}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 text-pink-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Total Views</p>
                    <p className="text-2xl font-bold">{(totalViews / 1000).toFixed(1)}k</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Total Downloads</p>
                    <p className="text-2xl font-bold">{totalDownloads}</p>
                  </div>
                  <Download className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Total Earnings</p>
                    <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload & Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <Button
              onClick={() => setShowUploadDialog(true)}
              className="bg-pink-600 hover:bg-pink-700"
              data-testid="upload-media-button"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload Media
            </Button>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === "all"
                    ? "bg-pink-600 text-white"
                    : "bg-white/60 text-slate-600 hover:bg-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("photo")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === "photo"
                    ? "bg-pink-600 text-white"
                    : "bg-white/60 text-slate-600 hover:bg-white"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setFilterType("video")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterType === "video"
                    ? "bg-pink-600 text-white"
                    : "bg-white/60 text-slate-600 hover:bg-white"
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {/* Upload Dialog */}
          {showUploadDialog && (
            <Card className="bg-white/60 backdrop-blur mb-8 border-pink-200">
              <CardHeader>
                <CardTitle>Upload New Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 mb-2">Drag and drop your file here, or click to select</p>
                  <p className="text-sm text-slate-500 mb-4">Supported: JPG, PNG, MP4, MOV (Max 500MB)</p>
                  <input type="file" hidden id="file-upload" data-testid="file-input" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button as="span" variant="outline">Browse Files</Button>
                  </label>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Angkor Wat Sunrise"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Tags (AI will auto-generate)</label>
                    <input
                      type="text"
                      placeholder="temple, sunrise, landscape"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-pink-600 hover:bg-pink-700" data-testid="confirm-upload">
                    Upload & Publish
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowUploadDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Media Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {filteredMedia.map(media => (
                  <button
                    key={media.id}
                    onClick={() => setSelectedMedia(media)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      selectedMedia?.id === media.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-slate-200 bg-white hover:border-pink-300'
                    }`}
                    data-testid={`media-card-${media.id}`}
                  >
                    <div className="text-4xl mb-2">{media.thumbnail}</div>
                    <h3 className="font-semibold text-sm text-slate-900 line-clamp-2">{media.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {media.type === 'photo' ? '📸' : '🎥'} {media.type}
                      </Badge>
                      <span className="text-xs text-slate-500">⭐ {media.rating}</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-medium mt-2">${media.earnings.toFixed(2)} earned</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Details Panel */}
            <div>
              {selectedMedia && (
                <Card className="bg-white/60 backdrop-blur sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedMedia.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Performance</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Views</span>
                          <span className="font-bold">{selectedMedia.views}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Downloads</span>
                          <span className="font-bold">{selectedMedia.downloads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Earnings</span>
                          <span className="font-bold text-emerald-600">${selectedMedia.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                        <Tag className="h-4 w-4" /> AI Tags
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMedia.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700" data-testid="edit-media">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" data-testid="share-media">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-3 bg-blue-50 rounded text-sm text-blue-700">
                      <p className="font-medium mb-1">💡 Pro Tip</p>
                      <p>Videos earn {((1876.45 / 320) / (892.34 / 45) * 100).toFixed(0)}% more per MB. Consider creating video content!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
