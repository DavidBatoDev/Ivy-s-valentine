import {useEffect} from 'react';
import Tetris from 'react-tetris';

const TetrisPage = () => {
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

    return (
        <div className='bg-primary h-screen w-screen justify-center items-center flex flex-col'>
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
                shift: 'HOLD'
            }}
            >
            {({
                HeldPiece,
                Gameboard,
                PieceQueue,
                points,
                linesCleared,
                state,
                controller,
                level,
            }) => (
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <HeldPiece /> 
                        </div>
                        <div className='text-white font-secondary'>
                            <p>Points: {points}</p>
                            <p>Lines Cleared: {linesCleared}</p>
                        </div>
                    </div>
                    <Gameboard style={{}} />
                    <PieceQueue />
                    {state === 'LOST' && (
                        <div className='absolute top-5 right-5 text-white font-secondary'>
                            <h2>Game Over</h2>
                            <button className='p-3 border-2 rounded-xl border-red-400' onClick={controller.restart}>New game</button>
                        </div>
                    )}
                </div>
            )}
            </Tetris>
        </div>
      </div>
    )
};

export default TetrisPage;