import { Link, useLocation } from "wouter";
import { Menu, X, Zap, BarChart, Code, MapPin, LayoutDashboard, ChevronDown, Bot, Heart, Network, Globe, MessageSquare, Wand2, FileText, TrendingUp, Microscope, ShieldCheck, BookOpen, Building2, Bitcoin, Wifi, Users } from "lucide-react";
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
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity cursor-pointer">
            <img src="/logo.png" alt="OnlineGuide.io" className="h-8 w-auto" />
            <span className="text-[#C1121F]">Online</span>
            <span className="text-[#0081C9]">Guide.io</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer outline-none">
                Platform <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px] p-4">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Foundation</DropdownMenuLabel>
              <Link href="/dashboard">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <LayoutDashboard className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Overview</div>
                    <div className="text-xs text-muted-foreground">Main management console</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/graph">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Network className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Knowledge Graph</div>
                    <div className="text-xs text-muted-foreground">Visualize ecosystem relationships</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/products">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <BookOpen className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Cultural Archive</div>
                    <div className="text-xs text-muted-foreground">Digital heritage preservation</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Intelligence</DropdownMenuLabel>
              <Link href="/dashboard/tools">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Bot className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-bold">AI Guide Assistant</div>
                    <div className="text-xs text-muted-foreground">Smart heritage education</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/rdtb">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Microscope className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Research & Insights</div>
                    <div className="text-xs text-muted-foreground">Cultural truth & sensing layer</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Network</DropdownMenuLabel>
              <Link href="/association">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Network className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Guide Association</div>
                    <div className="text-xs text-muted-foreground">Official OGA Network</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/global/vision">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Globe className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Global Community</div>
                    <div className="text-xs text-muted-foreground">World Loyalty Alliance</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Trust & Growth</DropdownMenuLabel>
              <Link href="/dashboard/investor">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Stewardship Intelligence</div>
                    <div className="text-xs text-muted-foreground">Transparency & Impact reports</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/fundraising">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Heart className="h-5 w-5 text-rose-600 mt-0.5" />
                  <div>
                    <div className="font-bold">GuideFund</div>
                    <div className="text-xs text-muted-foreground">Supporting cultural truth</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Core Modules</DropdownMenuLabel>
              <Link href="/marketplace">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Zap className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Marketplace</div>
                    <div className="text-xs text-muted-foreground">E-commerce & dropshipping</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/dropshipping">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Dropshipping</div>
                    <div className="text-xs text-muted-foreground">E-commerce Automation</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/erp">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <BarChart className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <div className="font-bold">ERP Dashboard</div>
                    <div className="text-xs text-muted-foreground">Unified management console</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/travel">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Travel OS</div>
                    <div className="text-xs text-muted-foreground">AI itineraries & guides</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/hotels">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Global Hotels</div>
                    <div className="text-xs text-muted-foreground">Accommodation search</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/restaurants">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Dining & Loyalty</div>
                    <div className="text-xs text-muted-foreground">Restaurant bookings & POS</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/finance">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <BarChart className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Finance AI</div>
                    <div className="text-xs text-muted-foreground">Revenue & investment tracking</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/hospitality">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Hospitality Tech</div>
                    <div className="text-xs text-muted-foreground">PMS & Channel Manager</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/media">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Code className="h-5 w-5 text-pink-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Media Ecosystem</div>
                    <div className="text-xs text-muted-foreground">Photo/video monetization</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/crypto">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Bitcoin className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <div className="font-bold">Crypto & DeFi</div>
                    <div className="text-xs text-muted-foreground">Portfolio & tokenomics</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/connectivity">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Wifi className="h-5 w-5 text-cyan-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Connectivity</div>
                    <div className="text-xs text-muted-foreground">Network & Cyber Autobot</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/hr">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-bold">HR & Networking</div>
                    <div className="text-xs text-muted-foreground">Talent & skill analysis</div>
                  </div>
                </DropdownMenuItem>
              </Link>
              <Link href="/autobot">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <Bot className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="font-bold">Autobot Workspace</div>
                    <div className="text-xs text-muted-foreground">Multi-model AI console</div>
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
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Resources</h4>
                  <Link href="/dashboard"><span className="block text-lg font-medium">Dashboard</span></Link>
                  <Link href="/dashboard/tools"><span className="block text-lg font-medium">AI Tools</span></Link>
                  <Link href="/fundraising"><span className="block text-lg font-medium">GuideFund</span></Link>
                  <Link href="/association"><span className="block text-lg font-medium">Association</span></Link>
                  <Link href="/events"><span className="block text-lg font-medium">Events</span></Link>
                  <Link href="/cinema"><span className="block text-lg font-medium">Cultural Cinema</span></Link>
                  <Link href="/global/vision"><span className="block text-lg font-medium">Global Vision</span></Link>
                </div>
                <Link href="/pricing">
                  <span className="text-lg font-medium cursor-pointer">Pricing</span>
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
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <img src="/logo.png" alt="OnlineGuide.io" className="h-8 w-auto" />
              <span className="text-[#C1121F]">Online</span>
              <span className="text-[#0081C9]">Guide.io</span>
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
              <li><Link href="/events" className="hover:text-primary transition-colors">Industry Events</Link></li>
              <li><Link href="/cinema" className="hover:text-primary transition-colors">Cultural Cinema</Link></li>
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
