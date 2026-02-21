import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { TrendingUp, PieChart, Shield, Calculator, Globe, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: TrendingUp,
        title: "Capital Appreciation Estimator",
        description: "Predict future property values using AI-driven analysis of growth corridors, infrastructure projects, and market trends.",
        buttonText: "Estimate Now",
        route: "/capital-appreciation-estimator",
        color: "from-primary to-accent",
    },
    {
        icon: PieChart,
        title: "Portfolio Optimizer",
        description: "Get AI-recommended portfolio allocations based on your budget, risk tolerance, and investment horizons.",
        buttonText: "Optimize Portfolio",
        route: "/portfolio-optimizer",
        color: "from-secondary/80 to-secondary",
    },
    {
        icon: Shield,
        title: "Real Estate Risk Calculator",
        description: "Assess investment risk with projected returns, visa eligibility, and scenario-based risk modeling.",
        buttonText: "Calculate Risk",
        route: "/real-estate-risk-calculator",
        color: "from-accent to-primary",
    },
    {
        icon: Calculator,
        title: "Mortgage EMI Calculator",
        description: "Personalize your Dubai mortgage plan with AI-powered calculations across 15+ lending partners.",
        buttonText: "Calculate EMI",
        route: "/emi-calculator",
        color: "from-primary to-primary/70",
    },
    {
        icon: BarChart3,
        title: "Tamil Investment Analysis",
        description: "AI-powered analysis tailored for Tamil investors — rental yield, appreciation, ROI, and millionaire timeline.",
        buttonText: "Start Analysis",
        route: "/income-analysis",
        color: "from-secondary to-secondary/70",
    },
    {
        icon: Globe,
        title: "UAE Investor Visa Info",
        description: "Explore UAE Golden Visa eligibility, investment thresholds, and residency benefits through property investment.",
        buttonText: "Learn More",
        route: "/uae-investor-visa",
        color: "from-accent/80 to-primary/80",
    },
];

const AIFeatures = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const visibleFeatures = isMobile ? features.slice(0, 4) : features;
    const extraFeatures = isMobile ? features.slice(4) : [];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Section Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">AI-Powered Tools</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                    Smart Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Intelligence</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Institutional-grade AI tools designed to maximize your Dubai real estate returns.
                </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.route}
                            className="group relative bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Gradient accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{feature.description}</p>

                            <Button
                                onClick={() => navigate(feature.route)}
                                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                {feature.buttonText}
                            </Button>
                        </div>
                    );
                })}
            </div>

            {/* Extra Features for mobile */}
            {extraFeatures.length > 0 && (
                <div className="grid grid-cols-1 gap-6 mt-6">
                    {extraFeatures.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.route}
                                className="group flex items-center gap-4 bg-card rounded-2xl p-5 border border-border hover:border-secondary/50 shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} shrink-0`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-bold text-foreground mb-0.5">{feature.title}</h3>
                                    <p className="text-xs text-muted-foreground truncate">{feature.description}</p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => navigate(feature.route)}
                                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shrink-0"
                                >
                                    Go
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default AIFeatures;
