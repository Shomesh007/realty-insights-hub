import { useNavigate } from "react-router-dom";
import { Brain, BarChart3, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentalIntelligenceCardProps {
  efficiency: number;
  monthlyIncome: number;
  assetScore: string;
  onAnalyze?: () => void;
}

const RentalIntelligenceCard = ({ 
  efficiency = 82,
  monthlyIncome = 18450, 
  assetScore = "A+",
  onAnalyze 
}: RentalIntelligenceCardProps) => {
  const navigate = useNavigate();

  const handleAnalyze = () => {
    onAnalyze?.();
    navigate("/income-analysis");
  };

  return (
    <div className="lg:col-span-8 bg-beige rounded-xl p-5 relative overflow-hidden shadow-soft">
      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-card/40 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between h-full gap-3">
        {/* Left content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/60 text-[9px] font-bold tracking-wider text-primary uppercase mb-2 shadow-sm backdrop-blur-sm">
              <Brain className="h-2.5 w-2.5" />
              Rental Intelligence
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1 leading-tight">
              Tamil Millionaire <br/>Journey
            </h1>
            <p className="text-muted-foreground text-xs max-w-sm leading-relaxed">
              Unlock AI-powered insights for rental income optimization and long-term yield forecasting.
            </p>
          </div>
          <div className="mt-3">
            <Button 
              onClick={handleAnalyze}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-1.5 px-4 rounded-lg text-xs inline-flex items-center gap-1.5 shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              Analyze Income
              <BarChart3 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Right content - Stats */}
        <div className="flex flex-col items-center justify-center md:items-end gap-3 md:w-auto">
          {/* Efficiency gauge */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div 
              className="absolute inset-0 rounded-full conic-gradient-82"
              style={{ 
                maskImage: 'radial-gradient(transparent 62%, black 63%)',
                WebkitMaskImage: 'radial-gradient(transparent 62%, black 63%)'
              }}
            />
            <div className="text-center">
              <span className="block text-lg font-bold text-primary">{efficiency}%</span>
              <span className="text-[8px] font-bold text-primary uppercase tracking-widest">Efficiency</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 md:block md:gap-0">
            <div className="text-center md:text-right md:mb-2">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Monthly Income</p>
              <p className="text-lg font-bold text-foreground">${monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Asset Score</p>
              <div className="flex items-center justify-center md:justify-end gap-0.5">
                <span className="text-lg font-bold text-green-600">{assetScore}</span>
                <BadgeCheck className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalIntelligenceCard;
