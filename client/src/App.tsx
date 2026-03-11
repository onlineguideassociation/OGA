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
import InvestorDashboard from "@/pages/dashboard/investor";
import GraphExplorer from "@/pages/dashboard/graph/index";
import RDTBPage from "@/pages/rdtb";
import RoleSelection from "@/pages/roles";
import PublicFundraising from "@/pages/fundraising/index";
import Association from "@/pages/association";
import GlobalVision from "@/pages/global/vision";
import AIGuideBook from "@/pages/global/ai-guide";
import DigitalPostcards from "@/pages/global/postcards";
import Login from "@/pages/login";
import MarketplaceModule from "@/pages/marketplace/index";
import FinanceModule from "@/pages/finance/index";
import TravelOSModule from "@/pages/travel/index";
import MediaModule from "@/pages/media/index";
import HotelsSearch from "@/pages/hotels/index";
import CommunityHub from "@/pages/community/index";
import FreelanceMarketplace from "@/pages/freelance/index";
import SustainabilityMapping from "@/pages/sustainability/index";
import BrowserIDE from "@/pages/ide/index";
import DropshippingModule from "@/pages/dropshipping/index";
import ERPDashboard from "@/pages/erp/index";
import RestaurantBooking from "@/pages/restaurants/index";
import HospitalityPMS from "@/pages/hospitality/index";
import IndustryEvents from "@/pages/events/index";
import CulturalCinema from "@/pages/cinema/index";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product" component={Product} />
      <Route path="/rdtb" component={RDTBPage} />
      <Route path="/roles" component={RoleSelection} />
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
      <Route path="/dashboard/investor" component={InvestorDashboard} />
      <Route path="/dashboard/graph" component={GraphExplorer} />
      <Route path="/marketplace" component={MarketplaceModule} />
      <Route path="/finance" component={FinanceModule} />
      <Route path="/travel" component={TravelOSModule} />
      <Route path="/media" component={MediaModule} />
      <Route path="/hotels" component={HotelsSearch} />
      <Route path="/community" component={CommunityHub} />
      <Route path="/freelance" component={FreelanceMarketplace} />
      <Route path="/sustainability" component={SustainabilityMapping} />
      <Route path="/ide" component={BrowserIDE} />
      <Route path="/dropshipping" component={DropshippingModule} />
      <Route path="/erp" component={ERPDashboard} />
      <Route path="/restaurants" component={RestaurantBooking} />
      <Route path="/hospitality" component={HospitalityPMS} />
      <Route path="/events" component={IndustryEvents} />
      <Route path="/cinema" component={CulturalCinema} />
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
