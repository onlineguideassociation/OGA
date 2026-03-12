import { useState, useEffect, useCallback } from "react";

export interface GeoRegion {
  key: string;
  name: string;
  country: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  greeting: string;
  language: string;
  highlights: string[];
  nearbyDestinations: { name: string; distance: string; type: string }[];
  weather: { season: string; temp: string; tip: string };
  travelTip: string;
}

const REGIONS: GeoRegion[] = [
  {
    key: "siem-reap",
    name: "Siem Reap",
    country: "Cambodia",
    flag: "🇰🇭",
    currency: "USD / KHR",
    currencySymbol: "$",
    timezone: "ICT (UTC+7)",
    greeting: "សួស្តី! (Suostei!)",
    language: "Khmer",
    highlights: ["Angkor Wat", "Pub Street", "Tonle Sap Lake", "Banteay Srei"],
    nearbyDestinations: [
      { name: "Angkor Wat", distance: "6 km", type: "Temple" },
      { name: "Tonle Sap", distance: "15 km", type: "Lake" },
      { name: "Banteay Srei", distance: "37 km", type: "Temple" },
      { name: "Kulen Mountain", distance: "48 km", type: "Nature" },
    ],
    weather: { season: "Dry Season", temp: "28-35°C", tip: "Bring sunscreen and stay hydrated" },
    travelTip: "Visit temples at sunrise for fewer crowds and magical light",
  },
  {
    key: "phnom-penh",
    name: "Phnom Penh",
    country: "Cambodia",
    flag: "🇰🇭",
    currency: "USD / KHR",
    currencySymbol: "$",
    timezone: "ICT (UTC+7)",
    greeting: "សួស្តី! (Suostei!)",
    language: "Khmer",
    highlights: ["Royal Palace", "Central Market", "Riverside", "Tuol Sleng"],
    nearbyDestinations: [
      { name: "Royal Palace", distance: "2 km", type: "Landmark" },
      { name: "Koh Dach", distance: "12 km", type: "Island" },
      { name: "Oudong", distance: "40 km", type: "Heritage" },
      { name: "Kampot", distance: "148 km", type: "Province" },
    ],
    weather: { season: "Dry Season", temp: "27-35°C", tip: "Explore the Riverside in the evening" },
    travelTip: "Try street food at Central Market for authentic Khmer flavors",
  },
  {
    key: "cambodia",
    name: "Cambodia",
    country: "Cambodia",
    flag: "🇰🇭",
    currency: "USD / KHR",
    currencySymbol: "$",
    timezone: "ICT (UTC+7)",
    greeting: "សួស្តី! (Suostei!)",
    language: "Khmer",
    highlights: ["Angkor Wat", "Phnom Penh", "Sihanoukville", "Battambang"],
    nearbyDestinations: [
      { name: "Siem Reap", distance: "Nearby", type: "City" },
      { name: "Phnom Penh", distance: "Nearby", type: "Capital" },
      { name: "Kampot", distance: "Nearby", type: "Province" },
      { name: "Koh Rong", distance: "Nearby", type: "Island" },
    ],
    weather: { season: "Tropical", temp: "25-35°C", tip: "Pack light and breathable clothes" },
    travelTip: "Download offline maps — connectivity varies in rural areas",
  },
  {
    key: "thailand",
    name: "Thailand",
    country: "Thailand",
    flag: "🇹🇭",
    currency: "THB",
    currencySymbol: "฿",
    timezone: "ICT (UTC+7)",
    greeting: "สวัสดี! (Sawasdee!)",
    language: "Thai",
    highlights: ["Bangkok", "Chiang Mai", "Phuket", "Ayutthaya"],
    nearbyDestinations: [
      { name: "Cambodia Border", distance: "Varies", type: "Cross-border" },
      { name: "Bangkok", distance: "Nearby", type: "Capital" },
      { name: "Chiang Mai", distance: "Nearby", type: "City" },
      { name: "Phuket", distance: "Nearby", type: "Island" },
    ],
    weather: { season: "Tropical", temp: "26-35°C", tip: "Monsoon season June–October" },
    travelTip: "Explore Cambodia's hidden gems — just a short trip from Thailand!",
  },
  {
    key: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    flag: "🇻🇳",
    currency: "VND",
    currencySymbol: "₫",
    timezone: "ICT (UTC+7)",
    greeting: "Xin chào!",
    language: "Vietnamese",
    highlights: ["Ha Long Bay", "Ho Chi Minh City", "Hoi An", "Hanoi"],
    nearbyDestinations: [
      { name: "Cambodia Border", distance: "Varies", type: "Cross-border" },
      { name: "Mekong Delta", distance: "Nearby", type: "Region" },
      { name: "Phnom Penh", distance: "6h drive", type: "Capital" },
      { name: "Siem Reap", distance: "Nearby", type: "City" },
    ],
    weather: { season: "Tropical", temp: "24-33°C", tip: "Best time to visit: Oct–Apr" },
    travelTip: "Combine your trip with a visit to Angkor Wat — just across the border!",
  },
  {
    key: "international",
    name: "Your Location",
    country: "International",
    flag: "🌏",
    currency: "USD",
    currencySymbol: "$",
    timezone: "Local",
    greeting: "Welcome!",
    language: "English",
    highlights: ["Angkor Wat", "Phnom Penh", "Mekong River", "Tonle Sap"],
    nearbyDestinations: [
      { name: "Siem Reap", distance: "Fly direct", type: "Gateway" },
      { name: "Phnom Penh", distance: "Fly direct", type: "Capital" },
      { name: "Bangkok Hub", distance: "Connect via", type: "Transit" },
      { name: "Ho Chi Minh", distance: "Connect via", type: "Transit" },
    ],
    weather: { season: "Best: Nov–Mar", temp: "25-32°C", tip: "Dry season is ideal for temple visits" },
    travelTip: "Book flights 2+ weeks early for the best deals to Cambodia",
  },
];

function detectRegion(lat: number, lng: number): GeoRegion {
  if (lat >= 13.2 && lat <= 13.5 && lng >= 103.7 && lng <= 104.0) return REGIONS[0];
  if (lat >= 11.4 && lat <= 11.7 && lng >= 104.7 && lng <= 105.0) return REGIONS[1];
  if (lat >= 10.0 && lat <= 14.7 && lng >= 102.3 && lng <= 107.6) return REGIONS[2];
  if (lat >= 5.6 && lat <= 20.5 && lng >= 97.3 && lng <= 105.6) return REGIONS[3];
  if (lat >= 8.2 && lat <= 23.4 && lng >= 102.1 && lng <= 109.5) return REGIONS[4];
  return REGIONS[5];
}

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  region: GeoRegion;
  coords: { lat: number; lng: number } | null;
  permissionDenied: boolean;
  refresh: () => void;
}

export function useGeolocation(): GeolocationState {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<GeoRegion>(REGIONS[5]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setRegion(detectRegion(latitude, longitude));
        setLoading(false);
        setPermissionDenied(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
        setError("Location unavailable");
        setRegion(REGIONS[5]);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { loading, error, region, coords, permissionDenied, refresh: requestLocation };
}

export function getAllRegions(): GeoRegion[] {
  return REGIONS;
}
