import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Briefcase, Target, Clock, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { fetchAIResponse } from "@/utils/aiApi";
import Header from "./layout/Header";

const investmentGoals = [
    "Capital Appreciation",
    "Rental Income",
    "Golden Visa",
    "Portfolio Diversification",
    "Retirement Planning",
    "Short-term Flipping",
];

const PortfolioOptimizer = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        budget: "",
        riskTolerance: "moderate",
        horizon: "5",
        goals: [] as string[],
    });
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleGoal = (goal: string) => {
        setForm((prev) => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter((g) => g !== goal)
                : [...prev.goals, goal],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.budget || !form.name) {

            return;
        }
        setIsSubmitting(true);
        setResult("Analyzing...");

        const prompt = `You are a Dubai real estate portfolio advisor. Create an optimal portfolio allocation for this investor:

Name: ${form.name}
Budget: AED ${parseInt(form.budget).toLocaleString()}
Risk Tolerance: ${form.riskTolerance}
Investment Horizon: ${form.horizon} years
Goals: ${form.goals.join(", ") || "General Investment"}

Provide a detailed portfolio recommendation including:
1. **Recommended Allocation** — % split across property types (apartments, villas, off-plan, commercial) and areas
2. **Top 3 Specific Recommendations** — property type, area, price range, expected yield
3. **Risk Assessment** — overall risk level and mitigation strategies
4. **Expected Returns** — projected annual yield and total ROI over the investment horizon
5. **Action Plan** — step-by-step next steps

Be specific with Dubai areas and realistic numbers.`;

        try {
            const aiResult = await fetchAIResponse(prompt);
            setResult(aiResult);

        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "Analysis failed.";
            setResult(`Error: ${errorMsg}`);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="min-h-[calc(100vh-64px)] flex items-start justify-center p-6 md:p-12">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                            AI Portfolio Optimizer 🎯
                        </h1>
                        <p className="text-muted-foreground text-base">
                            Get a personalized Dubai real estate portfolio allocation powered by AI.
                        </p>
                    </div>

                    <div className="bg-beige rounded-3xl p-8 md:p-12 shadow-soft border border-beige">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Briefcase className="h-4 w-4 text-primary" /> Full Name
                                    </label>
                                    <Input
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                        className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <DollarSign className="h-4 w-4 text-primary" /> Investment Budget (AED)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 2,000,000"
                                    value={form.budget}
                                    onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                                    className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>

                            {/* Risk & Horizon */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Target className="h-4 w-4 text-primary" /> Risk Tolerance
                                    </label>
                                    <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                        {["conservative", "moderate", "aggressive"].map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, riskTolerance: r }))}
                                                className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.riskTolerance === r
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                        <Clock className="h-4 w-4 text-primary" /> Investment Horizon
                                    </label>
                                    <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                        {["3", "5", "10"].map((h) => (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => setForm((p) => ({ ...p, horizon: h }))}
                                                className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.horizon === h
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-muted text-muted-foreground"
                                                    }`}
                                            >
                                                {h} Years
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Investment Goals */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80 ml-1">Investment Goals</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {investmentGoals.map((goal) => (
                                        <button
                                            key={goal}
                                            type="button"
                                            onClick={() => toggleGoal(goal)}
                                            className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border ${form.goals.includes(goal)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-card text-muted-foreground border-border hover:border-secondary"
                                                }`}
                                        >
                                            {goal}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-6 px-8 rounded-2xl text-base flex items-center justify-center gap-3 shadow-lg shadow-secondary/20"
                            >
                                {isSubmitting ? "Analyzing Portfolio..." : "Optimize My Portfolio"}
                                <Sparkles className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="mt-8 bg-card rounded-3xl p-8 border border-border shadow-soft">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-secondary" />
                                AI Portfolio Recommendation
                            </h3>
                            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PortfolioOptimizer;
