import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, BookOpen, Trophy, Award, TrendingUp, Heart } from "lucide-react";

export default function CommunityHub() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Community & Creators Hub</h1>
                <p className="text-slate-600">Connect, learn, and grow with the ecosystem</p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Create Post</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
                      👩‍💻
                    </div>
                    <h3 className="font-bold text-lg">Alex Developer</h3>
                    <p className="text-sm text-slate-500">Level 42 Creator</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Reputation</span>
                      <span className="font-bold text-purple-600">8,450 XP</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-[75%]"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Followers</span>
                      <span className="font-medium">1.2k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-purple-700 bg-purple-50">
                  <MessageSquare className="mr-2 h-4 w-4" /> Discussion Forums
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
                  <BookOpen className="mr-2 h-4 w-4" /> Masterclasses
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
                  <Trophy className="mr-2 h-4 w-4" /> Challenges
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
                  <Award className="mr-2 h-4 w-4" /> Memberships
                </Button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex gap-4 border-b border-slate-200 pb-px">
                <button className="px-4 py-2 font-medium text-purple-600 border-b-2 border-purple-600">Trending Now</button>
                <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">Latest Courses</button>
                <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">My Network</button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    author: "Sarah J.",
                    role: "Tourism Operator",
                    avatar: "👩‍💼",
                    time: "2h ago",
                    title: "How we increased bookings by 40% using the RDTB predictive model",
                    content: "Wanted to share some insights from our recent campaign targeting the Angkor Wat circuit based on the AI forecasting tool...",
                    likes: 124,
                    comments: 32,
                    tags: ["Growth", "Case Study", "RDTB"]
                  },
                  {
                    id: 2,
                    author: "David Chen",
                    role: "Tech Lead",
                    avatar: "👨‍💻",
                    time: "5h ago",
                    title: "Building custom integrations with the Marketplace API",
                    content: "I've just published a new mini-course on how to connect your existing inventory system to the OnlineGuide Marketplace...",
                    likes: 89,
                    comments: 14,
                    tags: ["Development", "API", "Tutorial"]
                  },
                  {
                    id: 3,
                    author: "Maya R.",
                    role: "Sustainability Expert",
                    avatar: "🌱",
                    time: "1d ago",
                    title: "Discussion: Standardizing Eco-Metrics across properties",
                    content: "As we roll out the new Sustainability Mapping feature, what core metrics do you think are most important for small operators?",
                    likes: 256,
                    comments: 87,
                    tags: ["Sustainability", "Discussion", "Feature Request"]
                  }
                ].map(post => (
                  <Card key={post.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{post.author}</h4>
                            <Badge variant="secondary" className="text-[10px] bg-slate-100">{post.role}</Badge>
                            <span className="text-xs text-slate-400 ml-auto">{post.time}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
                          <p className="text-slate-600 mb-4">{post.content}</p>
                          <div className="flex items-center gap-2 mb-4">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs border-purple-100 text-purple-700 bg-purple-50">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <Heart className="h-4 w-4" /> {post.likes}
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                              <MessageSquare className="h-4 w-4" /> {post.comments} Comments
                            </button>
                            <button className="flex items-center gap-1 hover:text-green-500 transition-colors ml-auto">
                              <TrendingUp className="h-4 w-4" /> Share
                            </button>
                          </div>
                        </div>
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