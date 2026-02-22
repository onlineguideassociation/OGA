import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, MapPin, Zap, MessageSquare } from "lucide-react";

export default function AIGuideBook() {
  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/5">Living Intelligence</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">AI Guide Book of Cambodia</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              "Smart Knowledge. Sacred Heritage." An interactive, dynamic AI system that adapts to traveler needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto mb-24">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Temple Intelligence Modules</h2>
              <div className="space-y-6">
                <TempleModule 
                  title="Bayon Temple" 
                  theme="The Faces of Compassion"
                  features={["Symbolism interpretation", "King Jayavarman VII legacy", "Architectural storytelling"]}
                />
                <TempleModule 
                  title="Ta Prohm" 
                  theme="Nature & Spiritual Endurance"
                  features={["Ecology & conservation", "Tree-root symbolism", "Heritage context"]}
                />
              </div>
            </div>
            <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden relative">
              <div className="p-8 relative z-10">
                <Sparkles className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-6">Interactive AI Features</h3>
                <div className="space-y-6">
                  <FeatureItem 
                    icon={<Zap className="h-5 w-5 text-amber-400" />}
                    title="Real-time Guidance"
                    desc="Multilingual support delivered through messaging platforms."
                  />
                  <FeatureItem 
                    icon={<MapPin className="h-5 w-5 text-rose-400" />}
                    title="Adaptive Learning"
                    desc="Adapts cultural context based on traveler background and interests."
                  />
                  <FeatureItem 
                    icon={<MessageSquare className="h-5 w-5 text-blue-400" />}
                    title="Messaging API"
                    desc="Directly integrated with WhatsApp for 3 billion users."
                  />
                </div>
                <Button className="w-full mt-10 h-12 bg-primary hover:bg-primary/90">
                  Try Beta Experience
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TempleModule({ title, theme, features }: { title: string, theme: string, features: string[] }) {
  return (
    <Card className="hover:border-primary transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{theme}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" /> {f}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-100">{title}</h4>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}
