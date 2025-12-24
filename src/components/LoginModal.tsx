import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background with gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent p-[1px]">
                <div className="h-full w-full rounded-2xl bg-background/95 backdrop-blur-xl" />
              </div>
              
              {/* Ambient glow effects */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Content */}
              <div className="relative px-8 py-10">
                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                
                {/* Logo/Title */}
                <div className="text-center mb-8">
                  <motion.h2 
                    className="text-3xl font-display font-bold tracking-wider text-foreground mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-primary">KAZE</span> COMMUNITY
                  </motion.h2>
                  
                  <motion.div 
                    className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                  
                  <motion.p 
                    className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sunucuda oynarken kullanacağınız Steam hesabı ile giriş yapmayı unutmayın!
                  </motion.p>
                </div>
                
                {/* Steam Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    className="w-full h-12 bg-[#171a21] hover:bg-[#1b2838] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(102,192,244,0.3)] group"
                    onClick={() => {
                      // Steam login logic will be added here
                      console.log("Steam login clicked");
                    }}
                  >
                    <svg 
                      className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
                    </svg>
                    Steam ile Giriş Yap
                  </Button>
                </motion.div>
                
                {/* Decorative line */}
                <motion.div 
                  className="w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mt-8 mb-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
                
                {/* Copyright */}
                <motion.p 
                  className="text-center text-muted-foreground/60 text-xs tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  © 2025 Kaze Community - Tüm hakları saklıdır.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
