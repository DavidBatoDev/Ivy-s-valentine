import React from 'react'
import TextTypeAnimation from '../components/TextTypeAnimation'
import BottomToCenterAnimation from '../components/BottomToCenterAnimation'
import { useNavigate } from 'react-router-dom'

const TryAgainTetris = () => {
    const navigate = useNavigate()

  return (
    <div className='bg-primary h-screen w-screen'>
      <BottomToCenterAnimation>
        <div className='flex flex-col gap-4'>
            <TextTypeAnimation className={'text-black'} text="Hmmm I'm having my doubts, Try again?" />
            <div onClick={() => navigate('/ivy-tetris')} className='bg-black flex justify-center text-white p-2 rounded-md cursor-pointer'>
                <TextTypeAnimation className={'text-white'} text="Try Again." />

            </div>
        </div>
        </BottomToCenterAnimation>
    </div>
  )
}

export default TryAgainTetris
