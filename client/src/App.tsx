import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import DashboardOverview from "@/pages/dashboard/index";
import AIToolsDashboard from "@/pages/dashboard/tools";
import DigitalProducts from "@/pages/dashboard/products/index";
import AIAgentsDashboard from "@/pages/dashboard/agents";
import FundraisingDashboard from "@/pages/dashboard/fundraising";
import PublicFundraising from "@/pages/fundraising/index";
import Association from "@/pages/association";
import Login from "@/pages/login";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fundraising" component={PublicFundraising} />
      <Route path="/association" component={Association} />
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
