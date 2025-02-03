import { useEffect, useState } from 'react';
import Tetris from 'react-tetris';
import { useNavigate } from 'react-router-dom';

const IvyTetris = () => {
  const [timer, setTimer] = useState(40); // Timer state
  const [linesCleared, setLinesCleared] = useState(0); // Lines cleared state
  const navigate = useNavigate();

  // Start the timer countdown
  useEffect(() => {
    if (timer > 0) {
        if (linesCleared >= 10) {
            navigate('/youre-ivy'); // Navigate to you're-ivy if 10 lines are cleared
        }
        const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      // Timer ended, check linesCleared
      if (linesCleared >= 10) {
        navigate('/youre-ivy'); // Navigate to you're-ivy if 15 lines are cleared
      } else {
        navigate('/try-again-tetris'); // Navigate to try-again-tetris if not
      }
    }
  }, [timer, linesCleared, history]);

  return (
    <div className='bg-primary h-screen w-screen justify-center items-center flex flex-col'>
    <div className='z-10 absolute top-10 left-5 font-secondary text-2xl text-white'>Try to clear 10 lines in 40 seconds</div>
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
                <div className='flex flex-col gap-5'>
                  <div>
                    <HeldPiece />
                  </div>
                  <div className='text-white font-secondary'>
                    <p>Points: {points}</p>
                    <p>Lines Cleared: {gameLinesCleared}</p>
                    <p>Time Left: {timer}s</p>
                  </div>
                </div>
                <Gameboard style={{}} />
                <PieceQueue />
                {state === 'LOST' && (
                  <div className='absolute top-5 right-5 text-white font-secondary'>
                    <h2>Game Over</h2>
                    <button className='p-3 border-2 rounded-xl border-red-400' onClick={controller.restart}>
                      New game
                    </button>
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
