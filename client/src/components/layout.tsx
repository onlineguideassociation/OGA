import { Link, useLocation } from "wouter";
import { Menu, MapPin, Bot, Map, Compass, Users, ShoppingBag, Sparkles, Plus, LogIn, CheckCircle, Globe, Mail, ChevronDown, X, ArrowRight } from "lucide-react";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface NavDropdownItem {
  href: string;
  label: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: NavDropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    items: [
      { href: "/map", label: "Booking Engine", description: "Direct reservations from your website" },
      { href: "/map", label: "Channel Manager", description: "Sync across 150+ travel platforms" },
      { href: "/map", label: "Property Management", description: "PMS for hotels, hostels & rentals" },
      { href: "/map", label: "AI Revenue Optimization", description: "Automated pricing & demand forecasting" },
      { href: "/map", label: "Guest Relationship (GRM)", description: "Track profiles, preferences & communication" },
      { href: "/map", label: "OnlineGuide POS", description: "Point-of-sale for restaurants & bars" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    items: [
      { href: "/tours-map", label: "Tour Discovery", description: "Find and book verified tours" },
      { href: "/map", label: "Analytics & Insights", description: "Business intelligence dashboards" },
      { href: "/map", label: "API Documentation", description: "Developer & integration resources" },
      { href: "/map", label: "Community", description: "Connect with hospitality professionals" },
      { href: "/map", label: "Blog & News", description: "Latest hospitality tech updates" },
    ],
  },
  {
    label: "About us",
    items: [
      { href: "/map", label: "Our Story", description: "Connecting cultures with loyalty and truth" },
      { href: "/map", label: "Trust & Safety", description: "Verified partners across 190+ countries" },
      { href: "/map", label: "Consultancy Services", description: "Revenue management & digital transformation" },
      { href: "/map", label: "Careers", description: "Join our global team" },
      { href: "/map", label: "Press", description: "Media & press resources" },
    ],
  },
  { label: "Contact", href: "/map" },
];

function NavDropdown({ items, isOpen, onClose }: { items: NavDropdownItem[]; isOpen: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {items.map((item) => (
        <Link key={item.label} href={item.href}>
          <span
            onClick={onClose}
            className="flex flex-col px-4 py-2.5 hover:bg-[#0081C9]/5 transition-colors cursor-pointer"
            data-testid={`dropdown-${item.label.toLowerCase().replace(/\s/g, "-")}`}
          >
            <span className="text-sm font-medium text-slate-800">{item.label}</span>
            {item.description && <span className="text-[11px] text-slate-400 mt-0.5">{item.description}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 z-50 w-full">
      {showBanner && (
        <div className="bg-[#0f172a] text-white" data-testid="announcement-bar">
          <div className="container mx-auto px-4 h-10 flex items-center justify-between">
            <p className="text-xs text-slate-300">
              Cloud-based travel technology for hotels, vacation rentals, hostels, and tourism businesses across 190+ countries.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white font-medium">
                <Globe className="h-3.5 w-3.5" /> Global
              </span>
              <a href="#" className="text-xs text-[#0081C9] font-semibold hover:text-[#00a1f9] transition-colors underline underline-offset-2" data-testid="link-change-territory">
                Change Territory
              </a>
              <button
                onClick={() => setShowBanner(false)}
                className="ml-2 text-slate-400 hover:text-white transition-colors"
                data-testid="btn-close-banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">
          <Link href="/">
            <span className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0" data-testid="link-logo">
              <img src="/logo.png" alt="OnlineGuide.io" className="h-8 w-auto" />
              <span className="text-[#C1121F]">Online</span>
              <span className="text-[#0081C9]">Guide.io</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" data-testid="nav-main">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = !!item.items;
              const isActive = item.href ? location === item.href : false;
              const isDropdownOpen = openDropdown === item.label;

              return (
                <div key={item.label} className="relative">
                  {hasDropdown ? (
                    <button
                      onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                        isDropdownOpen
                          ? "text-[#0081C9]"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link href={item.href || "/"}>
                      <span
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "text-[#0081C9]"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                        data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}
                  {hasDropdown && (
                    <NavDropdown
                      items={item.items!}
                      isOpen={isDropdownOpen}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link href="/login">
              <span className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer transition-colors" data-testid="nav-login">
                Login
              </span>
            </Link>
            <Link href="/map">
              <Button className="bg-[#C1121F] hover:bg-[#a30f1a] text-white font-semibold px-6 h-10 rounded-full shadow-md hover:shadow-lg transition-all" data-testid="nav-get-started">
                Get started
              </Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 font-bold text-lg p-5 border-b">
                  <img src="/logo.png" alt="OnlineGuide.io" className="h-6 w-auto" />
                  <span className="text-[#C1121F]">Online</span>
                  <span className="text-[#0081C9]">Guide.io</span>
                </div>
                <div className="flex-1 overflow-y-auto py-3">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      {item.items ? (
                        <div>
                          <div className="px-5 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
                          {item.items.map((sub) => (
                            <Link key={sub.label} href={sub.href}>
                              <span className="flex flex-col px-5 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer" data-testid={`mobile-nav-${sub.label.toLowerCase().replace(/\s/g, "-")}`}>
                                <span className="text-sm font-medium text-slate-700">{sub.label}</span>
                                {sub.description && <span className="text-[11px] text-slate-400">{sub.description}</span>}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link href={item.href || "/"}>
                          <span className="flex items-center px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer" data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t space-y-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-center gap-2 h-10 rounded-full" data-testid="mobile-login">
                      Login
                    </Button>
                  </Link>
                  <Link href="/map">
                    <Button className="w-full justify-center gap-2 bg-[#C1121F] hover:bg-[#a30f1a] h-10 rounded-full" data-testid="mobile-get-started">
                      Get started <ArrowRight className="h-4 w-4" />
                    </Button>
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
              OnlineGuide.io is a cloud-based travel technology platform and B2B network helping hotels, vacation rentals, hostels, travel agencies, and tourism businesses manage their sales, distribution, operations, and digital presence.
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
