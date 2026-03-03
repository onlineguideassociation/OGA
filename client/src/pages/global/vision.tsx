import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Languages, Zap, MessageSquare, BookOpen, Image as ImageIcon, ArrowRight, Bot, Network, ShieldCheck, Microscope } from "lucide-react";
import { Link } from "wouter";

export default function GlobalVision() {
  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/5">Global Invitation</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Connecting 3 Billion Travel Lovers to Cambodia</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              OnlineGuide.io is building the Digital Tourism Infrastructure for the Future, bridging ancient civilization and global digital intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <FeatureCard 
              icon={<Globe className="h-6 w-6 text-[#C1121F]" />}
              title="Sovereign Geographic Core"
              desc="Tourism as civilizational memory architecture. Structured intelligence for Angkor Wat, Phnom Penh, and Sihanoukville."
            />
            <FeatureCard 
              icon={<Bot className="h-6 w-6 text-[#0081C9]" />}
              title="AI Tourism OS"
              desc="Global signal monitoring (TripAdvisor, TikTok, Reddit) converting emotional geography into national infrastructure."
            />
            <FeatureCard 
              icon={<Network className="h-6 w-6 text-[#2D9B51]" />}
              title="Web3 Economy"
              desc="Programmable tourism economy via OGT utility coin and smart contract revenue splits for guide stability."
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-24">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Platform Structural Core</h2>
                <div className="space-y-4">
                  <PillarItem title="Layer 0: Knowledge Graph" desc="The civilizational intelligence core mapping relationships between temples, guides, and signals." />
                  <PillarItem title="Layer 1: Geographic Core" desc="Structuring Angkor (Myth), Phnom Penh (Business), and Sihanoukville (Leisure) into data models." />
                  <PillarItem title="AI Tourism OS" desc="Connecting the ecosystem while detecting destination spikes and competitor trends globally." />
                  <PillarItem title="Digital Book Infra" desc="Treating books as structured assets that generate revenue through temple intelligence." />
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Globe className="h-40 w-40" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Global Goal</h3>
                <p className="text-slate-400 mb-8">Targeting 3 billion global audiences through strategic digital engagement channels.</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">Social Ecosystems</div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">Multilingual Platforms</div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">Digital Nomad Hubs</div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">Heritage Markets</div>
                </div>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-12">Next-Gen Cultural Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/global/ai-guide">
                  <Card className="cursor-pointer group hover:border-primary transition-all">
                    <CardHeader>
                      <BookOpen className="h-10 w-10 text-primary mb-4" />
                      <CardTitle>AI Guide Book</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">Smart Knowledge. Sacred Heritage. An interactive AI system for global education.</p>
                      <Button variant="ghost" className="group-hover:text-primary p-0">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/global/postcards">
                  <Card className="cursor-pointer group hover:border-primary transition-all">
                    <CardHeader>
                      <ImageIcon className="h-10 w-10 text-primary mb-4" />
                      <CardTitle>Digital Postcards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">Sacred Heritage. Digital Future. Transform heritage into global cultural assets.</p>
                      <Button variant="ghost" className="group-hover:text-primary p-0">Explore Project <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

function PillarItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-4 rounded-xl border bg-white shadow-sm">
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
