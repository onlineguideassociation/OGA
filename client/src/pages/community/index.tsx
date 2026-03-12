import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, BookOpen, Trophy, Award, TrendingUp, Heart, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { CommunityPost } from "@shared/schema";

export default function CommunityHub() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: posts = [], isLoading } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community-posts"],
    queryFn: async () => {
      const res = await fetch("/api/community-posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/community-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: "You",
          authorRole: "Community Member",
          authorAvatar: "👤",
          title: newTitle,
          content: newContent,
          tags: newTags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-posts"] });
      setShowCreateForm(false);
      setNewTitle("");
      setNewContent("");
      setNewTags("");
      toast({ title: "Post Published!", description: "Your post is now live in the community." });
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await fetch(`/api/community-posts/${postId}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to like post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community-posts"] });
    },
  });

  const formatTime = (date: string | Date | null) => {
    if (!date) return "just now";
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900" data-testid="text-community-title">Community & Creators Hub</h1>
                <p className="text-slate-600">Connect, learn, and grow with the ecosystem</p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateForm(!showCreateForm)} data-testid="button-create-post">
              {showCreateForm ? "Cancel" : "Create Post"}
            </Button>
          </div>

          {showCreateForm && (
            <Card className="bg-white border-purple-200 shadow-md">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">Create a New Post</h3>
                <input
                  type="text"
                  placeholder="Post title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  data-testid="input-post-title"
                />
                <textarea
                  placeholder="Share your thoughts, insights, or questions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  data-testid="input-post-content"
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated, e.g. Growth, Tutorial)"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  data-testid="input-post-tags"
                />
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => createMutation.mutate()}
                  disabled={createMutation.isPending || !newTitle || !newContent}
                  data-testid="button-submit-post"
                >
                  <Send className="h-4 w-4 mr-2" /> {createMutation.isPending ? "Publishing..." : "Publish Post"}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">👩‍💻</div>
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
                <Button variant="ghost" className="w-full justify-start text-purple-700 bg-purple-50"><MessageSquare className="mr-2 h-4 w-4" /> Discussion Forums</Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100"><BookOpen className="mr-2 h-4 w-4" /> Masterclasses</Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100"><Trophy className="mr-2 h-4 w-4" /> Challenges</Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100"><Award className="mr-2 h-4 w-4" /> Memberships</Button>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="flex gap-4 border-b border-slate-200 pb-px">
                <button className="px-4 py-2 font-medium text-purple-600 border-b-2 border-purple-600">Trending Now</button>
                <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">Latest Courses</button>
                <button className="px-4 py-2 font-medium text-slate-500 hover:text-slate-700">My Network</button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                  <span className="ml-3 text-slate-600">Loading posts...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map(post => (
                    <Card key={post.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow" data-testid={`community-post-${post.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xl">{post.authorAvatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">{post.authorName}</h4>
                              <Badge variant="secondary" className="text-[10px] bg-slate-100">{post.authorRole}</Badge>
                              <span className="text-xs text-slate-400 ml-auto">{formatTime(post.createdAt)}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{post.title}</h3>
                            <p className="text-slate-600 mb-4">{post.content}</p>
                            <div className="flex items-center gap-2 mb-4">
                              {(post.tags || []).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs border-purple-100 text-purple-700 bg-purple-50">#{tag}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
                              <button
                                className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                onClick={() => likeMutation.mutate(post.id)}
                                data-testid={`button-like-post-${post.id}`}
                              >
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
