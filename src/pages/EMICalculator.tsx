import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Diamond, Home, Calendar, Globe, Wallet, Percent, ArrowRight, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EMICalculator = () => {
  const navigate = useNavigate();
  const [propertyValue, setPropertyValue] = useState("");
  const [age, setAge] = useState("");
  const [residentStatus, setResidentStatus] = useState<"uae" | "nri">("uae");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [currency, setCurrency] = useState<"aed" | "inr">("aed");
  const [interestRate, setInterestRate] = useState("3.2");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Mortgage Plan Generated!", {
      description: "Your personalized mortgage strategy is ready.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-card text-foreground font-sans antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center shadow-md">
                <Diamond className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-tight text-foreground">LykaRealty</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">AI Intelligence</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-8">
              <span className="text-foreground font-bold border-b-2 border-secondary pb-1 text-xs uppercase tracking-widest cursor-default">Calculator</span>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-widest">Dashboard</Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-xs uppercase tracking-widest">Market Insights</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-muted-foreground">
                <Bell className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-border" />
              <button className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              Let's personalize your Dubai property plan 🏡
            </h1>
            <p className="text-muted-foreground text-base">
              Our AI considers over 50 variables to calculate your optimal mortgage strategy.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-beige rounded-3xl p-8 md:p-12 shadow-soft border border-beige">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Property Value */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                  <Home className="h-4 w-4 text-primary" />
                  Property Value (AED)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="e.g. 2,500,000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full h-14 pl-5 pr-12 rounded-2xl border-none bg-card text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 shadow-sm focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">AED</span>
                </div>
              </div>

              {/* Age & Resident Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    Your Age
                  </label>
                  <Input
                    type="number"
                    placeholder="25 - 65"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 shadow-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                    <Globe className="h-4 w-4 text-primary" />
                    Resident Status
                  </label>
                  <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setResidentStatus("uae")}
                      className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        residentStatus === "uae"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      UAE Resident
                    </button>
                    <button
                      type="button"
                      onClick={() => setResidentStatus("nri")}
                      className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        residentStatus === "nri"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      NRI / International
                    </button>
                  </div>
                </div>
              </div>

              {/* Monthly Income */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                  <Wallet className="h-4 w-4 text-primary" />
                  Monthly Income
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Your net monthly income"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 shadow-sm focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex bg-card p-1.5 rounded-2xl shadow-sm h-14">
                    <button
                      type="button"
                      onClick={() => setCurrency("aed")}
                      className={`px-4 rounded-xl text-xs font-bold transition-all ${
                        currency === "aed" ? "bg-muted text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      AED
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("inr")}
                      className={`px-4 rounded-xl text-xs font-bold transition-all ${
                        currency === "inr" ? "bg-muted text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      INR
                    </button>
                  </div>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                  <Percent className="h-4 w-4 text-primary" />
                  Expected Interest Rate (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-14 pl-5 pr-12 rounded-2xl border-none bg-card text-lg font-semibold text-foreground shadow-sm focus:ring-2 focus:ring-primary/20"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-6 px-8 rounded-2xl text-base flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-secondary/20"
                >
                  {isSubmitting ? "Calculating..." : "Show My Mortgage Plan"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              <p className="text-[10px] text-center text-muted-foreground/60 font-medium uppercase tracking-[0.2em] pt-2">
                Encrypted & Secure • No Credit Impact
              </p>
            </form>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15+</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Lending Partners</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">24h</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Pre-approval</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0%</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Processing Fees</p>
            </div>
          </div>
        </div>
      </main>

      {/* Capital Appreciation Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-3xl p-8 border border-border flex flex-col md:flex-row items-center justify-between gap-8 h-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Capital Appreciation</h2>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold text-primary uppercase tracking-widest border border-primary/20">Forecast</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">Predictive modeling based on upcoming Dubai infrastructure projects.</p>
          </div>
          
          <div className="flex-1 w-full relative min-h-[160px]">
            <div className="absolute top-0 right-0 text-right z-10">
              <p className="text-4xl font-extrabold text-primary tracking-tight leading-none">+32.5%</p>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">5-Year Growth Projection</p>
            </div>

            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-4">
              <div className="w-full border-t border-border/50" />
              <div className="w-full border-t border-border/50" />
              <div className="w-full border-t border-border/50" />
              <div className="w-full border-t border-border/50" />
            </div>

            {/* Chart */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 150">
              <defs>
                <linearGradient id="purpleFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,140 C150,135 300,110 300,110 C450,110 600,85 600,85 C750,85 900,40 900,40 V150 H0 Z" fill="url(#purpleFill)" />
              <path d="M0,140 C150,135 300,110 300,110 C450,110 600,85 600,85 C750,85 900,40 900,40" fill="none" stroke="hsl(var(--primary))" strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              <circle cx="300" cy="110" fill="hsl(var(--primary))" r="4" stroke="white" strokeWidth="2" />
              <circle cx="600" cy="85" fill="hsl(var(--primary))" r="4" stroke="white" strokeWidth="2" />
              <circle cx="900" cy="40" fill="hsl(var(--primary))" r="4" stroke="white" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] font-bold text-muted-foreground px-1">
              <span>2024</span>
              <span className="mr-[33%]">2026</span>
              <span>2028</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
