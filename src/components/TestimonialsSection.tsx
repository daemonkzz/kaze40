import testimonialBg from "@/assets/testimonial-bg.png";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Absolutely incredible experience! The puzzles were challenging and the atmosphere was perfect.",
    rating: 5
  },
  {
    name: "John D.",
    text: "Best escape room I've ever been to. The attention to detail is amazing!",
    rating: 5
  },
  {
    name: "Emily R.",
    text: "Our team had so much fun. We'll definitely be back to try other rooms!",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground">
            THEY'LL TELL<br />YOU BETTER
          </h2>
        </div>

        {/* Testimonial Image */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <img 
            src={testimonialBg} 
            alt="Mysterious portal" 
            className="w-full rounded-3xl animate-spotlight"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-3xl" />
        </div>

        {/* Update Notes Section */}
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl md:text-4xl text-foreground mb-8">UPDATE NOTES</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="aspect-square bg-secondary rounded-3xl border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
