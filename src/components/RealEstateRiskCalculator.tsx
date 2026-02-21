import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Shield, DollarSign, Clock, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Header from "./layout/Header";

const RealEstateRiskCalculator = () => {
    const navigate = useNavigate();
    const [investment, setInvestment] = useState("");
    const [duration, setDuration] = useState("5");
    const [focus, setFocus] = useState("rental");
    const [risk, setRisk] = useState("moderate");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inv = parseFloat(investment);
        if (!inv || inv <= 0) {
            return;
        }
        navigate(`/real-estate-risk-results?investment=${inv}&duration=${duration}&focus=${focus}&risk=${risk}`);
    };

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="min-h-[calc(100vh-64px)] flex items-start justify-center p-6 md:p-12 pb-24 lg:pb-12">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                            Real Estate Risk Calculator 🛡️
                        </h1>
                        <p className="text-muted-foreground text-base">
                            Assess your investment risk with projected returns and visa eligibility.
                        </p>
                    </div>

                    <div className="bg-beige rounded-3xl p-8 md:p-12 shadow-soft border border-beige">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Investment Amount */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <DollarSign className="h-4 w-4 text-primary" /> Investment Amount (AED)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 1,000,000"
                                    value={investment}
                                    onChange={(e) => setInvestment(e.target.value)}
                                    className="w-full h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm focus:ring-2 focus:ring-primary/20"
                                    required
                                />
                            </div>

                            {/* Duration */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <Clock className="h-4 w-4 text-primary" /> Goal Duration
                                </label>
                                <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                    {["3", "5", "7", "10"].map((d) => (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => setDuration(d)}
                                            className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${duration === d ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {d} Years
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Investment Focus */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <Target className="h-4 w-4 text-primary" /> Investment Focus
                                </label>
                                <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                    {[
                                        { value: "rental", label: "Rental Income" },
                                        { value: "appreciation", label: "Appreciation" },
                                        { value: "balanced", label: "Balanced" },
                                    ].map((f) => (
                                        <button
                                            key={f.value}
                                            type="button"
                                            onClick={() => setFocus(f.value)}
                                            className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${focus === f.value ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Risk Appetite */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-foreground/80 ml-1">
                                    <Shield className="h-4 w-4 text-primary" /> Risk Appetite
                                </label>
                                <div className="bg-card p-1.5 rounded-2xl flex gap-1 h-14 shadow-sm">
                                    {["conservative", "moderate", "aggressive"].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setRisk(r)}
                                            className={`flex-1 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${risk === r ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-6 px-8 rounded-2xl text-base flex items-center justify-center gap-3 shadow-lg shadow-secondary/20"
                            >
                                Calculate Risk Profile
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RealEstateRiskCalculator;
