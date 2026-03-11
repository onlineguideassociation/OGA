import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Leaf, TreePine, Droplets, Map as MapIcon, Info, ShieldCheck } from "lucide-react";

export default function SustainabilityMapping() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-emerald-500" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sustainability & ESG Mapping</h1>
              <p className="text-slate-600">Track, verify, and highlight eco-friendly tourism initiatives</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-emerald-100 font-medium mb-1">Total Carbon Offset</p>
                    <h2 className="text-4xl font-bold mb-2">12,450t</h2>
                    <p className="text-sm text-emerald-100">Across 450 verified partners in 2025</p>
                  </div>
                  <TreePine className="h-8 w-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 font-medium mb-1">Active Eco-Grants</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">$1.2M</h2>
                    <p className="text-sm text-emerald-600 flex items-center"><LineChart className="h-3 w-3 mr-1"/> +15% from last quarter</p>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 font-medium mb-1">Water Conserved</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">45M L</h2>
                    <p className="text-sm text-slate-500">Via smart-meter implementations</p>
                  </div>
                  <Droplets className="h-8 w-8 text-cyan-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-none shadow-sm h-full min-h-[500px] flex flex-col relative overflow-hidden">
                <CardHeader className="border-b border-slate-100 bg-white z-10 relative">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5 text-emerald-600" /> 
                      Interactive Impact Map
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer">All Impact</Badge>
                      <Badge variant="outline" className="bg-white text-slate-600 cursor-pointer">Carbon</Badge>
                      <Badge variant="outline" className="bg-white text-slate-600 cursor-pointer">Community</Badge>
                    </div>
                  </div>
                </CardHeader>
                <div className="flex-1 bg-slate-100 relative">
                  {/* Mock Map Background */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://api.maptiler.com/maps/basic-v2/256/0/0/0.png?key=get_your_own_OpIi9ZULNHzrESv6T2vL')] bg-cover bg-center"></div>
                  
                  {/* Map Points */}
                  <div className="absolute top-1/4 left-1/4">
                    <div className="relative group cursor-pointer">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      </div>
                      <div className="absolute w-12 h-12 bg-emerald-500/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                      
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <p className="font-bold text-sm text-slate-900">Eco-Lodge Siem Reap</p>
                        <p className="text-xs text-slate-500 mb-2">100% Solar Powered</p>
                        <div className="flex justify-between text-xs text-emerald-600 font-medium">
                          <span>Verified: Level 3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-2/3">
                    <div className="relative group cursor-pointer">
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">12</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <p className="font-bold text-sm text-slate-900">Koh Rong Marine Reserve</p>
                        <p className="text-xs text-slate-500">12 Active Conservation Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Verifications</CardTitle>
                  <CardDescription>Newly audited sustainable partners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Phnom Penh Green Transport", type: "Mobility", score: "94/100", status: "Gold" },
                    { name: "Kampot Zero-Waste Hub", type: "Hospitality", score: "88/100", status: "Silver" },
                    { name: "Cardamom Canopy Tours", type: "Operator", score: "96/100", status: "Gold" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.type}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={item.status === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-700'}>
                          {item.status}
                        </Badge>
                        <p className="text-xs font-bold text-emerald-600 mt-1">{item.score}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">View All Partners</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 text-white border-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-blue-400 shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Automated ESG Reporting</h4>
                      <p className="text-sm text-slate-400 mb-4">Connect your utility APIs and booking data to automatically generate certified sustainability reports for investors and travelers.</p>
                      <Button className="bg-blue-500 hover:bg-blue-600 w-full">Configure Integrations</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}