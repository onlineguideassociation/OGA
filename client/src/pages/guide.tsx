import { Layout } from "@/components/layout";
import { guides } from "@/lib/data";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Calendar, Share2, ThumbsUp, User } from "lucide-react";
import { Link } from "wouter";

export default function GuidePage() {
  const [match, params] = useRoute("/guide/:id");
  const guideId = params?.id;
  
  const guide = guides.find(g => g.id === guideId);

  if (!guide) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="min-h-screen pb-20">
        {/* Header */}
        <div className="bg-slate-50 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
            <Link href={`/category/${guide.category}`}>
              <a className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 mb-6 transition-colors uppercase tracking-wider">
                <ArrowLeft className="h-4 w-4 mr-1" /> {guide.category}
              </a>
            </Link>
            
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {guide.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {guide.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{guide.author}</div>
                  <div className="text-xs">Author</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {guide.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {guide.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
             <img 
              src={guide.image} 
              alt={guide.title}
              className="w-full aspect-video object-cover rounded-xl mb-8 shadow-sm"
            />
            
            {/* Injecting HTML content safely for mockup */}
            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
            
            {/* Additional mockup content to make the page feel full */}
            <h3>4. Modern Backend Solutions</h3>
            <p>
              Gone are the days of manually provisioning servers. Platforms like Replit and Vercel allow you to deploy full-stack applications with a single click.
              Focus on your business logic, not infrastructure.
            </p>
            <ul>
              <li><strong>Serverless Functions:</strong> Run code on demand without managing servers.</li>
              <li><strong>Edge Computing:</strong> Execute code closer to your users for lower latency.</li>
              <li><strong>Managed Databases:</strong> PostgreSQL and scalable KV stores are now commodities.</li>
            </ul>
            
            <blockquote>
              "The best code is the code you don't have to write. Leverage the ecosystem."
            </blockquote>

            <h3>Conclusion</h3>
            <p>
              The landscape of web development is vast, but with the right guide, it is navigable. 
              Start small, build consistently, and never stop learning.
            </p>
          </div>

          {/* Sidebar */}
          <div className="hidden md:block space-y-8 sticky top-24 h-fit">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">Actions</h4>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ThumbsUp className="h-4 w-4" /> Like Guide ({guide.likes})
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border">
              <h4 className="font-serif font-bold text-lg mb-4">Table of Contents</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors block">1. The Frontend Ecosystem</a></li>
                <li><a href="#" className="hover:text-primary transition-colors block">2. Type Safety with TypeScript</a></li>
                <li><a href="#" className="hover:text-primary transition-colors block">3. CSS in 2025</a></li>
                <li><a href="#" className="hover:text-primary transition-colors block">4. Modern Backend Solutions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
