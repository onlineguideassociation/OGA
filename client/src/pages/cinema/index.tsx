import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Play, Video, Mic, Edit3, Image as ImageIcon, MapPin, Upload, Sparkles } from "lucide-react";

export default function CulturalCinema() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">Global Storytelling Infrastructure</Badge>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Cultural Cinema Engine</h1>
              <p className="text-lg text-slate-400">Transforming guides into storytellers and destinations into cinematic narratives.</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white"><Upload className="h-4 w-4 mr-2" /> Upload Assets</Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800"><Sparkles className="h-4 w-4 mr-2" /> AI Generate</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-slate-900 border-slate-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Production Studio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <Video className="mr-2 h-4 w-4 text-purple-400" /> Documentary Builder
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <Mic className="mr-2 h-4 w-4 text-emerald-400" /> Voiceover Studio
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <ImageIcon className="mr-2 h-4 w-4 text-blue-400" /> Smart Galleries
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                    <Edit3 className="mr-2 h-4 w-4 text-amber-400" /> AI Video Editing
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Monetization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Digital Rights Sold</span>
                      <span className="font-bold text-white">124</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full">
                      <div className="bg-emerald-500 h-2 rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Course Revenue</span>
                      <span className="font-bold text-emerald-400">$4,250</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-8">
              {/* Featured Project */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800 border border-slate-700 group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                
                {/* Mock Video Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <Film className="w-32 h-32 text-slate-600" />
                </div>

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <Badge className="w-fit mb-4 bg-purple-500 hover:bg-purple-600 text-white border-none">In Production</Badge>
                  <h2 className="text-3xl font-bold text-white mb-2">The Hidden Temples of Koh Ker</h2>
                  <p className="text-slate-300 max-w-2xl mb-6">An immersive 4K documentary exploring the ancient capital, enhanced with AI-generated historical reconstructions.</p>
                  <div className="flex items-center gap-4">
                    <Button className="bg-white text-slate-900 hover:bg-slate-200">
                      <Play className="h-5 w-5 mr-2 fill-current" /> Preview Edit
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="h-4 w-4" /> Preah Vihear Province
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Library */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Recent Assets & Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Angkor Wat Sunrise Timelapse", type: "Stock Footage", status: "Published", price: "$49", rev: "$1,200" },
                    { title: "Khmer Cuisine Masterclass", type: "Course Module", status: "Draft", price: "$89", rev: "-" },
                    { title: "Kampot Pepper Farm Tour", type: "Interactive Story", status: "Published", price: "Free", rev: "$340 (Ads)" }
                  ].map((asset, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800 hover:border-purple-500/50 transition-colors cursor-pointer group">
                      <div className="aspect-video bg-slate-800 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                        <ImageIcon className="h-8 w-8 text-slate-600 group-hover:scale-110 transition-transform" />
                        <Badge className={`absolute top-2 right-2 ${asset.status === 'Published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'} border-none`}>
                          {asset.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="text-xs text-purple-400 font-medium mb-1">{asset.type}</div>
                        <h4 className="font-bold text-white mb-3 line-clamp-1">{asset.title}</h4>
                        <div className="flex justify-between text-sm pt-3 border-t border-slate-800">
                          <span className="text-slate-400">License: {asset.price}</span>
                          <span className="text-emerald-400 font-medium">{asset.rev}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}