import React, { useState } from "react";
import { Play, Settings } from "lucide-react";

export const SetupScreen = ({ onStart, onSettings, onManageDatabase }) => {
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);

  const addPlayer = () => {
    if (playerNames.length < 8) {
      setPlayerNames([...playerNames, `Player ${playerNames.length + 1}`]);
    }
  };

  const removePlayer = (index) => {
    if (playerNames.length > 1) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
    }
  };

  const updatePlayerName = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="mb-3">
            <span className="text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              英語ダーク
            </span>
          </div>
          <p className="text-gray-600 text-lg font-light">
            Eigo Dake - English Explanation Game
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add Players
            </h2>
            <p className="text-sm text-gray-600 mb-4">Up to 8 players</p>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {playerNames.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition font-medium"
                    placeholder={`Player ${index + 1}`}
                  />
                  {playerNames.length > 1 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition font-semibold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {playerNames.length < 8 && (
              <button
                onClick={addPlayer}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:shadow-lg transition font-semibold"
              >
                + Add Player
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onStart(playerNames)}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition font-bold text-lg flex items-center justify-center gap-2"
            >
              <Play size={20} /> Start Game
            </button>
            <button
              onClick={onSettings}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold flex items-center justify-center gap-2"
            >
              <Settings size={20} />
            </button>
          </div>

          <button
            onClick={onManageDatabase}
            className="w-full px-6 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition font-semibold"
          >
            📊 Manage Word Database
          </button>
        </div>
      </div>
    </div>
  );
};
