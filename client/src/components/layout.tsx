import { Link, useLocation } from "wouter";
import { Menu, MapPin, Bot, Map, Compass, Users, ShoppingBag, Sparkles, Plus, LogIn, CheckCircle, Globe, Mail, ChevronDown } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

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
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 409) {
        toast({ title: "Already subscribed!", description: "This email is already on our list." });
      } else if (res.ok) {
        toast({ title: "Subscribed!", description: "You'll receive travel deals and AI tips." });
        setEmail("");
      } else {
        toast({ title: "Failed to subscribe", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="mt-auto" style={{ background: "#0f172a" }} data-testid="footer">
      <div className="container mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 border-b border-slate-700/50">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">Join the Global Travel Community</h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              OnlineGuide.io helps travelers explore tours, culture, hotels, and experiences worldwide. Plan smarter trips, discover authentic places, and share reviews with the global travel community.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#22c55e]" /> Get Travel Deals & AI Tips
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/20"
                data-testid="input-footer-email"
              />
              <Button
                size="sm"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-4 h-9"
                onClick={handleSubscribe}
                disabled={subscribing}
                data-testid="btn-footer-subscribe"
              >
                {subscribing ? "..." : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-10">
          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">About OnlineGuide.io</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Press</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Investor Relations</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Technology Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tours-map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Find Tours</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Hotels</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Restaurants</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Travel Stories</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Traveler Reviews</a></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Top Destinations</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Travel Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">Contribute</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Write a Review</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Add a Place</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Upload Photos</a></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Join the Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">Do Business With Us</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">List Your Tours</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Hotel Partners</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Business Advertising</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Sponsored Listings</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">API for Developers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">OnlineGuide Network</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/tours-map" className="text-slate-400 hover:text-[#22c55e] transition-colors">OnlineGuide Maps</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Knowledge Hub</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Creator Media</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">AI Travel Assistant</Link></li>
              <li><Link href="/map" className="text-slate-400 hover:text-[#22c55e] transition-colors">Digital Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#22c55e] mb-4">Get the App</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">iPhone App</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#22c55e] transition-colors">Android App</a></li>
            </ul>
            <h4 className="text-sm font-semibold text-white mb-3">Trust Signals</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400"><CheckCircle className="h-3 w-3 text-[#22c55e]" /> Verified Tours</li>
              <li className="flex items-center gap-1.5 text-slate-400"><CheckCircle className="h-3 w-3 text-[#22c55e]" /> Secure Booking</li>
              <li className="flex items-center gap-1.5 text-slate-400"><CheckCircle className="h-3 w-3 text-[#22c55e]" /> AI Travel Planning</li>
              <li className="flex items-center gap-1.5 text-slate-400"><CheckCircle className="h-3 w-3 text-[#22c55e]" /> Community Reviews</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="OnlineGuide.io" className="h-6 w-auto opacity-70" />
              <p className="text-xs text-slate-500">&copy; 2026 OnlineGuide.io &mdash; Global AI Tourism Platform</p>
            </div>

            <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500">
              <a href="#" className="hover:text-[#22c55e] transition-colors">Terms of Use</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-[#22c55e] transition-colors">Privacy Policy</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-[#22c55e] transition-colors">Cookies Policy</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-[#22c55e] transition-colors">How the Platform Works</a>
              <span className="text-slate-700">|</span>
              <a href="#" className="hover:text-[#22c55e] transition-colors">Accessibility</a>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3 w-3" /> English
                <ChevronDown className="h-3 w-3" />
              </span>
              <span className="flex items-center gap-1.5">
                $ USD
                <ChevronDown className="h-3 w-3" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-800">
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">Twitter</a>
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">Facebook</a>
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">Instagram</a>
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">YouTube</a>
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">LinkedIn</a>
            <a href="#" className="text-slate-500 hover:text-[#22c55e] transition-colors text-xs">TikTok</a>
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
