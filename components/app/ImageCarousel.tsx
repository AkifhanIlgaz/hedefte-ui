import { ImageWithFallback } from "@/components/app/ImageWithFallback";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    tagline: "Connect with like-minded people",
    subtitle: "Join a community that shares your interests and values",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    tagline: "Discover new opportunities",
    subtitle: "Unlock possibilities you never knew existed",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    tagline: "Achieve your goals together",
    subtitle: "Success is better when shared with others",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={slides[currentSlide].image}
            alt={slides[currentSlide].tagline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="mb-4 text-white">{slides[currentSlide].tagline}</h2>
            <p className="text-white/90 max-w-md">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="flex space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
