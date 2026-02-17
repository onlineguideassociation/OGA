import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, TrendingUp, CalendarCheck, MousePointerClick, ArrowUpRight } from "lucide-react";

const data = [
  { name: 'Mon', leads: 40 },
  { name: 'Tue', leads: 30 },
  { name: 'Wed', leads: 20 },
  { name: 'Thu', leads: 27 },
  { name: 'Fri', leads: 18 },
  { name: 'Sat', leads: 23 },
  { name: 'Sun', leads: 34 },
];

export default function DashboardOverview() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <div className="flex gap-2">
              <Button variant="outline">Last 7 Days</Button>
              <Button>Export Report</Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard title="Total Leads" value="1,240" change="+12%" icon={<Users className="h-4 w-4 text-blue-600" />} />
            <StatsCard title="Booking Rate" value="4.3%" change="+0.8%" icon={<TrendingUp className="h-4 w-4 text-green-600" />} />
            <StatsCard title="Scheduled Posts" value="12" change="Pending" icon={<CalendarCheck className="h-4 w-4 text-purple-600" />} />
            <StatsCard title="Widget Clicks" value="8,543" change="+24%" icon={<MousePointerClick className="h-4 w-4 text-orange-600" />} />
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lead Generation Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="leads" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ActivityItem title="New Booking Request" subtitle="Walking Tour • 2 mins ago" />
                  <ActivityItem title="Review Reply Generated" subtitle="TripAdvisor • 1 hour ago" />
                  <ActivityItem title="Social Post Published" subtitle="Facebook • 3 hours ago" />
                  <ActivityItem title="New Lead Captured" subtitle="Homepage Widget • 5 hours ago" />
                  <ActivityItem title="Weekly Report Ready" subtitle="System • Yesterday" />
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary">View All Activity <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatsCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className="text-green-600 font-medium">{change}</span> from last month
        </p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
      <div>
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
