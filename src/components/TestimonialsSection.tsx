const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-[50px] md:text-[70px] lg:text-[90px] text-foreground leading-[0.9] tracking-tight italic">
            THEY'LL TELL<br />YOU BETTER
          </h2>
        </div>

        {/* Testimonial Cards - Fan Layout */}
        <div className="relative max-w-4xl mx-auto mb-0">
          <div className="flex justify-center items-end relative h-[320px] md:h-[380px]">
            {/* Left Card - Tilted */}
            <div className="absolute left-1/2 -translate-x-[170%] md:-translate-x-[150%] w-56 md:w-72 h-64 md:h-80 bg-secondary/50 rounded-[20px] border border-border/20 transform -rotate-12 origin-bottom shadow-xl" />
            
            {/* Center Card - Prominent */}
            <div className="relative w-64 md:w-80 h-72 md:h-[340px] bg-secondary/60 rounded-[20px] border border-border/30 z-10 shadow-2xl" />
            
            {/* Right Card - Tilted */}
            <div className="absolute left-1/2 translate-x-[70%] md:translate-x-[50%] w-56 md:w-72 h-64 md:h-80 bg-secondary/50 rounded-[20px] border border-border/20 transform rotate-12 origin-bottom shadow-xl" />
          </div>
          
          {/* Portal Glow Effect - Oval Shape */}
          <div className="relative mx-auto -mt-8">
            <div className="w-[280px] md:w-[400px] h-16 md:h-20 mx-auto bg-primary rounded-[100%] blur-sm opacity-90" />
            <div className="absolute inset-0 w-[320px] md:w-[450px] h-20 md:h-24 mx-auto bg-primary/50 rounded-[100%] blur-xl -top-2" />
            <div className="absolute inset-0 w-[360px] md:w-[500px] h-24 md:h-28 mx-auto bg-primary/30 rounded-[100%] blur-2xl -top-4" />
          </div>
        </div>

        {/* Update Notes Section */}
        <div className="text-center mt-28">
          <h3 className="font-display text-lg md:text-xl text-foreground mb-10 tracking-[0.25em] uppercase">UPDATE NOTES</h3>
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="aspect-square bg-secondary/30 rounded-[20px] md:rounded-[28px] border border-border/10 hover:border-border/30 transition-all duration-300 cursor-pointer hover:bg-secondary/50"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
