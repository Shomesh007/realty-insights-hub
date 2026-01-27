import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type RiskLevel = "Low" | "Medium" | "High";

interface RiskDetails {
  level: RiskLevel;
  score: number;
  factors: {
    name: string;
    score: number;
    status: "good" | "warning" | "danger";
  }[];
}

interface RiskEstimatorProps {
  loanToValue?: number;
  onCalculate?: (risk: RiskDetails) => void;
}

const RiskEstimator = ({ loanToValue = 80, onCalculate }: RiskEstimatorProps) => {
  const [showResult, setShowResult] = useState(false);
  const [riskDetails, setRiskDetails] = useState<RiskDetails | null>(null);
  const [currentRisk, setCurrentRisk] = useState<RiskLevel>("Low");

  const calculateRisk = () => {
    // Simulate risk calculation based on various factors
    const factors = [
      { 
        name: "Loan-to-Value Ratio", 
        score: loanToValue <= 70 ? 90 : loanToValue <= 80 ? 75 : 50,
        status: loanToValue <= 70 ? "good" : loanToValue <= 80 ? "warning" : "danger"
      },
      { 
        name: "Market Volatility", 
        score: 85,
        status: "good"
      },
      { 
        name: "Location Score", 
        score: 92,
        status: "good"
      },
      { 
        name: "Property Type", 
        score: 88,
        status: "good"
      },
      { 
        name: "Developer Rating", 
        score: 95,
        status: "good"
      },
    ] as RiskDetails["factors"];

    const averageScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length;
    
    let level: RiskLevel = "Low";
    if (averageScore < 60) level = "High";
    else if (averageScore < 75) level = "Medium";

    const details: RiskDetails = {
      level,
      score: Math.round(averageScore),
      factors,
    };

    setRiskDetails(details);
    setCurrentRisk(level);
    setShowResult(true);
    onCalculate?.(details);
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  return (
    <>
      <div className="lg:col-span-4 bg-card rounded-xl p-5 shadow-soft border border-border flex flex-col h-[280px]">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-base font-bold text-foreground max-w-[150px] leading-tight">
            Investment Risk Estimator
          </h2>
          <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1" />
        </div>

        {/* Risk visualization */}
        <div className="flex-1 flex items-center justify-center relative py-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Concentric circles */}
            <div className="absolute inset-0 rounded-full border border-border scale-100" />
            <div className="absolute inset-0 rounded-full border border-border scale-75" />
            <div className="absolute inset-0 rounded-full border border-border scale-50" />
            
            {/* Risk gradient */}
            <div className="absolute inset-0 rounded-full risk-gradient opacity-60" />
            
            {/* Center indicator */}
            <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-card">
              <span className="text-[7px] text-primary-foreground/70 uppercase font-bold tracking-widest">Risk</span>
              <span className="text-primary-foreground font-bold text-xs">{currentRisk}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={calculateRisk}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-2 px-4 rounded-lg text-xs shadow-sm mt-auto"
        >
          Calculate Risk
        </Button>
      </div>

      {/* Risk Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Risk Assessment</DialogTitle>
            <DialogDescription>
              Comprehensive investment risk analysis
            </DialogDescription>
          </DialogHeader>
          {riskDetails && (
            <div className="space-y-4">
              <div className="text-center py-4 bg-beige rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Overall Risk Level</p>
                <p className={`text-3xl font-bold ${getRiskColor(riskDetails.level)}`}>
                  {riskDetails.level}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Score: {riskDetails.score}/100</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Risk Factors</p>
                {riskDetails.factors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(factor.status)}`} />
                      <span className="text-sm text-muted-foreground">{factor.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{factor.score}/100</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 text-xs text-muted-foreground">
                <p>
                  This assessment is based on current market conditions and property characteristics. 
                  Actual results may vary.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RiskEstimator;
