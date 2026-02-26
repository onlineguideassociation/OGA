import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Zap, ShieldCheck, Microscope, Database, Globe, ArrowRight, BarChart3, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RDTBPage() {
  const signalSources = [
    { name: "Google momentum", value: "High", trend: "+12%" },
    { name: "Meta platforms", value: "Steady", trend: "+2.4%" },
    { name: "TikTok velocity", value: "Peak", trend: "+45%" },
    { name: "YouTube data", value: "Growing", trend: "+8%" }
  ];

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Layer 3 & 4 Architecture</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              AI AutoBot & <br /> RDTB Intelligence Layer
            </h1>
            <p className="text-xl text-slate-600">
              The real-time sensing and national tourism research laboratory engine for Cambodia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-slate-900 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Radio className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-white">AI AutoBot Learning Engine</CardTitle>
                    <CardDescription className="text-slate-400 font-mono text-[10px]">REAL-TIME SIGNAL SENSING ACTIVE</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {signalSources.map((source, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{source.name}</div>
                      <div className="text-lg font-bold">{source.value}</div>
                      <div className="text-xs text-emerald-400 font-medium">{source.trend}</div>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                  <h4 className="font-bold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Governance Model: Privacy-by-Design</h4>
                  <p className="text-sm text-slate-400">Aggregated geospatial signals only. No biometric tracking. No identity storage. Sovereign tourism signal modeling.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                  <Microscope className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>RDTB Lab</CardTitle>
                <CardDescription>Research & Development Tourism Bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {['Infrastructure Stress Simulation', 'Climate Exposure Modeling', 'Demand Elasticity Index', 'Tourism Shock Scenarios'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Validated Processing Partners</div>
                  <div className="flex gap-4 opacity-50 grayscale">
                    <Globe className="h-6 w-6" title="Google Cloud" />
                    <Database className="h-6 w-6" title="AWS" />
                    <Zap className="h-6 w-6" title="OpenAI" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Financial Activation</Badge>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">National Payment Activation Layer</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                When RDTB detects demand shifts, the infrastructure triggers instant booking workflows across ABA Bank, Wing Bank, and global rails.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-white shadow-sm">
                  <div className="text-2xl font-bold text-slate-900">$2.4M</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Flash Inventory Value</div>
                </div>
                <div className="p-4 rounded-xl border bg-white shadow-sm">
                  <div className="text-2xl font-bold text-slate-900">12.8k</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Auto-Triggers / Mo</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-200 rounded-3xl p-12 flex items-center justify-center relative overflow-hidden h-[400px]">
              <div className="absolute top-0 left-0 p-8 text-slate-400 font-mono text-[10px] space-y-2">
                <div>&gt; ANALYZING SIEM REAP DEMAND...</div>
                <div>&gt; CLIMATE SIGNAL DETECTED: +2.4C...</div>
                <div>&gt; TRIGGERING ABA SETTLEMENTS...</div>
                <div className="animate-pulse text-primary">&gt; SYSTEM ACTIVE</div>
              </div>
              <BarChart3 className="h-48 w-48 text-primary/10 absolute -bottom-10 -right-10" />
              <div className="relative z-10 p-6 bg-white rounded-2xl shadow-2xl border flex flex-col items-center gap-4 max-w-[280px]">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900">AutoBot Machine</div>
                  <div className="text-sm text-slate-500">Real-Time Learning Active</div>
                </div>
                <Button className="w-full">Initialize Settlement</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
