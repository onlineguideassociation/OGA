import { Layout } from "@/components/layout";
import { GuideCard } from "@/components/guide-card";
import { categories, guides } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  const featuredGuides = guides.slice(0, 3);
  const recentGuides = guides.slice(3, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-slate-50 border-b">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Expert Knowledge, Simplified
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Master new skills with <br className="hidden md:block"/> curated online guides.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            High-quality, step-by-step tutorials and resources to help you level up in technology, business, and life.
          </p>
          
          <div className="w-full max-w-lg relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <Input 
                className="w-full pl-12 h-12 text-base shadow-lg border-slate-200 rounded-full focus-visible:ring-primary" 
                placeholder="What do you want to learn today?" 
              />
              <Button className="absolute right-1.5 top-1.5 rounded-full px-6 h-9">
                Search
              </Button>
            </div>
            <div className="mt-4 flex gap-4 justify-center text-sm text-slate-500">
              <span>Popular:</span>
              <a href="#" className="hover:text-primary underline decoration-slate-300 underline-offset-4">React</a>
              <a href="#" className="hover:text-primary underline decoration-slate-300 underline-offset-4">Investing</a>
              <a href="#" className="hover:text-primary underline decoration-slate-300 underline-offset-4">Productivity</a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground">Explore our comprehensive libraries.</p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="hidden md:flex gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.id}`}>
                <a className="group block relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{cat.count} Guides</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 p-8 object-contain mix-blend-multiply opacity-80"
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent / Call to Action */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Latest Updates</h2>
              <div className="space-y-6">
                {recentGuides.map((guide) => (
                  <Link key={guide.id} href={`/guide/${guide.id}`}>
                    <a className="flex flex-col sm:flex-row gap-6 group p-4 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-full sm:w-48 aspect-[16/10] sm:aspect-square rounded-lg overflow-hidden flex-shrink-0">
                        <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 py-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span className="uppercase tracking-wider font-semibold text-primary">{guide.category}</span>
                          <span>•</span>
                          <span>{guide.date}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900 text-slate-50 rounded-2xl p-8 sticky top-24">
                <h3 className="font-serif text-2xl font-bold mb-4">Newsletter</h3>
                <p className="text-slate-300 mb-6">Get the best guides delivered to your inbox weekly. No spam, just knowledge.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="Your email address" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" />
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">Subscribe</Button>
                </form>
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <p className="text-xs text-slate-500 text-center uppercase tracking-widest">Trusted by 10,000+ Learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
