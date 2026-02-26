import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Heart, 
  Globe, 
  Bot, 
  MessageSquare, 
  Map, 
  ShoppingBag, 
  Star,
  ArrowRight,
  ShieldCheck,
  Languages,
  BookOpen,
  Image as ImageIcon
} from "lucide-react";
import { Link } from "wouter";

export default function Product() {
  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/5">5-Layer National Tourism Intelligence Grid</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Sovereign Tourism <br /> <span className="text-primary">Intelligence Engine</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Integrating RDTB (Research & Development Tourism Bot) and AI AutoBot Real-Time Learning to own the Cambodia tourism data layer.
            </p>
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">AI Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Smart tourism engine to automate marketing, booking, and content for guides.</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-purple-400" /> AI Tour Generator</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-purple-400" /> WhatsApp Auto-Reply</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-purple-400" /> AI Itinerary Builder</li>
                </ul>
                <Link href="/dashboard/tools">
                  <Button variant="ghost" className="p-0 text-purple-600 hover:text-purple-700">Explore AI Tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center mb-4 border border-rose-100">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle className="text-2xl">GuideFund</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Financial empowerment for local guides through professional fundraising.</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-rose-400" /> Global Tourist Support</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-rose-400" /> Community Project Fund</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-rose-400" /> Certification Support</li>
                </ul>
                <Link href="/fundraising">
                  <Button variant="ghost" className="p-0 text-rose-600 hover:text-rose-700">View GuideFund <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Global Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Scalable network connecting influencers, hotels, and cultural storytellers.</p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-400" /> Multilingual Framework</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-400" /> Digital Postcard Project</li>
                  <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-blue-400" /> AI Guide Book</li>
                </ul>
                <Link href="/global/vision">
                  <Button variant="ghost" className="p-0 text-blue-600 hover:text-blue-700">Explore Vision <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Digital Content Ecosystem */}
          <div className="max-w-6xl mx-auto space-y-32">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary/20">Marketplace</Badge>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">Digital Content Marketplace</h2>
                <p className="text-lg text-slate-600">
                  Turn your expertise into passive income. Sell high-resolution photography, cultural ebooks, and educational courses to a global audience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-amber-500" />
                    <span className="font-medium text-slate-700">Photo Licensing</span>
                  </div>
                  <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="font-medium text-slate-700">Heritage Ebooks</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden h-80 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                <ShoppingBag className="h-32 w-32 text-white/10 absolute rotate-12" />
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Shopify Ready</h3>
                  <p className="text-slate-400">Global payments & automated delivery</p>
                </div>
              </div>
            </section>

            {/* AI Agent System */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
              <div className="lg:order-last space-y-6">
                <Badge variant="outline" className="text-purple-600 border-purple-200">Automation</Badge>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">Zapier AI Agent System</h2>
                <p className="text-lg text-slate-600">
                  Your smart digital assistant working 24/7. Automatically qualifies leads, books tours, and manages your social presence.
                </p>
                <ul className="space-y-3">
                  {['Sales Follow-up Agent', 'Tour Booking Agent', 'Review Growth Agent', 'Social Content Agent'].map((agent, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      {agent}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-200 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden">
                <Zap className="h-32 w-32 text-slate-400/20 absolute -bottom-10 -left-10" />
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 animate-bounce">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-bold text-slate-900">Agent Online</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
