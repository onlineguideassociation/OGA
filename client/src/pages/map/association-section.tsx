import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, TrendingUp, ShieldCheck, MapPin, Award, Rocket, Heart } from "lucide-react";

export default function AssociationSection() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="secondary" className="mb-3 text-[#0081C9] bg-[#0081C9]/10">Official Proposal</Badge>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Online Guide Association (OGA)</h1>
        <p className="text-sm text-slate-500">Empowering Cambodian Tour Guides through Digital Infrastructure</p>
        <p className="text-xs text-slate-400 mt-1">Connecting Cultures with Loyalty and Truth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none shadow-sm bg-[#0081C9] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Globe className="h-5 w-5" /> Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-50">To become the digital infrastructure for tourism professionals in Cambodia and Southeast Asia.</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base"><Rocket className="h-5 w-5" /> Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5 text-sm text-slate-300">
              <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Digitize 1,000 Cambodian tour guides</li>
              <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Increase guide income by 30–50%</li>
              <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Access to education & fundraising</li>
              <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-[#0081C9]" /> Promote responsible tourism</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Digital Platform", desc: "Professional profiles, booking systems, and AI assistants for every guide.", icon: <Award className="h-5 w-5 text-blue-600" /> },
          { title: "GuideFund", desc: "Crowdfunding for certification, training, and community projects.", icon: <Heart className="h-5 w-5 text-rose-600" /> },
          { title: "Digital Training", desc: "Specialized programs in digital marketing, branding, and storytelling.", icon: <TrendingUp className="h-5 w-5 text-emerald-600" /> },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center mb-3 border">{item.icon}</div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
            <p className="text-xs text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Who We Support</h2>
          <div className="space-y-2">
            {[
              "Licensed tour guides in Siem Reap & Phnom Penh",
              "Young tourism graduates entering the field",
              "Women guides seeking digital independence",
              "Rural community tourism leaders",
              "Drivers expanding into professional guiding"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#0081C9] shrink-0" />
                <span className="text-sm text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="bg-white border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">3-Year Impact Targets</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Registered Guides", value: "1,000" },
              { label: "Avg Income Increase", value: "30–50%" },
              { label: "Fundraising Campaigns", value: "200+" },
              { label: "Training Graduates", value: "500" },
              { label: "Int'l Partnerships", value: "20" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between pb-2 border-b last:border-0 last:pb-0">
                <span className="text-xs text-slate-600">{stat.label}</span>
                <span className="text-xs font-bold text-[#0081C9]">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">Implementation Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { phase: "Phase 1 – Pilot", time: "6 Months", tasks: ["Launch in Siem Reap", "Onboard 100 guides", "Beta GuideFund", "Workshops"] },
            { phase: "Phase 2 – Expansion", time: "Year 1", tasks: ["Expand to Phnom Penh", "Reach 500 guides", "NGO Partnerships"] },
            { phase: "Phase 3 – Regional Growth", time: "Year 2–3", tasks: ["Expand to SE Asia", "Network Launch"] },
          ].map((step, i) => (
            <Card key={i} className="bg-white border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-900">{step.phase}</span>
                  <Badge variant="outline" className="text-[10px] text-[#0081C9]">{step.time}</Badge>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                  {step.tasks.map((t, j) => <li key={j}>{t}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}