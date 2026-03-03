import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, MessageSquare, Star, Share2, Play, Settings, ArrowRight, Microscope, Wand2, TrendingUp, Globe, Network, BookOpen } from "lucide-react";

export default function AIAgentsDashboard() {
  const agents = [
    {
      id: 1,
      name: "Guiding Intelligence Bot",
      description: "Knowledge Graph + LLM reasoning for behavioral hesitation detection and cultural sensitivity modeling.",
      status: "Active",
      tasks: 124,
      icon: <Bot className="h-5 w-5 text-red-600" />,
      color: "bg-red-50 text-red-600 border-red-200"
    },
    {
      id: 2,
      name: "Tourism OS Agent",
      description: "Monitors destination spikes and competitor trends from TripAdvisor, Booking.com, and TikTok.",
      status: "Active",
      tasks: 45,
      icon: <Globe className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      id: 3,
      name: "Knowledge Graph Mapper",
      description: "Entity relationship management for temples, guides, and hotels to build structured authority.",
      status: "Active",
      tasks: 289,
      icon: <Network className="h-5 w-5 text-emerald-600" />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      id: 4,
      name: "Digital Asset Manager",
      description: "Automated licensing and revenue mapping for cultural books and temple intelligence materials.",
      status: "Active",
      tasks: 384,
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-50 text-purple-600 border-purple-200"
    }
  ];

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Automation</h2>
          <nav className="space-y-2">
            <Button variant="secondary" className="w-full justify-start">
              <Bot className="mr-2 h-4 w-4" /> All Agents
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Global Settings
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" /> AI Agent System
                </h1>
                <p className="text-slate-500">Automate your tourism business 24/7 with Zapier-powered agents.</p>
              </div>
              <Button className="bg-primary text-white">
                <Play className="mr-2 h-4 w-4" /> Launch New Agent
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${agent.color}`}>
                        {agent.icon}
                      </div>
                      <Badge variant={agent.status === "Active" ? "default" : "secondary"} className={agent.status === "Active" ? "bg-emerald-500" : ""}>
                        {agent.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4">{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span className="font-semibold">{agent.tasks}</span> tasks this month
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5">
                      Configure Agent <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="h-32 w-32" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Powered by Zapier AI</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Connect your OnlineGuide.io account with Zapier to unlock over 6,000+ app integrations. Your AI Agents can now talk to Shopify, Telegram, Google Business, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100">
                    Connect Zapier Account
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
