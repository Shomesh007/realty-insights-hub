import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Building2, MapPin, Ruler, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { fetchAIResponse } from "@/utils/aiApi";
import Header from "./layout/Header";
import { locations, propertyTypes } from "@/data/marketData";

const growthFactors = [
    "Metro Expansion",
    "Expo 2030",
    "Tourism Growth",
    "Population Influx",
    "Infrastructure Projects",
    "Free Zone Development",
];

const scenarios = ["Conservative", "Moderate", "Optimistic"];

export function parseGeminiResult(text: string) {
    const getValue = (label: string) => {
        const match = text.match(new RegExp(`${label}[:\\s]*([^\\n]+)`, "i"));
        return match ? match[1].replace(/\*\*/g, "").trim() : "";
    };

    const getSection = (label: string) => {
        const match = text.match(new RegExp(`${label}[:\\s]*\\n?([\\s\\S]*?)(?:\\n##|\\n\\d+\\.|$)`, "i"));
        return match ? match[1].replace(/\*\*/g, "").trim() : "";
    };

    // Parse chart data from text
    const chartData: { year: number; value: number }[] = [];
    const chartMatch = text.match(/year\s*(\d+)[:\s]*(?:AED\s*)?([0-9,]+)/gi);
    if (chartMatch) {
        chartMatch.forEach((m) => {
            const parts = m.match(/(\d+)[:\s]*(?:AED\s*)?([0-9,]+)/);
            if (parts) {
                chartData.push({
                    year: parseInt(parts[1]),
                    value: parseInt(parts[2].replace(/,/g, "")),
                });
            }
        });
    }

    return {
        futureValue: getValue("future value") || getValue("estimated future value") || getValue("projected value"),
        assumptions: getSection("assumption") || getSection("assumption adjustment"),
        locationInsight: getSection("location insight") || getSection("location"),
        growthJustification: getSection("growth justification") || getSection("growth"),
        chartData: chartData.length > 0 ? chartData : undefined,
        rawText: text,
    };
}

const CapitalAppreciationEstimator = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        propertyType: "apartment",
        location: "downtown-dubai",
        currentPrice: "",
        area: "",
        horizon: "5",
        scenario: "Moderate",
        growthFactors: [] as string[],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleFactor = (factor: string) => {
        setForm((prev) => ({
            ...prev,
            growthFactors: prev.growthFactors.includes(factor)
                ? prev.growthFactors.filter((f) => f !== factor)
                : [...prev.growthFactors, factor],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        const locationLabel = locations.find((l) => l.value === form.location)?.label || form.location;

        const prompt = `You are a Dubai real estate capital appreciation analyst. Estimate the future value of this property:

Property Type: ${form.propertyType}
Location: ${locationLabel}
Current Price: AED ${parseInt(form.currentPrice).toLocaleString()}
Area: ${form.area || "N/A"} sqft
Investment Horizon: ${form.horizon} years
Scenario: ${form.scenario}
Growth Factors: ${form.growthFactors.join(", ") || "General market growth"}

Respond in this EXACT format:
1. **Estimated Future Value**: AED [amount]
2. **Assumption Adjustment**: [explain assumptions based on scenario]
3. **Location Insight**: [specific insight about this location's growth drivers]
4. **Growth Justification**: [justify the growth rate used]
5. **Projected Values**:
   - Year 0: AED ${form.currentPrice}
   - Year 1: AED [value]
   - Year 2: AED [value]
   - Year 3: AED [value]
   - Year 4: AED [value]

Be specific and use realistic Dubai market data.`;

        try {
            const aiResult = await fetchAIResponse(prompt);
            const parsed = parseGeminiResult(aiResult);

            setIsSubmitting(false);
            navigate("/capital-appreciation-results", {
                state: { ...parsed, form },
            });
        } catch (error) {
            setIsSubmitting(false);
            const errorMsg = error instanceof Error ? error.message : "Estimation failed.";
            navigate("/capital-appreciation-results", {
                state: { error: errorMsg, form },
            });
        }
    };

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="min-h-[calc(100vh-64px)] flex items-start justify-center p-6 md:p-12 pb-24 lg:pb-12">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                            Capital Appreciation Estimator 📈
                        </h1>
                        <p className="text-muted-foreground text-base">
                            AI-powered prediction of your property's future value.
                        </p>
                    </div>

                    <div className="bg-beige rounded-3xl p-8 md:p-12 shadow-soft border border-beige">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">Name</label>
                                    <Input
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/80 ml-1">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            {/* Property Type & Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Building2 className="h-4 w-4 text-primary" /> Property Type
                                    </label>
                                    <div className="bg-card p-1.5 rounded-2xl flex flex-wrap gap-1 shadow-sm">
                                        {propertyTypes.map((pt) => (
                                            <button
                                                key={pt.value}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, propertyType: pt.value }))}
                                                className={`flex-1 min-w-[80px] rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${form.propertyType === pt.value ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {pt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <MapPin className="h-4 w-4 text-primary" /> Location
                                    </label>
                                    <select
                                        value={form.location}
                                        onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-base font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    >
                                        {locations.map((loc) => (
                                            <option key={loc.value} value={loc.value}>{loc.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Price & Area */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        Current Price (AED)
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1,500,000"
                                        value={form.currentPrice}
                                        onChange={(e) => setForm((p) => ({ ...p, currentPrice: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Ruler className="h-4 w-4 text-primary" /> Area (sqft)
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1200"
                                        value={form.area}
                                        onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            {/* Horizon & Scenario */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Calendar className="h-4 w-4 text-primary" /> Horizon
                                    </label>
                                    <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                        {["3", "5", "7", "10"].map((h) => (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, horizon: h }))}
                                                className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.horizon === h ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {h}yr
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/80 ml-1">Scenario</label>
                                    <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                        {scenarios.map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, scenario: s }))}
                                                className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.scenario === s ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Growth Factors */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80 ml-1">Growth Factors</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {growthFactors.map((f) => (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => toggleFactor(f)}
                                            className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border ${form.growthFactors.includes(f)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-card text-muted-foreground border-border hover:border-secondary"
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-6 px-8 rounded-2xl text-base flex items-center justify-center gap-3 shadow-lg shadow-secondary/20"
                            >
                                {isSubmitting ? "Estimating..." : "Estimate Future Value"}
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CapitalAppreciationEstimator;
