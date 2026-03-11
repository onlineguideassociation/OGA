import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Key, Users, LineChart, Globe, DollarSign, Bed, Wifi, CreditCard } from "lucide-react";

export default function HospitalityPMS() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Hospitality PMS & Channel Manager</h1>
                <p className="text-slate-600">Unified cloud platform for accommodation providers</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Sync Channels</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">New Booking</Button>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Today's Occupancy</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">85%</h3>
                  <div className="flex items-center text-sm text-emerald-500 font-medium">
                    <LineChart className="h-4 w-4 mr-1"/> +5%
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3">
                  <div className="bg-blue-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Arrivals / Departures</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">12 / 8</h3>
                  <Users className="h-6 w-6 text-indigo-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Direct RevPAR</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">$124.50</h3>
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">Active Channels</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">6</h3>
                  <Globe className="h-6 w-6 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Front Desk / Operations */}
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-blue-500" /> Front Desk Operations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {[
                      { room: "101", guest: "Alice Johnson", status: "Checking In", time: "14:00", channel: "Direct", type: "arrival" },
                      { room: "204", guest: "Marcus Chen", status: "Checking Out", time: "11:00", channel: "Booking.com", type: "departure" },
                      { room: "305", guest: "Sarah Smith", status: "In-House", time: "Stayover", channel: "Expedia", type: "stayover" },
                      { room: "108", guest: "James Wilson", status: "Checking In", time: "15:30", channel: "Agoda", type: "arrival" }
                    ].map((guest, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${
                            guest.type === 'arrival' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                            guest.type === 'departure' ? 'border-rose-200 bg-rose-50 text-rose-700' :
                            'border-blue-200 bg-blue-50 text-blue-700'
                          }`}>
                            <span className="text-xs font-bold">RM</span>
                            <span className="font-bold">{guest.room}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{guest.guest}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <Badge variant="outline" className="text-[10px] bg-slate-100">{guest.channel}</Badge>
                              <span>•</span>
                              <span>{guest.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm" className={
                            guest.type === 'arrival' ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50' :
                            guest.type === 'departure' ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50' :
                            'text-slate-600'
                          }>
                            {guest.type === 'arrival' ? 'Check In' : guest.type === 'departure' ? 'Check Out' : 'Manage'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Room Inventory Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Room Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Clean & Ready</div>
                      <span className="font-bold">42</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Dirty (Needs Cleaning)</div>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Cleaning in Progress</div>
                      <span className="font-bold">4</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Out of Order</div>
                      <span className="font-bold">2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 text-white border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base text-white">Direct Booking Engine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 mb-4">Accept zero-commission bookings directly from your website. Integrated with Google Hotel Ads.</p>
                    <div className="space-y-2">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 border-none">Manage Promotions</Button>
                      <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">Copy Widget Code</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              {/* Channel Manager */}
              <Card className="bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-indigo-500" /> Channel Manager
                  </CardTitle>
                  <CardDescription>Live inventory & rate synchronization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Booking.com", status: "Synced", last: "Just now", color: "bg-blue-100 text-blue-700" },
                    { name: "Expedia Group", status: "Synced", last: "2m ago", color: "bg-yellow-100 text-yellow-700" },
                    { name: "Airbnb", status: "Synced", last: "5m ago", color: "bg-rose-100 text-rose-700" },
                    { name: "Agoda", status: "Synced", last: "1m ago", color: "bg-purple-100 text-purple-700" }
                  ].map((ota, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-sm text-slate-900">{ota.name}</div>
                      <div className="text-right">
                        <Badge variant="outline" className={`text-[10px] border-none ${ota.color}`}>{ota.status}</Badge>
                        <p className="text-[10px] text-slate-400 mt-1">Last sync: {ota.last}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50">Manage Channels</Button>
                </CardContent>
              </Card>

              {/* Payment Gateway */}
              <Card className="bg-white border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-500" /> Fintech Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm font-medium text-slate-700">ABA PayWay (Primary)</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm font-medium text-slate-700">Stripe / Global Cards</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm font-medium text-slate-700">WeChat / Alipay</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}