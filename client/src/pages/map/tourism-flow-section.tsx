import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Hotel as HotelIcon, Utensils, CalendarDays, Clock, Users, Star,
  Navigation, Zap, Globe, Volume2, Loader2, Search, Calendar, Gift,
  Building, Building2, Video, ArrowRight, Mic, Plane
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Hotel, Restaurant, Itinerary, Event } from "@shared/schema";

type FlowTab = "itineraries" | "hotels" | "dining" | "conferences";

const FLOW_TABS: { key: FlowTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "itineraries", label: "Travel OS", icon: MapPin, color: "text-emerald-600" },
  { key: "hotels", label: "Hotels", icon: HotelIcon, color: "text-blue-600" },
  { key: "dining", label: "Dining & Loyalty", icon: Utensils, color: "text-red-600" },
  { key: "conferences", label: "Conferences", icon: CalendarDays, color: "text-indigo-600" },
];

export default function TourismFlowSection() {
  const [activeTab, setActiveTab] = useState<FlowTab>("itineraries");
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("Oct 15 - Oct 20");
  const [guests, setGuests] = useState("2 Adults, 1 Room");
  const [selectedItineraryId, setSelectedItineraryId] = useState<number | null>(null);
  const [savedItineraries, setSavedItineraries] = useState<number[]>([]);
  const { toast } = useToast();

  const { data: itineraries = [], isLoading: itLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
    queryFn: async () => { const r = await fetch("/api/itineraries"); if (!r.ok) throw new Error("Fail"); return r.json(); },
  });

  const { data: hotels = [], isLoading: htLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels", searchLocation],
    queryFn: async () => { const p = new URLSearchParams(); if (searchLocation) p.set("location", searchLocation); const r = await fetch(`/api/hotels?${p}`); if (!r.ok) throw new Error("Fail"); return r.json(); },
  });

  const { data: restaurants = [], isLoading: rsLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants", searchLocation],
    queryFn: async () => { const p = new URLSearchParams(); if (searchLocation) p.set("location", searchLocation); const r = await fetch(`/api/restaurants?${p}`); if (!r.ok) throw new Error("Fail"); return r.json(); },
  });

  const { data: events = [], isLoading: evLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => { const r = await fetch("/api/events"); if (!r.ok) throw new Error("Fail"); return r.json(); },
  });

  const bookMutation = useMutation({
    mutationFn: async (body: Record<string, unknown>) => {
      const r = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error("Booking failed");
      return r.json();
    },
    onSuccess: (_d, vars: any) => {
      const labels: Record<string, string> = { hotel: "Hotel Booked!", restaurant: "Table Reserved!", itinerary: "Experience Booked!", event: "Registered!" };
      toast({ title: labels[vars.type] || "Confirmed!", description: "Your booking has been created." });
    },
  });

  const selectedItinerary = itineraries.find(i => i.id === selectedItineraryId) || itineraries[0] || null;
  const sites = (selectedItinerary?.sites || []) as Array<{ name: string; description: string; duration: string }>;
  const saveItinerary = (id: number) => setSavedItineraries(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const featuredEvent = events.find(e => e.featured);
  const upcomingEvents = events.filter(e => !e.featured);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plane className="h-6 w-6 text-[#0081C9]" />
            <h1 className="text-2xl font-bold text-slate-900" data-testid="text-tourism-flow-title">Tourism Flow</h1>
          </div>
          <p className="text-sm text-slate-500">Itineraries, Hotels, Dining & Events — All in One</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-none text-xs">
          <span className="relative flex h-1.5 w-1.5 mr-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
          Live Data
        </Badge>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
        {FLOW_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
              data-testid={`flow-tab-${tab.key}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? tab.color : ""}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "itineraries" && (
        <div className="space-y-5">
          <div className="flex gap-3">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" data-testid="button-create-itinerary">
              <Zap className="h-4 w-4 mr-2" /> Create Custom Itinerary
            </Button>
          </div>
          {itLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-emerald-500" /><span className="ml-3 text-slate-600">Loading itineraries...</span></div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-2">
                <h2 className="font-semibold text-slate-900 text-sm mb-3">Available Itineraries</h2>
                {itineraries.map(it => (
                  <button key={it.id} onClick={() => setSelectedItineraryId(it.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${selectedItinerary?.id === it.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"}`}
                    data-testid={`itinerary-${it.id}`}>
                    <h3 className="font-semibold text-sm mb-1">{it.title}</h3>
                    <div className="flex gap-2 mb-1">
                      <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" /> {it.duration}</Badge>
                      <Badge variant={it.difficulty === "Easy" ? "outline" : "secondary"} className="text-xs">{it.difficulty}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">${it.price}</span>
                      <button onClick={e => { e.stopPropagation(); saveItinerary(it.id); }} className="text-sm text-amber-500" data-testid={`save-itinerary-${it.id}`}>
                        {savedItineraries.includes(it.id) ? "★" : "☆"}
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
                            <Badge className="bg-emerald-100 text-emerald-700"><Clock className="h-3 w-3 mr-1" /> {selectedItinerary.duration}</Badge>
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
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex items-start gap-2">
                            <Volume2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-sm text-emerald-900">AI Voice Guide Included</h4>
                              <p className="text-xs text-emerald-700 mt-1">GPS-based narration with cultural stories and real-time tips</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2"><Navigation className="h-4 w-4" /> Daily Highlights</h3>
                        <div className="space-y-2">
                          {sites.map((site, idx) => (
                            <div key={idx} className="p-2 bg-slate-50 rounded-lg border-l-3 border-emerald-500">
                              <h4 className="font-semibold text-sm text-slate-900">{site.name}</h4>
                              <p className="text-xs text-slate-600 mt-0.5">{site.description}</p>
                              <p className="text-xs text-slate-500 mt-1"><Clock className="h-3 w-3 inline mr-1" /> {site.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => bookMutation.mutate({ type: "itinerary", referenceId: selectedItinerary.id, referenceName: selectedItinerary.title, totalPrice: selectedItinerary.price, guests: 1, status: "confirmed" })} disabled={bookMutation.isPending} data-testid="button-book-itinerary">
                          {bookMutation.isPending ? "Booking..." : "Book Experience"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => saveItinerary(selectedItinerary.id)} data-testid="button-save-itinerary">
                          {savedItineraries.includes(selectedItinerary.id) ? "★ Saved" : "☆ Save"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "hotels" && (
        <div className="space-y-5">
          <Card className="bg-white/80 border-none shadow-md">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div className="space-y-1"><label className="text-xs font-medium text-slate-700">Destination</label><div className="relative"><MapPin className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" /><input type="text" placeholder="Where?" className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} data-testid="input-hotel-destination" /></div></div>
                <div className="space-y-1"><label className="text-xs font-medium text-slate-700">Dates</label><div className="relative"><Calendar className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" /><input type="text" className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={checkIn} onChange={e => setCheckIn(e.target.value)} data-testid="input-hotel-dates" /></div></div>
                <div className="space-y-1"><label className="text-xs font-medium text-slate-700">Guests</label><div className="relative"><Users className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" /><input type="text" className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={guests} onChange={e => setGuests(e.target.value)} data-testid="input-hotel-guests" /></div></div>
                <Button className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-sm" data-testid="button-search-hotels"><Search className="h-3.5 w-3.5 mr-1" /> Search</Button>
              </div>
            </CardContent>
          </Card>
          {htLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /><span className="ml-3 text-slate-600">Searching hotels...</span></div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No hotels found. Try a different destination.</div>
          ) : (
            <div className="space-y-4">
              {hotels.map(hotel => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`hotel-card-${hotel.id}`}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 bg-slate-100 flex items-center justify-center text-4xl h-36 sm:h-auto border-r border-slate-100">{hotel.image}</div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <Badge variant="outline" className="text-[10px] bg-slate-50">{hotel.type}</Badge>
                              {hotel.ecoCertified && <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700">Eco</Badge>}
                            </div>
                            <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center mt-0.5"><MapPin className="h-3 w-3 mr-0.5" /> {hotel.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-0.5"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span className="font-bold text-sm">{hotel.rating}</span></div>
                            <span className="text-[10px] text-slate-500">{hotel.reviews} reviews</span>
                          </div>
                        </div>
                        {hotel.description && <p className="text-xs text-slate-600 mt-1">{hotel.description}</p>}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(hotel.amenities || []).slice(0, 3).map(a => <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>)}
                          {(hotel.amenities || []).length > 3 && <Badge variant="outline" className="text-[10px] bg-slate-50">+{(hotel.amenities || []).length - 3}</Badge>}
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-3 pt-3 border-t border-slate-100">
                        <div><p className="text-xl font-bold">${hotel.price}</p><p className="text-[10px] text-slate-500">per night</p></div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={() => bookMutation.mutate({ type: "hotel", referenceId: hotel.id, referenceName: hotel.name, checkIn: "2026-10-15", checkOut: "2026-10-20", guests: 2, totalPrice: hotel.price * 5, status: "confirmed" })} disabled={bookMutation.isPending} data-testid={`button-book-hotel-${hotel.id}`}>
                          {bookMutation.isPending ? "Booking..." : "Book Now"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "dining" && (
        <div className="space-y-5">
          <Card className="bg-white border-none shadow-md">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="space-y-1"><label className="text-xs font-medium text-slate-700">Search</label><div className="relative"><MapPin className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" /><input type="text" placeholder="Location, cuisine, or name" className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} data-testid="input-search-restaurants" /></div></div>
                <div className="space-y-1"><label className="text-xs font-medium text-slate-700">Date & Time</label><div className="relative"><Calendar className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" /><input type="text" placeholder="Today, 19:00" className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm" data-testid="input-restaurant-date" /></div></div>
                <Button className="h-8 bg-red-600 hover:bg-red-700 text-white text-sm" data-testid="button-find-table">Find a Table</Button>
              </div>
            </CardContent>
          </Card>
          {rsLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-red-500" /><span className="ml-3 text-slate-600">Loading restaurants...</span></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {restaurants.map(restaurant => (
                <Card key={restaurant.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`restaurant-card-${restaurant.id}`}>
                  <div className="h-36 bg-slate-100 flex items-center justify-center text-4xl relative">
                    {restaurant.image}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded flex items-center gap-0.5 text-xs font-bold shadow-sm">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {restaurant.rating}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">{restaurant.name}</h3>
                    <p className="text-xs text-slate-500 mb-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
                    {restaurant.description && <p className="text-xs text-slate-600 mb-2">{restaurant.description}</p>}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(restaurant.features || []).map(f => (
                        <Badge key={f} variant="secondary" className="bg-red-50 text-red-700 text-[10px]">
                          {f === "Loyalty Rewards" && <Gift className="h-2.5 w-2.5 mr-0.5" />}{f}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["18:00", "19:00", "20:30"].map(time => (
                        <Button key={time} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 w-full text-xs h-7" onClick={() => bookMutation.mutate({ type: "restaurant", referenceId: restaurant.id, referenceName: restaurant.name, checkIn: `Today ${time}`, guests: 2, status: "confirmed" })} disabled={bookMutation.isPending} data-testid={`button-book-${restaurant.id}-${time}`}>
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "conferences" && (
        <div className="space-y-5">
          {evLoading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /><span className="ml-3 text-slate-600">Loading events...</span></div>
          ) : (
            <>
              {featuredEvent && (
                <Card className="bg-slate-900 text-white border-none shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10"><Building className="h-40 w-40" /></div>
                  <CardContent className="p-6 relative z-10">
                    <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none mb-3">Featured Event</Badge>
                    <h2 className="text-2xl font-bold mb-2">{featuredEvent.title}</h2>
                    <p className="text-slate-300 text-sm mb-4 max-w-xl">{featuredEvent.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-4">
                      <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4 text-indigo-400" /> {featuredEvent.date}</span>
                      {featuredEvent.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-indigo-400" /> {featuredEvent.location}</span>}
                      <span className="flex items-center gap-1"><Users className="h-4 w-4 text-indigo-400" /> {featuredEvent.maxAttendees?.toLocaleString()}+ Capacity</span>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => bookMutation.mutate({ type: "event", referenceId: featuredEvent.id, referenceName: featuredEvent.title, checkIn: featuredEvent.date, guests: 1, status: "registered" })} disabled={bookMutation.isPending} data-testid="button-register-featured">
                        {bookMutation.isPending ? "Registering..." : "Register Now"}
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">View Agenda</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map(event => {
                  const EvIcon = event.type === "In-Person" ? Building : Video;
                  return (
                    <Card key={event.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group" data-testid={`event-card-${event.id}`}>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700">{event.category}</Badge>
                          <EvIcon className="h-5 w-5 text-indigo-500" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                        {event.description && <p className="text-sm text-slate-600 mb-2">{event.description}</p>}
                        <p className="text-xs text-slate-500 mb-3 flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" /> {event.date} • {event.type}</p>
                        <Button variant="ghost" size="sm" className="w-full justify-between p-0 hover:bg-transparent hover:text-indigo-700" onClick={() => bookMutation.mutate({ type: "event", referenceId: event.id, referenceName: event.title, checkIn: event.date, guests: 1, status: "registered" })} disabled={bookMutation.isPending} data-testid={`button-register-event-${event.id}`}>
                          <span>Register</span><ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-2"><CardTitle className="text-base">Content & Research</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { title: "The State of AI in Global Travel 2026", type: "Whitepaper" },
                    { title: "Cross-Border Payments Optimization", type: "Research Report" },
                    { title: "Eco-Tourism Impact Metrics Guide", type: "Playbook" },
                  ].map((doc, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                      <Badge variant="outline" className="text-[10px] mb-1 bg-white">{doc.type}</Badge>
                      <h5 className="font-medium text-sm text-slate-900">{doc.title}</h5>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
}
