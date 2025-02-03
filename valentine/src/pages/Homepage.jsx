import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BottomToCenterAnimation from '../components/BottomToCenterAnimation'
import TextTypeAnimation from '../components/TextTypeAnimation'

const Homepage = () => {
  const navigate = useNavigate()
  const [currentText, setCurrentText] = useState("Hello!")
  const [firstModal, setFirstModal] = useState(true)
  const [secondModal, setSecondModal] = useState(false)
  const [secondModalButtons, setSecondModalButtons] = useState(false)
  const [thirdModal, setThirdModal] = useState(false)
  const [noThirdModal, setNoThirdModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
        // If the first modal is open, close it and open the second modal
        if (firstModal) {
            setFirstModal(false)
            setTimeout(() => setSecondModal(true), 100) // Delay to ensure state update
            setTimeout(() => setSecondModalButtons(true), 2000) // Delay to ensure state update
        } else if (thirdModal) {
            setThirdModal(false)
            setTimeout(() => navigate('/ivy-tetris'), 100) 
        } else if (noThirdModal) {
            setNoThirdModal(false)
            setTimeout(() => navigate('/tetris'), 100) 
        }
    }, 5000)

    return () => clearInterval(interval)
  }, [firstModal, secondModal, thirdModal, noThirdModal])


  // useEffect(() => {
  //       const audio = new Audio('/audio/like-the-movies.mp3');
  //       audio.play();
  //       audio.volume = 0.1; // Set the volume to 10%
  //       audio.loop = true; // Loop the audio

  //       return () => {
  //           audio.pause();
  //           audio.currentTime = 0; // Reset the audio
  //       };
  //   }, []);

    const handleYesImJasmin = () => {
      // play audio
      const audio = new Audio('/audio/like-the-movies.mp3');
      audio.play();
      audio.volume = 0.1; // Set the volume to 10%
      audio.loop = true; // Loop the audio
      setSecondModal(false)
      setTimeout(() => setThirdModal(true), 100) // Delay to ensure state update
    }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-primary relative"
    >

        {/* First Modal */}
      <BottomToCenterAnimation 
        isOpen={firstModal}
        noCloseButton={true}
      >
        <TextTypeAnimation className={"text-black text-5xl"} text={"Hello and Happy Valentines Week!"} />
      </BottomToCenterAnimation>

        {/* Second Modal */}
      <BottomToCenterAnimation 
        isOpen={secondModal}
        noCloseButton={true}
        onClose={() => setIsModalOpen(false)}
      >
        <div className='flex flex-col gap-5 justify-center items-center h-full w-full'>
            <TextTypeAnimation className={"text-black text-5xl"} text={"Are you Jasmin Ivy Fedilo?"} />
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ 
                    type: 'tween', 
                    stiffness: 120, 
                    damping: 10,
                    duration: 0.8
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
                        setSecondModal(false)
                        setTimeout(() => setNoThirdModal(true), 100) // Delay to ensure state update
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
        <BottomToCenterAnimation
            isOpen={thirdModal}
            noCloseButton={true}
        >
            <TextTypeAnimation className={"text-black text-5xl"} text={"Hmm... Really? Try to beat this tetris then!"} />
        </BottomToCenterAnimation>

        {/* No Third Modal */}
        <BottomToCenterAnimation
            isOpen={noThirdModal}
            noCloseButton={true}
        >
            <TextTypeAnimation className={"text-black text-5xl"} text={"Oh okay, thanks for visiting just play some tetris then..."} />
        </BottomToCenterAnimation>
    </div>
  )
}

export default Homepage