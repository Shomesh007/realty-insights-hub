import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import RentalIntelligenceCard from "@/components/dashboard/RentalIntelligenceCard";
import MortgageCalculator from "@/components/dashboard/MortgageCalculator";
import CapitalAppreciationChart from "@/components/dashboard/CapitalAppreciationChart";
import RiskEstimator from "@/components/dashboard/RiskEstimator";

const Index = () => {
  const [efficiency] = useState(82);
  const [monthlyIncome] = useState(18450);
  const [assetScore] = useState("A+");
  const [loanToValue, setLoanToValue] = useState(80);

  const handleAnalyzeIncome = () => {
    toast.success("Income analysis started", {
      description: "AI is processing your rental income data...",
    });
    // Future: trigger AI analysis
  };

  const handleEMICalculate = (emi: number) => {
    toast.success(`Monthly EMI: $${emi.toLocaleString()}`, {
      description: "Calculation saved to your dashboard",
    });
  };

  const handleRiskCalculate = (risk: { level: string; score: number }) => {
    toast.info(`Risk Level: ${risk.level}`, {
      description: `Overall score: ${risk.score}/100`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Row 1: Rental Intelligence + Mortgage Calculator */}
          <RentalIntelligenceCard
            efficiency={efficiency}
            monthlyIncome={monthlyIncome}
            assetScore={assetScore}
            onAnalyze={handleAnalyzeIncome}
          />
          <MortgageCalculator onCalculate={handleEMICalculate} />

          {/* Row 2: Capital Appreciation + Risk Estimator */}
          <CapitalAppreciationChart growthPercentage={32.5} />
          <RiskEstimator 
            loanToValue={loanToValue} 
            onCalculate={handleRiskCalculate} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
