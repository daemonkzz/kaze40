import { Button } from "@/components/ui/button";
import portalSilhouette from "@/assets/portal-silhouette.png";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto text-center">
          {/* Portal Image */}
          <div className="mb-8 relative">
            <img 
              src={portalSilhouette} 
              alt="Enter the portal" 
              className="w-full max-w-sm mx-auto rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* CTA Button */}
          <Button variant="glow" size="xl" className="animate-glow-pulse">
            Book now →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
