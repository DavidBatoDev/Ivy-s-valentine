import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Memories = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    {
      id: 1,
      title: "Our First Date",
      date: "July 3, 2024",
      description: "Remember how nervous we both were? But as soon as we started talking, time just flew by. Your laugh made all the nervousness disappear.",
      position: "top-1 left-14",
      rotation: "-rotate-3"
    },
    {
      id: 2,
      title: "Marikina Date",
      date: "August 15, 2024",
      description: "Our cozy movie night with your favorite snacks. You fell asleep on my shoulder - it was the most peaceful moment.",
      position: "top-[-20px] right-[400px]",
      rotation: "rotate-4"
    },
    {
      id: 3,
      title: "Better Mind Date",
      date: "September 2, 2024",
      description: "That perfect sunny day at the beach. Building sandcastles, collecting shells, and watching the sunset together.",
      position: "bottom-32 left-80",
      rotation: "-rotate-2"
    },
    {
      id: 4,
      title: "Coffee Shop Study",
      date: "September 20, 2024",
      description: "Studying together at our favorite coffee shop. You were so focused, but still made time to share those little smiles.",
      position: "bottom-10 right-40",
      rotation: "rotate-3"
    }
  ];

  return (
    <>
    <div className="min-h-screen left- bg-[#faf3e7] p-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-gray-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ✧
          </motion.div>
        ))}
        
        {/* Decorative Leaves */}
        <motion.div
          className="absolute right-0 top-0 w-32 h-64 text-gray-300 opacity-20"
          animate={{
            rotate: [0, 5, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          🌿
        </motion.div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-handwriting font-secondary text-gray-800 text-center mb-12"
      >
        Good Memories Here
      </motion.h1>

      {/* Photos Container */}
      <div className="relative w-full h-[600px]">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            className={`absolute ${memory.position} ${memory.rotation}`}
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              onClick={() => setSelectedMemory(memory)}
              className="w-64 h-64 bg-white p-2 shadow-lg cursor-pointer transform transition-transform duration-300"
            >
              <div className="w-full h-full bg-gray-200 relative">
                {/* Tape Decoration */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#e6d5ba] opacity-50 rotate-3" />
                <div className="absolute top-2 left-2 text-sm text-gray-600">
                  {memory.date}
                </div>
                {/* Placeholder for actual photos */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Image {memory.id}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-8 z-50"
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="mt-8 space-y-6">
              <h2 className="text-3xl font-handwriting text-gray-800">
                {selectedMemory.title}
              </h2>
              <p className="text-sm text-gray-500">{selectedMemory.date}</p>
              <p className="text-gray-600 leading-relaxed">
                {selectedMemory.description}
              </p>
              
              {/* Additional Memory Details */}
              <div className="pt-6 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    <span className="block font-medium">Location</span>
                    <span>Our Special Place</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="block font-medium">Mood</span>
                    <span>Pure Joy ✨</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
    </>
  );
};

export default Memories;