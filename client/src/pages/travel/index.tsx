import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, Navigation, Zap, Globe, Volume2 } from "lucide-react";
import { useState } from "react";

interface Itinerary {
  id: string;
  title: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  sites: { name: string; description: string; duration: string }[];
  price: number;
  rating: number;
  aiGuided: boolean;
  languages: string[];
}

const mockItineraries: Itinerary[] = [
  {
    id: "i1",
    title: "Angkor Temples 3-Day Immersion",
    duration: "3 days",
    difficulty: "Moderate",
    price: 299,
    rating: 4.9,
    aiGuided: true,
    languages: ["English", "Khmer", "French"],
    sites: [
      { name: "Angkor Wat", description: "The world's largest religious monument", duration: "3 hours" },
      { name: "Bayon Temple", description: "Famous for its giant stone faces", duration: "2.5 hours" },
      { name: "Ta Prohm", description: "The 'Tomb Raider' temple with jungle ruins", duration: "2 hours" }
    ]
  },
  {
    id: "i2",
    title: "Phnom Penh Cultural Deep Dive",
    duration: "2 days",
    difficulty: "Easy",
    price: 199,
    rating: 4.7,
    aiGuided: true,
    languages: ["English", "Khmer", "Chinese"],
    sites: [
      { name: "Royal Palace", description: "Seat of the Cambodian monarchy", duration: "2 hours" },
      { name: "Silver Pagoda", description: "Sacred temple with rare treasures", duration: "1.5 hours" },
      { name: "S-21 Memorial", description: "Historical museum & reflection site", duration: "2 hours" }
    ]
  },
  {
    id: "i3",
    title: "Eco-Tourism & Countryside Adventure",
    duration: "4 days",
    difficulty: "Challenging",
    price: 449,
    rating: 4.8,
    aiGuided: true,
    languages: ["English", "Khmer"],
    sites: [
      { name: "Tonle Sap Lake", description: "Southeast Asia's largest freshwater lake", duration: "4 hours" },
      { name: "Floating Villages", description: "Traditional island communities", duration: "3 hours" },
      { name: "Cardamom Mountains", description: "Pristine jungle & wildlife sanctuary", duration: "Full day" }
    ]
  },
  {
    id: "i4",
    title: "Food & Culture Weekend",
    duration: "2 days",
    difficulty: "Easy",
    price: 179,
    rating: 4.8,
    aiGuided: true,
    languages: ["English", "Khmer", "Japanese"],
    sites: [
      { name: "Central Market", description: "Vibrant local food scene", duration: "2 hours" },
      { name: "Cooking Class", description: "Learn traditional Khmer cuisine", duration: "3 hours" },
      { name: "Night Market Tour", description: "Street food & local experiences", duration: "2.5 hours" }
    ]
  }
];

export default function TravelOSModule() {
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(mockItineraries[0]);
  const [savedItineraries, setSavedItineraries] = useState<string[]>([]);
  const [language, setLanguage] = useState("English");
  const [useAIGuide, setUseAIGuide] = useState(true);

  const saveItinerary = (id: string) => {
    setSavedItineraries(
      savedItineraries.includes(id)
        ? savedItineraries.filter(i => i !== id)
        : [...savedItineraries, id]
    );
  };

  const languages = ["English", "Khmer", "French", "Chinese", "Japanese", "Korean"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-8 w-8 text-[#2D9B51]" />
              <h1 className="text-4xl font-bold text-slate-900">Travel OS: AI Itinerary Planner</h1>
            </div>
            <p className="text-slate-600">Personalized travel experiences powered by AI, with multilingual guides and trend prediction</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useAIGuide}
                  onChange={(e) => setUseAIGuide(e.target.checked)}
                  className="rounded"
                />
                <span>AI Voice Guide</span>
              </label>
            </div>

            <Button className="bg-[#2D9B51] hover:bg-green-700 w-full" data-testid="create-custom-itinerary">
              <Zap className="h-4 w-4 mr-2" /> Create Custom Itinerary
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Itineraries List */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="font-semibold text-slate-900 mb-4">Available Itineraries</h2>
              {mockItineraries.map(itinerary => (
                <button
                  key={itinerary.id}
                  onClick={() => setSelectedItinerary(itinerary)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    selectedItinerary?.id === itinerary.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 bg-white hover:border-green-300'
                  }`}
                  data-testid={`itinerary-${itinerary.id}`}
                >
                  <h3 className="font-semibold text-sm mb-1">{itinerary.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" /> {itinerary.duration}
                    </Badge>
                    <Badge variant={itinerary.difficulty === 'Easy' ? 'outline' : 'secondary'} className="text-xs">
                      {itinerary.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900">${itinerary.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveItinerary(itinerary.id);
                      }}
                      className="text-sm text-amber-500 hover:text-amber-600"
                      data-testid={`save-itinerary-${itinerary.id}`}
                    >
                      {savedItineraries.includes(itinerary.id) ? '★' : '☆'}
                    </button>
                  </div>
                </button>
              ))}
            </div>

            {/* Itinerary Details */}
            <div className="lg:col-span-2">
              {selectedItinerary && (
                <Card className="bg-white/60 backdrop-blur">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{selectedItinerary.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-green-100 text-green-700">
                            <Clock className="h-3 w-3 mr-1" /> {selectedItinerary.duration}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700">
                            <Users className="h-3 w-3 mr-1" /> {selectedItinerary.difficulty}
                          </Badge>
                          <Badge className="bg-amber-100 text-amber-700 flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-current" /> {selectedItinerary.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-slate-900">${selectedItinerary.price}</p>
                        <p className="text-sm text-slate-500">per person</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    
                    {/* Languages */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5" /> Available Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItinerary.languages.map(lang => (
                          <Badge key={lang} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Guide */}
                    {selectedItinerary.aiGuided && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                          <Volume2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-900">AI Voice Guide Included</h4>
                            <p className="text-sm text-green-700 mt-1">
                              GPS-based narration with cultural stories, trending tips, and real-time recommendations
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Itinerary */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Navigation className="h-5 w-5" /> Daily Highlights
                      </h3>
                      <div className="space-y-3">
                        {selectedItinerary.sites.map((site, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-semibold text-slate-900">{site.name}</h4>
                            <p className="text-sm text-slate-600 mt-1">{site.description}</p>
                            <p className="text-xs text-slate-500 mt-2">
                              <Clock className="h-3 w-3 inline mr-1" /> {site.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-[#2D9B51] hover:bg-green-700" data-testid="book-itinerary">
                        Book This Experience
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => saveItinerary(selectedItinerary.id)}
                        data-testid="save-selected-itinerary"
                      >
                        {savedItineraries.includes(selectedItinerary.id) ? '★ Saved' : '☆ Save'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
