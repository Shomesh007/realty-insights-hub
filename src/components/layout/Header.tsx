import { Box, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md flex items-center justify-center">
              <Box className="h-4 w-4" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-2 leading-none">
              <span className="font-bold text-base tracking-tight text-foreground">LykaRealty</span>
              <span className="hidden md:block text-border text-xs">|</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">AI Intelligence</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/" 
              className="text-[10px] uppercase tracking-wide transition-colors"
              activeClassName="text-foreground font-semibold border-b-2 border-secondary pb-0.5"
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/reports" 
              className="text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-wide transition-colors"
              activeClassName="text-foreground font-semibold border-b-2 border-secondary pb-0.5"
            >
              Reports
            </NavLink>
            <NavLink 
              to="/market-data" 
              className="text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-wide transition-colors"
              activeClassName="text-foreground font-semibold border-b-2 border-secondary pb-0.5"
            >
              Market Data
            </NavLink>
          </div>

          {/* User Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-muted hover:bg-muted/80"
          >
            <User className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
