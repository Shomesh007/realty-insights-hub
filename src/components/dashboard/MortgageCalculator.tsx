import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MortgageCalculatorProps {
  onCalculate?: (emi: number) => void;
}

const MortgageCalculator = ({ onCalculate }: MortgageCalculatorProps) => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState([1200000]);
  const [downPaymentPercent, setDownPaymentPercent] = useState([20]);

  const maxLoanAmount = 2000000;

  const handleCalculateEMI = () => {
    // Quick calculation for toast
    const principal = loanAmount[0];
    const downPayment = (downPaymentPercent[0] / 100) * principal;
    const loanPrincipal = principal - downPayment;
    const monthlyRate = 7.5 / 12 / 100;
    const tenureMonths = 20 * 12;
    const emi = loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    onCalculate?.(Math.round(emi));
    navigate("/emi-calculator");
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="lg:col-span-4 bg-card rounded-xl p-5 shadow-soft border border-border flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="p-1 bg-muted rounded-md text-primary flex items-center justify-center">
            <Calculator className="h-4 w-4" />
          </div>
          <span className="px-1.5 py-0.5 rounded bg-muted text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
            Financial Tool
          </span>
        </div>
        <h2 className="text-base font-bold text-foreground mb-4">Mortgage & EMI</h2>
        
        {/* Loan Amount Slider */}
        <div className="mb-4">
          <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground mb-2">
            <span>Loan Amount</span>
            <span className="text-primary text-[10px]">{formatCurrency(loanAmount[0])}</span>
          </div>
          <Slider
            value={loanAmount}
            onValueChange={setLoanAmount}
            max={maxLoanAmount}
            min={100000}
            step={50000}
            className="w-full"
          />
        </div>

        {/* Down Payment Slider */}
        <div className="mb-4">
          <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground mb-2">
            <span>Down Payment</span>
            <span className="text-primary text-[10px]">{downPaymentPercent[0]}%</span>
          </div>
          <Slider
            value={downPaymentPercent}
            onValueChange={setDownPaymentPercent}
            max={50}
            min={5}
            step={5}
            className="w-full"
          />
        </div>
      </div>

      <Button 
        onClick={handleCalculateEMI}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-2 px-4 rounded-lg text-xs shadow-sm"
      >
        Calculate EMI
      </Button>
    </div>
  );
};

export default MortgageCalculator;
