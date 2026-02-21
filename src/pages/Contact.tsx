import { useNavigate, Link } from "react-router-dom";
import { Diamond, ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import Header from "@/components/layout/Header";

const Contact = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! Our team will get back to you within 24 hours.");
        setForm({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-card text-foreground font-sans antialiased">
            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 md:pb-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Ready to start your Dubai investment journey? Our team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-beige rounded-3xl p-8 shadow-soft border border-beige">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-foreground/80 ml-1 uppercase tracking-wider">Full Name</label>
                                <Input
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    className="h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-foreground/80 ml-1 uppercase tracking-wider">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                        className="h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-foreground/80 ml-1 uppercase tracking-wider">Phone</label>
                                    <Input
                                        type="tel"
                                        placeholder="+91 / +971"
                                        value={form.phone}
                                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                                        className="h-14 px-5 rounded-2xl border-none bg-card text-lg font-semibold shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-foreground/80 ml-1 uppercase tracking-wider">Message</label>
                                <textarea
                                    placeholder="Tell us about your investment goals..."
                                    value={form.message}
                                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl border-none bg-card text-base font-semibold shadow-sm resize-none focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-extrabold py-6 rounded-2xl text-base shadow-lg shadow-secondary/20"
                            >
                                <Send className="h-5 w-5 mr-2" /> Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Company Info */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-card rounded-2xl border border-border p-6">
                            <h3 className="font-bold text-foreground mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Email</p>
                                        <p className="text-foreground font-medium">invest@lykaconnect.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Phone</p>
                                        <p className="text-foreground font-medium">+971 4 XXX XXXX</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Office</p>
                                        <p className="text-foreground font-medium">Business Bay, Dubai, UAE</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
                            <h3 className="font-bold text-lg mb-2 relative z-10">Free Consultation</h3>
                            <p className="text-primary-foreground/80 text-sm mb-4 relative z-10">
                                Book a free 30-minute call with our investment advisors who specialize in Tamil investor portfolios.
                            </p>
                            <Button
                                onClick={() => navigate("/income-analysis")}
                                className="bg-secondary text-secondary-foreground font-bold relative z-10"
                            >
                                Start Your Analysis
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;
