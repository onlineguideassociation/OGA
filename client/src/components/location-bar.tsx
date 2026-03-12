import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, Navigation, Clock, Thermometer, Compass,
  ChevronDown, ChevronUp, Globe, Loader2, X,
  Languages, Wallet, Lightbulb, Map as MapIcon
} from "lucide-react";
import { useGeolocation, type GeoRegion } from "@/hooks/use-geolocation";

function DestinationChip({ dest }: { dest: { name: string; distance: string; type: string } }) {
  return (
    <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 rounded-lg px-2.5 py-1.5 hover:bg-white hover:shadow-sm transition-all">
      <Navigation className="h-3 w-3 text-[#0081C9] flex-shrink-0" />
      <div>
        <div className="text-[10px] font-semibold text-slate-800">{dest.name}</div>
        <div className="text-[9px] text-slate-400">{dest.distance} · {dest.type}</div>
      </div>
    </div>
  );
}

function ExpandedPanel({ region, onClose }: { region: GeoRegion; onClose: () => void }) {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Compass className="h-4 w-4 text-[#0081C9]" />
            Personalized for {region.name}, {region.country}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1" data-testid="btn-close-location-panel">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-[#0081C9]/5 to-transparent border-[#0081C9]/15 shadow-none">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <MapIcon className="h-4 w-4 text-[#0081C9]" />
                <span className="text-xs font-bold text-slate-800">Nearby</span>
              </div>
              <div className="space-y-1.5">
                {region.nearbyDestinations.map((d) => (
                  <DestinationChip key={d.name} dest={d} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#C1121F]/5 to-transparent border-[#C1121F]/15 shadow-none">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-[#C1121F]" />
                <span className="text-xs font-bold text-slate-800">Weather & Season</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <div className="text-xs font-semibold text-slate-800">{region.weather.season}</div>
                  <div className="text-[10px] text-slate-500">{region.weather.temp}</div>
                </div>
                <div className="bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <div className="text-[10px] text-slate-600">{region.weather.tip}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/15 shadow-none">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Local Info</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <Languages className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500">Language</div>
                    <div className="text-xs font-semibold text-slate-800">{region.language}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <Wallet className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500">Currency</div>
                    <div className="text-xs font-semibold text-slate-800">{region.currency}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <Clock className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500">Timezone</div>
                    <div className="text-xs font-semibold text-slate-800">{region.timezone}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/5 to-transparent border-amber-500/15 shadow-none">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-800">Travel Tips</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white/80 rounded-lg p-2 border border-slate-200/80">
                  <div className="text-xs font-semibold text-slate-800 mb-0.5">{region.greeting}</div>
                  <div className="text-[10px] text-slate-500">Local greeting</div>
                </div>
                <div className="bg-white/80 rounded-lg p-2.5 border border-slate-200/80">
                  <div className="text-[10px] text-slate-700 leading-relaxed">{region.travelTip}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {region.highlights.map((h) => (
                    <span key={h} className="px-1.5 py-0.5 bg-amber-50 border border-amber-200/60 rounded text-[9px] text-amber-700 font-medium">{h}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LocationBar() {
  const { loading, region, coords, permissionDenied, refresh } = useGeolocation();
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div data-testid="location-bar">
      <div className="bg-gradient-to-r from-[#0081C9]/5 via-white to-[#C1121F]/5 border-b border-slate-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0081C9]/10 to-[#C1121F]/10 border border-[#0081C9]/15 flex items-center justify-center flex-shrink-0">
              {loading ? (
                <Loader2 className="h-4 w-4 text-[#0081C9] animate-spin" />
              ) : (
                <MapPin className="h-4 w-4 text-[#0081C9]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {loading ? "Detecting your location..." : `${region.flag} ${region.greeting}`}
                </span>
                {!loading && (
                  <Badge className="bg-[#0081C9]/10 text-[#0081C9] border-[#0081C9]/20 text-[9px] px-1.5 py-0">
                    {region.name}, {region.country}
                  </Badge>
                )}
                {permissionDenied && (
                  <button onClick={refresh} className="text-[10px] text-[#0081C9] hover:underline" data-testid="btn-retry-location">
                    Enable location
                  </button>
                )}
              </div>
              {!loading && (
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Thermometer className="h-3 w-3" /> {region.weather.temp}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {region.timezone}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Wallet className="h-3 w-3" /> {region.currency}
                  </span>
                  {coords && (
                    <span className="text-[9px] text-slate-400 hidden md:inline">
                      {coords.lat.toFixed(2)}°, {coords.lng.toFixed(2)}°
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {!loading && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0081C9]/10 hover:bg-[#0081C9]/20 text-[#0081C9] text-[10px] font-semibold transition-colors"
                data-testid="btn-expand-location"
              >
                {expanded ? "Less" : "Explore"}
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            )}
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
              data-testid="btn-dismiss-location"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {expanded && !loading && <ExpandedPanel region={region} onClose={() => setExpanded(false)} />}
    </div>
  );
}
