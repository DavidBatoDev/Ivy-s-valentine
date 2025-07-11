import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const Games = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [passwords, setPasswords] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
  });

  const cards = [
    { id: 'card1', title: 'Love Letters', bgColor: 'bg-pink-100' },
    { id: 'card2', title: 'Sweet Memories', bgColor: 'bg-red-100' },
    { id: 'card3', title: 'Secret Garden', bgColor: 'bg-rose-100' },
    { id: 'card4', title: "Hearts Treasure", bgColor: "bg-purple-100"},
  ];

  const handlePasswordChange = (cardId, value) => {
    setPasswords(prev => ({
      ...prev,
      [cardId]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-50 p-8">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 place-items-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative w-64 h-80 rounded-lg shadow-lg ${card.bgColor} 
                       transform transition-all duration-300 hover:scale-105
                       flex flex-col items-center justify-center p-6
                       hover:shadow-xl cursor-pointer
                       border-2 border-pink-200`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{card.title}</h3>
            
            <div className={`transition-all duration-300 ${
              activeCard === card.id ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}>
              <Lock 
                size={48}
                className="text-pink-500"
              />
            </div>

            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6
                          transition-all duration-300 ${
                            activeCard === card.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                          }`}>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwords[card.id]}
                onChange={(e) => handlePasswordChange(card.id, e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/90 
                         border border-pink-300 focus:border-pink-500
                         focus:ring-2 focus:ring-pink-200 focus:outline-none
                         placeholder-gray-400 text-center"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 rounded-b-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;