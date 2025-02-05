import { useEffect, useState } from 'react';
import Tetris from 'react-tetris';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const IvyTetris = () => {
  const [timer, setTimer] = useState(40); // Timer state
  const [linesCleared, setLinesCleared] = useState(0); // Lines cleared state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navigate = useNavigate();

  const checkDeviceType = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 600);  // Mobile screen
    setIsTablet(width > 600 && width <= 1200);  // Tablet screen
  };

  // Start the timer countdown
  useEffect(() => {
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    if (timer > 0) {
      if (linesCleared >= 5) {
        // Save winning state to local storage
        localStorage.setItem('tetris_won', 'true');
        navigate('/youre-ivy'); // Navigate to you're-ivy if 10 lines are cleared
      }
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => {
        clearInterval(countdown);
        window.removeEventListener('resize', checkDeviceType);
      };
    } else {
      // Timer ended, check linesCleared
      if (linesCleared >= 10) {
        navigate('/youre-ivy'); // Navigate to you're-ivy if 10 lines are cleared
      } else {
        navigate('/try-again-tetris'); // Navigate to try-again-tetris if not
      }
    }
  }, [timer, linesCleared, navigate]);

  const MobileControls = ({ controller }) => (
    <div className="w-full h-full flex justify-center items-center gap-4">
      <div className='relative w-full h-full'>
        <div className={`absolute ${isTablet ? 'left-10' : 'left-2'} h-40 w-44`}>
          <div className='relative w-full h-full'>
            <div className='absolute left-1/2 top-0 -translate-x-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <KeyboardDoubleArrowDownIcon className='text-white' onClick={() => controller.hardDrop()} />
            </div>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <ArrowLeftIcon className='text-white' onClick={() => controller.moveLeft()} />
            </div>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <ArrowRightIcon className='text-white' onClick={() => controller.moveRight()} />
            </div>
            <div className='absolute left-1/2 bottom-0 -translate-x-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <ArrowDropDownIcon className='text-white' onClick={() => controller.moveDown()} />
            </div>
          </div>
        </div>

        <div className={`absolute ${isTablet ? 'right-10' : 'right-2'} h-40 w-44`}>
          <div className='relative w-full h-full'>
            <div className='absolute left-1/2 top-0 -translate-x-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <CompareArrowsIcon className='text-white' onClick={() => controller.hold()} />
            </div>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <RotateLeftIcon className='text-white' onClick={() => controller.flipCounterclockwise()} />
            </div>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 bg-gray-600 h-12 w-20 rounded-xl flex justify-center items-center opacity-60 border'>
              <RotateRightIcon className='text-white' onClick={() => controller.flipClockwise()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-primary h-screen w-screen justify-center items-center flex flex-col'>
      {isMobile || isTablet ? (
        <div className='z-10 absolute top-44 w-20 text-md left-5 font-secondary text-white'>
          Try to clear 5 lines in 40 seconds
        </div>
      ) : (
        <div className='z-10 absolute top-10 left-5 font-secondary text-2xl text-white'>
          Try to clear 5 lines in 40 seconds
        </div>
      )}
      <div className='absolute w-screen h-screen bg-black opacity-60'></div>
      <h1 className='z-10 font-secondary text-xl text-white'>Tetrizz</h1>
      <div className='z-10'>
        <Tetris
          keyboardControls={{
            up: 'FLIP_CLOCKWISE',
            down: 'FLIP_COUNTERCLOCKWISE',
            left: 'FLIP_COUNTERCLOCKWISE',
            right: 'FLIP_CLOCKWISE',
            space: 'HARD_DROP',
            a: 'MOVE_LEFT',
            s: 'MOVE_DOWN',
            d: 'MOVE_RIGHT',
            w: 'FLIP_CLOCKWISE',
            p: 'TOGGLE_PAUSE',
            shift: 'HOLD',
          }}
        >
          {({
            HeldPiece,
            Gameboard,
            PieceQueue,
            points,
            linesCleared: gameLinesCleared,
            state,
            controller,
            level,
          }) => {
            // Update linesCleared state whenever the game updates
            useEffect(() => {
              setLinesCleared(gameLinesCleared);
            }, [gameLinesCleared]);

            return (
              <div className='flex gap-5'>
                <div className={`flex gap-5 justify-center ${isTablet || isMobile ? 'absolute top-5 left-5 flex-row' : 'flex-col'}`}>
                  <div className="p-2 rounded">
                    <HeldPiece />
                  </div>
                  <div className='text-white font-secondary'>
                    <p>Points: {points}</p>
                    <p>Lines Cleared: {gameLinesCleared}</p>
                    <p>Time Left: {timer}s</p>
                  </div>
                </div>
                <div
                  className="relative"
                  style={{
                    '--block-size': isMobile ? '1.2em' : '1.5em',
                  }}
                >
                  <Gameboard />
                </div>
                <div className="rounded w-20 h-20" style={{
                  '--block-size': isTablet || isMobile ? '1.2em' : '1.5em',
                }}>
                  <PieceQueue />
                </div>
                {state === 'LOST' && (
                  <div className='absolute top-5 right-5 text-white font-secondary'>
                    <h2>Game Over</h2>
                    <button className='p-3 border-2 rounded-xl border-red-400' onClick={controller.restart}>
                      New game
                    </button>
                  </div>
                )}
                {(isMobile || isTablet) && (
                  <div className='absolute bottom-20 left-1/2 -translate-x-1/2 w-full h-28 flex justify-center gap-4'>
                    <MobileControls controller={controller} />
                  </div>
                )}
              </div>
            );
          }}
        </Tetris>
      </div>
    </div>
  );
};

export default IvyTetris;
