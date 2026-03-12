import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, Navigation, Zap, Globe, Volume2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Itinerary } from "@shared/schema";

export default function TravelOSModule() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<number[]>([]);
  const [language, setLanguage] = useState("English");
  const [useAIGuide, setUseAIGuide] = useState(true);
  const { toast } = useToast();

  const { data: itineraries = [], isLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
    queryFn: async () => {
      const res = await fetch("/api/itineraries");
      if (!res.ok) throw new Error("Failed to fetch itineraries");
      return res.json();
    },
  });

  const selectedItinerary = itineraries.find(i => i.id === selectedId) || itineraries[0] || null;

  const bookMutation = useMutation({
    mutationFn: async (itinerary: Itinerary) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "itinerary",
          referenceId: itinerary.id,
          referenceName: itinerary.title,
          totalPrice: itinerary.price,
          guests: 1,
          status: "confirmed",
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Experience Booked!", description: "Your itinerary has been confirmed." });
    },
  });

  const saveItinerary = (id: number) => {
    setSavedItineraries(
      savedItineraries.includes(id)
        ? savedItineraries.filter(i => i !== id)
        : [...savedItineraries, id]
    );
  };

  const languages = ["English", "Khmer", "French", "Chinese", "Japanese", "Korean"];
  const sites = (selectedItinerary?.sites || []) as Array<{ name: string; description: string; duration: string }>;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-8 w-8 text-[#2D9B51]" />
              <h1 className="text-4xl font-bold text-slate-900" data-testid="text-travel-title">Travel OS: AI Itinerary Planner</h1>
            </div>
            <p className="text-slate-600">Personalized travel experiences powered by AI, with multilingual guides and trend prediction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" data-testid="select-language">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <input type="checkbox" checked={useAIGuide} onChange={(e) => setUseAIGuide(e.target.checked)} className="rounded" data-testid="checkbox-ai-guide" />
                <span>AI Voice Guide</span>
              </label>
            </div>
            <Button className="bg-[#2D9B51] hover:bg-green-700 w-full" data-testid="button-create-itinerary">
              <Zap className="h-4 w-4 mr-2" /> Create Custom Itinerary
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              <span className="ml-3 text-slate-600">Loading itineraries...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-3">
                <h2 className="font-semibold text-slate-900 mb-4">Available Itineraries</h2>
                {itineraries.map(itinerary => (
                  <button
                    key={itinerary.id}
                    onClick={() => setSelectedId(itinerary.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${selectedItinerary?.id === itinerary.id ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white hover:border-green-300'}`}
                    data-testid={`itinerary-${itinerary.id}`}
                  >
                    <h3 className="font-semibold text-sm mb-1">{itinerary.title}</h3>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" /> {itinerary.duration}</Badge>
                      <Badge variant={itinerary.difficulty === 'Easy' ? 'outline' : 'secondary'} className="text-xs">{itinerary.difficulty}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">${itinerary.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); saveItinerary(itinerary.id); }} className="text-sm text-amber-500 hover:text-amber-600" data-testid={`save-itinerary-${itinerary.id}`}>
                        {savedItineraries.includes(itinerary.id) ? '★' : '☆'}
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2">
                {selectedItinerary && (
                  <Card className="bg-white/60 backdrop-blur">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl mb-2">{selectedItinerary.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-100 text-green-700"><Clock className="h-3 w-3 mr-1" /> {selectedItinerary.duration}</Badge>
                            <Badge className="bg-blue-100 text-blue-700"><Users className="h-3 w-3 mr-1" /> {selectedItinerary.difficulty}</Badge>
                            <Badge className="bg-amber-100 text-amber-700 flex items-center"><Star className="h-3 w-3 mr-1 fill-current" /> {selectedItinerary.rating}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-slate-900">${selectedItinerary.price}</p>
                          <p className="text-sm text-slate-500">per person</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {selectedItinerary.description && <p className="text-slate-600">{selectedItinerary.description}</p>}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Globe className="h-5 w-5" /> Available Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {(selectedItinerary.languages || []).map(lang => <Badge key={lang} variant="outline">{lang}</Badge>)}
                        </div>
                      </div>
                      {selectedItinerary.aiGuided && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start gap-3">
                            <Volume2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-900">AI Voice Guide Included</h4>
                              <p className="text-sm text-green-700 mt-1">GPS-based narration with cultural stories, trending tips, and real-time recommendations</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Navigation className="h-5 w-5" /> Daily Highlights</h3>
                        <div className="space-y-3">
                          {sites.map((site, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-lg border-l-4 border-green-500">
                              <h4 className="font-semibold text-slate-900">{site.name}</h4>
                              <p className="text-sm text-slate-600 mt-1">{site.description}</p>
                              <p className="text-xs text-slate-500 mt-2"><Clock className="h-3 w-3 inline mr-1" /> {site.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          className="flex-1 bg-[#2D9B51] hover:bg-green-700"
                          onClick={() => bookMutation.mutate(selectedItinerary)}
                          disabled={bookMutation.isPending}
                          data-testid="button-book-itinerary"
                        >
                          {bookMutation.isPending ? "Booking..." : "Book This Experience"}
                        </Button>
                        <Button variant="outline" onClick={() => saveItinerary(selectedItinerary.id)} data-testid="button-save-itinerary">
                          {savedItineraries.includes(selectedItinerary.id) ? '★ Saved' : '☆ Save'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
