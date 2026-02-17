import { Link, useLocation } from "wouter";
import { Search, Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-serif font-bold text-xl tracking-tight text-primary hover:opacity-90 transition-opacity">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </div>
            OnlineGuide.io
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
              Home
            </a>
          </Link>
          <Link href="/category/technology">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/category/technology") ? "text-primary" : "text-muted-foreground"}`}>
              Technology
            </a>
          </Link>
          <Link href="/category/business">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/category/business") ? "text-primary" : "text-muted-foreground"}`}>
              Business
            </a>
          </Link>
          <Link href="/category/lifestyle">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/category/lifestyle") ? "text-primary" : "text-muted-foreground"}`}>
              Lifestyle
            </a>
          </Link>
          <Link href="/category/education">
            <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/category/education") ? "text-primary" : "text-muted-foreground"}`}>
              Education
            </a>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search guides..." 
              className="pl-9 h-9 bg-secondary/50 border-transparent focus:bg-background transition-all"
            />
          </div>
          
          <Button variant="default" size="sm" className="hidden md:inline-flex">
            Subscribe
          </Button>

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
                  <a className="text-lg font-medium">Home</a>
                </Link>
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Categories</h4>
                  <Link href="/category/technology"><a className="text-base ml-2">Technology</a></Link>
                  <Link href="/category/business"><a className="text-base ml-2">Business</a></Link>
                  <Link href="/category/lifestyle"><a className="text-base ml-2">Lifestyle</a></Link>
                  <Link href="/category/education"><a className="text-base ml-2">Education</a></Link>
                </div>
                <div className="mt-4">
                  <Button className="w-full">Subscribe</Button>
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
    <footer className="bg-secondary/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-serif font-bold text-xl tracking-tight text-primary">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              OnlineGuide.io
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated knowledge for the modern professional. We help you master new skills with in-depth, expert-written guides.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/technology"><a className="hover:text-primary transition-colors">Technology</a></Link></li>
              <li><Link href="/category/business"><a className="hover:text-primary transition-colors">Business</a></Link></li>
              <li><Link href="/category/lifestyle"><a className="hover:text-primary transition-colors">Lifestyle</a></Link></li>
              <li><Link href="/category/education"><a className="hover:text-primary transition-colors">Education</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">Get the latest guides delivered to your inbox.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-background" />
              <Button>Join</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 OnlineGuide.io. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
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
