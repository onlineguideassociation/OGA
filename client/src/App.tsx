import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Product from "@/pages/product";
import DashboardOverview from "@/pages/dashboard/index";
import AIToolsDashboard from "@/pages/dashboard/tools";
import DigitalProducts from "@/pages/dashboard/products/index";
import AIAgentsDashboard from "@/pages/dashboard/agents";
import FundraisingDashboard from "@/pages/dashboard/fundraising";
import PublicFundraising from "@/pages/fundraising/index";
import Association from "@/pages/association";
import GlobalVision from "@/pages/global/vision";
import AIGuideBook from "@/pages/global/ai-guide";
import DigitalPostcards from "@/pages/global/postcards";
import Login from "@/pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fundraising" component={PublicFundraising} />
      <Route path="/association" component={Association} />
      <Route path="/global/vision" component={GlobalVision} />
      <Route path="/global/ai-guide" component={AIGuideBook} />
      <Route path="/global/postcards" component={DigitalPostcards} />
      <Route path="/dashboard" component={DashboardOverview} />
      <Route path="/dashboard/tools" component={AIToolsDashboard} />
      <Route path="/dashboard/products" component={DigitalProducts} />
      <Route path="/dashboard/agents" component={AIAgentsDashboard} />
      <Route path="/dashboard/fundraising" component={FundraisingDashboard} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
