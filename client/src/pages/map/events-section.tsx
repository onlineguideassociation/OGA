import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Video, MapPin, Mic, Building, ArrowRight, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@shared/schema";

export default function EventsSection() {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <span className="ml-3 text-slate-600">Loading events...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1" data-testid="text-events-title">Global Industry Conferences & Networking</h1>
        <p className="text-sm text-slate-500">Connecting professionals across tourism, e-commerce, finance, logistics, and technology.</p>
      </div>

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
              <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => registerMutation.mutate(featuredEvent)} disabled={registerMutation.isPending} data-testid="button-register-featured">
                {registerMutation.isPending ? "Registering..." : "Register Now"}
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">View Agenda</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingEvents.map(event => {
          const IconComponent = getEventIcon(event.type);
          return (
            <Card key={event.id} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow group" data-testid={`event-card-${event.id}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">{event.category}</Badge>
                  <IconComponent className="h-5 w-5 text-indigo-500" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                {event.description && <p className="text-sm text-slate-600 mb-2">{event.description}</p>}
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" /> {event.date} • {event.type}
                </p>
                <Button variant="ghost" size="sm" className="w-full justify-between p-0 hover:bg-transparent hover:text-indigo-700" onClick={() => registerMutation.mutate(event)} disabled={registerMutation.isPending} data-testid={`button-register-event-${event.id}`}>
                  <span>Register</span><ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-white border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Content & Research</CardTitle>
        </CardHeader>
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
    </div>
  );
}