import { Link, useLocation } from "wouter";
import { Menu, MapPin, Bot, Map, Compass, Users, ShoppingBag, Sparkles, Plus, LogIn } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS: { href: string; label: string; icon: React.ElementType }[] = [
  { href: "/", label: "Home", icon: Map },
  { href: "/tours-map", label: "Find Tours", icon: Compass },
  { href: "/map", label: "Knowledge Hub", icon: Sparkles },
  { href: "/map", label: "Destinations", icon: MapPin },
  { href: "/map", label: "Creators", icon: Users },
  { href: "/map", label: "Marketplace", icon: ShoppingBag },
  { href: "/map", label: "AI Planner", icon: Bot },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0" data-testid="link-logo">
            <img src="/logo.png" alt="OnlineGuide.io" className="h-7 w-auto" />
            <span className="text-[#C1121F]">Online</span>
            <span className="text-[#0081C9]">Guide.io</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" data-testid="nav-main">
          {NAV_LINKS.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.label} href={link.href}>
                <span
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#0081C9] bg-[#0081C9]/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link href="/login">
            <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors" data-testid="nav-sign-in">
              <LogIn className="h-4 w-4" /> Sign In
            </span>
          </Link>
          <Link href="/map">
            <Button size="sm" className="bg-[#0081C9] hover:bg-[#006ba3] text-white font-semibold px-4 h-9" data-testid="nav-add-listing">
              <Plus className="h-4 w-4 mr-1.5" /> Add Listing
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-1 mt-6">
              <div className="flex items-center gap-2 font-bold text-lg mb-4 px-2">
                <img src="/logo.png" alt="OnlineGuide.io" className="h-6 w-auto" />
                <span className="text-[#C1121F]">Online</span>
                <span className="text-[#0081C9]">Guide.io</span>
              </div>
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = location === link.href;
                return (
                  <Link key={link.label} href={link.href}>
                    <span
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#0081C9] bg-[#0081C9]/8"
                          : "text-muted-foreground hover:text-foreground hover:bg-slate-100"
                      }`}
                      data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" /> {link.label}
                    </span>
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t space-y-2 px-1">
                <Link href="/login">
                  <Button variant="outline" className="w-full justify-center gap-2" data-testid="mobile-sign-in">
                    <LogIn className="h-4 w-4" /> Sign In
                  </Button>
                </Link>
                <Link href="/map">
                  <Button className="w-full justify-center gap-2 bg-[#0081C9] hover:bg-[#006ba3]" data-testid="mobile-add-listing">
                    <Plus className="h-4 w-4" /> Add Listing
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <img src="/logo.png" alt="OnlineGuide.io" className="h-8 w-auto" />
              <span className="text-[#C1121F]">Online</span>
              <span className="text-[#0081C9]">Guide.io</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official platform of the <strong>Online Guide Association (OGA)</strong>. Connecting Cultures with Loyalty and Truth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/map" className="hover:text-primary transition-colors">Knowledge Hub</Link></li>
              <li><Link href="/tours-map" className="hover:text-primary transition-colors">Find Tours</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">AI Planner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/map" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">Creators</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">Tourism Flow</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/product" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 OnlineGuide.io. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
