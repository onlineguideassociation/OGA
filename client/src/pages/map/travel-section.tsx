import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, Navigation, Zap, Globe, Volume2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Itinerary } from "@shared/schema";

export default function TravelSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<number[]>([]);
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

  const sites = (selectedItinerary?.sites || []) as Array<{ name: string; description: string; duration: string }>;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
        <span className="ml-3 text-slate-600">Loading itineraries...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-6 w-6 text-[#2D9B51]" />
          <h1 className="text-2xl font-bold text-slate-900" data-testid="text-travel-title">Travel OS: AI Itinerary Planner</h1>
        </div>
        <p className="text-sm text-slate-500">Personalized travel experiences powered by AI</p>
      </div>

      <div className="flex gap-3">
        <Button size="sm" className="bg-[#2D9B51] hover:bg-green-700" data-testid="button-create-itinerary">
          <Zap className="h-4 w-4 mr-2" /> Create Custom Itinerary
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <h2 className="font-semibold text-slate-900 text-sm mb-3">Available Itineraries</h2>
          {itineraries.map(itinerary => (
            <button
              key={itinerary.id}
              onClick={() => setSelectedId(itinerary.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition ${selectedItinerary?.id === itinerary.id ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-white hover:border-green-300'}`}
              data-testid={`itinerary-${itinerary.id}`}
            >
              <h3 className="font-semibold text-sm mb-1">{itinerary.title}</h3>
              <div className="flex gap-2 mb-1">
                <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" /> {itinerary.duration}</Badge>
                <Badge variant={itinerary.difficulty === 'Easy' ? 'outline' : 'secondary'} className="text-xs">{itinerary.difficulty}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900">${itinerary.price}</span>
                <button onClick={(e) => { e.stopPropagation(); saveItinerary(itinerary.id); }} className="text-sm text-amber-500" data-testid={`save-itinerary-${itinerary.id}`}>
                  {savedItineraries.includes(itinerary.id) ? '★' : '☆'}
                </button>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selectedItinerary && (
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{selectedItinerary.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-700"><Clock className="h-3 w-3 mr-1" /> {selectedItinerary.duration}</Badge>
                      <Badge className="bg-blue-100 text-blue-700"><Users className="h-3 w-3 mr-1" /> {selectedItinerary.difficulty}</Badge>
                      <Badge className="bg-amber-100 text-amber-700 flex items-center"><Star className="h-3 w-3 mr-1 fill-current" /> {selectedItinerary.rating}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">${selectedItinerary.price}</p>
                    <p className="text-xs text-slate-500">per person</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedItinerary.description && <p className="text-sm text-slate-600">{selectedItinerary.description}</p>}
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2"><Globe className="h-4 w-4" /> Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {(selectedItinerary.languages || []).map(lang => <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>)}
                  </div>
                </div>
                {selectedItinerary.aiGuided && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <Volume2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-green-900">AI Voice Guide Included</h4>
                        <p className="text-xs text-green-700 mt-1">GPS-based narration with cultural stories and real-time tips</p>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2"><Navigation className="h-4 w-4" /> Daily Highlights</h3>
                  <div className="space-y-2">
                    {sites.map((site, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-lg border-l-3 border-green-500">
                        <h4 className="font-semibold text-sm text-slate-900">{site.name}</h4>
                        <p className="text-xs text-slate-600 mt-0.5">{site.description}</p>
                        <p className="text-xs text-slate-500 mt-1"><Clock className="h-3 w-3 inline mr-1" /> {site.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-[#2D9B51] hover:bg-green-700" onClick={() => bookMutation.mutate(selectedItinerary)} disabled={bookMutation.isPending} data-testid="button-book-itinerary">
                    {bookMutation.isPending ? "Booking..." : "Book Experience"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => saveItinerary(selectedItinerary.id)} data-testid="button-save-itinerary">
                    {savedItineraries.includes(selectedItinerary.id) ? '★ Saved' : '☆ Save'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}