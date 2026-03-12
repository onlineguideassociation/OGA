import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bitcoin, TrendingUp, LineChart, Shield, ArrowUpRight, Activity, Wallet, Coins } from "lucide-react";

export default function CryptoModule() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">AI Crypto Autonomy</Badge>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Predictive DeFi & Assets</h1>
              <p className="text-lg text-slate-400">Real-time crypto tracking, predictive ROI simulation, and AI-driven portfolio management.</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white"><Wallet className="h-4 w-4 mr-2" /> Connect Wallet</Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800"><LineChart className="h-4 w-4 mr-2" /> AI Predictor</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400 mb-1">Portfolio Value</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">$45,280.50</h3>
                  <div className="flex items-center text-sm text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded">
                    <ArrowUpRight className="h-3 w-3 mr-1"/> +12.4%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400 mb-1">AI Prediction Score</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-emerald-400">Bullish</h3>
                  <Activity className="h-6 w-6 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400 mb-1">Active Smart Contracts</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">8</h3>
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400 mb-1">NFT Yield</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">+2.5 ETH</h3>
                  <Coins className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-900 border-slate-800 shadow-sm">
                <CardHeader className="border-b border-slate-800 pb-4">
                  <CardTitle className="text-lg text-white flex items-center justify-between">
                    Top AI Picks & Trending Assets
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Live</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-800">
                    {[
                      { coin: "Bitcoin", sym: "BTC", price: "$64,230.00", change: "+5.2%", ai: "Strong Buy", trend: "up" },
                      { coin: "Ethereum", sym: "ETH", price: "$3,450.20", change: "+2.8%", ai: "Hold", trend: "up" },
                      { coin: "Solana", sym: "SOL", price: "$145.80", change: "-1.2%", ai: "Buy Dip", trend: "down" },
                      { coin: "Chainlink", sym: "LINK", price: "$18.40", change: "+8.4%", ai: "Strong Buy", trend: "up" },
                      { coin: "GuideToken", sym: "GUIDE", price: "$1.24", change: "+15.2%", ai: "Ecosystem Growth", trend: "up" }
                    ].map((asset, i) => (
                      <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                            <Bitcoin className="h-5 w-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-bold text-white">{asset.coin}</p>
                            <span className="text-xs text-slate-500">{asset.sym}</span>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-medium text-white">{asset.price}</p>
                            <p className={`text-xs ${asset.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>{asset.change}</p>
                          </div>
                          <Badge className="bg-slate-800 text-slate-300 border-slate-700 w-24 justify-center">{asset.ai}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>
                <CardHeader>
                  <CardTitle className="text-lg text-white">AI Portfolio Simulation</CardTitle>
                  <CardDescription className="text-slate-400">Predictive yield modeling based on current market trends.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <p className="text-sm text-slate-400 mb-1">Projected 30-Day Yield</p>
                    <p className="text-3xl font-bold text-emerald-400">+$2,450.00</p>
                    <p className="text-xs text-slate-500 mt-2">Confidence Score: 84%</p>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 border-none">Auto-Balance Portfolio</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Token Creation Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 mb-4">Deploy your own community tokens or NFTs seamlessly across multiple chains.</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                      <span>Mint New Token</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                      <span>Create NFT Collection</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
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