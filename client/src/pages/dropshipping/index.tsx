import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Globe, Zap, Package, RefreshCw, PlusCircle, Link, Truck } from "lucide-react";

export default function DropshippingModule() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dropshipping & E-commerce Automation</h1>
                <p className="text-slate-600">Discover trending products and auto-sync with your connected stores</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50"><Link className="h-4 w-4 mr-2" /> Connect Store</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white"><PlusCircle className="h-4 w-4 mr-2" /> Import URL</Button>
            </div>
          </div>

          {/* Connected Stores & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Active Integrations</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">4 Stores</h3>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-bold border-2 border-white">S</div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold border-2 border-white">W</div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold border-2 border-white">E</div>
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-bold border-2 border-white">T</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Imported Products</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">1,248</h3>
                  <Package className="h-6 w-6 text-indigo-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Auto-fulfilled Orders</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">892</h3>
                  <Zap className="h-6 w-6 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Live Stock Syncs</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">14.2k</h3>
                  <RefreshCw className="h-6 w-6 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Product Discovery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['Winning Products', 'Travel & Outdoor', 'Tech Gadgets', 'Eco-Friendly', 'Cambodian Artisans'].map(cat => (
                    <Button key={cat} variant="ghost" className="w-full justify-start text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                      {cat}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-indigo-900 text-white border-none">
                <CardContent className="p-6 text-center space-y-4">
                  <Globe className="h-10 w-10 text-indigo-300 mx-auto" />
                  <h3 className="font-bold">Global API Network</h3>
                  <p className="text-sm text-indigo-200">Connect directly to Amazon, AliExpress, and local ASEAN suppliers.</p>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600">View Supplier List</Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Trending Now</h2>
                <div className="flex gap-2">
                  <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 outline-none">
                    <option>Sort by: High Margin</option>
                    <option>Sort by: Most Orders</option>
                    <option>Sort by: Newest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Smart Travel Backpack", cost: 24.50, retail: 79.99, orders: 4520, supplier: "GlobalTech", time: "5-8 Days" },
                  { name: "Bamboo Eco Cutlery Set", cost: 4.20, retail: 19.99, orders: 1205, supplier: "GreenEarth", time: "7-12 Days" },
                  { name: "Noise Cancelling Earbuds", cost: 18.00, retail: 59.99, orders: 8900, supplier: "AudioPro", time: "4-7 Days" },
                  { name: "Portable Espresso Maker", cost: 32.00, retail: 89.00, orders: 340, supplier: "CafeTools", time: "5-10 Days" },
                  { name: "Universal Travel Adapter", cost: 8.50, retail: 29.99, orders: 6700, supplier: "GlobalTech", time: "5-8 Days" },
                  { name: "Silk Sleeping Mask", cost: 6.00, retail: 24.99, orders: 2100, supplier: "LuxeLife", time: "8-15 Days" }
                ].map((item, i) => (
                  <Card key={i} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-slate-100 flex items-center justify-center text-4xl border-b border-slate-50">
                      📦
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2 truncate">{item.name}</h3>
                      <div className="flex justify-between text-sm mb-3">
                        <div>
                          <p className="text-slate-500">Cost</p>
                          <p className="font-bold text-slate-900">${item.cost.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Retail</p>
                          <p className="font-bold text-emerald-600">${item.retail.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Margin</p>
                          <p className="font-bold text-indigo-600">${(item.retail - item.cost).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                        <span className="flex items-center"><Truck className="h-3 w-3 mr-1"/> {item.time}</span>
                        <span>{item.orders} orders</span>
                      </div>
                      <Button className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add to Import List
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}