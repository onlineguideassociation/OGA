import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Facebook, MessageSquare, Map, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AIToolsDashboard() {
  const [activeTab, setActiveTab] = useState("tour");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      if (activeTab === "tour") {
        setGeneratedContent(`Discover the soul of Siem Reap on this exclusive 4-hour Angkor Wat sunrise tour. 
        
✨ What You'll Experience:
• Perfect sunrise spots away from the massive crowds
• Hidden jungle paths connecting the main temples
• Authentic Khmer breakfast with a local family
• Deep historical insights from a certified Angkor guide

Trusted by travelers from around the world. Book your spot for an unforgettable morning.`);
      } else if (activeTab === "ad") {
        setGeneratedContent(`🇰🇭 Experience the Magic of Angkor Wat! 🌅

Don't just see the temples, live the history. Our private tours offer a personalized journey through Cambodia's ancient heart. 

Book now for November and get a FREE traditional lunch! 🍜

👉 Message us on WhatsApp to check availability! #SiemReap #AngkorWat #CambodiaTravel`);
      } else {
        setGeneratedContent(`Thank you so much for your kind words! We're thrilled to hear you enjoyed the boat tour and that Captain Mike made your experience special. We hope to welcome you back again soon! 🛥️💙`);
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-64px)] bg-slate-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r hidden md:block p-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">AI Tools</h2>
          <nav className="space-y-2">
            <Button variant={activeTab === "tour" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("tour")}>
              <Map className="mr-2 h-4 w-4" /> Tour Description
            </Button>
            <Button variant={activeTab === "ad" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("ad")}>
              <Facebook className="mr-2 h-4 w-4" /> Ad Generator
            </Button>
            <Button variant={activeTab === "review" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("review")}>
              <MessageSquare className="mr-2 h-4 w-4" /> Review Reply
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-purple-600" /> AI Content Generator
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Input Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {activeTab === "tour" && (
                    <>
                      <div className="space-y-2">
                        <Label>Tour Name</Label>
                        <Input placeholder="e.g. Historic Downtown Walking Tour" />
                      </div>
                      <div className="space-y-2">
                        <Label>Key Highlights (comma separated)</Label>
                        <Textarea placeholder="e.g. Old market, cathedral, food tasting, local history" />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Audience</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="families">Families</SelectItem>
                            <SelectItem value="couples">Couples</SelectItem>
                            <SelectItem value="backpackers">Backpackers</SelectItem>
                            <SelectItem value="luxury">Luxury Travelers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {activeTab === "ad" && (
                    <>
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Select defaultValue="facebook">
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook / Instagram</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Promotion / Offer</Label>
                        <Input placeholder="e.g. 20% off Summer Sale" />
                      </div>
                    </>
                  )}

                  {activeTab === "review" && (
                    <>
                      <div className="space-y-2">
                        <Label>Customer Review</Label>
                        <Textarea placeholder="Paste the customer's review here..." className="min-h-[100px]" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select defaultValue="professional">
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional & Polite</SelectItem>
                            <SelectItem value="friendly">Friendly & Casual</SelectItem>
                            <SelectItem value="apologetic">Apologetic (for bad reviews)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "Generate Content"}
                  </Button>
                </CardContent>
              </Card>

              {/* Output Section */}
              <Card className="bg-slate-900 text-slate-50 border-slate-800">
                <CardHeader className="border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-50">Generated Result</CardTitle>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {generatedContent ? (
                    <div className="prose prose-invert">
                      <p className="whitespace-pre-line leading-relaxed text-slate-300">
                        {generatedContent}
                      </p>
                    </div>
                  ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                      <Wand2 className="h-8 w-8 mb-4 opacity-50" />
                      <p>Fill out the form to generate content</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
