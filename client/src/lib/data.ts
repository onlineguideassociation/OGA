import { Share2, Clock, ThumbsUp, User } from "lucide-react";

// Import generated assets
import techImg from "../assets/cat-tech.png";
import businessImg from "../assets/cat-business.png";
import lifestyleImg from "../assets/cat-lifestyle.png";
import eduImg from "../assets/cat-edu.png";

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  likes: number;
  image: string;
  content: string; // HTML content for simplicity in mockup
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export const features = [
  {
    id: "autobot",
    title: "AI AutoBot Intelligence",
    description: "Real-time global travel forum mining across TripAdvisor, Reddit, and TikTok to detect emerging demand signals.",
    icon: "Bot"
  },
  {
    id: "vibe",
    title: "AI Vibe Code Agent",
    description: "Emotional & cultural signal engine that automatically adjusts creative assets based on destination mood.",
    icon: "Wand2"
  },
  {
    id: "web3",
    title: "Web3 Automation",
    description: "Smart contract escrow and automatic revenue splits on Polygon for transparent, instant settlement.",
    icon: "Network"
  },
  {
    id: "rdtb",
    title: "Reputation Defense",
    description: "RDTB monitoring grid to validate sentiment and flag misinformation across the national tourism layer.",
    icon: "Microscope"
  },
  {
    id: "sovereign",
    title: "Sovereign Data Layer",
    description: "API-first, open-core infrastructure providing high-fidelity tourism intelligence for government and SMEs.",
    icon: "Globe"
  },
  {
    id: "monetization",
    title: "Monetization Engine",
    description: "Self-optimizing AI SEM agents scaling ROI across Google, Meta, and TikTok automatically.",
    icon: "BarChart3"
  }
];

export const categories: Category[] = [
  {
    id: "technology",
    name: "Technology",
    description: "Master the latest tools, frameworks, and digital skills.",
    image: techImg,
    count: 124
  },
  {
    id: "business",
    name: "Business",
    description: "Strategies for startups, finance, and professional growth.",
    image: businessImg,
    count: 85
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Guides for health, travel, wellness, and productivity.",
    image: lifestyleImg,
    count: 62
  },
  {
    id: "education",
    name: "Education",
    description: "Academic resources, study tips, and learning hacks.",
    image: eduImg,
    count: 93
  }
];

export const guides: Guide[] = [
  {
    id: "1",
    title: "The Complete Guide to Modern Web Development in 2025",
    excerpt: "Everything you need to know about the current state of frontend frameworks, backend architecture, and deployment strategies.",
    category: "technology",
    author: "Sarah Jenkins",
    date: "Oct 12, 2024",
    readTime: "15 min read",
    likes: 1240,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    content: `
      <h2>Introduction</h2>
      <p>Web development is evolving at a rapid pace. What was standard practice just a few years ago is now considered legacy. In this comprehensive guide, we'll explore the modern stack.</p>
      
      <h3>1. The Frontend Ecosystem</h3>
      <p>React continues to dominate, but the way we write it has changed. Server Components are now the default in frameworks like Next.js, blurring the line between client and server.</p>
      
      <h3>2. Type Safety with TypeScript</h3>
      <p>TypeScript is no longer optional for serious projects. Its ability to catch errors at compile time saves countless hours of debugging.</p>
      
      <h3>3. CSS in 2025</h3>
      <p>Tailwind CSS v4 has revolutionized styling with its zero-runtime compiler and automatic content detection.</p>
    `
  },
  {
    id: "2",
    title: "Starting a Small Business: First Steps",
    excerpt: "A practical checklist for turning your side hustle into a legitimate business entity.",
    category: "business",
    author: "Michael Chen",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    likes: 850,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2070",
    content: "<p>Content placeholder...</p>"
  },
  {
    id: "3",
    title: "Digital Minimalism: Reclaiming Your Attention",
    excerpt: "How to use technology intentionally without letting it control your life.",
    category: "lifestyle",
    author: "Emma Wilson",
    date: "Oct 05, 2024",
    readTime: "10 min read",
    likes: 2100,
    image: "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?auto=format&fit=crop&q=80&w=2070",
    content: "<p>Content placeholder...</p>"
  },
  {
    id: "4",
    title: "Mastering Deep Work",
    excerpt: "Techniques to improve concentration and produce higher quality work in less time.",
    category: "education",
    author: "David Miller",
    date: "Oct 15, 2024",
    readTime: "12 min read",
    likes: 1543,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070",
    content: "<p>Content placeholder...</p>"
  },
  {
    id: "5",
    title: "Investment Basics for Beginners",
    excerpt: "Understanding stocks, bonds, and ETFs without getting overwhelmed by jargon.",
    category: "business",
    author: "James Peterson",
    date: "Sep 10, 2024",
    readTime: "20 min read",
    likes: 930,
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=2070",
    content: "<p>Content placeholder...</p>"
  },
  {
    id: "6",
    title: "Healthy Meal Prep on a Budget",
    excerpt: "Save time and money while eating nutritious meals throughout the week.",
    category: "lifestyle",
    author: "Lisa Torres",
    date: "Oct 01, 2024",
    readTime: "6 min read",
    likes: 3200,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2053",
    content: "<p>Content placeholder...</p>"
  }
];
