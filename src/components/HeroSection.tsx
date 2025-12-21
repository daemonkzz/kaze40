import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import hourglassIcon from "@/assets/hourglass-icon.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none mb-6">
              ESCAPE<br />ROOM
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mb-8 leading-relaxed">
              Step into a world of mystery and adventure. 
              Solve puzzles, unlock secrets, and escape before 
              time runs out. Are you ready for the challenge?
            </p>
            <Button variant="hero" size="lg">
              Book Now →
            </Button>
          </div>

          {/* Right Content - Quest Card */}
          <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 max-w-xs">
              <div className="text-xs text-muted-foreground mb-2">Active Game</div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-foreground">THE LAST HOUR</h3>
                  <p className="text-xs text-muted-foreground">Players: 2-6 • Duration: 60 min</p>
                </div>
                <img 
                  src={hourglassIcon} 
                  alt="Hourglass" 
                  className="w-16 h-16 object-contain animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative X on floor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 opacity-30">
        <div className="w-full h-full text-primary text-glow font-display text-[200px] flex items-center justify-center">
          ✕
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
