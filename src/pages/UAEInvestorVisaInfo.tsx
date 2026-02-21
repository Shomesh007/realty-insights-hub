import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Globe, CheckCircle, Building2, CreditCard, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const visaTypes = [
    {
        title: "Golden Visa (10 Years)",
        investment: "AED 2,000,000+",
        icon: Shield,
        benefits: ["10-year renewable residency", "100% business ownership", "No sponsor required", "Family sponsorship included"],
        color: "from-yellow-500 to-amber-600",
    },
    {
        title: "Property Investor Visa (3-5 Years)",
        investment: "AED 750,000+",
        icon: Building2,
        benefits: ["3-5 year renewable visa", "Property must be ready (not off-plan)", "Single property or combined", "Spouse and children included"],
        color: "from-primary to-accent",
    },
    {
        title: "Retirement Visa (5 Years)",
        investment: "AED 1,000,000+",
        icon: Users,
        benefits: ["Age 55+ required", "Property investment qualifying", "Financial savings alternative", "Renewable"],
        color: "from-accent to-primary/70",
    },
];

const UAEInvestorVisaInfo = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">UAE Residency</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                        Investor Visa Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Real Estate</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Unlock UAE residency by investing in Dubai property. Here's everything you need to know about eligibility, thresholds, and benefits.
                    </p>
                </div>

                {/* Visa Types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {visaTypes.map((visa) => {
                        const Icon = visa.icon;
                        return (
                            <div key={visa.title} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${visa.color} mb-4`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-1">{visa.title}</h3>
                                <p className="text-secondary font-bold text-sm mb-4">Min. Investment: {visa.investment}</p>
                                <ul className="space-y-2">
                                    {visa.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* Key Requirements */}
                <div className="bg-beige rounded-3xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Key Requirements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: CreditCard, title: "Property Registration", desc: "Property must be registered with Dubai Land Department (DLD) in your name." },
                            { icon: Clock, title: "Processing Time", desc: "Visa processing typically takes 2-4 weeks after property registration." },
                            { icon: Shield, title: "Health Insurance", desc: "Valid UAE health insurance is mandatory for all visa applicants." },
                            { icon: Building2, title: "Property Type", desc: "Ready properties qualify for investor visa. Off-plan properties may qualify for Golden Visa only." },
                        ].map((req) => {
                            const Icon = req.icon;
                            return (
                                <div key={req.title} className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-sm">{req.title}</h4>
                                        <p className="text-sm text-muted-foreground">{req.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        onClick={() => navigate("/real-estate-risk-calculator")}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-6 text-base shadow-lg"
                    >
                        Check Your Visa Eligibility →
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default UAEInvestorVisaInfo;
