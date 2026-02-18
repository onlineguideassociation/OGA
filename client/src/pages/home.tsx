import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Code, Globe, MessageSquare, Map, BarChart3, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import saasHero from "../assets/saas-hero.png";
import sdkFeature from "../assets/sdk-feature.png";
import aiFeature from "../assets/ai-feature.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in zoom-in duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: AI Review Reply Assistant is live
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-5xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            The Digital Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Local Tourism</span> <br className="hidden md:block" /> Built for Guides, by Guides.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            A simple, WhatsApp-first operating system for tour guides and drivers in Cambodia. Manage bookings, generate marketing content, and grow your business with tools designed for the real world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base">
                Start Building for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              View Documentation
            </Button>
          </div>

          <div className="relative max-w-5xl mx-auto rounded-xl border bg-slate-50/50 p-2 shadow-2xl animate-in fade-in zoom-in duration-1000 delay-300">
            <img 
              src={saasHero} 
              alt="Platform Dashboard" 
              className="rounded-lg shadow-sm w-full border"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Toolkit for Growth</h2>
            <p className="text-lg text-slate-600">Everything you need to market, manage, and scale your tourism business in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Code className="h-6 w-6 text-blue-600" />}
              title="Booking & Lead SDK"
              description="Embeddable booking widgets and lead capture forms that sync directly to your CRM."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6 text-purple-600" />}
              title="AI Content Generator"
              description="Generate SEO-optimized tour descriptions, social posts, and ad copy in seconds."
            />
            <FeatureCard 
              icon={<Globe className="h-6 w-6 text-indigo-600" />}
              title="Social Auto-Poster"
              description="Schedule and auto-publish content to Facebook, Instagram, and TikTok."
            />
            <FeatureCard 
              icon={<Map className="h-6 w-6 text-emerald-600" />}
              title="Map Ranking Booster"
              description="Tools to optimize your Google Maps presence and manage local citations."
            />
          </div>
        </div>
      </section>

      {/* Deep Dive: SDK */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
            <Badge variant="secondary" className="text-blue-600 bg-blue-50 hover:bg-blue-100">WhatsApp-First Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              The Digital Infrastructure for <br /> Cambodia's Tour Guides.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Built for real guides in Siem Reap and Phnom Penh. Not marketers. Not developers. Our SDK allows you to drop booking engines and WhatsApp buttons into any site in seconds.
            </p>
            
            <ul className="space-y-4">
              {['Optimized for Angkor Wat tour operators', 'WhatsApp & Telegram direct sync', 'Mobile-first CRM for drivers', 'White-label ready for local agencies'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline">Read API Docs</Button>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50" />
              <img src={sdkFeature} alt="SDK Code Snippet" className="relative rounded-xl shadow-2xl border" />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: AI Tools */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="flex-1 space-y-8">
              <Badge variant="secondary" className="text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20">AI Powerhouse</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Your 24/7 Digital <br /> Marketing Assistant
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Stop staring at a blank screen. Our AI models are fine-tuned on high-converting tourism copy to generate assets that sell.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Star className="h-4 w-4 text-yellow-400" /> Review Reply</h4>
                  <p className="text-sm text-slate-400">Draft empathetic, professional responses to TripAdvisor and Google reviews instantly.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Map className="h-4 w-4 text-green-400" /> Itinerary Gen</h4>
                  <p className="text-sm text-slate-400">Create detailed day-by-day itineraries for any destination based on user preferences.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl opacity-50" />
              <img src={aiFeature} alt="AI Tools Interface" className="relative rounded-xl shadow-2xl border border-slate-700" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-all duration-200">
      <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center mb-4 border">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
