import { Link, useLocation } from "wouter";
import { Menu, X, Zap, BarChart, Code, MapPin, LayoutDashboard, ChevronDown, Bot, Heart, Network, Globe, MessageSquare, Wand2, FileText } from "lucide-react";
import { useState } from "react";
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
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-90 transition-opacity cursor-pointer">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            OnlineGuide.io
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer outline-none">
              Platform <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-4">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Core Features</DropdownMenuLabel>
              <Link href="/dashboard/tools">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Bot className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-bold">AI Tools</div>
                    <div className="text-xs text-muted-foreground">Review Assistant & Tour Gen</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Growth Tools</DropdownMenuLabel>
              <Link href="/fundraising">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Heart className="h-5 w-5 text-rose-600 mt-0.5" />
                  <div>
                    <div className="font-bold">GuideFund</div>
                    <div className="text-xs text-muted-foreground">Creator funding platform</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Network</DropdownMenuLabel>
              <Link href="/association">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Network className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Association</div>
                    <div className="text-xs text-muted-foreground">Official OGA Network</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/global/vision">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Globe className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Global Vision</div>
                    <div className="text-xs text-muted-foreground">3B travel lovers mission</div>
                  </div>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/pricing">
            <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive("/pricing") ? "text-primary" : "text-muted-foreground"}`}>
              Pricing
            </span>
          </Link>
          <Link href="/dashboard">
            <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}>
              Dashboard
            </span>
          </Link>
          <Link href="/product">
            <span className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${isActive("/product") ? "text-primary" : "text-muted-foreground"}`}>
              Resources
            </span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="hidden md:inline-block text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer">
              Log in
            </span>
          </Link>
          <Link href="/dashboard">
            <Button variant="default" size="sm" className="hidden md:inline-flex">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu */}
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
                  <Link href="/dashboard/tools"><span className="block text-lg font-medium">AI Tools</span></Link>
                  <Link href="/fundraising"><span className="block text-lg font-medium">GuideFund</span></Link>
                  <Link href="/association"><span className="block text-lg font-medium">Association</span></Link>
                  <Link href="/global/vision"><span className="block text-lg font-medium">Global Vision</span></Link>
                </div>
                <Link href="/pricing">
                  <span className="text-lg font-medium cursor-pointer">Pricing</span>
                </Link>
                <Link href="/dashboard">
                  <span className="text-lg font-medium cursor-pointer">Dashboard</span>
                </Link>
                <Link href="/product">
                  <span className="text-lg font-medium cursor-pointer">Resources</span>
                </Link>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/login">
                    <Button variant="outline" className="w-full mb-2">Log in</Button>
                  </Link>
                  <Link href="/dashboard">
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
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Zap className="h-5 w-5" />
              </div>
              OnlineGuide.io
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official platform of the <strong>Online Guide Association (OGA)</strong>. Empowering local guides in Siem Reap & Phnom Penh through digital infrastructure and community support.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard/tools" className="hover:text-primary transition-colors">AI Tools</Link></li>
              <li><Link href="/fundraising" className="hover:text-primary transition-colors">GuideFund</Link></li>
              <li><Link href="/association" className="hover:text-primary transition-colors">OGA Network</Link></li>
              <li><Link href="/global/vision" className="hover:text-primary transition-colors">Global Vision</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
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
