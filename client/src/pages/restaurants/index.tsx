import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar, MapPin, Star, Gift, Users, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Restaurant } from "@shared/schema";

export default function RestaurantBooking() {
  const [searchLocation, setSearchLocation] = useState("");
  const { toast } = useToast();

  const { data: restaurants = [], isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants", searchLocation],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchLocation) params.set("location", searchLocation);
      const res = await fetch(`/api/restaurants?${params}`);
      if (!res.ok) throw new Error("Failed to fetch restaurants");
      return res.json();
    },
  });

  const bookMutation = useMutation({
    mutationFn: async ({ restaurant, time }: { restaurant: Restaurant; time: string }) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "restaurant",
          referenceId: restaurant.id,
          referenceName: restaurant.name,
          checkIn: `Today ${time}`,
          guests: 2,
          status: "confirmed",
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Table Reserved!", description: "Your reservation has been confirmed." });
    },
  });

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-xl">
                <Utensils className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900" data-testid="text-restaurants-title">Restaurant Booking & Loyalty</h1>
                <p className="text-slate-600">Discover top dining, reserve tables, and earn rewards</p>
              </div>
            </div>
          </div>

          <Card className="bg-white border-none shadow-md overflow-visible">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Search Restaurants</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Location, cuisine, or restaurant name"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      data-testid="input-search-restaurants"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Today, 19:00" className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-red-500 outline-none" data-testid="input-restaurant-date" />
                  </div>
                </div>
                <Button className="w-full h-[44px] bg-red-600 hover:bg-red-700 text-white text-base" data-testid="button-find-table">
                  Find a Table
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold">Your Rewards</h3>
                      <p className="text-sm text-red-100">Gold Tier</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">2,450</span>
                    <span className="text-red-100 ml-2">pts</span>
                  </div>
                  <p className="text-sm text-red-100 mb-4">50 pts away from a $20 dining voucher</p>
                  <Button className="w-full bg-white text-red-600 hover:bg-red-50" data-testid="button-view-offers">View Offers</Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Cuisine Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['Khmer Authentic', 'French Fine Dining', 'Asian Fusion', 'Seafood', 'Vegetarian'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-red-600">
                      <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-500" /> {type}
                    </label>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Featured Restaurants</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                  <span className="ml-3 text-slate-600">Loading restaurants...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {restaurants.map(restaurant => (
                    <Card key={restaurant.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden" data-testid={`restaurant-card-${restaurant.id}`}>
                      <div className="h-48 bg-slate-100 flex items-center justify-center text-6xl relative">
                        {restaurant.image}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 text-sm font-bold shadow-sm">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {restaurant.rating}
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">{restaurant.name}</h3>
                            <p className="text-sm text-slate-500">{restaurant.cuisine} • {restaurant.priceRange}</p>
                          </div>
                        </div>
                        {restaurant.description && <p className="text-sm text-slate-600 mb-3">{restaurant.description}</p>}
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {restaurant.location}</span>
                          <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {restaurant.reviews} reviews</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(restaurant.features || []).map(f => (
                            <Badge key={f} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">
                              {f === 'Loyalty Rewards' && <Gift className="h-3 w-3 mr-1" />}
                              {f}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {['18:00', '19:00', '20:30'].map(time => (
                            <Button
                              key={time}
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 w-full text-sm h-9"
                              onClick={() => bookMutation.mutate({ restaurant, time })}
                              disabled={bookMutation.isPending}
                              data-testid={`button-book-${restaurant.id}-${time}`}
                            >
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
