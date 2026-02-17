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
                <CardDescription>Perfect for testing the waters</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="1 Active Booking Widget" />
                  <PricingItem text="Basic AI Tour Descriptions" />
                  <PricingItem text="Manual Social Posting" />
                  <PricingItem text="Community Support" />
                  <PricingItem text="White-labeling" included={false} />
                  <PricingItem text="API Access" included={false} />
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
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <CardDescription>For growing tour operators</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="Unlimited Booking Widgets" />
                  <PricingItem text="Advanced AI Content Tools" />
                  <PricingItem text="Social Media Auto-Poster" />
                  <PricingItem text="Review Reply Assistant" />
                  <PricingItem text="Google Map Booster" />
                  <PricingItem text="Priority Email Support" />
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12">Start Pro Trial</Button>
              </CardFooter>
            </Card>

            {/* Agency Plan */}
            <Card className="border-2 shadow-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Agency</CardTitle>
                <CardDescription>For marketing agencies</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <PricingItem text="Everything in Pro" />
                  <PricingItem text="White-label Dashboard" />
                  <PricingItem text="Multi-client Management" />
                  <PricingItem text="Full API Access" />
                  <PricingItem text="Custom Domain" />
                  <PricingItem text="Dedicated Account Manager" />
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full h-12">Contact Sales</Button>
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
