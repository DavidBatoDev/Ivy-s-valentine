import { useState, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import {useNavigate} from 'react-router-dom';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [thinking, setThinking] = useState(false);
  const navigate = useNavigate();

  // Piece-Square Tables for positional evaluation
  const pawnTable = [
    0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5,  5, 10, 25, 25, 10,  5,  5,
    0,  0,  0, 20, 20,  0,  0,  0,
    5, -5,-10,  0,  0,-10, -5,  5,
    5, 10, 10,-20,-20, 10, 10,  5,
    0,  0,  0,  0,  0,  0,  0,  0
  ];

  const knightTable = [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50
  ];

  // Piece values for material evaluation
  const pieceValues = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
  };

  // Evaluate board position
  const evaluatePosition = useCallback((position) => {
    let score = 0;
    
    // Material evaluation
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = position.board()[i][j];
        if (square) {
          const pieceValue = pieceValues[square.type];
          const positionBonus = square.type === 'p' ? pawnTable[i * 8 + j] :
                               square.type === 'n' ? knightTable[i * 8 + j] : 0;
          
          score += square.color === 'w' ? (pieceValue + positionBonus) : -(pieceValue + positionBonus);
        }
      }
    }

    // Mobility evaluation (number of legal moves)
    const tempGame = new Chess(position.fen());
    const mobility = tempGame.moves().length;
    score += tempGame.turn() === 'w' ? mobility : -mobility;

    // Center control bonus
    const centerSquares = ['d4', 'd5', 'e4', 'e5'];
    centerSquares.forEach(square => {
      const piece = position.get(square);
      if (piece) {
        score += piece.color === 'w' ? 10 : -10;
      }
    });

    return score;
  }, []);

  // Minimax algorithm with alpha-beta pruning
  const minimax = useCallback((position, depth, alpha, beta, maximizingPlayer) => {
    if (depth === 0) {
      return evaluatePosition(position);
    }

    const moves = position.moves({ verbose: true });
    
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        position.move(move);
        const evaluation = minimax(position, depth - 1, alpha, beta, false);
        position.undo();
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        position.move(move);
        const evaluation = minimax(position, depth - 1, alpha, beta, true);
        position.undo();
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluatePosition]);

  // Enhanced bot move function
  const botMove = useCallback(() => {
    if (game.isGameOver()) return;
    
    setThinking(true);
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return;

    // For beginners, occasionally make a random move instead of the best move
    if (Math.random() < 0.2) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      const move = game.move(randomMove);
      if (move) {
        setGame(new Chess(game.fen()));
        const moveNotation = `${game.turn() === 'w' ? 'Black' : 'White'}: ${move.san}`;
        setMoveLog(prev => [...prev, moveNotation]);
      }
      setThinking(false);
      return;
    }

    // Find best move using minimax
    let bestMove = null;
    let bestEval = -Infinity;
    
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, 2, -Infinity, Infinity, false);
      game.undo();
      
      if (evaluation > bestEval) {
        bestEval = evaluation;
        bestMove = move;
      }
    }

    if (bestMove) {
      const move = game.move(bestMove);
      if (move) {
        setGame(new Chess(game.fen()));
        const moveNotation = `${game.turn() === 'w' ? 'Black' : 'White'}: ${move.san}`;
        setMoveLog(prev => [...prev, moveNotation]);
      }
    }
    
    setThinking(false);
  }, [game, minimax]);

  // Handle human move
  const onDrop = useCallback((sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        setGame(new Chess(game.fen()));
        const moveNotation = `${game.turn() === 'w' ? 'Black' : 'White'}: ${move.san}`;
        setMoveLog(prev => [...prev, moveNotation]);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }, [game]);

  // Trigger bot move
  useEffect(() => {
    if (game.turn() === 'b' && !game.isGameOver()) {
      const timer = setTimeout(() => {
        botMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [game, botMove]);

  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
  };

  const getGameStatus = () => {
    if (thinking) return "Thinking...";
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    gap: '20px',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row'
  };

  const boardContainerStyle = {
    flex: 2,
    maxWidth: '600px'
  };

  const moveLogStyle = {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '15px'
  };

  const moveListStyle = {
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #eee',
    padding: '10px'
  };

  const moveItemStyle = {
    padding: '8px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px'
  };

  const statusStyle = {
    fontSize: '20px',
    marginBottom: '15px',
    textAlign: 'center',
    color: game.inCheck() ? '#d32f2f' : '#333'
  };

  return (
    <div style={containerStyle}>
      <div style={boardContainerStyle}>
        <div style={statusStyle}>{getGameStatus()}</div>
        <Chessboard 
          customPieces={botMove}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
          customDarkSquareStyle={{ backgroundColor: '#779952' }}
          customLightSquareStyle={{ backgroundColor: '#edeed1' }}
        />
        <button 
          onClick={resetGame}
          style={buttonStyle}
          onMouseOver={e => e.target.style.backgroundColor = '#1976d2'}
          onMouseOut={e => e.target.style.backgroundColor = '#2196f3'}
        >
          New Game
        </button>
      </div>

      <div style={moveLogStyle}>
        <h2 style={{ marginBottom: '15px', fontSize: '18px' }}>Move History</h2>
        <div style={moveListStyle}>
          {moveLog.length > 0 ? (
            moveLog.map((move, index) => (
              <div key={index} style={moveItemStyle}>
                {`${Math.floor(index / 2) + 1}. ${move}`}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No moves yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessGame;