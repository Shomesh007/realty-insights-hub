
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IncomeAnalysis from "./pages/IncomeAnalysis";
import WealthProjection from "./pages/WealthProjection";
import EMICalculator from "./pages/EMICalculator";
import EMIResults from "./pages/EMIResults";
import PortfolioOptimizer from "./components/PortfolioOptimizer";
import CapitalAppreciationEstimator from "./components/CapitalAppreciationEstimator";
import CapitalAppreciationResults from "./components/CapitalAppreciationResults";
import RealEstateRiskCalculator from "./components/RealEstateRiskCalculator";
import RealEstateRiskResults from "./components/RealEstateRiskResults";
import UAEInvestorVisaInfo from "./pages/UAEInvestorVisaInfo";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/income-analysis" element={<IncomeAnalysis />} />
          <Route path="/wealth-projection" element={<WealthProjection />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/emi-results" element={<EMIResults />} />
          <Route path="/portfolio-optimizer" element={<PortfolioOptimizer />} />
          <Route path="/capital-appreciation-estimator" element={<CapitalAppreciationEstimator />} />
          <Route path="/capital-appreciation-results" element={<CapitalAppreciationResults />} />
          <Route path="/real-estate-risk-calculator" element={<RealEstateRiskCalculator />} />
          <Route path="/real-estate-risk-results" element={<RealEstateRiskResults />} />
          <Route path="/uae-investor-visa" element={<UAEInvestorVisaInfo />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
