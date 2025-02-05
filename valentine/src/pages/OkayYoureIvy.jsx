import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import BottomToCenterAnimation from '../components/BottomToCenterAnimation'
import TextTypeAnimation from '../components/TextTypeAnimation'
import { useModalTransitions } from '../hooks/useModalTransition'

const OkayYoureIvy = () => {
  const navigate = useNavigate()
  const [firstModal, setFirstModal] = useState(true)
  const [secondModal, setSecondModal] = useState(false)
  const [thirdModal, setThirdModal] = useState(false)
  const [fourthModal, setFourthModal] = useState(false)
  const [fifthModal, setFifthModal] = useState(false)
  const [sixthModal, setSixthModal] = useState(false)
  const [seventhModal, setSeventhModal] = useState(false)
  const [eighthModal, setEighthModal] = useState(false)
  const [ninthModal, setNinthModal] = useState(false)
  const [tenthModal, setTenthModal] = useState(false)
  const [eleventhModal, setEleventhModal] = useState(false)
  const [twelfthModal, setTwelfthModal] = useState(false)
  const [thirteenthModal, setThirteenthModal] = useState(false)
  const [fourteenthModal, setFourteenthModal] = useState(false)
  const [fifteenthModal, setFifteenthModal] = useState(false)
  
  // Form states
  const [snackInput, setSnackInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [dogInput, setDogInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
      const audio = new Audio('/audio/like-the-movies.mp3');
      audio.play();
      audio.volume = 0.1; // Set the volume to 10%
      audio.loop = true; // Loop the audio

      return () => {
          audio.pause();
          audio.currentTime = 0; // Reset the audio
      };
  }, []);

  useModalTransitions({
    stages: [
      {
        condition: firstModal,
        setCondition: setFirstModal,
        nextStage: () => setSecondModal(true)
      },
      {
        condition: secondModal,
        setCondition: setSecondModal,
        nextStage: () => setThirdModal(true)
      },
      {
        condition: thirdModal,
        setCondition: setThirdModal,
        nextStage: () => setFourthModal(true)
      }
    ],
    navigate,
    intervalDuration: 6000
  })

  // Form validation handlers
  const handleSnackSubmit = (e) => {
    e.preventDefault()
    const normalizedInput = snackInput.toLowerCase().trim()
    if (normalizedInput === 'fries' || normalizedInput === 'french fries') {
      setFourthModal(false)
      setFifthModal(true)
      setError('')
    } else if (normalizedInput === 'Ivy' || normalizedInput === 'me' || normalizedInput === 'ako') {
      setFourthModal(false)
      setFifthModal(true)
      setError('syempre naman pero hindi yan ang sagot')
    } 
    else {
      setError('Wrong answer! Try again.')
    }
  }

  const handleDateSubmit = (e) => {
    e.preventDefault()
    // Convert the date input to the desired format for comparison
    const selectedDate = new Date(dateInput)
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
    
    if (formattedDate === 'July 03, 2024') {
      setFifthModal(false)
      setSixthModal(true)
      setError('')
    } else {
      setError('Wrong date! Try again.')
    }
  }

  const handleDogSubmit = (e) => {
    e.preventDefault()
    if (dogInput.toLowerCase().trim() === '17' || dogInput.toLowerCase().trim() === '17 years old') {
      setSixthModal(false)
      setSeventhModal(true)
      setTimeout(() => {
        setSeventhModal(false)
        setEighthModal(true)
      }, 5000)
      setError('')
    } else if (dogInput.toLowerCase().trim() === '20' || dogInput.toLowerCase().trim() === '23' || dogInput.toLowerCase().trim() === '21') {
      setError('Hmm.. Tama naman siguro')
    }
    else {
      setError('Wrong age! Try again.')
    }
  }

  const handleYesClick = () => {
    setEighthModal(false)
    setNinthModal(true)
    startValentineSequence()
  }

  const startValentineSequence = () => {
    setTimeout(() => {
      setNinthModal(false)
      setTenthModal(true)
      setTimeout(() => {
        setTenthModal(false)
        setEleventhModal(true)
        setTimeout(() => {
          setEleventhModal(false)
          setTwelfthModal(true)
          setTimeout(() => {
            setTwelfthModal(false)
            setThirteenthModal(true)
            setTimeout(() => {
              setThirteenthModal(false)
              setFourteenthModal(true)
              setTimeout(() => {
                setFourteenthModal(false)
                setFifteenthModal(true)
              }, 7000)
            }, 7000)
          }, 7000)
        }, 7000)
      }, 5000)
    }, 5000)
  }

  const navigateToNext = () => {
    navigate('/next-page') // Replace with your target route
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative">
      {/* Error Notification */}
      {error && (
        <div className="absolute top-4 right-4 text-red-500 bg-white p-4 rounded-lg shadow-lg">
          {error}
        </div>
      )}

      {/* First Modal */}
      <BottomToCenterAnimation isOpen={firstModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-5xl" text="Woww.. That's amazing!!" />
      </BottomToCenterAnimation>

      {/* Second Modal */}
      <BottomToCenterAnimation isOpen={secondModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-5xl" text="Maybe, you really are Ivy! You got her skill!" />
      </BottomToCenterAnimation>

      {/* Third Modal */}
      <BottomToCenterAnimation isOpen={thirdModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-3xl" text="But just to be sure let me ask you some questions, That only the real Ivy can answer!" />
      </BottomToCenterAnimation>

      {/* Fourth Modal */}
      <BottomToCenterAnimation isOpen={fourthModal} noCloseButton={true}>
        <div className="flex flex-col gap-4 items-center">
          <TextTypeAnimation className="text-black text-5xl" text="What's my favorite snack?" />
          <form onSubmit={handleSnackSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={snackInput}
              onChange={(e) => setSnackInput(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-black text-black"
              placeholder="Enter answer..."
            />
            <button type="submit" className="bg-black text- px-4 py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </BottomToCenterAnimation>

      {/* Fifth Modal */}
      <BottomToCenterAnimation isOpen={fifthModal} noCloseButton={true}>
        <div className="flex flex-col gap-4 items-center">
          <TextTypeAnimation className="text-black text-5xl" text="That's correct! How about our first date?" />
          <form onSubmit={handleDateSubmit} className="flex flex-col gap-2">
          <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-black text-black"
              min="2024-01-01" 
              max="2024-12-31"
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </BottomToCenterAnimation>

      {/* Sixth Modal */}
      <BottomToCenterAnimation isOpen={sixthModal} noCloseButton={true}>
        <div className="flex flex-col gap-4 items-center">
          <TextTypeAnimation className="text-black text-5xl" text="What is my rankin--- How old are you?" />
          <form onSubmit={handleDogSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={dogInput}
              onChange={(e) => setDogInput(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-black text-black"
              placeholder="Enter dog's name..."
            />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </BottomToCenterAnimation>

      {/* Seventh Modal */}
      <BottomToCenterAnimation isOpen={seventhModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-5xl" text="You really are Ivy :D!" />
      </BottomToCenterAnimation>

      {/* Eighth Modal */}
      <BottomToCenterAnimation isOpen={eighthModal} noCloseButton={true}>
        <div className="flex flex-col gap-4 items-center">
          <TextTypeAnimation className="text-black text-5xl" text="Will You be my valentine?" />
          <div className="flex gap-4">
            <button
              onClick={handleYesClick}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg mt-4 text-xl hover:bg-pink-600 transition-colors"
            >
              Yes ❤️
            </button>
            <button
              onClick={handleYesClick}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg mt-4 text-xl hover:bg-pink-600 transition-colors"
            >
              Yes ❤️
            </button>
          </div>
        </div>
      </BottomToCenterAnimation>

      {/* Valentine's Message Modals */}
      <BottomToCenterAnimation isOpen={ninthModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-3xl" text="Happy Valentines! Hope your day's been as amazing as you are" />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={tenthModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-5xl" text="You really are an amazing person Ivy!" />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={eleventhModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-3xl" text="Every moment with you feels like a gift. I'm so lucky to have you ❤️" />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={twelfthModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-3xl" text="Just wanted to remind you how much you mean to me today and every day." />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={thirteenthModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-2xl" text="Can't wait to spend the rest of the day with you. I've got some surprises waiting for us. 😉" />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={fourteenthModal} noCloseButton={true}>
        <TextTypeAnimation className="text-black text-2xl" text="You make every day feel special, but today, I'm just extra grateful to have you. Love yow! 😘" />
      </BottomToCenterAnimation>

      <BottomToCenterAnimation isOpen={fifteenthModal} noCloseButton={true}>
        <div className="flex flex-col gap-4 items-center">
          <TextTypeAnimation className="text-black text-5xl" text="Read More..." />
          <button
            onClick={navigateToNext}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg mt-4 text-xl hover:bg-pink-600 transition-colors"
          >
            Continue ❤️
          </button>
        </div>
      </BottomToCenterAnimation>
    </div>
  )
}

export default OkayYoureIvy