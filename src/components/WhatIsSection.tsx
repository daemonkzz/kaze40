import { motion, Variants } from "framer-motion";
import { Puzzle, Zap, Key } from "lucide-react";
import portalSilhouette from "@/assets/portal-silhouette.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WhatIsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="quests" className="py-24 md:py-32 relative overflow-hidden">
      <motion.div 
        ref={sectionRef}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Title */}
        <motion.div className="mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="font-display text-[50px] md:text-[70px] lg:text-[90px] text-foreground leading-[0.9] tracking-tight italic">
            WHAT<br />
            IS <motion.span 
              className="text-primary"
              animate={isVisible ? {
                textShadow: [
                  "0 0 20px hsl(var(--primary) / 0.5)",
                  "0 0 40px hsl(var(--primary) / 0.8)",
                  "0 0 20px hsl(var(--primary) / 0.5)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              X PORTAL
            </motion.span>?
          </h2>
        </motion.div>

        {/* Content Grid - Reference layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Description + Portal Image */}
          <motion.div className="lg:col-span-5 flex flex-col" variants={itemVariants}>
            {/* Description text */}
            <p className="text-foreground/50 text-xs md:text-sm leading-relaxed max-w-[280px] mb-6 italic">
              An immersive puzzle-based quest that challenges your logic and perception
            </p>
            
            {/* Portal Image with glow */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full max-w-[380px] aspect-[3/4] relative">
                {/* Portal glow behind */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.4) 40%, transparent 70%)",
                    filter: "blur(40px)",
                    transform: "scale(0.7) translateY(10%)",
                  }}
                  animate={isVisible ? {
                    opacity: [0.6, 0.9, 0.6],
                    scale: [0.7, 0.75, 0.7],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Silhouette image */}
                <motion.img 
                  src={portalSilhouette} 
                  alt="Portal silhouette" 
                  className="relative z-10 w-full h-full object-contain"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                
                {/* Floor reflection/glow */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at center, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 50%, transparent 80%)",
                    filter: "blur(15px)",
                  }}
                  animate={isVisible ? {
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards (asymmetric grid) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Top Card - Full width with gradient overlay */}
            <motion.div 
              className="relative bg-secondary/40 rounded-[20px] p-6 border border-border/10 cursor-pointer overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Diagonal yellow gradient overlay */}
              <div 
                className="absolute top-0 right-0 w-1/2 h-full opacity-40 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.5) 100%)",
                }}
              />
              
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative z-10"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Puzzle className="w-6 h-6 text-primary" />
              </motion.div>
              <p className="text-foreground/70 text-xs md:text-sm leading-relaxed relative z-10 max-w-md">
                You'll find yourself inside a mysterious space where logic is your main tool and intuition helps you survive. Everything here is not what it seems
              </p>
            </motion.div>

            {/* Bottom Row - Two cards side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card with gradient */}
              <motion.div 
                className="relative bg-secondary/40 rounded-[20px] p-5 border border-border/10 cursor-pointer overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Diagonal yellow gradient overlay */}
                <div 
                  className="absolute top-0 right-0 w-2/3 h-full opacity-30 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.4) 60%, hsl(var(--primary) / 0.6) 100%)",
                  }}
                />
                
                <motion.div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 relative z-10"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-5 h-5 text-primary" />
                </motion.div>
                <p className="text-foreground/60 text-[11px] md:text-xs leading-relaxed relative z-10">
                  You're not entering a game — you're entering a different universe. Portal X changes your perception from the first seconds
                </p>
              </motion.div>

              {/* Dark card */}
              <motion.div 
                className="bg-secondary/30 rounded-[20px] p-5 border border-border/10 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Key className="w-5 h-5 text-primary" />
                </motion.div>
                <p className="text-foreground/50 text-[11px] md:text-xs leading-relaxed">
                  Every detail is key. Careful attention will determine whether you find a way out or remain part of the system forever.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhatIsSection;

