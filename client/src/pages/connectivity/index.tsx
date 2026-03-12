import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Radio, Shield, Globe, Zap, Settings, Activity, Smartphone } from "lucide-react";

export default function ConnectivityModule() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-cyan-200">Cyber User Autobot</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Connectivity & Network Intelligence</h1>
              <p className="text-lg text-slate-600">Smart Wi-Fi monetization, 5G optimization, and autonomous cyber-security management.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-cyan-200 text-cyan-700 bg-cyan-50"><Shield className="h-4 w-4 mr-2" /> Enable VPN</Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white"><Wifi className="h-4 w-4 mr-2" /> Scan Networks</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-none shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Wifi className="w-24 h-24 text-cyan-900" />
              </div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h3 className="font-semibold text-slate-700">Active Connection</h3>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">Starbucks_5G_Fast</h2>
                <p className="text-sm text-slate-500">Encrypted via Auto-VPN • 120 Mbps</p>
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Secure</Badge>
                  <Badge variant="secondary" className="bg-cyan-50 text-cyan-700">Optimal Bandwidth</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">Data Usage Prediction</h3>
                  <Activity className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">Current Month</span>
                      <span className="font-bold text-slate-900">45 GB / 100 GB</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full">
                      <div className="bg-cyan-500 h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Zap className="h-3 w-3 text-amber-500" /> AI suggests pausing HD syncs until Wi-Fi
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">Guest Wi-Fi Monetization</h3>
                  <Globe className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">$450.00</h2>
                <p className="text-sm text-slate-500">Revenue from splash page ads this week</p>
                <Button variant="link" className="text-indigo-600 p-0 h-auto mt-2 text-sm font-medium">View Analytics →</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Radio className="h-5 w-5 text-cyan-600" /> Available Networks
                </CardTitle>
                <CardDescription>AI-ranked for speed and security</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {[
                    { name: "OnlineGuide_Premium", type: "5G", speed: "800 Mbps", security: "High", score: 98 },
                    { name: "Airport_Free_Wifi", type: "Wi-Fi", speed: "15 Mbps", security: "Low", score: 45 },
                    { name: "Lounge_VIP", type: "Wi-Fi 6", speed: "300 Mbps", security: "Medium", score: 82 },
                    { name: "Roaming_Partner_Net", type: "LTE", speed: "45 Mbps", security: "High", score: 75 }
                  ].map((net, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${net.score > 80 ? 'bg-emerald-100 text-emerald-600' : net.score > 60 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
                          {net.type.includes('Wi-Fi') ? <Wifi className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{net.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>{net.type}</span>
                            <span>•</span>
                            <span>{net.speed}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={`text-[10px] ${net.security === 'High' ? 'border-emerald-200 text-emerald-700' : net.security === 'Medium' ? 'border-amber-200 text-amber-700' : 'border-rose-200 text-rose-700'}`}>
                          {net.security} Sec
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
                  <CardTitle className="text-lg">Network Autobot Rules</CardTitle>
                  <CardDescription className="text-slate-400">Autonomous connection behaviors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { rule: "Auto-connect to Top 5% secure networks", active: true },
                    { rule: "Enable VPN on Public Wi-Fi", active: true },
                    { rule: "Prioritize Zoom/Meet bandwidth", active: true },
                    { rule: "Pause cloud sync on cellular data", active: false }
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                      <span className="text-sm font-medium">{rule.rule}</span>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${rule.active ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${rule.active ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Settings className="h-6 w-6 text-slate-400" />
                    <div>
                      <h4 className="font-bold text-slate-900">Advanced Setup</h4>
                      <p className="text-sm text-slate-500">Configure mesh networks and IoT devices</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Open Device Manager</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}