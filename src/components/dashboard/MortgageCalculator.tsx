import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MortgageCalculatorProps {
  onCalculate?: (emi: number, details: EMIDetails) => void;
}

interface EMIDetails {
  loanAmount: number;
  downPayment: number;
  downPaymentPercent: number;
  principalAmount: number;
  interestRate: number;
  tenure: number;
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
}

const MortgageCalculator = ({ onCalculate }: MortgageCalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState([1200000]);
  const [downPaymentPercent, setDownPaymentPercent] = useState([20]);
  const [showResult, setShowResult] = useState(false);
  const [emiDetails, setEmiDetails] = useState<EMIDetails | null>(null);

  const maxLoanAmount = 2000000;
  const interestRate = 7.5; // Annual interest rate
  const tenureYears = 20;

  const calculateEMI = () => {
    const principal = loanAmount[0];
    const downPayment = (downPaymentPercent[0] / 100) * principal;
    const loanPrincipal = principal - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = tenureYears * 12;

    // EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - loanPrincipal;

    const details: EMIDetails = {
      loanAmount: principal,
      downPayment,
      downPaymentPercent: downPaymentPercent[0],
      principalAmount: loanPrincipal,
      interestRate,
      tenure: tenureYears,
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };

    setEmiDetails(details);
    setShowResult(true);
    onCalculate?.(Math.round(emi), details);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <>
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
          onClick={calculateEMI}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-2 px-4 rounded-lg text-xs shadow-sm"
        >
          Calculate EMI
        </Button>
      </div>

      {/* EMI Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">EMI Calculation Result</DialogTitle>
            <DialogDescription>
              Based on your loan parameters
            </DialogDescription>
          </DialogHeader>
          {emiDetails && (
            <div className="space-y-4">
              <div className="text-center py-4 bg-beige rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
                <p className="text-3xl font-bold text-primary">${emiDetails.monthlyEMI.toLocaleString()}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Loan Amount</p>
                  <p className="font-semibold">${emiDetails.loanAmount.toLocaleString()}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Down Payment</p>
                  <p className="font-semibold">${emiDetails.downPayment.toLocaleString()}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Principal</p>
                  <p className="font-semibold">${emiDetails.principalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Interest Rate</p>
                  <p className="font-semibold">{emiDetails.interestRate}% p.a.</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Tenure</p>
                  <p className="font-semibold">{emiDetails.tenure} years</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-muted-foreground text-xs">Total Interest</p>
                  <p className="font-semibold">${emiDetails.totalInterest.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Payment</span>
                  <span className="text-lg font-bold text-foreground">${emiDetails.totalPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MortgageCalculator;
