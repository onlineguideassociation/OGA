import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, ShieldCheck, Users, Globe, ArrowUpRight } from "lucide-react";

export default function InvestorDashboard() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">RDTB Intelligence Layer</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">National Forecasting Engine</h1>
              <p className="text-lg text-slate-600">Real-time tourism signal modeling powered by AI AutoBot Learning.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-sm font-medium text-slate-500 mb-1">RDTB Validation Score</div>
              <div className="text-3xl font-bold text-primary">98.4% <span className="text-sm text-emerald-500 font-normal">Highly Accurate</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">City-Level Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CityMetric name="Siem Reap" score={88} trend="+4.2%" />
                  <CityMetric name="Phnom Penh" score={72} trend="+1.8%" />
                  <CityMetric name="Angkor Circuit" score={94} trend="+6.5%" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Growth Stability Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-end gap-2 px-2">
                  {[40, 60, 45, 70, 85, 65, 90].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group cursor-help" style={{ height: `${h}%` }}>
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-xs text-slate-400 font-medium">
                  <span>SEP 2025</span>
                  <span>FEB 2026</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">TIRS Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-600">A+</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">12 Top Operators</div>
                    <div className="text-xs text-slate-500">Ready for capital deployment</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-amber-600">B</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">45 Active Operators</div>
                    <div className="text-xs text-slate-500">Scaling reputation layer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Top Performing Operators
              </h2>
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Operator</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Visibility</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Conversion</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">TIRS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <OperatorRow name="Mike's Angkor Tours" visibility="94" conversion="22%" tirs="A+" />
                    <OperatorRow name="Phnom Penh Urban" visibility="82" conversion="18%" tirs="A" />
                    <OperatorRow name="Heritage Guides SE" visibility="88" conversion="15%" tirs="B+" />
                    <OperatorRow name="Green Siem Reap" visibility="76" conversion="24%" tirs="A" />
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" /> Capital Efficiency Ratio
              </h2>
              <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden h-[340px]">
                <div className="absolute top-0 right-0 p-8">
                  <Badge className="bg-white/10 text-white border-white/20">Live Infrastructure Data</Badge>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="text-5xl font-bold mb-4 tracking-tighter">$4.2M</div>
                  <p className="text-slate-400 text-lg mb-8 max-w-sm">Total booking value captured by TIIL infrastructure in last 12 months across Cambodia.</p>
                  <div className="flex gap-8">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Guide Network</div>
                      <div className="text-2xl font-bold">1,024</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Data Points</div>
                      <div className="text-2xl font-bold">14.8M</div>
                    </div>
                  </div>
                </div>
                <Globe className="h-64 w-64 text-white/5 absolute -bottom-20 -right-20 rotate-12" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CityMetric({ name, score, trend }: { name: string, score: number, trend: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-bold text-slate-700">{name}</div>
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${score}%` }} />
        </div>
        <span className="text-xs font-bold text-slate-900">{score}%</span>
        <span className="text-[10px] font-bold text-emerald-500">{trend}</span>
      </div>
    </div>
  );
}

function OperatorRow({ name, visibility, conversion, tirs }: { name: string, visibility: string, conversion: string, tirs: string }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-bold text-slate-900">{name}</div>
        <div className="text-[10px] text-slate-400 font-medium">VERIFIED PARTNER</div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">{visibility}%</td>
      <td className="px-6 py-4 text-sm text-slate-600 font-medium text-emerald-600">{conversion}</td>
      <td className="px-6 py-4">
        <Badge className={
          tirs.startsWith('A') ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-blue-100 text-blue-700 border-blue-200'
        }>{tirs}</Badge>
      </td>
    </tr>
  );
}
