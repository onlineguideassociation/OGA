import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, BookOpen, Camera, Video, Download, ExternalLink, Plus } from "lucide-react";

export default function DigitalProducts() {
  const products = [
    {
      id: 1,
      title: "High-Res Angkor Sunrise Collection",
      type: "Photo Pack",
      icon: <Camera className="h-5 w-5" />,
      price: "$25",
      description: "20 professional high-resolution shots of Angkor Wat at sunrise. Perfect for blogs or print.",
      sales: 12,
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Hidden Meanings of Angkor Wat",
      type: "Ebook",
      icon: <BookOpen className="h-5 w-5" />,
      price: "$19",
      description: "A deep dive into Hindu cosmology and the symbolism of the Khmer Empire.",
      sales: 8,
      badge: "Expert Choice"
    },
    {
      id: 3,
      title: "Siem Reap Smart Guide 2026",
      type: "Digital Guide",
      icon: <ExternalLink className="h-5 w-5" />,
      price: "$9",
      description: "Everything you need to know about navigating Siem Reap like a pro.",
      sales: 45,
    },
    {
      id: 4,
      title: "Angkor Symbolism Audio Guide",
      type: "Audio",
      icon: <Video className="h-5 w-5" />,
      price: "$15",
      description: "60-minute audio walk-through of the main temple complex.",
      sales: 5,
    }
  ];

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Store</h2>
          <nav className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" /> All Products
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" /> My Orders
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Digital Product System</h1>
                <p className="text-slate-500">Manage and sell your digital knowledge and assets.</p>
              </div>
              <Button className="bg-primary text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        {product.icon}
                      </div>
                      {product.badge && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.title}</CardTitle>
                    <CardDescription>{product.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-slate-900">{product.price}</span>
                      <span className="text-xs text-slate-400">{product.sales} sales</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                      Manage Product
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShoppingCart className="h-32 w-32" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Connect with Shopify</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Ready to start accepting payments? Connect your OnlineGuide.io account with Shopify to handle global transactions, taxes, and automatic file delivery.
                </p>
                <Button className="bg-white text-slate-900 hover:bg-slate-100">
                  Setup Shopify Integration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
