import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThingsILike = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  const things = [
    {
      title: "Your Smile",
      description: "The way your eyes crinkle and light up when you're truly happy - it's absolutely contagious and makes my whole day brighter ✨",
      rotation: -5,
      color: "bg-pink-50"
    },
    {
      title: "Your Kindness",
      description: "How you always think of others first and go out of your way to make people feel special and cared for 💝",
      rotation: 3,
      color: "bg-purple-50"
    },
    {
      title: "Your Determination",
      description: "The way you never give up, even when things get tough. Your resilience inspires me every day 💪",
      rotation: -2,
      color: "bg-rose-50"
    },
    {
      title: "Your Laugh",
      description: "That genuine, heartfelt laugh that comes straight from your soul - it's music to my ears 🎵",
      rotation: 4,
      color: "bg-red-50"
    },
    {
      title: "Your Intelligence",
      description: "How you're always eager to learn new things and share your knowledge with others. Your curiosity is inspiring 📚",
      rotation: -3,
      color: "bg-pink-50"
    },
    {
      title: "Your Creativity",
      description: "The unique way you see the world and express yourself - you make everything more beautiful ✨",
      rotation: 2,
      color: "bg-purple-50"
    },
    {
      title: "Your Heart",
      description: "The immense capacity you have for love and compassion. You make everyone around you feel valued ❤️",
      rotation: -4,
      color: "bg-rose-50"
    },
    {
      title: "Your Strength",
      description: "Not just physical strength, but the inner strength that helps you overcome any challenge 💫",
      rotation: 5,
      color: "bg-red-50"
    },
    {
      title: "Your Playfulness",
      description: "Those silly moments we share together, your spontaneous dance moves, and your infectious joy 🌟",
      rotation: -1,
      color: "bg-pink-50"
    },
    {
      title: "Your Love",
      description: "The way you love - purely, deeply, and without reservation. It makes me feel like the luckiest person alive 💖",
      rotation: 3,
      color: "bg-purple-50"
    }
  ];

  useEffect(() => {
    things.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 4000); // 4 seconds interval
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8 relative overflow-hidden flex items-center justify-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <AnimatePresence>
            {things.map((thing, index) => (
              visibleCards.includes(index) && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotate: thing.rotation }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotate: thing.rotation,
                    transition: { duration: 1, ease: "easeOut" }
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                  className={`w-full max-w-sm p-6 rounded-lg shadow-lg ${thing.color} backdrop-blur-sm
                             border border-white/50 relative`}
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {thing.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {thing.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-2 right-2 w-8 h-8">
                    <motion.div
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="w-full h-full border-t-2 border-r-2 border-pink-200 rounded-tr-lg"
                    />
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ThingsILike;