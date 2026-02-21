import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import RentalIntelligenceCard from "@/components/dashboard/RentalIntelligenceCard";
import MortgageCalculator from "@/components/dashboard/MortgageCalculator";
import CapitalAppreciationChart from "@/components/dashboard/CapitalAppreciationChart";
import RiskEstimator from "@/components/dashboard/RiskEstimator";
import { getDashboardData, saveDashboardData } from "@/utils/dashboardStore";

const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(getDashboardData());

  const handleAnalyzeIncome = () => {
    navigate("/income-analysis");
  };


  const handleEMICalculate = (emi: number) => {
    // EMI calculated and handled by the component
    setData(getDashboardData());
  };

  const handleRiskCalculate = (risk: { level: string; score: number }) => {
    saveDashboardData({
      riskLevel: risk.level,
      riskScore: risk.score
    });
    setData(getDashboardData());
  };

  useEffect(() => {
    // Refresh data if needed, or just rely on state
    setData(getDashboardData());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-32 md:pb-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Row 1: Rental Intelligence + Mortgage Calculator */}
          <RentalIntelligenceCard
            efficiency={data.efficiency}
            monthlyIncome={data.monthlyIncome}
            assetScore={data.assetScore}
            onAnalyze={handleAnalyzeIncome}
          />
          <MortgageCalculator
            loanAmount={data.loanAmount ? [data.loanAmount] : undefined}
            downPaymentPercent={data.downPayment ? [data.downPayment] : undefined}
            onCalculate={handleEMICalculate}
          />

          {/* Row 2: Capital Appreciation + Risk Estimator */}
          <CapitalAppreciationChart growthPercentage={data.growthPercentage || 32.5} />
          <RiskEstimator
            loanToValue={data.loanAmount && data.downPayment ? 100 - data.downPayment : 80}
            onCalculate={handleRiskCalculate}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
