import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  return (
    <Layout>
      <div className="py-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h1>
            <p className="text-xl text-slate-600">Choose the plan that's right for your business. No hidden fees.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="Booking & WhatsApp Widget" />
                  <PricingItem text="5 AI Generations / month" />
                  <PricingItem text="Basic Lead Tracking" />
                  <PricingItem text="Community Support" />
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full h-12">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary shadow-xl scale-105 relative z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 text-sm font-medium rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Pro Guide</CardTitle>
                <CardDescription>For serious tour operators</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$15</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="Unlimited AI Generations" />
                  <PricingItem text="Full CRM Access" />
                  <PricingItem text="Review Reply Assistant" />
                  <PricingItem text="Facebook Ad Generator" />
                  <PricingItem text="WhatsApp Quick Replies" />
                  <PricingItem text="Priority Local Support" />
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12">Start Pro Trial</Button>
              </CardFooter>
            </Card>

            {/* Website Plan */}
            <Card className="border-2 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Website Pro</CardTitle>
                <CardDescription>Your own tour website</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$25</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="Simple Tourism Website" />
                  <PricingItem text="Custom Domain Mapping" />
                  <PricingItem text="Booking Widget Included" />
                  <PricingItem text="Hosting Included" />
                  <PricingItem text="SEO Optimization" />
                  <PricingItem text="Everything in Pro" />
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full h-12">Get Your Site</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function PricingItem({ text, included = true }: { text: string, included?: boolean }) {
  return (
    <li className={`flex items-center gap-3 text-sm ${included ? 'text-slate-700' : 'text-slate-400'}`}>
      {included ? (
        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
      ) : (
        <X className="h-5 w-5 text-slate-300 flex-shrink-0" />
      )}
      {text}
    </li>
  );
}
