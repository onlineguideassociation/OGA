import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp, ShieldCheck, MapPin, Award, Rocket, Heart } from "lucide-react";

export default function Association() {
  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/5">Official Proposal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Online Guide Association (OGA)</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Empowering Cambodian Tour Guides through Digital Infrastructure. Based in Phnom Penh & Siem Reap.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            <Card className="border-none shadow-sm bg-primary text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6" /> Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/90 text-lg leading-relaxed">
                  To become the digital infrastructure for tourism professionals in Cambodia and Southeast Asia.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6" /> Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Digitize 1,000 Cambodian tour guides</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Increase average guide income by 30–50%</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Provide access to education & fundraising</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Promote responsible tourism</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Solutions Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Our Digital Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SolutionCard 
                title="Digital Platform" 
                desc="Professional profiles, booking systems, and AI assistants for every guide."
                icon={<Award className="h-6 w-6 text-blue-600" />}
              />
              <SolutionCard 
                title="GuideFund" 
                desc="Crowdfunding for certification, training, and community tourism projects."
                icon={<Heart className="h-6 w-6 text-rose-600" />}
              />
              <SolutionCard 
                title="Digital Training" 
                desc="Specialized programs in digital marketing, branding, and storytelling."
                icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
              />
            </div>
          </div>

          {/* Beneficiaries & Impact */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Who We Support</h2>
                <div className="space-y-4">
                  {[
                    "Licensed tour guides in Siem Reap & Phnom Penh",
                    "Young tourism graduates entering the field",
                    "Women guides seeking digital independence",
                    "Rural community tourism leaders",
                    "Drivers expanding into professional guiding"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-slate-700">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border shadow-sm">
                <h3 className="font-bold text-xl mb-6 text-slate-900">3-Year Impact Targets</h3>
                <div className="space-y-4">
                  <ImpactStat label="Registered Guides" value="1,000" />
                  <ImpactStat label="Average Income Increase" value="30–50%" />
                  <ImpactStat label="Fundraising Campaigns" value="200+" />
                  <ImpactStat label="Digital Training Graduates" value="500" />
                  <ImpactStat label="International Partnerships" value="20" />
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Implementation Roadmap</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <RoadmapStep 
                phase="Phase 1 – Pilot" 
                time="6 Months"
                tasks={["Launch in Siem Reap", "Onboard 100 guides", "Beta GuideFund", "Workshops"]}
              />
              <RoadmapStep 
                phase="Phase 2 – Expansion" 
                time="Year 1"
                tasks={["Expand to Phnom Penh", "Reach 500 guides", "NGO Partnerships"]}
              />
              <RoadmapStep 
                phase="Phase 3 – Regional Growth" 
                time="Year 2–3"
                tasks={["Expand to SE Asia", "Network Launch"]}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SolutionCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function ImpactStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}

function RoadmapStep({ phase, time, tasks }: { phase: string, time: string, tasks: string[] }) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <MapPin className="h-4 w-4" />
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-slate-900">{phase}</div>
          <time className="text-xs font-semibold text-primary uppercase">{time}</time>
        </div>
        <div className="text-slate-600 text-sm">
          <ul className="list-disc list-inside">
            {tasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
