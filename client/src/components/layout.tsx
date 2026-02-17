import { Link, useLocation } from "wouter";
import { Menu, X, Zap, BarChart, Code, MapPin, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary hover:opacity-90 transition-opacity">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            OnlineGuide.io
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
              Product
            </a>
          </Link>
          <Link href="/pricing">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/pricing") ? "text-primary" : "text-muted-foreground"}`}>
              Pricing
            </a>
          </Link>
          <Link href="/dashboard">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}>
              Dashboard
            </a>
          </Link>
          <Link href="/dashboard/tools">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard/tools") ? "text-primary" : "text-muted-foreground"}`}>
              AI Tools
            </a>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <a className="hidden md:inline-block text-sm font-medium text-muted-foreground hover:text-primary">
              Log in
            </a>
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
                <Link href="/">
                  <a className="text-lg font-medium">Product</a>
                </Link>
                <Link href="/pricing">
                  <a className="text-lg font-medium">Pricing</a>
                </Link>
                <Link href="/dashboard">
                  <a className="text-lg font-medium">Dashboard</a>
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
              The All-in-One Digital Marketing SDK for Tourism & Local Businesses. Powering the next generation of travel tech.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Booking SDK</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Content Generator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Review Assistant</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Map Booster</a></li>
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
