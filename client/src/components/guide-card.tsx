import { Link } from "wouter";
import { Clock, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Guide } from "@/lib/data";

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guide/${guide.id}`}>
      <a className="block h-full group">
        <Card className="h-full overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <img 
              src={guide.image} 
              alt={guide.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-medium uppercase tracking-wider text-foreground hover:bg-background">
                {guide.category}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="space-y-2 p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {guide.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {guide.readTime}
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {guide.title}
            </h3>
          </CardHeader>
          
          <CardContent className="p-5 pt-0 flex-grow">
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {guide.excerpt}
            </p>
          </CardContent>
          
          <CardFooter className="p-5 pt-0 mt-auto">
            <div className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read Guide &rarr;
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
