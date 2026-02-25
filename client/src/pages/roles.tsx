import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, ShieldCheck, TrendingUp, Globe, Briefcase, Network } from "lucide-react";
import { Link } from "wouter";

export default function RoleSelection() {
  const roles = [
    {
      id: "traveler",
      name: "Traveler",
      description: "Find AI-matched guides and climate-optimized tours.",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      href: "/",
      color: "bg-blue-50 border-blue-100"
    },
    {
      id: "guide",
      name: "Tour Guide",
      description: "Access your AI Operating System and visibility tools.",
      icon: <User className="h-8 w-8 text-purple-500" />,
      href: "/dashboard",
      color: "bg-purple-50 border-purple-100"
    },
    {
      id: "business",
      name: "Tourism Business",
      description: "Monitor demand forecasts and cross-platform visibility.",
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
      href: "/dashboard",
      color: "bg-amber-50 border-amber-100"
    },
    {
      id: "investor",
      name: "Investor",
      description: "Access TIIL intelligence and capital opportunity index.",
      icon: <TrendingUp className="h-8 w-8 text-emerald-500" />,
      href: "/dashboard/investor",
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      id: "association",
      name: "OGA Member",
      description: "Official Association certification and network map.",
      icon: <Network className="h-8 w-8 text-rose-500" />,
      href: "/association",
      color: "bg-rose-50 border-rose-100"
    }
  ];

  return (
    <Layout>
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Access Portal</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Select Your Role</h1>
            <p className="text-lg text-slate-600">Choose your entry point into the Tourism Intelligence Infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {roles.map((role) => (
              <Link key={role.id} href={role.href}>
                <Card className={`cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary/50 group ${role.color}`}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      {role.icon}
                    </div>
                    <CardTitle className="text-xl">{role.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{role.description}</p>
                    <Button variant="ghost" className="p-0 text-primary group-hover:translate-x-1 transition-transform">
                      Enter Dashboard <ShieldCheck className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
