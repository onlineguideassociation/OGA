import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, TrendingUp, Package, DollarSign, Zap, Search, Filter, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function MarketplaceModule() {
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (searchTerm) params.set("search", searchTerm);
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const categories = [...new Set(products.map(p => p.category))];
  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);
  const commissionTotal = cart.reduce((sum, p) => sum + (p.price * (p.commission || 0) / 100), 0);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(p => p.id !== id));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="h-8 w-8 text-[#0081C9]" />
              <h1 className="text-4xl font-bold text-slate-900" data-testid="text-marketplace-title">OnlineGuide Marketplace</h1>
            </div>
            <p className="text-slate-600">Discover authentic products, media, and experiences from Cambodia's ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Total Products</p>
                    <p className="text-2xl font-bold" data-testid="text-product-count">{products.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Cart Items</p>
                    <p className="text-2xl font-bold" data-testid="text-cart-count">{cart.length}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Cart Total</p>
                    <p className="text-2xl font-bold">${cartTotal}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">Your Commission</p>
                    <p className="text-2xl font-bold">${commissionTotal.toFixed(2)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="bg-white/60 backdrop-blur sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Find products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-testid="input-search-products"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Category</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${selectedCategory === null ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                        data-testid="button-category-all"
                      >
                        All Categories
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition ${selectedCategory === cat ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                          data-testid={`button-category-${cat}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-3 text-slate-600">Loading products...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {products.map(product => (
                    <Card key={product.id} className="bg-white/60 backdrop-blur hover:shadow-lg transition overflow-hidden" data-testid={`product-card-${product.id}`}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="text-5xl">{product.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
                            <p className="text-xs text-slate-500 mb-2">{product.supplier}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                ⭐ {product.rating}
                              </Badge>
                              <span className="text-xs text-slate-500">{product.sales} sold</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-lg font-bold text-slate-900">${product.price}</p>
                                <p className="text-xs text-emerald-600">+{product.commission}% commission</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addToCart(product)}
                                className="bg-[#0081C9] hover:bg-blue-700"
                                data-testid={`add-to-cart-${product.id}`}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <Card className="bg-white/60 backdrop-blur border-emerald-200">
                  <CardHeader className="bg-emerald-50/50">
                    <CardTitle>Shopping Cart</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3 mb-6">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-slate-500">${item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            data-testid={`remove-from-cart-${item.id}`}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Subtotal:</span>
                        <span className="font-medium">${cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600 font-medium">
                        <span>Your Affiliate Commission:</span>
                        <span>${commissionTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-4">
                        <span>Total:</span>
                        <span>${(cartTotal + commissionTotal).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600" data-testid="checkout-button">
                      <Zap className="h-4 w-4 mr-2" /> Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
