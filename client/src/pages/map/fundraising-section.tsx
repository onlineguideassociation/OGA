import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, GraduationCap, Users, Globe } from "lucide-react";

export default function FundraisingSection() {
  const campaigns = [
    { id: 1, name: "Sophea K.", location: "Siem Reap", title: "Support Young Khmer Guide to Become Licensed Angkor Expert", goal: 1500, raised: 750, desc: "Help me cover the official Tourism Ministry license course and advanced English training.", category: "Education" },
    { id: 2, name: "Chandra M.", location: "Battambang", title: "Clean Village Initiative: Rural Tourism Education", goal: 3000, raised: 1200, desc: "Raising funds for sustainable waste management and tourism hospitality training.", category: "Community" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="secondary" className="mb-3 text-rose-600 bg-rose-50">GuideFund</Badge>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Support the Future of Cambodian Tourism</h1>
        <p className="text-sm text-slate-500">Empower local guides through education, certification, and community projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden border-2 hover:border-rose-200 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3 text-rose-500" /> {campaign.location}</span>
                <Badge variant="outline" className="text-rose-600 border-rose-100 text-[10px]">{campaign.category}</Badge>
              </div>
              <CardTitle className="text-lg">{campaign.title}</CardTitle>
              <div className="text-xs font-semibold text-slate-900">by {campaign.name}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{campaign.desc}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">${campaign.raised} raised</span>
                  <span className="text-slate-500">Goal: ${campaign.goal}</span>
                </div>
                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2.5 bg-rose-100" />
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t p-4">
              <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white h-10 font-bold">Support this Campaign</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pt-4">
        {[
          { icon: GraduationCap, title: "Direct Impact", desc: "100% of your donation goes directly to the guide's verified goal." },
          { icon: Globe, title: "Global Community", desc: "Join a global network committed to sustainable guide development." },
          { icon: Users, title: "Verified Guides", desc: "All campaigns are vetted by OnlineGuide.io for authentic tourism impact." },
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}