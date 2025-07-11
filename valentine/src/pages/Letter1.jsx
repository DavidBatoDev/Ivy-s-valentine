import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Music2 } from 'lucide-react';

const LoveLetter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Side Designs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Side */}
        <div className="absolute left-0 top-0 h-full w-32 flex flex-col items-center justify-between py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-pink-200 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-24 h-24 bg-pink-100/50 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-200 rounded-full"
          />
        </div>
        
        {/* Right Side */}
        <div className="absolute right-0 top-0 h-full w-32 flex flex-col items-center justify-between py-12">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-200 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 bg-purple-100/50 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-pink-200 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md z-10">
        {/* Read Me Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-white px-6 py-2 rounded-lg shadow-md border-2 border-pink-200 text-gray-700 font-medium hover:bg-pink-50 transition-colors"
        >
          Read Me ❤️
        </motion.button>

        {/* Image Placeholder */}
        <div className="w-max h-[300px] rounded-lg shadow-lg border-2 border-pink-200 flex items-center justify-center text-gray-400">
            <img src="/images/ivy.jpg" alt="" className='h-full' />
        </div>

        {/* Music Player Card */}
        <motion.div 
          className="w-[300px] bg-white rounded-lg shadow-lg border-2 border-pink-200 p-4"
          whileHover={{ scale: 1.02 }}
        >
          <audio 
            ref={audioRef}
            src="/audio/like-the-movies.mp3" 
            onTimeUpdate={handleTimeUpdate}
          />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-200 transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Music2 size={16} className="text-pink-500" />
                  <span className="text-sm font-medium text-gray-700">Like The Movies</span>
                </div>
                <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
              </div>
              
              <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-pink-500 rounded-full"
                  style={{ width: `${(currentTime / 180) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">My Dearest Ivy</h2>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>
                      In the quiet moments when I think of you, my heart fills with a warmth that words can barely capture. Your smile, your laughter, the way your eyes light up when you're excited - these are the treasures that make my world brighter.
                    </p>
                    
                    <p>
                      Every day with you feels like a new adventure, a chance to discover something wonderful. You've shown me what it means to truly care for someone, to want to be a better person not just for myself, but for us.
                    </p>
                    
                    <p>
                      I cherish every moment we share, every conversation that stretches into hours, every simple gesture that speaks volumes of our connection. You're not just my partner; you're my best friend, my confidante, my favorite person.
                    </p>
                    
                    <p className="text-right font-medium text-gray-800">
                      Forever Yours,<br />
                      With All My Love ❤️
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveLetter;