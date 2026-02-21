import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, GraduationCap, Camera, ShieldCheck, Plus, ArrowRight } from "lucide-react";

export default function FundraisingDashboard() {
  const campaigns = [
    {
      id: 1,
      title: "Support Young Khmer Guide to Become Licensed Angkor Expert",
      goal: 1500,
      raised: 750,
      donors: 12,
      category: "Certification",
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />,
      status: "Active"
    },
    {
      id: 2,
      title: "Clean Village Initiative: Rural Tourism Education",
      goal: 3000,
      raised: 1200,
      donors: 45,
      category: "Community",
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      status: "Active"
    }
  ];

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">GuideFund</h2>
          <nav className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" /> My Campaigns
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShieldCheck className="mr-2 h-4 w-4" /> Verification
            </Button>
          </nav>
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-rose-500" /> GuideFund Management
                </h1>
                <p className="text-slate-500">Raise support for your education, community, or business growth.</p>
              </div>
              <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Create Campaign
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        {campaign.icon}
                      </div>
                      <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-100">
                        {campaign.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-slate-900">${campaign.raised} raised</span>
                        <span className="text-slate-500">Goal: ${campaign.goal}</span>
                      </div>
                      <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{campaign.donors} donors</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full justify-between text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                      View Campaign Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-6">Support Cambodian Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureItem 
                  title="Global Support" 
                  desc="Accept international donations after a tour." 
                  icon={<ShieldCheck className="text-rose-400" />}
                />
                <FeatureItem 
                  title="Sponsor Program" 
                  desc="Let recurring supporters fund your growth." 
                  icon={<GraduationCap className="text-rose-400" />}
                />
                <FeatureItem 
                  title="Community Fund" 
                  desc="Raise capital for rural tourism projects." 
                  icon={<Users className="text-rose-400" />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureItem({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-800/50">
      <div className="h-8 w-8 mb-3 flex items-center justify-center">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}
