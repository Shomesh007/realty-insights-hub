import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Diamond, TrendingUp, ArrowRight, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const Home = () => {
  const navigate = useNavigate();
  const [riskValue, setRiskValue] = useState([75]);

  const getRiskLabel = () => {
    if (riskValue[0] < 33) return "Conservative";
    if (riskValue[0] < 66) return "Moderate";
    return "Aggressive";
  };

  return (
    <div className="min-h-screen bg-card font-sans text-foreground antialiased selection:bg-secondary/30">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full glass-panel-light border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground">
                <Diamond className="h-4 w-4" />
              </div>
              <h2 className="text-foreground text-xl font-bold tracking-tight">LykaRealty</h2>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#market-pulse" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Market Pulse</a>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">AI Predictions</Link>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Risk Maps</a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex text-sm font-medium text-foreground hover:text-primary">Log In</button>
              <Button 
                onClick={() => navigate("/income-analysis")}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-lg shadow-secondary/20 hover:shadow-secondary/40"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full flex flex-col items-center bg-grid-pattern min-h-screen">
        {/* Hero Section */}
        <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex flex-col items-center text-center relative">
          {/* Decorative blurred blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10" />

          <div className="flex flex-col items-center gap-6 max-w-3xl mb-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige border border-secondary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-primary tracking-wide uppercase">Real-time Valuation Engine Active</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
              The Future of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Dubai Wealth</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Harness institutional-grade AI to predict rental yields, capital appreciation, and risk profiles across Dubai's top districts.
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => navigate("/dashboard")}
              className="group h-12 px-8 bg-secondary text-secondary-foreground text-base font-bold shadow-xl shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all mt-4"
            >
              <span>Initiate AI Analysis</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Glass Dashboard Panel */}
          <div id="market-pulse" className="w-full relative z-10 glass-panel-light rounded-2xl p-6 md:p-10 shadow-2xl border-t border-card/80">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">Market Pulse: Dubai</h3>
                <p className="text-sm text-muted-foreground">Live data stream • Updated 2 mins ago</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Stable +1.2%
                </span>
                <span className="px-3 py-1 bg-beige text-primary text-xs font-bold rounded">AED/USD Fixed</span>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Yield & Risk */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {/* Projected Yield Module */}
                <div className="bg-beige rounded-xl p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-primary font-bold text-sm uppercase tracking-wide">Projected Yield</h4>
                    <PieChart className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex items-center justify-center py-4 relative">
                    {/* Radial Graph */}
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center relative"
                      style={{ background: 'conic-gradient(hsl(var(--primary)) 0% 75%, hsl(var(--border)) 75% 100%)' }}
                    >
                      <div className="w-24 h-24 bg-beige rounded-full flex flex-col items-center justify-center absolute">
                        <span className="text-2xl font-bold text-foreground">8.4%</span>
                        <span className="text-[10px] text-muted-foreground font-medium">ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground font-medium">
                    <span>Gross Yield</span>
                    <span className="text-primary">Top 5% of Market</span>
                  </div>
                </div>

                {/* Risk Estimator */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-foreground font-bold text-sm">Risk Profile</h4>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">{getRiskLabel()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">Adjust to simulate volatility vs return.</p>
                  <Slider
                    value={riskValue}
                    onValueChange={setRiskValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-[10px] uppercase text-muted-foreground font-bold tracking-wider">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>

              {/* Middle Column: Capital Appreciation Chart */}
              <div className="md:col-span-5 bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col">
                <div className="flex flex-col gap-1 mb-6">
                  <h4 className="text-foreground font-bold text-base">Capital Appreciation</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-accent">+24%</span>
                    <span className="text-sm text-muted-foreground mb-1">by 2030</span>
                  </div>
                </div>
                <div className="flex-1 w-full min-h-[180px] relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line stroke="hsl(var(--border))" strokeDasharray="4" x1="0" x2="400" y1="150" y2="150" />
                    <line stroke="hsl(var(--border))" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100" />
                    <line stroke="hsl(var(--border))" strokeDasharray="4" x1="0" x2="400" y1="50" y2="50" />
                    {/* Area */}
                    <path d="M0,150 C50,140 100,145 150,110 C200,75 250,90 300,50 C350,10 400,0 400,0 V200 H0 Z" fill="url(#chartGradient)" />
                    {/* Line */}
                    <path d="M0,150 C50,140 100,145 150,110 C200,75 250,90 300,50 C350,10 400,0 400,0" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" />
                    {/* Milestones */}
                    <g transform="translate(150, 110)">
                      <circle fill="hsl(var(--secondary))" r="4" />
                      <text fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="bold" textAnchor="middle" x="0" y="-10">Metro Ext.</text>
                    </g>
                    <g transform="translate(300, 50)">
                      <circle fill="hsl(var(--secondary))" r="4" />
                      <text fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="bold" textAnchor="middle" x="0" y="-10">Expo 2030</text>
                    </g>
                  </svg>
                </div>
                <div className="flex justify-between mt-4 border-t border-border pt-3">
                  <span className="text-xs font-bold text-muted-foreground">2024</span>
                  <span className="text-xs font-bold text-muted-foreground">2026</span>
                  <span className="text-xs font-bold text-muted-foreground">2028</span>
                  <span className="text-xs font-bold text-muted-foreground">2030</span>
                </div>
              </div>

              {/* Right Column: Community Insights Map */}
              <div className="md:col-span-3 bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-primary-foreground flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
                <h4 className="font-bold text-sm mb-1 relative z-10">Community Insights</h4>
                <p className="text-xs text-primary-foreground/70 mb-4 relative z-10">Growth Density Map</p>
                <div className="flex-1 relative z-10 flex items-center justify-center">
                  {/* Geometric Nodes Map */}
                  <div className="relative w-full h-48">
                    {/* Nodes */}
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-[0_0_15px_rgba(232,194,104,0.8)]" />
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap">Marina</span>
                    </div>
                    <div className="absolute top-1/2 right-1/4 transform translate-x-1/2">
                      <div className="w-4 h-4 bg-card rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap">Downtown</span>
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-secondary/60 rounded-full" />
                      <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-primary-foreground/60 whitespace-nowrap">Creek</span>
                    </div>
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                      <line stroke="white" strokeWidth="1" x1="25%" x2="75%" y1="25%" y2="50%" />
                      <line stroke="white" strokeWidth="1" x1="75%" x2="50%" y1="50%" y2="75%" />
                      <line stroke="white" strokeWidth="1" x1="50%" x2="25%" y1="75%" y2="25%" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 pt-3 border-t border-primary-foreground/10 relative z-10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-secondary font-bold">High Demand</span>
                    <span className="text-primary-foreground/60">Low Supply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">15k+</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Properties Analyzed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">$2.4B</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Transaction Data</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">98%</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Forecast Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">24/7</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">AI Monitoring</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
