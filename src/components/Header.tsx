import { useState } from "react";
import { Menu, X, Phone, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "QUESTS", href: "#quests" },
    { label: "LOBBY", href: "#lobby" },
  ];

  const navItemsRight = [
    { label: "GALLERY/EVENTS", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a href="#" className="p-2 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
              <Phone className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Desktop Navigation with Centered Logo */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-xs font-medium tracking-wide px-3"
              >
                {item.label}
              </a>
            ))}
            
            {/* Center Logo */}
            <div className="flex flex-col items-center mx-6">
              <span className="text-primary font-display text-xl leading-none">✕</span>
              <span className="text-foreground font-display text-xs tracking-wider leading-tight text-center">ESCAPE<br/>ROOM</span>
            </div>

            {navItemsRight.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-xs font-medium tracking-wide px-3"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Book Now Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="sm">
              Book now →
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            {[...navItems, ...navItemsRight].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="hero" size="sm" className="mt-4 w-full">
              Book now →
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
