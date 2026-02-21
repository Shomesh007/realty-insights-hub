import { useNavigate, useLocation } from "react-router-dom";
import { Diamond, AlertTriangle, TrendingUp, Building2, ChevronRight, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { currencyRates, MILLIONAIRE_THRESHOLD_AED } from "@/data/marketData";

const WealthProjection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    form?: { fullName?: string; price?: number; location?: string; bedrooms?: string; propertyType?: string };
    aiResult?: string;
    appreciationRate?: number;
    rentalYield?: number;
  } | null;

  const [selectedYear, setSelectedYear] = useState(10);
  const [currency, setCurrency] = useState<"AED" | "USD" | "INR">("AED");

  // Fallback if no state
  const price = state?.form?.price || 700000;
  const appRate = (state?.appreciationRate || 8.5) / 100;
  const yieldRate = (state?.rentalYield || 6.8) / 100;
  const aiResult = state?.aiResult || "";

  // Calculate values for each year
  const yearlyData = useMemo(() => {
    const data = [];
    let cumulativeRent = 0;
    for (let y = 0; y <= 10; y++) {
      const propertyValue = price * Math.pow(1 + appRate, y);
      const annualRent = propertyValue * yieldRate;
      cumulativeRent += y > 0 ? annualRent : 0;
      data.push({
        year: y,
        propertyValue,
        annualRent,
        cumulativeRent,
        totalWealth: propertyValue + cumulativeRent,
      });
    }
    return data;
  }, [price, appRate, yieldRate]);

  const selected = yearlyData[selectedYear];
  const year10 = yearlyData[10];

  // Millionaire timeline
  const millionaireYear = useMemo(() => {
    for (let i = 1; i <= 10; i++) {
      if (yearlyData[i].totalWealth >= MILLIONAIRE_THRESHOLD_AED) return i;
    }
    return null;
  }, [yearlyData]);

  // ROI
  const totalROI = ((year10.totalWealth - price) / price) * 100;

  // Currency formatting
  const rate = currencyRates[currency];
  const symbol = currency === "AED" ? "AED" : currency === "USD" ? "$" : "₹";
  const fmt = (val: number) => {
    const converted = val * rate;
    if (converted >= 1_000_000) return `${symbol} ${(converted / 1_000_000).toFixed(2)}M`;
    if (converted >= 1_000) return `${symbol} ${(converted / 1_000).toFixed(0)}K`;
    return `${symbol} ${converted.toFixed(0)}`;
  };
  const fmtFull = (val: number) => `${symbol} ${(val * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  // Chart SVG path from yearlyData
  const maxWealth = year10.totalWealth * 1.1;
  const chartPoints = yearlyData.map((d, i) => {
    const x = (i / 10) * 800;
    const y = 280 - (d.totalWealth / maxWealth) * 270;
    return `${x},${y}`;
  });
  const chartLine = `M${chartPoints.join(" L")}`;
  const chartArea = `${chartLine} L800,300 L0,300 Z`;

  // Selected year point on chart
  const selX = (selectedYear / 10) * 800;
  const selY = 280 - (selected.totalWealth / maxWealth) * 270;

  // Extract AI summary
  const aiSummary = useMemo(() => {
    if (!aiResult || aiResult.startsWith("Error:")) return aiResult;
    const summaryMatch = aiResult.match(/(?:investment summary|summary|verdict)[:\s]*\n?([\s\S]*?)(?:\n\n|$)/i);
    return summaryMatch ? summaryMatch[1].replace(/\*\*/g, "").trim() : aiResult.slice(0, 500);
  }, [aiResult]);

  return (
    <div className="wealth-projection-page bg-gradient-to-br from-[#2a0d1d] via-[#451430] to-[#1a0510] text-foreground font-sans min-h-screen selection:bg-secondary selection:text-primary overflow-x-hidden">
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary opacity-20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 flex flex-col gap-8 min-h-screen pb-20 md:pb-10">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Diamond className="h-6 w-6 text-secondary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Tamil Millionaire Journey</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              AI Wealth <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Projection Analysis</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/income-analysis")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {/* Currency Toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">
              {(["AED", "USD", "INR"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${currency === c ? "bg-secondary text-secondary-foreground" : "text-white/60 hover:text-white"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Live Projection</span>
            </div>
          </div>
        </header>

        {/* Main Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Projected Wealth Card */}
          <div className="col-span-12 lg:col-span-7 bg-beige rounded-2xl p-8 shadow-2xl relative overflow-hidden clip-futuristic-1 group transition-transform hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Building2 className="h-32 w-32 text-primary" />
            </div>
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary" />
              Projected Wealth (Year {selectedYear})
            </h2>
            <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter tabular-nums">
              {fmtFull(selected.totalWealth)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
              <span className="bg-primary/10 px-2 py-0.5 rounded text-xs font-bold">+{totalROI.toFixed(0)}% Growth</span>
              <span className="text-muted-foreground">vs Initial Investment</span>
            </div>
          </div>

          {/* Timeline Alert Card */}
          <div className="col-span-12 lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary rounded-2xl blur opacity-40 translate-y-2" />
            <div className="relative bg-[#3e122b] border-2 border-secondary rounded-2xl h-full p-8 flex flex-col justify-center clip-futuristic-2 shadow-lg">
              <div className="flex items-start gap-5">
                <div className={`rounded-xl p-3 border ${millionaireYear ? "bg-green-500/10 border-green-500/20" : "bg-secondary/10 border-secondary/20"}`}>
                  {millionaireYear ? (
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-10 w-10 text-secondary" />
                  )}
                </div>
                <div>
                  <h3 className="text-secondary font-bold text-lg uppercase tracking-wider mb-2">Timeline Alert</h3>
                  {millionaireYear ? (
                    <p className="text-white/90 text-lg leading-snug font-medium">
                      Millionaire status reached in <span className="text-secondary border-b border-secondary/50">Year {millionaireYear}</span>! 🎉
                    </p>
                  ) : (
                    <p className="text-white/90 text-lg leading-snug font-medium">
                      Millionaire status <span className="text-secondary border-b border-secondary/50">not reached</span> in 10 years.
                    </p>
                  )}
                  <p className="text-white/50 text-xs mt-3 uppercase tracking-widest">
                    {millionaireYear ? "Congratulations!" : "Adjustment Recommended"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Wealth Growth Chart */}
          <div className="col-span-12 lg:col-span-8 glass-panel rounded-2xl p-6 md:p-8 relative shadow-xl flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">Wealth Growth Over Time</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide font-semibold">10 Year Forecast • Compounding</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(107,31,75,0.5)]" />
                  <span className="text-xs font-bold text-foreground">AI Projection</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-border" />
                  <span className="text-xs font-bold text-muted-foreground">Market Avg</span>
                </div>
              </div>
            </div>

            {/* Year Slider */}
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs font-bold text-muted-foreground">Year:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="text-sm font-bold text-secondary w-8 text-right">{selectedYear}</span>
            </div>

            {/* Chart Area */}
            <div className="relative w-full flex-grow min-h-[300px] flex items-end pb-8 pl-8">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-bold text-muted-foreground py-2">
                <span>{fmt(maxWealth)}</span>
                <span>{fmt(maxWealth * 0.75)}</span>
                <span>{fmt(maxWealth * 0.5)}</span>
                <span>{fmt(maxWealth * 0.25)}</span>
                <span>0</span>
              </div>

              {/* SVG Chart */}
              <svg className="w-full h-full overflow-visible chart-glow" preserveAspectRatio="none" viewBox="0 0 800 300">
                {/* Grid Lines */}
                <line stroke="hsl(var(--border))" strokeWidth="1" x1="0" x2="800" y1="280" y2="280" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="210" y2="210" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="140" y2="140" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="70" y2="70" />

                <defs>
                  <linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#3e122b" />
                    <stop offset="100%" stopColor="hsl(330, 55%, 27%)" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <path d={chartArea} fill="hsl(330, 55%, 27%)" fillOpacity="0.05" />

                {/* Main Curve Line */}
                <path
                  className="line-draw"
                  d={chartLine}
                  fill="none"
                  stroke="url(#gradientStroke)"
                  strokeLinecap="round"
                  strokeWidth="4"
                />

                {/* Interactive Point at Selected Year */}
                <g transform={`translate(${selX}, ${selY})`}>
                  <circle cx="0" cy="0" fill="hsl(var(--beige))" r="8" stroke="hsl(330, 55%, 27%)" strokeWidth="3" />
                  <circle cx="0" cy="0" fill="hsl(330, 55%, 27%)" fillOpacity="0.1" r="16">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="16;24;16" />
                  </circle>
                  <foreignObject height="60" width="140" x="-70" y="-70">
                    <div className="bg-primary text-primary-foreground text-xs p-2 rounded-lg text-center shadow-lg border border-secondary/30">
                      <div className="font-bold text-secondary">Year {selectedYear}</div>
                      <div className="font-bold">{fmtFull(selected.totalWealth)}</div>
                    </div>
                  </foreignObject>
                </g>
              </svg>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] font-bold text-muted-foreground px-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
                  <span key={y} className={y === selectedYear ? "text-primary font-extrabold" : ""}>
                    <span className="hidden sm:inline">Year </span>{y}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stats Column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* Rental Income Card */}
            <div className="flex-1 bg-beige p-6 relative clip-futuristic-1 shadow-lg group hover:bg-card transition-all duration-300">
              <div className="flex justify-between items-start h-full">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Proj. Rental Income</h4>
                    <div className="text-3xl font-black text-foreground">{fmtFull(selected.annualRent)}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Monthly: {fmtFull(selected.annualRent / 12)}
                    </div>
                    <div className="inline-flex items-center gap-1 mt-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      <TrendingUp className="h-3 w-3" /> {(yieldRate * 100).toFixed(1)}% Yield
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-2">
                    Cumulative: {fmtFull(selected.cumulativeRent)}
                  </div>
                </div>
                {/* Circular Progress */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="48" cy="48" fill="none" r="40" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="48"
                      cy="48"
                      fill="none"
                      r="40"
                      stroke="hsl(330, 55%, 27%)"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * Math.min(yieldRate * 100 / 10, 1))}
                      strokeLinecap="round"
                      strokeWidth="8"
                    />
                  </svg>
                  <Building2 className="absolute h-8 w-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Capital Appreciation Card */}
            <div className="flex-1 bg-beige p-6 relative clip-futuristic-2 shadow-lg group hover:bg-card transition-all duration-300">
              <div className="flex justify-between items-end h-full">
                <div className="pb-2">
                  <h4 className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1">Capital Appreciation</h4>
                  <div className="text-4xl font-black text-foreground">{(appRate * 100).toFixed(0)}%</div>
                  <div className="text-xs text-primary font-bold mt-1">Average Annual Growth</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Value in Year {selectedYear}: {fmtFull(selected.propertyValue)}
                  </div>
                </div>
                {/* Bar Chart */}
                <div className="flex items-end gap-2 h-24">
                  {[0.4, 0.6, 0.8, 1].map((h, i) => (
                    <div
                      key={i}
                      className={`rounded-t-sm ${i === 3 ? "w-8 bg-gradient-to-t from-primary to-primary/70 shadow-lg relative overflow-hidden" : "w-3 bg-border"}`}
                      style={{ height: `${h * 100}%` }}
                    >
                      {i === 3 && <div className="absolute inset-0 bg-white/20 skew-y-12 translate-y-full animate-shimmer" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Investment Summary */}
        {aiSummary && !aiSummary.startsWith("Error:") && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              AI Investment Summary
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {aiSummary}
            </div>
          </div>
        )}

        {/* Final Analysis Banner */}
        <div className="relative mt-4">
          <div className="absolute left-1/2 -top-8 w-[2px] h-8 bg-gradient-to-b from-transparent to-secondary/50 -translate-x-1/2" />
          <div className="max-w-2xl mx-auto bg-foreground border border-secondary/30 rounded-2xl md:rounded-full p-4 md:p-2 md:pr-6 flex flex-col md:flex-row items-center gap-4 shadow-neon relative overflow-hidden group hover:border-secondary transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-lg relative z-10 shrink-0">
              <Sparkles className="h-6 w-6 text-foreground" />
            </div>
            <div className="flex-1 flex flex-col items-center md:items-start md:flex-row md:items-center justify-between gap-2 relative z-10 text-center md:text-left">
              <div className="flex flex-col">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em]">Final Analysis</span>
                <span className="text-muted-foreground text-xs">Based on {(appRate * 100).toFixed(1)}% appreciation & {(yieldRate * 100).toFixed(1)}% yield</span>
              </div>
              <div className="md:text-right">
                <div className="text-card text-base sm:text-lg md:text-2xl font-bold tracking-tight">
                  Total Expected Return: <span className="text-secondary drop-shadow-[0_0_5px_rgba(233,196,106,0.8)]">{fmtFull(year10.totalWealth - price)}</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 text-secondary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden md:block">
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthProjection;
