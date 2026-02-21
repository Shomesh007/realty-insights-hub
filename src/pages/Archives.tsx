import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Calendar, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const archivedContent = [
    { title: "Dubai Real Estate Market Report Q4 2024", date: "Dec 2024", category: "Market Report", excerpt: "Comprehensive analysis of Dubai's real estate performance in Q4 2024." },
    { title: "Tamil Investors in Dubai: 2024 Trends", date: "Nov 2024", category: "Research", excerpt: "How Tamil investors shaped Dubai's property market in 2024." },
    { title: "Off-Plan vs Ready Properties: 2024 Analysis", date: "Oct 2024", category: "Analysis", excerpt: "Updated comparison of off-plan and ready property performance." },
    { title: "Business Bay Growth Corridor Report", date: "Sep 2024", category: "Market Report", excerpt: "Deep dive into Business Bay's rapid development and future prospects." },
    { title: "Golden Visa Policy Updates 2024", date: "Aug 2024", category: "Policy", excerpt: "Latest changes to UAE's Golden Visa program affecting property investors." },
    { title: "Dubai South: Infrastructure Impact on Property Values", date: "Jul 2024", category: "Research", excerpt: "How Al Maktoum Airport expansion drives property appreciation." },
];

const Archives = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 md:pb-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                        Archives
                    </h1>
                    <p className="text-muted-foreground">Past reports, research, and market analysis.</p>
                </div>

                <div className="space-y-4">
                    {archivedContent.map((item, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                                            <Tag className="h-3 w-3" /> {item.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                            <Calendar className="h-3 w-3" /> {item.date}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">{item.excerpt}</p>
                                </div>
                                <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Archives;
