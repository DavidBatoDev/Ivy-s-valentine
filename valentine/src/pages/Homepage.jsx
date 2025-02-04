import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomToCenterAnimation from '../components/BottomToCenterAnimation';
import TextTypeAnimation from '../components/TextTypeAnimation';
import { useModalTransitions } from '../hooks/useModalTransition';
import { useAudio } from '../context/AudioContext';

const Homepage = () => {
  const navigate = useNavigate();
  const [firstModal, setFirstModal] = useState(true);
  const [secondModal, setSecondModal] = useState(false);
  const [secondModalButtons, setSecondModalButtons] = useState(false);
  const [thirdModal, setThirdModal] = useState(false);
  const [noThirdModal, setNoThirdModal] = useState(false);
  const [skipButton, setSkipButton] = useState(true);
  const { playAudio, pauseAudio, stopAudio, isPlaying } = useAudio();
  const [audioUrl, setAudioUrl] = useState('/audio/like-the-movies.mp3');

  const handlePlay = () => {
    playAudio(audioUrl);
  };

  // const handlePause = () => {
  //   pauseAudio();
  // };

  // const handleStop = () => {
  //   stopAudio();
  // };

  useEffect(() => {
    // Check tetris_won local storage
    const tetrisWon = localStorage.getItem('tetris_won');
    if (tetrisWon) {
      setSkipButton(true);
    } else {
      setSkipButton(false);
    }
  }, []);

  // Use the custom hook to manage modal transitions
  useModalTransitions({
    stages: [
      {
        condition: firstModal,
        setCondition: setFirstModal,
        nextStage: () => {
          setSecondModal(true);
          setTimeout(() => setSecondModalButtons(true), 2000);
        },
      },
      {
        condition: thirdModal,
        setCondition: setThirdModal,
        navigationPath: '/ivy-tetris',
      },
      {
        condition: noThirdModal,
        setCondition: setNoThirdModal,
        navigationPath: '/tetris',
      },
    ],
    navigate,
    intervalDuration: 5000,
  });

  const handleYesImJasmin = () => {
    handlePlay();
    setSecondModal(false);
    setTimeout(() => setThirdModal(true), 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative">
      {skipButton && (
        <button
          className="z-50 absolute top-5 right-5 bg-black text-white px-5 py-2 rounded-lg"
          onClick={() => navigate('/ivy-tetris')}
        >
          Skip
        </button>
      )}

      {/* First Modal */}
      <BottomToCenterAnimation isOpen={firstModal} noCloseButton={true}>
        <TextTypeAnimation className={"text-black text-5xl"} text={"Hello and Happy Valentines Week! ❤️"} />
      </BottomToCenterAnimation>

      {/* Second Modal */}
      <BottomToCenterAnimation isOpen={secondModal} noCloseButton={true}>
        <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
          <TextTypeAnimation className={"text-black text-5xl"} text={"Are you Jasmin Ivy Fedilo?"} />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'tween',
              stiffness: 120,
              damping: 10,
              duration: 0.8,
            }}
          >
            {secondModalButtons && (
              <div className="flex gap-5">
                <button
                  className="bg-black text-white px-5 py-2 rounded-lg"
                  onClick={handleYesImJasmin}
                >
                  Yes
                </button>
                <button
                  className="bg-black text-white px-5 py-2 rounded-lg"
                  onClick={() => {
                    setSecondModal(false);
                    setTimeout(() => setNoThirdModal(true), 100);
                  }}
                >
                  No
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </BottomToCenterAnimation>

      {/* Third Modal */}
      <BottomToCenterAnimation isOpen={thirdModal} noCloseButton={true}>
        <TextTypeAnimation className={"text-black text-5xl"} text={"Hmm... Really? Try to beat this tetris then!"} />
      </BottomToCenterAnimation>

      {/* No Third Modal */}
      <BottomToCenterAnimation isOpen={noThirdModal} noCloseButton={true}>
        <TextTypeAnimation className={"text-black text-5xl"} text={"Oh okay, thanks for visiting just play some tetris then..."} />
      </BottomToCenterAnimation>
    </div>
  );
};

export default Homepage;
