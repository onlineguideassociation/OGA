import { Link, useLocation } from "wouter";
import { Menu, Zap, BarChart, MapPin, LayoutDashboard, ChevronDown, Bot, Heart, Network, Globe, MessageSquare, TrendingUp, BookOpen, Building2, Map } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity cursor-pointer">
            <img src="/logo.png" alt="OnlineGuide.io" className="h-8 w-auto" />
            <span className="text-[#C1121F]">Online</span>
            <span className="text-[#0081C9]">Guide.io</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer outline-none">
                Platform <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-4">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Core</DropdownMenuLabel>
              <Link href="/map">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Map className="h-5 w-5 text-[#0081C9] mt-0.5" />
                  <div>
                    <div className="font-bold">Knowledge Hub</div>
                    <div className="text-xs text-muted-foreground">All-in-One: Map, Hotels, Travel, AI & more</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <LayoutDashboard className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Dashboard</div>
                    <div className="text-xs text-muted-foreground">Analytics & management console</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Network & Trust</DropdownMenuLabel>
              <Link href="/association">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Network className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold">OGA Network</div>
                    <div className="text-xs text-muted-foreground">Online Guide Association</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/fundraising">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Heart className="h-5 w-5 text-rose-600 mt-0.5" />
                  <div>
                    <div className="font-bold">GuideFund</div>
                    <div className="text-xs text-muted-foreground">Support cultural tourism</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/global/vision">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Globe className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Global Vision</div>
                    <div className="text-xs text-muted-foreground">World Loyalty Alliance</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Business</DropdownMenuLabel>
              <Link href="/marketplace">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Zap className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Marketplace</div>
                    <div className="text-xs text-muted-foreground">E-commerce & dropshipping</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/investor">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Stewardship Intelligence</div>
                    <div className="text-xs text-muted-foreground">Transparency & impact reports</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Resources</DropdownMenuLabel>
              <Link href="/product">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <BookOpen className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Documentation</div>
                    <div className="text-xs text-muted-foreground">Infrastructure & API reference</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/community">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <MessageSquare className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Community</div>
                    <div className="text-xs text-muted-foreground">Forums, posts & discussions</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/pricing">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Pricing</div>
                    <div className="text-xs text-muted-foreground">Plans & subscription options</div>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="hidden md:inline-block text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">
              Log in
            </span>
          </Link>
          <Link href="/map">
            <Button variant="default" size="sm" className="hidden md:inline-flex">
              Get Started
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Platform</h4>
                  <Link href="/map"><span className="block text-lg font-medium">Knowledge Hub</span></Link>
                  <Link href="/dashboard"><span className="block text-lg font-medium">Dashboard</span></Link>
                  <Link href="/association"><span className="block text-lg font-medium">OGA Network</span></Link>
                  <Link href="/fundraising"><span className="block text-lg font-medium">GuideFund</span></Link>
                  <Link href="/global/vision"><span className="block text-lg font-medium">Global Vision</span></Link>
                  <Link href="/marketplace"><span className="block text-lg font-medium">Marketplace</span></Link>
                  <Link href="/community"><span className="block text-lg font-medium">Community</span></Link>
                </div>
                <Link href="/pricing">
                  <span className="text-lg font-medium cursor-pointer">Pricing</span>
                </Link>
                <Link href="/product">
                  <span className="text-lg font-medium cursor-pointer">Documentation</span>
                </Link>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/login">
                    <Button variant="outline" className="w-full mb-2">Log in</Button>
                  </Link>
                  <Link href="/map">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
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
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Network</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/association" className="hover:text-primary transition-colors">OGA Network</Link></li>
              <li><Link href="/fundraising" className="hover:text-primary transition-colors">GuideFund</Link></li>
              <li><Link href="/global/vision" className="hover:text-primary transition-colors">Global Vision</Link></li>
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
