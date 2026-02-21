import { ArrowLeft, Download, Share2, Info, ShieldCheck, Wallet, CreditCard, TrendingDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface CalculatorInputs {
  propertyValue: number;
  age: number;
  residentStatus: "uae" | "nri";
  monthlyIncome: number;
  currency: "aed" | "inr";
  interestRate: number;
}

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  monthlyTotal: number;
}

interface EMIResultsProps {
  mortgageAmount?: number;
  downPayment?: number;
  upfrontCashMin?: number;
  upfrontCashMax?: number;
  monthlyEMI?: number;
  interestRate?: number;
  tenure?: number;
  principalPercentage?: number;
  interestPercentage?: number;
  amortizationData?: AmortizationRow[];
}

interface EMIResultsProps {
  mortgageAmount?: number;
  downPayment?: number;
  upfrontCashMin?: number;
  upfrontCashMax?: number;
  monthlyEMI?: number;
  interestRate?: number;
  tenure?: number;
  principalPercentage?: number;
  interestPercentage?: number;
  amortizationData?: AmortizationRow[];
}


const EMIResults = () => {
  const location = useLocation();
  const inputs = location.state as CalculatorInputs | null;

  // Calculate mortgage values based on inputs
  const calculateMortgageDetails = () => {
    if (!inputs) {
      // Return default values if no inputs provided
      return {
        propertyValue: 700000,
        mortgageAmount: 699999,
        downPayment: 140000,
        upfrontCashMin: 42000,
        upfrontCashMax: 56000,
        monthlyEMI: 3818.43,
        interestRate: 3.2,
        tenure: 25,
        principalPercentage: 73,
        interestPercentage: 27,
        amortizationData: [
          { month: 1, principal: 1951.76, interest: 1866.67, balance: 698047.24, monthlyTotal: 3818.43 },
          { month: 2, principal: 1956.97, interest: 1861.46, balance: 696090.27, monthlyTotal: 3818.43 },
          { month: 24, principal: 2074.88, interest: 1743.55, balance: 651756.24, monthlyTotal: 3818.43 },
        ],
      };
    }

    const propertyValue = inputs.propertyValue;
    const downPaymentPercent = 0.2; // 20% minimum
    const downPayment = Math.round(propertyValue * downPaymentPercent);
    const mortgageAmount = propertyValue - downPayment;

    // Calculate upfront cash (DLD 4% + agent fees 2%)
    const dldFees = propertyValue * 0.04;
    const agentFees = propertyValue * 0.02;
    const upfrontCashMin = Math.round(dldFees);
    const upfrontCashMax = Math.round(dldFees + agentFees);

    // Calculate EMI
    const tenure = 25; // years
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numPayments = tenure * 12;
    const monthlyEMI = (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate total interest and principal percentages
    const totalPayment = monthlyEMI * numPayments;
    const totalInterest = totalPayment - mortgageAmount;
    const principalPercentage = Math.round((mortgageAmount / totalPayment) * 100);
    const interestPercentage = Math.round((totalInterest / totalPayment) * 100);

    // Calculate amortization for first 2 months and month 24
    const calculateAmortization = (monthNum: number) => {
      const remainingBalance = monthNum === 1
        ? mortgageAmount
        : mortgageAmount * (Math.pow(1 + monthlyRate, numPayments) - Math.pow(1 + monthlyRate, monthNum - 1)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

      const interest = remainingBalance * monthlyRate;
      const principal = monthlyEMI - interest;
      const balance = remainingBalance - principal;

      return {
        month: monthNum,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(balance * 100) / 100,
        monthlyTotal: Math.round(monthlyEMI * 100) / 100,
      };
    };

    return {
      propertyValue,
      mortgageAmount: Math.round(mortgageAmount),
      downPayment,
      upfrontCashMin,
      upfrontCashMax,
      monthlyEMI: Math.round(monthlyEMI * 100) / 100,
      interestRate: inputs.interestRate,
      tenure,
      principalPercentage,
      interestPercentage,
      amortizationData: [
        calculateAmortization(1),
        calculateAmortization(2),
        calculateAmortization(24),
      ],
    };
  };

  const {
    mortgageAmount,
    downPayment,
    upfrontCashMin,
    upfrontCashMax,
    monthlyEMI,
    interestRate,
    tenure,
    principalPercentage,
    interestPercentage,
    amortizationData,
  } = calculateMortgageDetails();

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatCurrencyShort = (amount: number) => {
    if (amount >= 1000) {
      return `AED ${(amount / 1000).toFixed(0)}k`;
    }
    return `AED ${amount.toLocaleString('en-AE')}`;
  };

  // Calculate donut chart rotation for the conic gradient
  const principalDegrees = (principalPercentage / 100) * 360;
  const gapDegrees = 0.4;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/emi-calculator"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-semibold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Alert Notices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-primary px-5 py-4 rounded-xl flex items-center gap-4 shadow-md border-l-4 border-secondary hover:translate-y-[-2px] transition-all">
            <div className="bg-secondary/10 p-2.5 rounded-lg shrink-0 flex items-center justify-center">
              <Info className="text-secondary w-6 h-6" />
            </div>
            <div className="leading-relaxed">
              <p className="text-white text-[10px] font-bold uppercase tracking-[0.15em] mb-1">
                Tenure Cap Notice
              </p>
              <p className="text-white/90 text-[13px] font-medium">
                Maximum mortgage tenure in Dubai is 25 years.
              </p>
            </div>
          </Card>

          <Card className="bg-primary px-5 py-4 rounded-xl flex items-center gap-4 shadow-md border-l-4 border-secondary hover:translate-y-[-2px] transition-all">
            <div className="bg-secondary/10 p-2.5 rounded-lg shrink-0 flex items-center justify-center">
              <ShieldCheck className="text-secondary w-6 h-6" />
            </div>
            <div className="leading-relaxed">
              <p className="text-white text-[10px] font-bold uppercase tracking-[0.15em] mb-1">
                Credit Status
              </p>
              <p className="text-white/90 text-[13px] font-medium">
                Pre-approval success rate: 98% for your profile.
              </p>
            </div>
          </Card>
        </div>

        {/* Main Summary Card */}
        <Card className="bg-[#F6EFE4] rounded-2xl p-6 md:p-8 mb-6 shadow-lg border border-[#EEE6D9] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.25em] mb-1 block">
                Calculated Strategy
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {formatCurrencyShort(mortgageAmount)}
              </h1>
              <p className="text-xs text-gray-600 font-medium italic">Max Eligible Mortgage</p>
            </div>
            <div className="h-px md:h-16 w-1/2 md:w-px bg-gray-300/50"></div>
            <div className="text-center md:text-right">
              <span className="text-[9px] font-bold text-[#7C2D6F] uppercase tracking-[0.25em] mb-1 block">
                Monthly Commitment
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
                {formatCurrency(monthlyEMI)}
              </h2>
              <p className="text-xs text-gray-600 font-medium">Monthly EMI</p>
            </div>
          </div>
        </Card>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Down Payment Card */}
            <Card className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="text-primary bg-[#F6EFE4] p-1.5 rounded-md w-7 h-7" />
                  <h3 className="font-bold text-gray-700 text-[10px] uppercase tracking-wider">
                    Down Payment
                  </h3>
                </div>
                <p className="text-2xl font-extrabold text-gray-900">
                  {formatCurrencyShort(downPayment)}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-[10px] text-gray-600">Min 20% required for Dubai financing.</p>
              </div>
            </Card>

            {/* Upfront Cash Card */}
            <Card className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="text-[#7C2D6F] bg-[#F6EFE4] p-1.5 rounded-md w-7 h-7" />
                  <h3 className="font-bold text-gray-700 text-[10px] uppercase tracking-wider">
                    Upfront Cash
                  </h3>
                </div>
                <p className="text-2xl font-extrabold text-gray-900">
                  {formatCurrencyShort(upfrontCashMin)} - {formatCurrencyShort(upfrontCashMax)}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7C2D6F] h-full w-2/3"></div>
                </div>
                <p className="text-[8px] text-gray-600 mt-2 font-bold tracking-widest uppercase">
                  Includes DLD & Agent Fees
                </p>
              </div>
            </Card>

            {/* Interest Rate Card */}
            <Card className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm col-span-1 md:col-span-2">
              <div className="flex items-center justify-between gap-6">
                <div className="max-w-[75%]">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">
                    Interest Rate Performance
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Platinum Tier rate of {interestRate}% p.a. fixed for 3 years.
                  </p>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-green-50 rounded-lg border border-green-100">
                      <span className="text-[9px] font-bold text-green-600">Top 5% offers</span>
                    </div>
                    <div className="px-3 py-1 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-[9px] font-bold text-blue-600">Fixed Rate</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-[#F6EFE4] rounded-full flex items-center justify-center border border-dashed border-primary/20 shrink-0">
                  <TrendingDown className="text-primary w-6 h-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Repayment Structure */}
          <div className="lg:col-span-5 bg-[#F6EFE4] rounded-2xl p-6 border border-[#EEE6D9] shadow-inner flex flex-col items-center">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] mb-8">
              Repayment Structure
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center">
              {/* Donut Chart */}
              <div className="relative w-40 h-40 shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #6B1F4B 0deg ${principalDegrees}deg,
                      #F6EFE4 ${principalDegrees}deg ${principalDegrees + gapDegrees}deg,
                      #E9C46A ${principalDegrees + gapDegrees}deg ${360 - gapDegrees}deg,
                      #F6EFE4 ${360 - gapDegrees}deg 360deg
                    )`,
                    boxShadow:
                      "0 12px 24px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(0,0,0,0.1), 0 0 15px rgba(107, 31, 75, 0.1)",
                  }}
                >
                  <div className="absolute inset-4 bg-[#F6EFE4] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.12)] z-10"></div>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.4)] pointer-events-none z-20"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                    <svg
                      className="w-6 h-6 text-primary opacity-30 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="text-[10px] font-extrabold text-primary/50 tracking-tighter">
                      AI SPLIT
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-5 w-full md:w-auto">
                <div className="flex items-center justify-between md:justify-start gap-4 p-3 bg-white/40 rounded-xl border border-white/60 shadow-sm min-w-[160px]">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">
                        Principal
                      </span>
                      <p className="text-[8px] text-gray-600">Direct Equity</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-primary leading-none">
                      {principalPercentage}
                    </span>
                    <span className="text-[10px] font-bold text-primary/60">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-start gap-4 p-3 bg-white/40 rounded-xl border border-white/60 shadow-sm min-w-[160px]">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#E9C46A] ring-4 ring-[#E9C46A]/10"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">
                        Interest
                      </span>
                      <p className="text-[8px] text-gray-600">Bank Service</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-[#E9C46A] leading-none">
                      {interestPercentage}
                    </span>
                    <span className="text-[10px] font-bold text-[#E9C46A]/80">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 w-full pt-4 border-t border-[#E5DAC6] text-center">
              <p className="text-[10px] text-gray-600 font-semibold">
                Calculated for {tenure}-year tenure at {interestRate}% fixed APR.
              </p>
            </div>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Amortization Schedule</h2>
              <p className="text-[10px] text-gray-600">
                First 24 months projections based on current market rates.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          <Card className="bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-primary text-[9px] uppercase tracking-widest font-extrabold">
                    <th className="px-3 md:px-6 py-3">Month</th>
                    <th className="px-3 md:px-6 py-3">Principal (AED)</th>
                    <th className="px-3 md:px-6 py-3">Interest (AED)</th>
                    <th className="px-3 md:px-6 py-3">Balance (AED)</th>
                    <th className="px-3 md:px-6 py-3">Monthly Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12px]">
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="px-3 md:px-6 py-3 font-bold text-gray-900">
                      Month {amortizationData[0].month}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[0].principal)}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[0].interest)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-semibold text-primary">
                      {formatCurrency(amortizationData[0].balance)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-extrabold text-gray-900">
                      {formatCurrency(amortizationData[0].monthlyTotal)}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="px-3 md:px-6 py-3 font-bold text-gray-900">
                      Month {amortizationData[1].month}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[1].principal)}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[1].interest)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-semibold text-primary">
                      {formatCurrency(amortizationData[1].balance)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-extrabold text-gray-900">
                      {formatCurrency(amortizationData[1].monthlyTotal)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50/20">
                    <td
                      className="px-6 py-2 text-center text-[8px] text-gray-400 font-bold uppercase tracking-[0.4em]"
                      colSpan={5}
                    >
                      Rows 3 - 23 Automated Calculations
                    </td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="px-3 md:px-6 py-3 font-bold text-gray-900">
                      Month {amortizationData[2].month}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[2].principal)}
                    </td>
                    <td className="px-3 md:px-6 py-3 text-gray-600">
                      {formatCurrency(amortizationData[2].interest)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-semibold text-primary">
                      {formatCurrency(amortizationData[2].balance)}
                    </td>
                    <td className="px-3 md:px-6 py-3 font-extrabold text-gray-900">
                      {formatCurrency(amortizationData[2].monthlyTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* View Full Schedule CTA */}
        <div className="flex flex-col items-center mb-8">
          <Button className="w-full max-w-sm bg-[#E9C46A] hover:bg-[#Debb50] text-gray-900 font-extrabold py-6 px-6 rounded-xl text-sm flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-[#E9C46A]/20">
            View Full Amortization Schedule
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
          <p className="text-[9px] text-center text-gray-600 font-bold uppercase tracking-[0.3em] mt-4">
            Proprietary AI Modeling • Powered by LykaEngine™
          </p>
        </div>

        {/* Market Outlook Footer */}
        <Card className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Market Outlook</h2>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-[7px] font-bold text-primary uppercase tracking-widest border border-purple-100">
                Live AI Feed
              </span>
            </div>
            <p className="text-[11px] text-gray-600 max-w-sm font-medium">
              Dubai real estate index indicates a 4.2% rental yield increase in the specified
              district.
            </p>
          </div>
          <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-4">
            <div className="leading-none text-center md:text-left">
              <p className="text-[8px] font-bold text-primary uppercase tracking-widest mb-1">
                Buy vs Rent Score
              </p>
              <p className="text-xl font-extrabold text-primary">8.4 / 10</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-primary/5">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default EMIResults;