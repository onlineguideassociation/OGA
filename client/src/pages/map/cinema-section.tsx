import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Film, Play, Video, Mic, Edit3, Image as ImageIcon, MapPin, Upload, Sparkles } from "lucide-react";

export default function CinemaSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Badge className="mb-2 bg-purple-500/20 text-purple-700 border-purple-500/30">Global Storytelling</Badge>
          <h1 className="text-2xl font-bold text-slate-900">Cultural Cinema Engine</h1>
          <p className="text-sm text-slate-500">Transforming guides into storytellers and destinations into cinematic narratives.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white"><Upload className="h-3.5 w-3.5 mr-1" /> Upload</Button>
          <Button size="sm" variant="outline"><Sparkles className="h-3.5 w-3.5 mr-1" /> AI Generate</Button>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-800 border border-slate-200 group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/60 to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <Film className="w-24 h-24 text-slate-500" />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
          <Badge className="w-fit mb-3 bg-purple-500 hover:bg-purple-600 text-white border-none">In Production</Badge>
          <h2 className="text-xl font-bold text-white mb-1">The Hidden Temples of Koh Ker</h2>
          <p className="text-slate-300 text-sm max-w-xl mb-4">An immersive 4K documentary exploring the ancient capital, enhanced with AI-generated historical reconstructions.</p>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-200">
              <Play className="h-4 w-4 mr-1 fill-current" /> Preview
            </Button>
            <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> Preah Vihear Province</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Production Studio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700">
                <Video className="mr-2 h-3.5 w-3.5 text-purple-500" /> Documentary Builder
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700">
                <Mic className="mr-2 h-3.5 w-3.5 text-emerald-500" /> Voiceover Studio
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700">
                <ImageIcon className="mr-2 h-3.5 w-3.5 text-blue-500" /> Smart Galleries
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-600 hover:text-purple-700">
                <Edit3 className="mr-2 h-3.5 w-3.5 text-amber-500" /> AI Video Editing
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monetization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Digital Rights Sold</span>
                  <span className="font-bold">124</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-[65%]"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Course Revenue</span>
                <span className="font-bold text-emerald-600">$4,250</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Assets & Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Angkor Wat Sunrise Timelapse", type: "Stock Footage", status: "Published", price: "$49", rev: "$1,200" },
              { title: "Khmer Cuisine Masterclass", type: "Course Module", status: "Draft", price: "$89", rev: "-" },
              { title: "Kampot Pepper Farm Tour", type: "Interactive Story", status: "Published", price: "Free", rev: "$340 (Ads)" }
            ].map((asset, i) => (
              <Card key={i} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-slate-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <ImageIcon className="h-6 w-6 text-slate-400 group-hover:scale-110 transition-transform" />
                  <Badge className={`absolute top-2 right-2 ${asset.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'} border-none text-[10px]`}>
                    {asset.status}
                  </Badge>
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
  );
}