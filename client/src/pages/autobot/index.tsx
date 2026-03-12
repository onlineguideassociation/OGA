import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageSquare, Zap, Cpu, Search, Database, ArrowRight } from "lucide-react";

export default function AutobotDashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Bot className="w-48 h-48" />
            </div>
            <div className="max-w-2xl relative z-10">
              <Badge className="mb-4 bg-indigo-500/30 text-indigo-200 border-indigo-500/50">Unified AI Workspace</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                Hello, I am Autobot <Sparkles className="h-8 w-8 text-amber-400" />
              </h1>
              <p className="text-lg text-indigo-100 mb-6">
                Your personal AI super-agent. I mine data, automate workflows, optimize networks, and generate insights across travel, commerce, crypto, and HR.
              </p>
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-indigo-400" />
                <input 
                  type="text" 
                  placeholder="Ask me to research trends, draft an itinerary, or analyze crypto..." 
                  className="w-full pl-12 pr-32 py-3 bg-white/10 border border-indigo-500/30 rounded-xl text-white placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none backdrop-blur-sm"
                />
                <Button className="absolute right-1 top-1 bottom-1 bg-indigo-500 hover:bg-indigo-600 rounded-lg h-auto">Generate</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-blue-500">
              <CardContent className="p-6">
                <Database className="h-8 w-8 text-blue-500 mb-3" />
                <h3 className="font-bold text-slate-900">Data Mining</h3>
                <p className="text-sm text-slate-500 mt-1">Scrape travel deals & product trends</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-purple-500">
              <CardContent className="p-6">
                <Cpu className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-bold text-slate-900">Multi-Model AI</h3>
                <p className="text-sm text-slate-500 mt-1">Switch: GPT-5, Claude, DeepSeek</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-amber-500">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-amber-500 mb-3" />
                <h3 className="font-bold text-slate-900">Task Automation</h3>
                <p className="text-sm text-slate-500 mt-1">Cron jobs & marketing flows</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-t-4 border-t-emerald-500">
              <CardContent className="p-6">
                <MessageSquare className="h-8 w-8 text-emerald-500 mb-3" />
                <h3 className="font-bold text-slate-900">Content Engine</h3>
                <p className="text-sm text-slate-500 mt-1">Auto-generate posts & templates</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg">Recent Autobot Intelligence</CardTitle>
                <CardDescription>Automated insights generated for you today</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="p-5 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Commerce Insight</Badge>
                      <span className="text-xs text-slate-400">10 mins ago</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">Trending Dropshipping Niche Detected</h4>
                    <p className="text-sm text-slate-600 mb-3">Analysis of TikTok shop data shows a 400% spike in "Eco-friendly travel adapters". Average margin is $22.</p>
                    <Button variant="outline" size="sm" className="text-blue-700 bg-blue-50 border-blue-200">Import to Store <ArrowRight className="h-3 w-3 ml-1" /></Button>
                  </div>
                  
                  <div className="p-5 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Crypto Alert</Badge>
                      <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">Defi Yield Opportunity</h4>
                    <p className="text-sm text-slate-600 mb-3">A new liquidity pool for ETH/USDC has opened offering 12.5% APY. Smart contract audited and verified.</p>
                    <Button variant="outline" size="sm" className="text-emerald-700 bg-emerald-50 border-emerald-200">View Details <ArrowRight className="h-3 w-3 ml-1" /></Button>
                  </div>

                  <div className="p-5 hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">Travel Alert</Badge>
                      <span className="text-xs text-slate-400">5 hours ago</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">Flight Price Drop</h4>
                    <p className="text-sm text-slate-600 mb-3">Round trip from SIN to REP dropped by $140 for your tracked dates in November.</p>
                    <Button variant="outline" size="sm" className="text-amber-700 bg-amber-50 border-amber-200">Book Now <ArrowRight className="h-3 w-3 ml-1" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Active Automated Workflows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Daily Competitor Price Scrape", status: "Running", freq: "Every 24h" },
                    { name: "Social Media Post Generation", status: "Running", freq: "3x Weekly" },
                    { name: "Network Security Scan", status: "Running", freq: "Continuous" },
                    { name: "Crypto Portfolio Rebalance", status: "Paused", freq: "On 5% deviation" }
                  ].map((flow, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{flow.name}</p>
                        <p className="text-xs text-slate-500">{flow.freq}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${flow.status === 'Running' ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {flow.status}
                        </span>
                        <div className={`w-8 h-4 rounded-full relative ${flow.status === 'Running' ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                          <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${flow.status === 'Running' ? 'right-0.5' : 'left-0.5'}`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">Create New Workflow</Button>
                </CardContent>
              </Card>

              <Card className="bg-indigo-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <h4 className="font-bold text-indigo-900 mb-2">Model Configuration</h4>
                  <p className="text-sm text-indigo-700 mb-4">Select the primary intelligence engine driving Autobot.</p>
                  <select className="w-full p-2.5 rounded-lg border border-indigo-200 bg-white text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 mb-4">
                    <option>GPT-5 Turbo (Default)</option>
                    <option>Claude 3.5 Sonnet (Best for Writing)</option>
                    <option>DeepSeek Coder (Best for Logic)</option>
                  </select>
                  <p className="text-xs text-indigo-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1"/> API Keys Connected</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}