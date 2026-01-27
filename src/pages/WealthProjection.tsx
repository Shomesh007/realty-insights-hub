import { useNavigate } from "react-router-dom";
import { Diamond, AlertTriangle, TrendingUp, Building2, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WealthProjection = () => {
  const navigate = useNavigate();

  return (
    <div className="wealth-projection-page bg-gradient-to-br from-[#2a0d1d] via-[#451430] to-[#1a0510] text-foreground font-sans min-h-screen selection:bg-secondary selection:text-primary overflow-x-hidden">
      {/* Ambient Glow Effects */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary opacity-20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 flex flex-col gap-8 min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Diamond className="h-6 w-6 text-secondary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Tamil Millionaire Journey</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              AI Wealth <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Projection Analysis</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/income-analysis")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
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
              Projected Wealth (Year 10)
            </h2>
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter tabular-nums">
              AED 1,997,284
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
              <span className="bg-primary/10 px-2 py-0.5 rounded text-xs font-bold">+212% Growth</span>
              <span className="text-muted-foreground">vs Initial Investment</span>
            </div>
          </div>

          {/* Timeline Alert Card */}
          <div className="col-span-12 lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary rounded-2xl blur opacity-40 translate-y-2" />
            <div className="relative bg-[#3e122b] border-2 border-secondary rounded-2xl h-full p-8 flex flex-col justify-center clip-futuristic-2 shadow-lg">
              <div className="flex items-start gap-5">
                <div className="bg-secondary/10 rounded-xl p-3 border border-secondary/20">
                  <AlertTriangle className="h-10 w-10 text-secondary" />
                </div>
                <div>
                  <h3 className="text-secondary font-bold text-lg uppercase tracking-wider mb-2">Timeline Alert</h3>
                  <p className="text-white/90 text-lg leading-snug font-medium">
                    Millionaire status <span className="text-secondary border-b border-secondary/50">not reached</span> in 10 years.
                  </p>
                  <p className="text-white/50 text-xs mt-3 uppercase tracking-widest">Adjustment Recommended</p>
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

            {/* Chart Area */}
            <div className="relative w-full flex-grow min-h-[300px] flex items-end pb-8 pl-8">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-bold text-muted-foreground py-2">
                <span>2.0M</span>
                <span>1.5M</span>
                <span>1.0M</span>
                <span>0.5M</span>
                <span>0M</span>
              </div>

              {/* SVG Chart */}
              <svg className="w-full h-full overflow-visible chart-glow" preserveAspectRatio="none" viewBox="0 0 800 300">
                {/* Grid Lines */}
                <line stroke="hsl(var(--border))" strokeWidth="1" x1="0" x2="800" y1="280" y2="280" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="210" y2="210" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="140" y2="140" />
                <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="70" y2="70" />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradientStroke" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#3e122b" />
                    <stop offset="100%" stopColor="hsl(330, 55%, 27%)" />
                  </linearGradient>
                </defs>

                {/* Main Curve Line */}
                <path
                  className="line-draw"
                  d="M0,280 C150,270 300,240 480,140 C600,70 700,40 800,10"
                  fill="none"
                  stroke="url(#gradientStroke)"
                  strokeLinecap="round"
                  strokeWidth="4"
                />

                {/* Area Fill */}
                <path
                  d="M0,280 C150,270 300,240 480,140 C600,70 700,40 800,10 L800,300 L0,300 Z"
                  fill="hsl(330, 55%, 27%)"
                  fillOpacity="0.05"
                />

                {/* Interactive Point at Year 6 */}
                <g transform="translate(480, 140)">
                  <circle cx="0" cy="0" fill="hsl(var(--beige))" r="8" stroke="hsl(330, 55%, 27%)" strokeWidth="3" />
                  <circle cx="0" cy="0" fill="hsl(330, 55%, 27%)" fillOpacity="0.1" r="16">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="16;24;16" />
                  </circle>
                  <foreignObject height="60" width="140" x="-70" y="-70">
                    <div className="bg-primary text-primary-foreground text-xs p-2 rounded-lg text-center shadow-lg border border-secondary/30">
                      <div className="font-bold text-secondary">Year 6</div>
                      <div className="font-bold">AED 1,040,976</div>
                    </div>
                  </foreignObject>
                </g>
              </svg>

              {/* X-Axis Labels */}
              <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] font-bold text-muted-foreground px-2">
                <span>Year 1</span>
                <span>Year 2</span>
                <span>Year 3</span>
                <span>Year 4</span>
                <span>Year 5</span>
                <span className="text-primary font-extrabold">Year 6</span>
                <span>Year 7</span>
                <span>Year 8</span>
                <span>Year 9</span>
                <span>Year 10</span>
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
                    <div className="text-3xl font-black text-foreground">144.20%</div>
                    <div className="inline-flex items-center gap-1 mt-1 bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      <TrendingUp className="h-3 w-3" /> High Yield
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">ROI over 10 years</div>
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
                      strokeDashoffset="60"
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
                  <div className="text-4xl font-black text-foreground">13%</div>
                  <div className="text-xs text-primary font-bold mt-1">Average Annual Growth</div>
                </div>
                {/* Bar Chart */}
                <div className="flex items-end gap-2 h-24">
                  <div className="w-3 h-[40%] bg-border rounded-t-sm" />
                  <div className="w-3 h-[60%] bg-border rounded-t-sm" />
                  <div className="w-3 h-[80%] bg-border rounded-t-sm" />
                  <div className="w-8 h-full bg-gradient-to-t from-primary to-primary/70 rounded-t shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 skew-y-12 translate-y-full animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Analysis Banner */}
        <div className="relative mt-4">
          <div className="absolute left-1/2 -top-8 w-[2px] h-8 bg-gradient-to-b from-transparent to-secondary/50 -translate-x-1/2" />
          <div className="max-w-2xl mx-auto bg-foreground border border-secondary/30 rounded-full p-2 pr-6 flex items-center gap-4 shadow-neon relative overflow-hidden group hover:border-secondary transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50" />
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-lg relative z-10">
              <Sparkles className="h-6 w-6 text-foreground" />
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 relative z-10">
              <div className="flex flex-col">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em]">Final Analysis</span>
                <span className="text-muted-foreground text-xs">Based on moderate market conditions</span>
              </div>
              <div className="text-right">
                <div className="text-card text-lg md:text-2xl font-bold tracking-tight">
                  Total Expected Return: <span className="text-secondary drop-shadow-[0_0_5px_rgba(233,196,106,0.8)]">AED 720,976</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 text-secondary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthProjection;
