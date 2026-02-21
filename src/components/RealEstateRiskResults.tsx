import { useNavigate, useSearchParams } from "react-router-dom";
import { Diamond, ArrowLeft, Shield, TrendingUp, AlertTriangle, CheckCircle, Building2, Sparkles, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { VISA_ELIGIBILITY_MIN } from "@/data/marketData";

const RealEstateRiskResults = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    const investment = parseFloat(searchParams.get("investment") || "0");
    const duration = parseInt(searchParams.get("duration") || "5");
    const focus = searchParams.get("focus") || "balanced";
    const risk = searchParams.get("risk") || "moderate";

    // Calculations
    const highRiskReturn = investment * 5;
    const lowRiskReturn = investment * 3.5;
    const visaEligible = investment >= VISA_ELIGIBILITY_MIN;
    const visaProgress = Math.min((investment / VISA_ELIGIBILITY_MIN) * 100, 100);
    const shortfall = Math.max(VISA_ELIGIBILITY_MIN - investment, 0);

    const riskMultiplier = risk === "aggressive" ? 1.3 : risk === "conservative" ? 0.7 : 1;
    const focusLabel = focus === "rental" ? "Rental Income" : focus === "appreciation" ? "Capital Appreciation" : "Balanced";

    const projectedReturn = risk === "aggressive" ? highRiskReturn : risk === "conservative" ? lowRiskReturn : (highRiskReturn + lowRiskReturn) / 2;

    const fmt = (val: number) => `AED ${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2a0d1d] via-[#451430] to-[#1a0510] text-foreground font-sans selection:bg-secondary selection:text-primary overflow-x-hidden">
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary opacity-20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 flex flex-col gap-8 min-h-screen pb-32 md:pb-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Diamond className="h-6 w-6 text-secondary" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Risk Assessment</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Analysis Results</span>
                        </h1>
                    </div>
                    <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" onClick={() => navigate("/real-estate-risk-calculator")}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                </header>

                {/* Visa Eligibility */}
                <div className={`rounded-2xl p-8 shadow-2xl relative overflow-hidden clip-futuristic-1 ${visaEligible ? "bg-green-50" : "bg-beige"}`}>
                    <div className="flex items-start gap-5">
                        <div className={`p-3 rounded-xl ${visaEligible ? "bg-green-100" : "bg-primary/10"}`}>
                            {visaEligible ? (
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            ) : (
                                <AlertTriangle className="h-10 w-10 text-primary" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-foreground mb-1">
                                {visaEligible ? "✅ Golden Visa Eligible!" : "⚠️ Below Visa Threshold"}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                {visaEligible
                                    ? `Your investment of ${fmt(investment)} qualifies for UAE Golden Visa.`
                                    : `You need ${fmt(shortfall)} more to qualify for UAE Golden Visa (minimum ${fmt(VISA_ELIGIBILITY_MIN)}).`}
                            </p>
                            {/* Progress Bar */}
                            <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${visaEligible ? "bg-green-500" : "bg-primary"}`}
                                    style={{ width: `${visaProgress}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] font-bold text-muted-foreground">
                                <span>AED 0</span>
                                <span>{fmt(VISA_ELIGIBILITY_MIN)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projected Returns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* High Risk */}
                    <div className="bg-[#3e122b]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                <TrendingUp className="h-5 w-5 text-red-400" />
                            </div>
                            <h3 className="text-white font-bold uppercase tracking-wider text-sm">High Risk Strategy</h3>
                        </div>
                        <div className="text-4xl font-black text-white mb-2">{fmt(highRiskReturn)}</div>
                        <p className="text-white/60 text-sm">5x multiplier • {duration}-year horizon</p>
                        {/* Visual Bar */}
                        <div className="mt-4 flex items-end gap-3 h-20">
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-full bg-white/10 rounded-t" style={{ height: "40%" }} />
                                <span className="text-[10px] text-white/50">Investment</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t" style={{ height: "100%" }} />
                                <span className="text-[10px] text-white/50">Return</span>
                            </div>
                        </div>
                    </div>

                    {/* Low Risk */}
                    <div className="bg-[#3e122b]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                <Shield className="h-5 w-5 text-green-400" />
                            </div>
                            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Low Risk Strategy</h3>
                        </div>
                        <div className="text-4xl font-black text-white mb-2">{fmt(lowRiskReturn)}</div>
                        <p className="text-white/60 text-sm">3.5x multiplier • {duration}-year horizon</p>
                        {/* Visual Bar */}
                        <div className="mt-4 flex items-end gap-3 h-20">
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-full bg-white/10 rounded-t" style={{ height: "57%" }} />
                                <span className="text-[10px] text-white/50">Investment</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: "100%" }} />
                                <span className="text-[10px] text-white/50">Return</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Smart Suggestions */}
                {investment < 1000000 && (
                    <div className="glass-panel rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-foreground mb-3">💡 Smart Suggestions</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                Consider off-plan properties in Dubai South or JVC for higher appreciation potential at lower entry points.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                Pooling funds with other investors can unlock premium areas like Downtown Dubai or Palm Jumeirah.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                A studio or 1-bedroom in Business Bay offers the best rental yield for investments under AED 1M.
                            </li>
                        </ul>
                    </div>
                )}

                {/* Request Safe Plan Modal Trigger */}
                <div className="relative mt-4">
                    <div
                        className="max-w-2xl mx-auto bg-foreground border border-secondary/30 rounded-full p-2 pr-6 flex items-center gap-4 shadow-neon relative overflow-hidden group hover:border-secondary transition-colors cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-lg relative z-10">
                            <Shield className="h-6 w-6 text-foreground" />
                        </div>
                        <div className="flex-1 relative z-10">
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em]">Personalized</span>
                            <div className="text-card text-sm md:text-base font-bold">Request a Safe Investment Plan</div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-secondary relative z-10" />
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border">
                            <h3 className="text-xl font-bold text-foreground mb-2">Request Safe Plan</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Our team will create a personalized low-risk investment plan for {fmt(investment)}.
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-foreground/80 ml-1 flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-foreground/80 ml-1">Phone</label>
                                    <Input
                                        type="tel"
                                        placeholder="+971 ..."
                                        value={contactPhone}
                                        onChange={(e) => setContactPhone(e.target.value)}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setShowModal(false);
                                            // Could send data to API in the future
                                            alert("Thank you! Our team will contact you within 24 hours.");
                                        }}
                                        className="flex-1 bg-secondary text-secondary-foreground font-bold"
                                    >
                                        Submit Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealEstateRiskResults;
