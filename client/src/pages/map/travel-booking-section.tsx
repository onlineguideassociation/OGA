import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plane, Hotel, Train, Car, Ticket, Package, Search, Calendar, MapPin,
  Users, Star, ArrowRight, X, Globe, Shield, Bell, Gift, TrendingUp,
  Clock, ChevronDown, Heart, Zap, CheckCircle, DollarSign, Languages,
  CreditCard, Smartphone, Award, Filter
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

type BookingTab = "flights" | "hotels" | "trains" | "cars" | "attractions" | "packages";

const TABS: { key: BookingTab; label: string; icon: React.ElementType; color: string }[] = [
  { key: "flights", label: "Flights", icon: Plane, color: "text-blue-500" },
  { key: "hotels", label: "Hotels", icon: Hotel, color: "text-amber-500" },
  { key: "trains", label: "Trains", icon: Train, color: "text-emerald-500" },
  { key: "cars", label: "Car Rental", icon: Car, color: "text-purple-500" },
  { key: "attractions", label: "Attractions", icon: Ticket, color: "text-rose-500" },
  { key: "packages", label: "Packages", icon: Package, color: "text-indigo-500" },
];

const FLIGHTS = [
  { id: 1, airline: "Cambodia Angkor Air", from: "PNH", to: "REP", fromCity: "Phnom Penh", toCity: "Siem Reap", depart: "07:30", arrive: "08:15", duration: "45m", price: 85, stops: "Direct", class: "Economy", logo: "✈️" },
  { id: 2, airline: "AirAsia", from: "PNH", to: "BKK", fromCity: "Phnom Penh", toCity: "Bangkok", depart: "10:00", arrive: "11:15", duration: "1h 15m", price: 62, stops: "Direct", class: "Economy", logo: "🔴" },
  { id: 3, airline: "Vietnam Airlines", from: "REP", to: "SGN", fromCity: "Siem Reap", toCity: "Ho Chi Minh", depart: "14:30", arrive: "16:00", duration: "1h 30m", price: 98, stops: "Direct", class: "Economy", logo: "🟡" },
  { id: 4, airline: "Singapore Airlines", from: "PNH", to: "SIN", fromCity: "Phnom Penh", toCity: "Singapore", depart: "08:45", arrive: "11:55", duration: "2h 10m", price: 189, stops: "Direct", class: "Economy", logo: "🔵" },
  { id: 5, airline: "Thai Smile", from: "PNH", to: "BKK", fromCity: "Phnom Penh", toCity: "Bangkok", depart: "16:20", arrive: "17:35", duration: "1h 15m", price: 78, stops: "Direct", class: "Economy", logo: "🟣" },
  { id: 6, airline: "Malaysia Airlines", from: "PNH", to: "KUL", fromCity: "Phnom Penh", toCity: "Kuala Lumpur", depart: "12:00", arrive: "15:10", duration: "2h 10m", price: 145, stops: "Direct", class: "Economy", logo: "🟠" },
];

const HOTELS_LIST = [
  { id: 1, name: "Raffles Hotel Le Royal", location: "Phnom Penh", stars: 5, rating: 4.9, reviews: 1284, price: 350, originalPrice: 420, image: "🏨", amenities: ["Pool", "Spa", "Restaurant"], type: "Luxury" },
  { id: 2, name: "Shinta Mani Angkor", location: "Siem Reap", stars: 5, rating: 4.8, reviews: 956, price: 220, originalPrice: 280, image: "🌴", amenities: ["Pool", "Spa", "WiFi"], type: "Boutique" },
  { id: 3, name: "Treeline Urban Resort", location: "Siem Reap", stars: 4, rating: 4.7, reviews: 534, price: 95, originalPrice: 130, image: "🌿", amenities: ["Pool", "Bar", "Gym"], type: "Resort" },
  { id: 4, name: "Plantation Urban Resort", location: "Phnom Penh", stars: 4, rating: 4.6, reviews: 412, price: 120, originalPrice: 155, image: "🏙️", amenities: ["Pool", "Restaurant", "Spa"], type: "Urban" },
  { id: 5, name: "Six Senses Krabey Island", location: "Koh Krabey", stars: 5, rating: 4.9, reviews: 312, price: 850, originalPrice: 1050, image: "🏝️", amenities: ["Private Pool", "Beach", "Spa"], type: "Resort" },
  { id: 6, name: "Mad Monkey Hostel", location: "Siem Reap", stars: 2, rating: 4.3, reviews: 2100, price: 12, originalPrice: 15, image: "🐵", amenities: ["Pool", "Bar", "WiFi"], type: "Hostel" },
];

const TRAINS_LIST = [
  { id: 1, route: "Phnom Penh → Sihanoukville", operator: "Royal Railways", depart: "07:00", arrive: "11:30", duration: "4h 30m", price: 8, class: "Standard", seats: 42, image: "🚂" },
  { id: 2, route: "Phnom Penh → Kampot", operator: "Royal Railways", depart: "08:15", arrive: "12:00", duration: "3h 45m", price: 7, class: "Standard", seats: 28, image: "🚃" },
  { id: 3, route: "Phnom Penh → Battambang", operator: "Royal Railways", depart: "06:30", arrive: "13:00", duration: "6h 30m", price: 9, class: "Standard", seats: 35, image: "🚂" },
  { id: 4, route: "Bangkok → Siem Reap", operator: "Cross-Border Express", depart: "07:00", arrive: "15:00", duration: "8h", price: 25, class: "First Class", seats: 12, image: "🚄" },
];

const CARS_LIST = [
  { id: 1, name: "Toyota Camry", type: "Sedan", passengers: 4, luggage: 2, price: 35, perDay: true, provider: "SafeRide Cambodia", image: "🚗", features: ["AC", "GPS", "Insurance"] },
  { id: 2, name: "Toyota Innova", type: "MPV", passengers: 7, luggage: 4, price: 55, perDay: true, provider: "Cambodia Rentals", image: "🚐", features: ["AC", "GPS", "Driver Option"] },
  { id: 3, name: "Lexus RX", type: "SUV", passengers: 5, luggage: 3, price: 95, perDay: true, provider: "Luxury Drive KH", image: "🚙", features: ["AC", "GPS", "Premium Insurance"] },
  { id: 4, name: "Tuk-Tuk Full Day", type: "Tuk-Tuk", passengers: 3, luggage: 1, price: 15, perDay: true, provider: "Local Tuk-Tuk Network", image: "🛺", features: ["Local Driver", "Flexible Route"] },
  { id: 5, name: "Airport Transfer", type: "Transfer", passengers: 4, luggage: 3, price: 12, perDay: false, provider: "SafeRide Cambodia", image: "🚕", features: ["AC", "Meet & Greet", "Fixed Price"] },
];

const ATTRACTIONS_LIST = [
  { id: 1, name: "Angkor Wat 3-Day Pass", location: "Siem Reap", price: 62, originalPrice: 72, rating: 4.9, reviews: 4521, image: "🏛️", category: "Heritage", includes: ["3-day access", "All temples", "Sunrise entry"] },
  { id: 2, name: "Phare Cambodian Circus", location: "Siem Reap", price: 18, originalPrice: 25, rating: 4.8, reviews: 2340, image: "🎪", category: "Entertainment", includes: ["1 show", "Reserved seating", "Drink"] },
  { id: 3, name: "Tonle Sap Floating Village", location: "Siem Reap", price: 25, originalPrice: 32, rating: 4.6, reviews: 1890, image: "🛶", category: "Nature", includes: ["Boat tour", "Village visit", "Guide"] },
  { id: 4, name: "Royal Palace & Silver Pagoda", location: "Phnom Penh", price: 10, originalPrice: 12, rating: 4.7, reviews: 3200, image: "👑", category: "Heritage", includes: ["Entry ticket", "Audio guide"] },
  { id: 5, name: "Kampot Pepper Farm Tour", location: "Kampot", price: 15, originalPrice: 20, rating: 4.8, reviews: 567, image: "🌶️", category: "Food & Culture", includes: ["Farm tour", "Tasting", "Souvenir pepper"] },
  { id: 6, name: "Koh Rong Island Day Trip", location: "Sihanoukville", price: 45, originalPrice: 60, rating: 4.5, reviews: 1234, image: "🏖️", category: "Beach", includes: ["Boat transfer", "Lunch", "Snorkeling gear"] },
];

const PACKAGES_LIST = [
  { id: 1, name: "Cambodia Highlights 7-Day", destinations: ["Phnom Penh", "Siem Reap", "Sihanoukville"], price: 899, originalPrice: 1299, rating: 4.9, reviews: 456, image: "🇰🇭", includes: ["Hotels", "Flights", "Tours", "Transfers"], days: 7, groupSize: "2-12" },
  { id: 2, name: "Angkor Explorer 4-Day", destinations: ["Siem Reap"], price: 449, originalPrice: 599, rating: 4.8, reviews: 789, image: "🏛️", includes: ["Hotel", "Temple Pass", "Guide", "Meals"], days: 4, groupSize: "2-8" },
  { id: 3, name: "SE Asia Grand Tour 14-Day", destinations: ["Cambodia", "Vietnam", "Thailand"], price: 2199, originalPrice: 3200, rating: 4.7, reviews: 234, image: "🌏", includes: ["Hotels", "Flights", "Tours", "Meals"], days: 14, groupSize: "4-16" },
  { id: 4, name: "Beach & Culture 5-Day", destinations: ["Siem Reap", "Koh Rong"], price: 599, originalPrice: 799, rating: 4.6, reviews: 345, image: "🏝️", includes: ["Hotels", "Transfers", "Tours", "Beach Day"], days: 5, groupSize: "2-10" },
];

export default function TravelBookingSection() {
  const [activeTab, setActiveTab] = useState<BookingTab>("flights");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [showBooking, setShowBooking] = useState<{ type: string; item: any } | null>(null);
  const { toast } = useToast();

  const toggleSave = (key: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleBook = () => {
    toast({ title: "Booking confirmed!", description: "Check your email for confirmation details." });
    setShowBooking(null);
  };

  return (
    <div className="space-y-6" data-testid="travel-booking-section">
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-3 text-white bg-gradient-to-r from-[#0081C9] to-blue-700 border-0 px-4 py-1.5 text-xs font-semibold shadow-sm">
          <Globe className="h-3 w-3 mr-1.5" /> Integrated Travel Booking
        </Badge>
        <h2 className="text-xl font-bold text-slate-900 mb-1" data-testid="text-booking-title">
          All-in-One Travel Booking
        </h2>
        <p className="text-sm text-slate-500">
          Flights, hotels, trains, car rentals, attractions, and vacation packages — all in one place. Powered by OnlineGuide.io.
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {TABS.map(({ key, label, icon: Icon, color }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              activeTab === key ? "bg-[#0081C9] text-white border-[#0081C9] shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-[#0081C9]/50"
            }`}
            data-testid={`tab-${key}`}>
            <Icon className={`h-5 w-5 ${activeTab === key ? "text-white" : color}`} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </div>

      <Card className="border-[#0081C9]/20 bg-gradient-to-r from-[#0081C9]/5 to-blue-500/5">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {activeTab === "flights" && (
              <>
                <div className="flex-1 flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
                  <Plane className="h-4 w-4 text-slate-400" />
                  <input placeholder="From (e.g. Phnom Penh)" className="flex-1 text-sm bg-transparent outline-none" data-testid="input-flight-from" />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <input placeholder="To (e.g. Bangkok)" className="flex-1 text-sm bg-transparent outline-none" data-testid="input-flight-to" />
                </div>
              </>
            )}
            {activeTab === "hotels" && (
              <div className="flex-1 flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <input placeholder="City or hotel name" className="flex-1 text-sm bg-transparent outline-none" data-testid="input-hotel-search" />
              </div>
            )}
            {(activeTab === "trains" || activeTab === "cars" || activeTab === "attractions" || activeTab === "packages") && (
              <div className="flex-1 flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input placeholder={`Search ${activeTab}...`} className="flex-1 text-sm bg-transparent outline-none" data-testid={`input-search-${activeTab}`} />
              </div>
            )}
            <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <input type="date" className="text-sm bg-transparent outline-none" data-testid="input-date" />
            </div>
            <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
              <Users className="h-4 w-4 text-slate-400" />
              <select className="text-sm bg-transparent outline-none" data-testid="select-guests">
                <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4+ Guests</option>
              </select>
            </div>
            <Button className="bg-[#0081C9] hover:bg-[#006da8] text-white font-bold px-6 rounded-lg" data-testid="btn-search-booking">
              <Search className="h-4 w-4 mr-1.5" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {activeTab === "flights" && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">{FLIGHTS.length} flights found</h3>
          {FLIGHTS.map(f => (
            <Card key={f.id} className="hover:border-[#0081C9]/30 transition-all hover:shadow-md" data-testid={`card-flight-${f.id}`}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="text-center flex-shrink-0">
                    <span className="text-2xl">{f.logo}</span>
                    <div className="text-[9px] text-slate-500 mt-0.5">{f.airline}</div>
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{f.depart}</div>
                      <div className="text-xs text-slate-500">{f.from}</div>
                      <div className="text-[9px] text-slate-400">{f.fromCity}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-[9px] text-slate-400">{f.duration}</div>
                      <div className="w-full h-px bg-slate-200 relative my-1">
                        <Plane className="h-3 w-3 text-[#0081C9] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                      </div>
                      <div className="text-[9px] text-emerald-600 font-medium">{f.stops}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{f.arrive}</div>
                      <div className="text-xs text-slate-500">{f.to}</div>
                      <div className="text-[9px] text-slate-400">{f.toCity}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-[#0081C9]">${f.price}</div>
                    <div className="text-[9px] text-slate-400">{f.class}</div>
                    <Button onClick={() => setShowBooking({ type: "flight", item: f })} size="sm" className="mt-2 bg-[#0081C9] hover:bg-[#006da8] text-white text-xs font-bold h-8 px-4 rounded-lg" data-testid={`btn-book-flight-${f.id}`}>
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOTELS_LIST.map(h => (
            <Card key={h.id} className="overflow-hidden hover:shadow-lg transition-all group" data-testid={`card-hotel-${h.id}`}>
              <div className="h-36 bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform">{h.image}</span>
                <button onClick={() => toggleSave(`hotel-${h.id}`)} className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center ${savedIds.has(`hotel-${h.id}`) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-400"}`}>
                  <Heart className={`h-3.5 w-3.5 ${savedIds.has(`hotel-${h.id}`) ? "fill-current" : ""}`} />
                </button>
                <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0 text-[9px]">{h.type}</Badge>
                {h.originalPrice > h.price && <Badge className="absolute bottom-2 left-2 bg-[#C1121F] text-white border-0 text-[9px]">-{Math.round((1 - h.price / h.originalPrice) * 100)}% OFF</Badge>}
              </div>
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-1">{Array.from({ length: h.stars }).map((_, i) => <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />)}</div>
                <h3 className="text-sm font-bold text-slate-900">{h.name}</h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3" /> {h.location}</div>
                <div className="flex items-center gap-1.5 flex-wrap">{h.amenities.map(a => <Badge key={a} variant="outline" className="text-[8px] px-1.5 py-0">{a}</Badge>)}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">${h.originalPrice}</span>
                    <span className="text-lg font-bold text-[#0081C9] ml-1">${h.price}</span>
                    <span className="text-[9px] text-slate-400">/night</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {h.rating} <span className="text-slate-400">({h.reviews})</span></div>
                </div>
                <Button onClick={() => setShowBooking({ type: "hotel", item: h })} className="w-full bg-[#0081C9] hover:bg-[#006da8] text-white text-xs font-bold h-8 rounded-lg" data-testid={`btn-book-hotel-${h.id}`}>Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "trains" && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800">{TRAINS_LIST.length} routes available</h3>
          {TRAINS_LIST.map(t => (
            <Card key={t.id} className="hover:border-emerald-200 transition-all" data-testid={`card-train-${t.id}`}>
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{t.image}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900">{t.route}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1">
                      <span>{t.operator}</span>
                      <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {t.depart} → {t.arrive}</span>
                      <span>{t.duration}</span>
                      <Badge variant="outline" className="text-[8px]">{t.class}</Badge>
                      <span>{t.seats} seats left</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-600">${t.price}</div>
                    <Button onClick={() => setShowBooking({ type: "train", item: t })} size="sm" className="mt-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold h-8 px-4 rounded-lg" data-testid={`btn-book-train-${t.id}`}>Book</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "cars" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARS_LIST.map(c => (
            <Card key={c.id} className="hover:shadow-lg transition-all" data-testid={`card-car-${c.id}`}>
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{c.image}</span>
                  <Badge className="bg-purple-50 text-purple-600 border-purple-100 text-[9px]">{c.type}</Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                <div className="text-[10px] text-slate-500">{c.provider}</div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span><Users className="h-3 w-3 inline mr-0.5" /> {c.passengers}</span>
                  <span>🧳 {c.luggage}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">{c.features.map(f => <Badge key={f} variant="outline" className="text-[8px] px-1.5 py-0">{f}</Badge>)}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-bold text-purple-600">${c.price}</span>
                    <span className="text-[9px] text-slate-400">/{c.perDay ? "day" : "trip"}</span>
                  </div>
                  <Button onClick={() => setShowBooking({ type: "car", item: c })} size="sm" className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold h-8 px-4 rounded-lg" data-testid={`btn-book-car-${c.id}`}>Rent</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "attractions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATTRACTIONS_LIST.map(a => (
            <Card key={a.id} className="overflow-hidden hover:shadow-lg transition-all group" data-testid={`card-attraction-${a.id}`}>
              <div className="h-32 bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center relative">
                <span className="text-5xl group-hover:scale-110 transition-transform">{a.image}</span>
                <Badge className="absolute top-2 left-2 bg-rose-500 text-white border-0 text-[9px]">{a.category}</Badge>
                {a.originalPrice > a.price && <Badge className="absolute top-2 right-2 bg-[#C1121F] text-white border-0 text-[9px]">Save ${a.originalPrice - a.price}</Badge>}
              </div>
              <CardContent className="p-3 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{a.name}</h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3" /> {a.location}</div>
                <div className="space-y-0.5">{a.includes.map(i => <div key={i} className="flex items-center gap-1 text-[9px] text-slate-500"><CheckCircle className="h-2.5 w-2.5 text-emerald-500" /> {i}</div>)}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">${a.originalPrice}</span>
                    <span className="text-lg font-bold text-rose-600 ml-1">${a.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs"><Star className="h-3 w-3 text-amber-400 fill-amber-400" /> {a.rating}</div>
                </div>
                <Button onClick={() => setShowBooking({ type: "attraction", item: a })} className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold h-8 rounded-lg" data-testid={`btn-book-attr-${a.id}`}>Get Tickets</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PACKAGES_LIST.map(p => (
            <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-all group" data-testid={`card-package-${p.id}`}>
              <div className="h-40 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center relative">
                <span className="text-6xl group-hover:scale-110 transition-transform">{p.image}</span>
                <Badge className="absolute top-2 left-2 bg-indigo-500 text-white border-0 text-[9px]">{p.days} Days</Badge>
                <Badge className="absolute top-2 right-2 bg-[#C1121F] text-white border-0 text-[9px]">Save ${p.originalPrice - p.price}</Badge>
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin className="h-3 w-3" /> {p.destinations.join(" → ")}</div>
                <div className="flex items-center gap-1.5 flex-wrap">{p.includes.map(i => <Badge key={i} variant="outline" className="text-[8px] px-1.5 py-0 text-emerald-600 border-emerald-200"><CheckCircle className="h-2.5 w-2.5 mr-0.5" /> {i}</Badge>)}</div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span><Users className="h-3 w-3 inline mr-0.5" /> {p.groupSize} people</span>
                  <span><Star className="h-3 w-3 inline text-amber-400 fill-amber-400" /> {p.rating} ({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">${p.originalPrice}</span>
                    <span className="text-2xl font-bold text-indigo-600 ml-1">${p.price}</span>
                    <span className="text-[9px] text-slate-400">/person</span>
                  </div>
                  <Button onClick={() => setShowBooking({ type: "package", item: p })} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold h-10 px-5 rounded-lg" data-testid={`btn-book-pkg-${p.id}`}>Book Package</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Shield, label: "Secure Payments", desc: "SSL encrypted transactions", color: "text-emerald-500", bg: "from-emerald-50" },
          { icon: Languages, label: "Multi-Language", desc: "EN, KH, CN, JP, FR support", color: "text-blue-500", bg: "from-blue-50" },
          { icon: Bell, label: "Price Alerts", desc: "Get notified of price drops", color: "text-amber-500", bg: "from-amber-50" },
          { icon: Gift, label: "Loyalty Rewards", desc: "Earn points on every booking", color: "text-purple-500", bg: "from-purple-50" },
        ].map(f => (
          <Card key={f.label} className={`bg-gradient-to-br ${f.bg} to-white`}>
            <CardContent className="pt-4 text-center space-y-1">
              <f.icon className={`h-5 w-5 ${f.color} mx-auto`} />
              <h4 className="text-xs font-bold text-slate-900">{f.label}</h4>
              <p className="text-[9px] text-slate-500">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0081C9] to-blue-700 px-6 py-4 text-white relative">
              <button onClick={() => setShowBooking(null)} className="absolute top-3 right-3 text-white/70 hover:text-white" data-testid="btn-close-booking-modal"><X className="h-5 w-5" /></button>
              <div className="flex items-center gap-2 mb-1"><CreditCard className="h-5 w-5" /><span className="font-bold">Complete Booking</span></div>
              <p className="text-sm text-white/80">{showBooking.item.name || showBooking.item.airline || showBooking.item.route}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-600">Item</span><span className="font-bold text-slate-900">{showBooking.item.name || showBooking.item.airline || showBooking.item.route}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">Price</span><span className="font-bold text-[#0081C9]">${showBooking.item.price}</span></div>
                <div className="flex justify-between text-xs text-slate-400"><span>Service fee</span><span>${Math.round(showBooking.item.price * 0.05)}</span></div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200"><span>Total</span><span className="text-[#0081C9]">${showBooking.item.price + Math.round(showBooking.item.price * 0.05)}</span></div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]" data-testid="input-booking-name" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0081C9]" data-testid="input-booking-email" />
              </div>
              <Button onClick={handleBook} className="w-full bg-[#0081C9] hover:bg-[#006da8] text-white font-bold h-11 rounded-xl" data-testid="btn-confirm-booking">
                <Zap className="h-4 w-4 mr-2" /> Confirm Booking — ${showBooking.item.price + Math.round(showBooking.item.price * 0.05)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
