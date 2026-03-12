import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, GraduationCap, CheckCircle, Search, UserPlus, FileText, Target } from "lucide-react";

export default function HRNetworkingModule() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">Global HR & Networking</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Talent & Recruitment Autobot</h1>
              <p className="text-lg text-slate-600">AI-powered talent matchmaking, skill-gap analysis, and professional certification for the tourism and commerce sectors.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-orange-200 text-orange-700 bg-orange-50"><FileText className="h-4 w-4 mr-2" /> Resume Builder</Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white"><Briefcase className="h-4 w-4 mr-2" /> Post a Job</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">AI Matchmaking Score</h3>
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">94%</h2>
                <p className="text-sm text-slate-500">Your profile matches 12 open roles</p>
                <Button variant="link" className="text-orange-600 p-0 h-auto mt-2 text-sm font-medium">View Top Matches →</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">Active Applications</h3>
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">3</h2>
                <p className="text-sm text-slate-500">2 currently in interview stage</p>
                <Button variant="link" className="text-blue-600 p-0 h-auto mt-2 text-sm font-medium">Track Status →</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-700">Skill Certifications</h3>
                  <GraduationCap className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-1">5 Badges</h2>
                <p className="text-sm text-slate-500">Next: Advanced Hospitality CRM</p>
                <Button variant="link" className="text-emerald-600 p-0 h-auto mt-2 text-sm font-medium">Go to Academy →</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>AI Recommended Roles</span>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search jobs..." 
                        className="pl-8 pr-4 py-1.5 bg-slate-50 border-none rounded-md text-sm outline-none w-48"
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {[
                      { title: "Senior AI Product Manager", company: "TravelOS Inc.", location: "Remote / Cambodia", match: 98, type: "Full-Time" },
                      { title: "E-commerce Operations Lead", company: "Global Dropship Hub", location: "Singapore", match: 92, type: "Full-Time" },
                      { title: "Boutique Hotel General Manager", company: "Heritage Stays", location: "Siem Reap", match: 85, type: "On-site" },
                      { title: "Freelance Content Strategist", company: "OnlineGuide Media", location: "Remote", match: 88, type: "Contract" }
                    ].map((job, i) => (
                      <div key={i} className="p-5 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">{job.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">{job.company} • {job.location}</p>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal">{job.type}</Badge>
                            <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                              <Target className="h-3 w-3 mr-1 inline" /> {job.match}% Match
                            </Badge>
                          </div>
                        </div>
                        <Button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white shrink-0">Easy Apply</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-orange-50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Skill Gap Analysis</CardTitle>
                  <CardDescription>Based on your target role: Product Manager</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">Agile Methodologies</span>
                      <span className="text-emerald-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Verified</span>
                    </div>
                    <div className="w-full bg-orange-100 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full w-[100%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">AI Prompt Engineering</span>
                      <span className="text-orange-600 text-xs font-bold">Needs Work</span>
                    </div>
                    <div className="w-full bg-orange-100 h-1.5 rounded-full"><div className="bg-orange-500 h-1.5 rounded-full w-[40%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">Data Analytics (SQL)</span>
                      <span className="text-orange-600 text-xs font-bold">Recommended</span>
                    </div>
                    <div className="w-full bg-orange-100 h-1.5 rounded-full"><div className="bg-orange-500 h-1.5 rounded-full w-[20%]"></div></div>
                  </div>
                  <Button variant="outline" className="w-full mt-2 bg-white hover:bg-orange-100 border-orange-200 text-orange-700">Take Suggested Courses</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 text-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Recruit Talent</h4>
                      <p className="text-sm text-slate-400">Let Autobot find candidates</p>
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 border-none">Create AI Job Listing</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}