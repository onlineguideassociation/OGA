import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, TrendingUp, Users, ShoppingCart, DollarSign, Activity, Settings, LayoutDashboard } from "lucide-react";

export default function ERPDashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-teal-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Unified ERP / CRM Dashboard</h1>
                <p className="text-slate-600">Centralized management for tourism, commerce, and content</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white text-slate-600 py-1">Amazon Seller API</Badge>
              <Badge variant="outline" className="bg-white text-slate-600 py-1">Shopify CRM</Badge>
              <Badge variant="outline" className="bg-white text-slate-600 py-1">ABA PayWay</Badge>
              <Button variant="ghost" size="icon"><Settings className="h-5 w-5 text-slate-500" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Gross Volume</p>
                    <h2 className="text-3xl font-bold text-slate-900">$142,500</h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+12.5%</span>
                  <span className="text-slate-400 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Active Customers</p>
                    <h2 className="text-3xl font-bold text-slate-900">8,240</h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+5.2%</span>
                  <span className="text-slate-400 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Orders/Bookings</p>
                    <h2 className="text-3xl font-bold text-slate-900">1,845</h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-emerald-500 font-medium">+18.1%</span>
                  <span className="text-slate-400 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">System Health</p>
                    <h2 className="text-3xl font-bold text-emerald-500">99.9%</h2>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-emerald-500 font-medium">All APIs Synced</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  Recent Multi-Channel Transactions
                  <Button variant="ghost" size="sm" className="text-teal-600 h-8">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {[
                    { id: "ORD-9921", customer: "Sarah Jenkins", amount: 145.00, channel: "Shopify Store", status: "Paid", type: "Product" },
                    { id: "BKG-4412", customer: "Michael Chen", amount: 299.00, channel: "TravelOS App", status: "Paid", type: "Tour Booking" },
                    { id: "SUB-1002", customer: "Emma Wilson", amount: 29.00, channel: "Creator Hub", status: "Recurring", type: "Membership" },
                    { id: "ORD-9920", customer: "David Smith", amount: 89.50, channel: "Amazon FBA", status: "Pending", type: "Product" },
                    { id: "BKG-4411", customer: "Lisa Taylor", amount: 120.00, channel: "Restaurant POS", status: "Paid", type: "Dining" }
                  ].map((tx, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          tx.type === 'Product' ? 'bg-indigo-100' : 
                          tx.type === 'Tour Booking' ? 'bg-green-100' : 
                          tx.type === 'Dining' ? 'bg-amber-100' : 'bg-purple-100'
                        }`}>
                          {tx.type === 'Product' ? '📦' : tx.type === 'Tour Booking' ? '🗺️' : tx.type === 'Dining' ? '🍽️' : '⭐'}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{tx.customer}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{tx.id}</span>
                            <span>•</span>
                            <span className="text-teal-600 font-medium">{tx.channel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">${tx.amount.toFixed(2)}</p>
                        <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${
                          tx.status === 'Paid' || tx.status === 'Recurring' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-slate-900 text-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Revenue by Segment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "E-commerce & Dropshipping", value: 45, amount: "$64,125", color: "bg-indigo-500" },
                      { name: "Tourism Bookings", value: 35, amount: "$49,875", color: "bg-green-500" },
                      { name: "Creator Memberships", value: 12, amount: "$17,100", color: "bg-purple-500" },
                      { name: "Restaurant POS", value: 8, amount: "$11,400", color: "bg-amber-500" }
                    ].map((segment, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{segment.name}</span>
                          <span className="font-bold">{segment.amount}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                          <div className={`${segment.color} h-2 rounded-full`} style={{ width: `${segment.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border-none shadow-sm hover:ring-2 hover:ring-teal-500 transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LayoutDashboard className="h-6 w-6 text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Custom Reports</h3>
                    <p className="text-xs text-slate-500 mt-1">Generate unified analytics</p>
                  </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm hover:ring-2 hover:ring-teal-500 transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Database className="h-6 w-6 text-slate-700" />
                    </div>
                    <h3 className="font-semibold text-slate-900">API Gateway</h3>
                    <p className="text-xs text-slate-500 mt-1">Manage external connections</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}