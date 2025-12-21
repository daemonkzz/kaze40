import { Phone, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
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

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a href="#quests" className="text-muted-foreground hover:text-primary transition-colors text-sm">QUESTS</a>
            <a href="#lobby" className="text-muted-foreground hover:text-primary transition-colors text-sm">LOBBY</a>
            
            {/* Center Logo */}
            <div className="flex flex-col items-center mx-4">
              <span className="text-primary font-display text-xl">✕</span>
              <span className="text-foreground font-display text-sm tracking-wider">ESCAPE<br/>ROOM</span>
            </div>
            
            <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">GALLERY</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</a>
          </nav>

          {/* Info */}
          <div className="text-right text-xs text-muted-foreground">
            <p>Photography</p>
            <p>Designed by PORTAL STUDIO</p>
            <p>© X-Portal-Escape 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
