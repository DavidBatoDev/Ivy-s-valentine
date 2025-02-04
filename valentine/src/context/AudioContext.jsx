import React, { createContext, useState, useRef, useContext, useEffect } from 'react';

// Create the context for audio management
const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing

  // Function to play the audio
  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to pause the audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Function to stop the audio and reset it
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio position
      setIsPlaying(false);
    }
  };

  // Cleanup when the component unmounts
  useEffect(() => {
    return () => {
      stopAudio(); // Stop audio when the provider unmounts
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, stopAudio, isPlaying }}>
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};
