import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Diamond, TrendingUp, Phone, Lock, ArrowRight, ArrowLeft, Building2, MapPin, Bed, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchAIResponse } from "@/utils/aiApi";
import { appreciationRates, rentalYields, locations } from "@/data/marketData";
import { saveDashboardData } from "@/utils/dashboardStore";
import Header from "@/components/layout/Header";

const budgetToPrice: Record<string, number> = {
  "250k-500k": 375000,
  "500k-1m": 750000,
  "1m-5m": 3000000,
  "5m-plus": 7500000,
};

const IncomeAnalysis = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "apartment",
    location: "downtown-dubai",
    bedrooms: "1-bedroom",
    budget: "250k-500k",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const price = budgetToPrice[formData.budget] || 375000;
    const locationLabel = locations.find(l => l.value === formData.location)?.label || formData.location;
    const appRate = appreciationRates[formData.location] || 7;
    const yieldRate = rentalYields[formData.location]?.[formData.bedrooms] || 6;

    const prompt = `You are a Dubai real estate investment analyst. Analyze this investment for a Tamil investor:

Investor: ${formData.fullName}
Property Type: ${formData.propertyType}
Location: ${locationLabel}
Bedrooms: ${formData.bedrooms}
Budget/Price: AED ${price.toLocaleString()}

Market Data (use ONLY this data):
- Annual Appreciation Rate for ${locationLabel}: ${appRate}%
- Annual Rental Yield for ${formData.bedrooms} in ${locationLabel}: ${yieldRate}%

Provide analysis in these sections with clear headings:
1. **Projected Rental Income** — monthly and annual rental income based on the yield rate
2. **Capital Appreciation** — projected property value after 5 and 10 years
3. **ROI Summary** — overall return on investment percentage over 10 years
4. **Millionaire Timeline** — how many years to reach AED 3,670,000 in total wealth (property value + cumulative rent)
5. **Investment Summary** — a brief 2-3 sentence verdict on this investment

Use only the provided data. Respond in English only. Be precise with numbers.`;

    try {
      const aiResult = await fetchAIResponse(prompt);

      // Save results to dashboard store
      const monthlyIncome = (price * (yieldRate / 100)) / 12;
      saveDashboardData({
        efficiency: 82, // Hardcoded logic from original dashboard if needed, or derived
        monthlyIncome,
        assetScore: "A+" // Original dashboard fallback
      });


      setIsSubmitting(false);
      navigate("/wealth-projection", {
        state: {
          form: { ...formData, price },
          aiResult,
          appreciationRate: appRate,
          rentalYield: yieldRate,
        },
      });
    } catch (error) {
      setIsSubmitting(false);
      const errorMsg = error instanceof Error ? error.message : "Analysis failed. Please try again.";

      navigate("/wealth-projection", {
        state: {
          form: { ...formData, price },
          aiResult: `Error: ${errorMsg}`,
          appreciationRate: appRate,
          rentalYield: yieldRate,
        },
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-card selection:bg-secondary/30">
      <Header />
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Side: Immersive Visual */}
        <div className="relative flex w-full lg:w-5/12 xl:w-1/2 flex-col justify-between overflow-hidden bg-primary text-primary-foreground min-h-[50vh] lg:fixed lg:h-full lg:left-0 z-10">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              alt="Dubai skyline looking up at a modern skyscraper at dusk"
              className="h-full w-full object-cover opacity-60 mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH9_3iDmUGbgEzBCwVXVC9ZcbwhLgDo3m0NPe8jVm72oMkXFhVCQJ8ILGtHtohqINh3IInV1hzJyaQokGs5_ek-yKI6SvVvvge8BVaVD_-jqOnx3l5ycVOgweNacjiWCTbR4Ev21H4LPvS4pw5l7oulFbygGUx5Z7t9t2ztA5-yZOpi95b8EAxwEwWDpzk7BLUacuVUd_x16_F4WVp9q0gwBctjxEfOaIN7fs0whxQzseVACeCRzzbLE5dNz6b2GtCLA8rKWBX2GDK"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90 mix-blend-multiply" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex h-full flex-col justify-center p-8 lg:p-12 xl:p-20">
            {/* Gauge Section */}
            <div className="mb-12 flex flex-col items-center justify-center lg:items-start">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-primary/30 backdrop-blur-sm shadow-2xl">
                {/* Gauge Ring */}
                <div
                  className="absolute inset-0 rounded-full p-1"
                  style={{
                    background: 'conic-gradient(hsl(var(--secondary)) 0% 82%, rgba(255,255,255,0.1) 82% 100%)',
                    mask: 'radial-gradient(transparent 62%, black 63%)',
                    WebkitMask: 'radial-gradient(transparent 62%, black 63%)'
                  }}
                />
                {/* Inner Circle */}
                <div className="flex flex-col items-center text-center z-10">
                  <span className="text-5xl font-black tracking-tighter text-primary-foreground">82%</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-secondary mt-1">Efficiency</span>
                </div>
              </div>

              <div className="mt-8 max-w-sm text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur-md border border-primary-foreground/10 mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% vs Market Average</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-primary-foreground lg:text-3xl">
                  Unlock the potential of Dubai's skyline.
                </h2>
                <p className="mt-3 text-primary-foreground/70 text-sm leading-relaxed">
                  Our AI analyzes thousands of data points to predict high-yield investments tailored for Tamil investors.
                </p>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="absolute bottom-8 left-8 hidden lg:block opacity-60">
              <p className="text-xs font-medium uppercase tracking-widest border-l-2 border-secondary pl-4">
                Exclusive Access • 2024 Edition
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Form Area */}
        <div className="relative flex w-full flex-col bg-background lg:ml-auto lg:w-7/12 xl:w-1/2 min-h-screen">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 min-h-full pb-20 lg:pb-12">
            {/* Header Group */}
            <div className="mb-10 max-w-lg">
              <h1 className="text-foreground text-2xl sm:text-4xl font-black leading-tight tracking-tight lg:text-5xl mb-3">
                Tamil Millionaire <br /><span className="text-primary">Journey</span>
              </h1>
              <p className="text-muted-foreground text-lg font-medium">
                Get your personalized AI real estate investment plan.
              </p>
            </div>

            {/* The Form */}
            <form className="flex w-full max-w-lg flex-col gap-6" onSubmit={handleSubmit}>
              {/* Personal Info Section */}
              <div className="space-y-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary/70 ml-1">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="rounded-lg border-border bg-card px-4 py-3.5 text-base font-medium shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary/70 ml-1">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="rounded-lg border-border bg-card px-4 py-3.5 text-base font-medium shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-primary/70 ml-1">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 / +971"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="rounded-lg border-border bg-card pl-10 pr-4 py-3.5 text-base font-medium shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="pt-2">
                <Label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-3 ml-1">
                  Investment Preferences
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Property Type */}
                  <div className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-secondary hover:-translate-y-0.5 hover:bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-primary">Type</span>
                      <Building2 className="h-4 w-4 text-secondary" />
                    </div>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                      <SelectTrigger className="border-none bg-transparent p-0 h-auto text-sm font-medium focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-secondary hover:-translate-y-0.5 hover:bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-primary">Location</span>
                      <MapPin className="h-4 w-4 text-secondary" />
                    </div>
                    <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger className="border-none bg-transparent p-0 h-auto text-sm font-medium focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                        <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                        <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                        <SelectItem value="business-bay">Business Bay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bedrooms */}
                  <div className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-secondary hover:-translate-y-0.5 hover:bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-primary">Bedrooms</span>
                      <Bed className="h-4 w-4 text-secondary" />
                    </div>
                    <Select value={formData.bedrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}>
                      <SelectTrigger className="border-none bg-transparent p-0 h-auto text-sm font-medium focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                        <SelectItem value="2-bedrooms">2 Bedrooms</SelectItem>
                        <SelectItem value="3-bedrooms">3+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget */}
                  <div className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-secondary hover:-translate-y-0.5 hover:bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-primary">Budget</span>
                      <Wallet className="h-4 w-4 text-secondary" />
                    </div>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger className="border-none bg-transparent p-0 h-auto text-sm font-medium focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="250k-500k">$250k - $500k</SelectItem>
                        <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-plus">$5M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-4 w-full overflow-hidden rounded-lg bg-secondary px-8 py-6 shadow-lg shadow-secondary/20 transition-all hover:scale-[1.01] hover:shadow-secondary/40 text-secondary-foreground"
              >
                <div className="absolute inset-0 bg-primary-foreground/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative mr-2 text-base font-extrabold tracking-wide">
                  {isSubmitting ? "Analyzing..." : "Generate Income Analysis"}
                </span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-2 text-center text-xs font-medium text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>100% Private & Secure • AI-Driven Insights</span>
              </div>
            </form>
          </div>

          {/* Mobile-only Footer decoration */}
          <div className="lg:hidden w-full h-2 bg-gradient-to-r from-primary to-secondary" />
        </div>
      </div>
    </div>
  );
};

export default IncomeAnalysis;
