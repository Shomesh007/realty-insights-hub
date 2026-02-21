import { useNavigate, useLocation, Link } from "react-router-dom";
import { Box, User, Menu, ArrowLeft, Bell, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "AI Predictions", path: "/dashboard" },
    { name: "Income Analysis", path: "/income-analysis" },
    { name: "EMI Calculator", path: "/emi-calculator" },
    { name: "Portfolio Optimizer", path: "/portfolio-optimizer" },
    { name: "Capital Appreciation", path: "/capital-appreciation-estimator" },
    { name: "Risk Calculator", path: "/real-estate-risk-calculator" },
    { name: "UAE Investor Visa", path: "/uae-investor-visa" },
    { name: "Archives", path: "/archives" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          {/* Logo & Back */}
          <div className="flex items-center gap-3">
            {!isHome && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center shadow-md">
                <Diamond className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-tight text-foreground">LykaConnect</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest hidden sm:block">AI Intelligence</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <SheetHeader className="text-left">
                      <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                        <Diamond className="h-5 w-5 text-primary" /> LykaConnect
                      </SheetTitle>
                    </SheetHeader>
                  </div>
                  <div className="flex-1 overflow-y-auto py-4 px-2">
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={cn(
                            "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                            location.pathname === link.path
                              ? "bg-primary/5 text-primary font-bold shadow-sm"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-6 mt-auto border-t border-border">
                    <Button
                      onClick={() => navigate("/income-analysis")}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-soft"
                    >
                      Get AI Analysis
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

