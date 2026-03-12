import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Star, Hotel, Calendar, Users, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Hotel as HotelType } from "@shared/schema";

export default function HotelsSearch() {
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("Oct 15 - Oct 20");
  const [guests, setGuests] = useState("2 Adults, 1 Room");
  const { toast } = useToast();

  const { data: hotels = [], isLoading } = useQuery<HotelType[]>({
    queryKey: ["/api/hotels", searchLocation],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchLocation) params.set("location", searchLocation);
      const res = await fetch(`/api/hotels?${params}`);
      if (!res.ok) throw new Error("Failed to fetch hotels");
      return res.json();
    },
  });

  const bookMutation = useMutation({
    mutationFn: async (hotel: HotelType) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hotel",
          referenceId: hotel.id,
          referenceName: hotel.name,
          checkIn: "2026-10-15",
          checkOut: "2026-10-20",
          guests: 2,
          totalPrice: hotel.price * 5,
          status: "confirmed",
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Booking Confirmed!", description: "Your hotel reservation has been created." });
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
            <Hotel className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900" data-testid="text-hotels-title">Global Hotel Search</h1>
              <p className="text-slate-600">Find and book accommodations across the globe with RDTB integration</p>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur border-none shadow-md">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      data-testid="input-hotel-destination"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Dates</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Check-in - Check-out"
                      className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      data-testid="input-hotel-dates"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Guests & Rooms"
                      className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      data-testid="input-hotel-guests"
                    />
                  </div>
                </div>
                <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-search-hotels">
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Price Range</label>
                    <input type="range" className="w-full" />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$0</span><span>$1000+</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 block">Property Type</label>
                    {["Hotels", "Resorts", "Villas", "Apartments"].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" className="rounded border-slate-300" /> {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-3 text-slate-600">Searching hotels...</span>
                </div>
              ) : hotels.length === 0 ? (
                <div className="text-center py-20 text-slate-500">No hotels found. Try adjusting your search.</div>
              ) : (
                hotels.map(hotel => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`hotel-card-${hotel.id}`}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-64 bg-slate-100 flex items-center justify-center text-6xl h-48 sm:h-auto border-r border-slate-100">
                        {hotel.image}
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs bg-slate-50">{hotel.type}</Badge>
                                {hotel.ecoCertified && (
                                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">Eco-Certified</Badge>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
                              <p className="text-sm text-slate-500 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" /> {hotel.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-1 mb-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-slate-900">{hotel.rating}</span>
                              </div>
                              <span className="text-xs text-slate-500">{hotel.reviews} reviews</span>
                            </div>
                          </div>
                          {hotel.description && <p className="text-sm text-slate-600 mt-2">{hotel.description}</p>}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {(hotel.amenities || []).slice(0, 4).map(amenity => (
                              <Badge key={amenity} variant="outline" className="text-xs text-slate-600 border-slate-200">{amenity}</Badge>
                            ))}
                            {(hotel.amenities || []).length > 4 && (
                              <Badge variant="outline" className="text-xs text-slate-500 border-slate-200 bg-slate-50">+{(hotel.amenities || []).length - 4} more</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-100">
                          <div>
                            <p className="text-2xl font-bold text-slate-900">${hotel.price}</p>
                            <p className="text-xs text-slate-500">per night, incl. taxes</p>
                          </div>
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            onClick={() => bookMutation.mutate(hotel)}
                            disabled={bookMutation.isPending}
                            data-testid={`button-book-hotel-${hotel.id}`}
                          >
                            {bookMutation.isPending ? "Booking..." : "Book Now"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
