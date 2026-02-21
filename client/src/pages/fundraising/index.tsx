import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, GraduationCap, Users, Globe, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function PublicFundraising() {
  const campaigns = [
    {
      id: 1,
      name: "Sophea K.",
      location: "Siem Reap",
      title: "Support Young Khmer Guide to Become Licensed Angkor Expert",
      goal: 1500,
      raised: 750,
      desc: "Help me cover the official Tourism Ministry license course and advanced English training to better serve my guests at Angkor Wat.",
      category: "Education"
    },
    {
      id: 2,
      name: "Chandra M.",
      location: "Battambang",
      title: "Clean Village Initiative: Rural Tourism Education",
      goal: 3000,
      raised: 1200,
      desc: "Raising funds to implement sustainable waste management and tourism hospitality training for my home village community.",
      category: "Community"
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 text-rose-600 bg-rose-50">GuideFund</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Support the Future of <br /> Cambodian Tourism</h1>
            <p className="text-xl text-slate-600">Empower local guides to reach their full potential through education, certification, and community projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden border-2 hover:border-rose-200 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <MapPin className="h-4 w-4 text-rose-500" />
                      {campaign.location}
                    </div>
                    <Badge variant="outline" className="text-rose-600 border-rose-100">{campaign.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                  <div className="text-sm font-semibold text-slate-900">by {campaign.name}</div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-600 leading-relaxed">
                    {campaign.desc}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-slate-900">${campaign.raised} raised</span>
                      <span className="text-slate-500">Goal: ${campaign.goal}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-3 bg-rose-100" />
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 border-t p-6">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white h-12 text-lg font-bold">
                    Support this Campaign
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Direct Impact</h3>
              <p className="text-slate-600 text-sm">100% of your donation (minus fees) goes directly to the guide's verified goal.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Global Community</h3>
              <p className="text-slate-600 text-sm">Join a global network of tourists committed to sustainable guide development.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Verified Guides</h3>
              <p className="text-slate-600 text-sm">All campaigns are vetted by OnlineGuide.io to ensure authentic tourism impact.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
