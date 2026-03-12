import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Video, MapPin, Mic, Building, ArrowRight, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@shared/schema";

export default function IndustryEvents() {
  const { toast } = useToast();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (event: Event) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event",
          referenceId: event.id,
          referenceName: event.title,
          checkIn: event.date,
          guests: 1,
          status: "registered",
        }),
      });
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Registered!", description: "You've been registered for this event." });
    },
  });

  const featuredEvent = events.find(e => e.featured);
  const upcomingEvents = events.filter(e => !e.featured);

  const getEventIcon = (type: string | null) => {
    if (type === "In-Person") return Building;
    return Video;
  };

  const getEventColor = (category: string) => {
    const colors: Record<string, string> = {
      "Technology": "text-amber-500",
      "E-commerce": "text-blue-500",
      "Finance": "text-emerald-500",
      "Logistics": "text-purple-500",
    };
    return colors[category] || "text-slate-500";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100">onlineguideassociation.com</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight" data-testid="text-events-title">Global Industry Conferences & Networking</h1>
              <p className="text-lg text-slate-600">Connecting professionals across tourism, e-commerce, finance, logistics, and technology.</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full" data-testid="button-host-event">Host an Event</Button>
              <Button variant="outline" className="w-full">Access Whitepapers</Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              <span className="ml-3 text-slate-600">Loading events...</span>
            </div>
          ) : (
            <>
              {featuredEvent && (
                <Card className="bg-slate-900 text-white border-none shadow-lg overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><Building className="h-64 w-64" /></div>
                  <CardContent className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-6">
                      <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none">Featured Event</Badge>
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{featuredEvent.title}</h2>
                      <p className="text-slate-300 text-lg max-w-xl">{featuredEvent.description}</p>
                      <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-indigo-400" /> {featuredEvent.date}</span>
                        {featuredEvent.location && <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-indigo-400" /> {featuredEvent.location}</span>}
                        <span className="flex items-center gap-2"><Users className="h-5 w-5 text-indigo-400" /> {featuredEvent.maxAttendees?.toLocaleString()}+ Capacity</span>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button
                          className="bg-indigo-500 hover:bg-indigo-600 text-white border-none"
                          onClick={() => registerMutation.mutate(featuredEvent)}
                          disabled={registerMutation.isPending}
                          data-testid="button-register-featured"
                        >
                          {registerMutation.isPending ? "Registering..." : "Register Now"}
                        </Button>
                        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">View Agenda</Button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 space-y-4">
                      <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
                        <h4 className="font-bold mb-4 flex items-center gap-2"><Mic className="h-4 w-4" /> Keynote Speakers</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex justify-between border-b border-white/10 pb-2"><span>CEO, Global OTAs</span> <span className="text-indigo-300">Day 1</span></li>
                          <li className="flex justify-between border-b border-white/10 pb-2"><span>Min. of Tourism</span> <span className="text-indigo-300">Day 1</span></li>
                          <li className="flex justify-between pb-2"><span>Head of AI, BigTech</span> <span className="text-indigo-300">Day 2</span></li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-slate-900">Upcoming Events & Webinars</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="cursor-pointer bg-slate-100">All</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">In-Person</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Virtual</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map(event => {
                      const IconComponent = getEventIcon(event.type);
                      return (
                        <Card key={event.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group" data-testid={`event-card-${event.id}`}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <Badge variant="secondary" className="bg-slate-100 text-slate-700">{event.category}</Badge>
                              <IconComponent className={`h-5 w-5 ${getEventColor(event.category)}`} />
                            </div>
                            <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                            {event.description && <p className="text-sm text-slate-600 mb-3">{event.description}</p>}
                            <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" /> {event.date} • {event.type}
                            </p>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-0 hover:bg-transparent hover:text-indigo-700"
                              onClick={() => registerMutation.mutate(event)}
                              disabled={registerMutation.isPending}
                              data-testid={`button-register-event-${event.id}`}
                            >
                              <span>Register</span>
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="bg-white border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Content & Research</CardTitle>
                      <CardDescription>Latest insights from the association</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { title: "The State of AI in Global Travel 2026", type: "Whitepaper" },
                        { title: "Cross-Border Payments Optimization", type: "Research Report" },
                        { title: "Eco-Tourism Impact Metrics Guide", type: "Playbook" },
                      ].map((doc, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer border border-transparent hover:border-indigo-100">
                          <Badge variant="outline" className="text-[10px] mb-2 bg-white">{doc.type}</Badge>
                          <h5 className="font-medium text-sm text-slate-900">{doc.title}</h5>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">View Knowledge Base</Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-50 border-none shadow-sm">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2"><Users className="h-6 w-6" /></div>
                      <h4 className="font-bold text-slate-900">Join the Association Network</h4>
                      <p className="text-sm text-slate-600">Get exclusive access to VIP events, early research access, and B2B matchmaking.</p>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700" data-testid="button-apply-membership">Apply for Membership</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
