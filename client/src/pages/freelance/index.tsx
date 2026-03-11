import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Code, PenTool, LayoutDashboard, Star, Clock, DollarSign, Filter, Search } from "lucide-react";

const GIGS = [
  {
    id: 1,
    title: "React Developer for Booking Dashboard",
    client: "TravelOS Inc.",
    type: "Fixed Price",
    budget: "$1,500 - $2,500",
    duration: "1 month",
    tags: ["React", "TypeScript", "Tailwind"],
    posted: "2h ago",
    proposals: 12
  },
  {
    id: 2,
    title: "UI/UX Designer for Mobile App Redesign",
    client: "Angkor Explorers",
    type: "Hourly",
    budget: "$45 - $65/hr",
    duration: "3-6 months",
    tags: ["Figma", "Mobile UI", "Prototyping"],
    posted: "5h ago",
    proposals: 34
  },
  {
    id: 3,
    title: "Content Writer for Eco-Tourism Blog",
    client: "Green Cambodia",
    type: "Fixed Price",
    budget: "$500",
    duration: "2 weeks",
    tags: ["Copywriting", "SEO", "Travel"],
    posted: "1d ago",
    proposals: 8
  }
];

export default function FreelanceMarketplace() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-amber-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Freelance & Creator Network</h1>
                <p className="text-slate-600">Find gigs, hire talent, and build your digital agency</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">Post a Job</Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Find Work</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-900">Category</h4>
                    {["Development", "Design", "Writing", "Marketing", "Video/Animation"].map(cat => (
                      <label key={cat} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" /> {cat}
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-900">Project Type</h4>
                    {["Hourly", "Fixed Price", "Retainer"].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" /> {type}
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search for skills, roles, or project keywords..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                {GIGS.map(gig => (
                  <Card key={gig.id} className="bg-white border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">{gig.title}</h3>
                          <p className="text-sm text-slate-500 mb-4">Posted by <span className="font-medium text-slate-700">{gig.client}</span> • {gig.posted}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {gig.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 md:items-end min-w-[200px]">
                          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg w-fit md:w-full md:justify-between">
                            <DollarSign className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold">{gig.budget}</span>
                            <span className="text-xs text-slate-500 ml-1">({gig.type})</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 px-3 py-1.5 w-fit md:w-full md:justify-between">
                            <Clock className="h-4 w-4" />
                            <span>{gig.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 px-3 py-1.5 w-fit md:w-full md:justify-between">
                            <Users className="h-4 w-4" />
                            <span>{gig.proposals} proposals</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                          <Star className="h-4 w-4 fill-emerald-600" /> Payment Verified
                        </div>
                        <Button variant="ghost" className="text-amber-600 hover:bg-amber-50 hover:text-amber-700">
                          Submit Proposal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}