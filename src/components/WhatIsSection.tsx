import { Lightbulb, Users, Clock, Key } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Mind-Bending Puzzles",
    description: "Challenge your intellect with intricate puzzles designed to test your problem-solving skills."
  },
  {
    icon: Users,
    title: "Team Experience",
    description: "Work together with friends, family, or colleagues to escape. Communication is key!"
  },
  {
    icon: Clock,
    title: "Race Against Time",
    description: "You have 60 minutes to complete your mission. Every second counts in this thrilling adventure."
  },
  {
    icon: Key,
    title: "Immersive Themes",
    description: "Step into professionally designed rooms with atmospheric settings and realistic props."
  }
];

const WhatIsSection = () => {
  return (
    <section id="quests" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            WHAT<br />
            IS <span className="text-primary text-glow">X PORTAL</span>?
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <p className="text-muted-foreground leading-relaxed">
            X Portal is an immersive escape room experience that transports you 
            into another dimension. Our cutting-edge rooms combine technology, 
            storytelling, and physical challenges.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(51_100%_50%/0.1)] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
