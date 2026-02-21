import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, DollarSign, Clock, Target, ArrowRight, Sparkles } from "lucide-react";

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
  const [showDialog, setShowDialog] = useState(false);
  const [view, setView] = useState<"questionnaire" | "results">("questionnaire");
  const [riskDetails, setRiskDetails] = useState<RiskDetails | null>(null);

  // Questionnaire semi-state
  const [investment, setInvestment] = useState("");
  const [duration, setDuration] = useState("5");
  const [focus, setFocus] = useState("rental");
  const [riskAppetite, setRiskAppetite] = useState("moderate");

  const calculateRisk = () => {
    const invAmt = parseFloat(investment) || 0;
    const ltv = loanToValue || 80;

    // 1. LTV Risk (Lower LTV -> Safer/Higher Score)
    const ltvScore = Math.max(20, Math.min(100, 100 - (ltv - 40) * 1.5));
    const ltvStatus = ltvScore >= 75 ? "good" : ltvScore >= 50 ? "warning" : "danger";

    // 2. Financial Buffers (Higher investment = Higher Score)
    let bufferScore = 50;
    if (invAmt >= 5000000) bufferScore = 95;
    else if (invAmt >= 1000000) bufferScore = 75 + ((invAmt - 1000000) / 4000000) * 20;
    else bufferScore = 40 + (invAmt / 1000000) * 35;
    const bufferStatus = bufferScore >= 70 ? "good" : bufferScore >= 50 ? "warning" : "danger";

    // 3. Market Volatility (Conservative -> Higher safety score)
    let volScore = riskAppetite === "conservative" ? 90 : riskAppetite === "moderate" ? 75 : 55;
    volScore = Math.min(100, volScore + parseInt(duration)); // Duration mitigates volatility slightly
    const volStatus = volScore >= 70 ? "good" : volScore >= 50 ? "warning" : "danger";

    // 4. Time Horizon (Longer -> Higher safety score)
    const yrs = parseInt(duration) || 5;
    const timeScore = Math.max(40, Math.min(100, 40 + (yrs - 1) * 6.5));
    const timeStatus = timeScore >= 70 ? "good" : timeScore >= 50 ? "warning" : "danger";

    // 5. Strategy Alignment
    const strategyScore = focus === "balanced" ? 92 : focus === "rental" ? 82 : 68;
    const strategyStatus = strategyScore >= 75 ? "good" : strategyScore >= 60 ? "warning" : "danger";

    const factors = [
      { name: "LTV Risk", score: Math.round(ltvScore), status: ltvStatus },
      { name: "Financial Buffers", score: Math.round(bufferScore), status: bufferStatus },
      { name: "Market Volatility", score: Math.round(volScore), status: volStatus },
      { name: "Time Horizon", score: Math.round(timeScore), status: timeStatus },
      { name: "Strategy Alignment", score: Math.round(strategyScore), status: strategyStatus },
    ] as RiskDetails["factors"];

    const averageScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length;

    let level: RiskLevel = "Low";
    if (averageScore < 65) level = "High";
    else if (averageScore < 80) level = "Medium";

    const details: RiskDetails = {
      level,
      score: Math.round(averageScore),
      factors,
    };

    setRiskDetails(details);
    setView("results");
    onCalculate?.(details);
  };

  const resetAndOpen = () => {
    setView("questionnaire");
    setShowDialog(true);
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
            <div className="absolute inset-0 rounded-full border border-border scale-100" />
            <div className="absolute inset-0 rounded-full border border-border scale-75" />
            <div className="absolute inset-0 rounded-full border border-border scale-50" />
            <div className={`absolute inset-0 rounded-full opacity-20 ${riskDetails?.level === 'High' ? 'bg-red-500' : riskDetails?.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />

            <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-card">
              <span className="text-[7px] text-primary-foreground/70 uppercase font-bold tracking-widest">Risk</span>
              <span className="text-primary-foreground font-bold text-xs">{riskDetails?.level || 'N/A'}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={resetAndOpen}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-2 px-4 rounded-lg text-xs shadow-sm mt-auto"
        >
          {riskDetails ? "Re-calculate Risk" : "Calculate Risk"}
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          {view === "questionnaire" ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                  <Shield className="h-5 w-5 text-primary" /> Risk Analysis
                </DialogTitle>
                <DialogDescription>
                  Answer 4 quick questions to assess your property risk.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                    <DollarSign className="h-3 w-3" /> Investment Amount (AED)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="h-10 border-border bg-beige/50 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> Intended Duration
                  </label>
                  <div className="flex gap-2">
                    {["3", "5", "7", "10"].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`flex-1 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${duration === d ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:bg-muted'}`}
                      >
                        {d}Y
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                    <Target className="h-3 w-3" /> Strategy Focus
                  </label>
                  <div className="flex gap-2">
                    {["rental", "appreciation", "balanced"].map(f => (
                      <button
                        key={f}
                        onClick={() => setFocus(f)}
                        className={`flex-1 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${focus === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:bg-muted'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                    <Shield className="h-3 w-3" /> Risk Appetite
                  </label>
                  <div className="flex gap-2">
                    {["conservative", "moderate", "aggressive"].map(a => (
                      <button
                        key={a}
                        onClick={() => setRiskAppetite(a)}
                        className={`flex-1 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${riskAppetite === a ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:bg-muted'}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={calculateRisk}
                  disabled={!investment}
                  className="w-full h-11 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold uppercase tracking-widest gap-2 shadow-lg shadow-secondary/20"
                >
                  Analyze Risk Profile <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                  <Sparkles className="h-5 w-5 text-secondary" /> Assessment Result
                </DialogTitle>
                <DialogDescription>
                  Your personalized investment risk landscape
                </DialogDescription>
              </DialogHeader>

              {riskDetails && (
                <div className="space-y-4 pt-2">
                  <div className="text-center py-4 bg-beige rounded-2xl border border-primary/5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Overall Risk Level</p>
                    <p className={`text-4xl font-black ${getRiskColor(riskDetails.level)}`}>
                      {riskDetails.level}
                    </p>
                    <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/50 text-xs font-bold text-foreground mt-2 border border-white">
                      Score: {riskDetails.score}/100
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">Risk Factors Analysis</p>
                    <div className="space-y-2">
                      {riskDetails.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border shadow-sm group hover:border-primary/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(factor.status)} shadow-sm`} />
                            <span className="text-xs font-bold text-foreground/80">{factor.name}</span>
                          </div>
                          <span className="text-xs font-black text-foreground">{factor.score}<span className="text-[9px] text-muted-foreground font-medium ml-0.5">/100</span></span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card p-3 rounded-xl border border-dashed border-border text-[10px] text-muted-foreground leading-relaxed">
                    This assessment is based on your inputs and current market liquidity trends. Actual performance may vary.
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setView("questionnaire")}
                    className="w-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    Adjust Inputs & Re-calculate
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RiskEstimator;

