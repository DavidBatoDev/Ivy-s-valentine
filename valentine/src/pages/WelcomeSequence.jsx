import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeSequence = () => {
  const [currentModal, setCurrentModal] = useState(1);
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/audio/like-the-movies.mp3');
    audio.play();
    audio.volume = 0.1;
    audio.loop = true;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (currentModal < 11) {
      const timer = setTimeout(() => {
        setShowContent(false);
        setTimeout(() => {
          setCurrentModal(prev => prev + 1);
          setShowContent(true);
        }, 500);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [currentModal]);

  const modalContent = {
    1: "Hii Ivy! 🌸 So, you're back—hehe, I've been waiting!",
    2: "Happy post-Valentine's day!❤️ I know it's a bit late, but I wanted to make sure your gift was special.",
    3: "I remember you mentioning how much you love detective movies, so I thought…",
    4: "why not make things a little more interesting? 🤭",
    5: "I've created a little website just for you!",
    6: "But—there's a twist. It's not just any website; it's a mystery game! 🕵️‍♀️🔍",
    7: "There are a series of puzzles you have to solve, and each one unlocks a hidden message from me",
    8: "But here's the catch: every level has a password that you need to figure out. Think you can crack the code? 😏",
    9: "Take your time, enjoy the challenge, and most of all—have fun!",
    10: "I made this with you in mind, so I hope you'll love it. 💙",
    11: "Good luck, Ling! I believe in you! ✨💖"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: showContent ? 1 : 0, 
          y: showContent ? 0 : 50 
        }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-4"
      >
        <motion.p 
          className="text-3xl md:text-4xl text-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {modalContent[currentModal]}
        </motion.p>
        
        <motion.div 
          className="mt-6 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5 }}
        />

        {currentModal === 11 && (
          <motion.button
            className="mt-8 bg-black text-white px-5 py-2 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/games')}
          >
            Start the Game
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomeSequence;