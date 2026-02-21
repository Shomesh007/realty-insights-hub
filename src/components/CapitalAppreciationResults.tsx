import { useNavigate, useLocation } from "react-router-dom";
import { Diamond, ArrowLeft, TrendingUp, MapPin, Lightbulb, BarChart3, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CapitalAppreciationResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as {
        futureValue?: string;
        assumptions?: string;
        locationInsight?: string;
        growthJustification?: string;
        chartData?: { year: number; value: number }[];
        rawText?: string;
        error?: string;
        form?: { currentPrice?: string; horizon?: string; location?: string; scenario?: string };
    } | null;

    if (!state || state.error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#2a0d1d] via-[#451430] to-[#1a0510] flex items-center justify-center p-6">
                <div className="text-center">
                    <AlertCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Estimation Error</h2>
                    <p className="text-white/60 mb-6">{state?.error || "No data available. Please try again."}</p>
                    <Button onClick={() => navigate("/capital-appreciation-estimator")} className="bg-secondary text-secondary-foreground font-bold">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const price = parseInt(state.form?.currentPrice || "0");
    const horizon = parseInt(state.form?.horizon || "5");

    // Generate chart data if not parsed
    const chartData = state.chartData || Array.from({ length: horizon + 1 }, (_, i) => ({
        year: i,
        value: price * Math.pow(1.08, i),
    }));

    const maxVal = Math.max(...chartData.map((d) => d.value)) * 1.1;
    const chartPoints = chartData.map((d, i) => {
        const x = (i / Math.max(chartData.length - 1, 1)) * 800;
        const y = 280 - (d.value / maxVal) * 260;
        return `${x},${y}`;
    });
    const chartLine = `M${chartPoints.join(" L")}`;
    const chartArea = `${chartLine} L800,300 L0,300 Z`;

    const SectionCard = ({ icon: Icon, title, content, color = "primary" }: { icon: any; title: string; content: string; color?: string }) => (
        <div className="bg-[#3e122b]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${color}/10 border border-${color}/20`}>
                    <Icon className={`h-5 w-5 text-secondary`} />
                </div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{content || "Analysis pending..."}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2a0d1d] via-[#451430] to-[#1a0510] text-foreground font-sans selection:bg-secondary selection:text-primary overflow-x-hidden">
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary opacity-20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-10 flex flex-col gap-8 min-h-screen pb-20 md:pb-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Diamond className="h-6 w-6 text-secondary" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Capital Analysis</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            Appreciation <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Forecast</span>
                        </h1>
                    </div>
                    <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" onClick={() => navigate("/capital-appreciation-estimator")}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                </header>

                {/* Future Value Hero */}
                {state.futureValue && (
                    <div className="bg-beige rounded-2xl p-8 shadow-2xl relative overflow-hidden clip-futuristic-1">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-primary" />
                            Estimated Future Value
                        </h2>
                        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter">
                            {state.futureValue}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                            After {horizon} years • {state.form?.scenario} scenario
                        </div>
                    </div>
                )}

                {/* Section Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SectionCard icon={Lightbulb} title="Assumption Adjustment" content={state.assumptions || ""} />
                    <SectionCard icon={MapPin} title="Location Insight" content={state.locationInsight || ""} />
                    <SectionCard icon={TrendingUp} title="Growth Justification" content={state.growthJustification || ""} />
                    <SectionCard icon={BarChart3} title="Market Context" content={`Based on ${state.form?.scenario} scenario for ${state.form?.location?.replace(/-/g, " ")}.`} />
                </div>

                {/* Chart */}
                <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl">
                    <h3 className="text-xl font-bold text-foreground mb-6">Projected Value Growth</h3>
                    <div className="relative w-full min-h-[250px] pl-12 pb-8">
                        <svg className="w-full h-full overflow-visible chart-glow" preserveAspectRatio="none" viewBox="0 0 800 300">
                            <line stroke="hsl(var(--border))" strokeWidth="1" x1="0" x2="800" y1="280" y2="280" />
                            <line stroke="hsl(var(--border))" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="140" y2="140" />
                            <defs>
                                <linearGradient id="capGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                                    <stop offset="0%" stopColor="#3e122b" />
                                    <stop offset="100%" stopColor="hsl(330, 55%, 27%)" />
                                </linearGradient>
                            </defs>
                            <path d={chartArea} fill="hsl(330, 55%, 27%)" fillOpacity="0.05" />
                            <path d={chartLine} fill="none" stroke="url(#capGrad)" strokeLinecap="round" strokeWidth="4" className="line-draw" />
                            {chartData.map((d, i) => {
                                const x = (i / Math.max(chartData.length - 1, 1)) * 800;
                                const y = 280 - (d.value / maxVal) * 260;
                                return <circle key={i} cx={x} cy={y} r="5" fill="hsl(var(--beige))" stroke="hsl(330, 55%, 27%)" strokeWidth="2" />;
                            })}
                        </svg>
                        <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[10px] font-bold text-muted-foreground px-2">
                            {chartData.map((d) => (
                                <span key={d.year}>Year {d.year}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Full AI Response */}
                {state.rawText && (
                    <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl">
                        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-secondary" />
                            Full AI Analysis
                        </h3>
                        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                            {state.rawText}
                        </div>
                    </div>
                )}

                {/* CTA Banner */}
                <div className="relative mt-4">
                    <div className="max-w-2xl mx-auto bg-foreground border border-secondary/30 rounded-full p-2 pr-6 flex items-center gap-4 shadow-neon relative overflow-hidden group hover:border-secondary transition-colors cursor-pointer"
                        onClick={() => navigate("/income-analysis")}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-lg relative z-10">
                            <Sparkles className="h-6 w-6 text-foreground" />
                        </div>
                        <div className="flex-1 relative z-10">
                            <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em]">Next Step</span>
                            <div className="text-card text-sm md:text-base font-bold">Get Full Investment Analysis →</div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-secondary relative z-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CapitalAppreciationResults;
