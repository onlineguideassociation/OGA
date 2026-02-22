import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Share2, Globe, BookOpen, Download } from "lucide-react";

export default function DigitalPostcards() {
  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/5">Digital Future</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Digital Temple Postcards</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              "Sacred Heritage. Digital Future." Transform Cambodia’s heritage into shareable global cultural assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            <PostcardCard title="Angkor Wat Sunrise" category="Spiritual Identity" />
            <PostcardCard title="The Faces of Bayon" category="Compassion" />
            <PostcardCard title="Ta Prohm Nature" category="Resilience" />
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 border shadow-sm">
            <h2 className="text-2xl font-bold mb-8 text-center">Inside Each Digital Postcard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AssetItem icon={<Globe className="h-6 w-6" />} label="Location Guide" />
              <AssetItem icon={<BookOpen className="h-6 w-6" />} label="Historical Summary" />
              <AssetItem icon={<ImageIcon className="h-6 w-6" />} label="Symbolic Meaning" />
              <AssetItem icon={<Share2 className="h-6 w-6" />} label="Social Sharing" />
            </div>
            <div className="mt-12 text-center">
              <Button className="h-12 px-8 bg-primary text-white text-lg font-bold">
                Download Collection Beta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function PostcardCard({ title, category }: { title: string, category: string }) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all">
      <div className="h-48 bg-slate-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <ImageIcon className="h-12 w-12 opacity-20" />
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm border-none">{category}</Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1"><Download className="h-4 w-4 mr-2" /> Save</Button>
        <Button size="sm" variant="outline" className="flex-1"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
      </CardContent>
    </Card>
  );
}

function AssetItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="text-center space-y-2">
      <div className="h-12 w-12 rounded-xl bg-slate-50 text-primary flex items-center justify-center mx-auto border">{icon}</div>
      <div className="text-sm font-bold text-slate-900">{label}</div>
    </div>
  );
}
