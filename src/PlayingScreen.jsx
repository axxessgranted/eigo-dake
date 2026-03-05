import { useState } from "react";
import { Trophy } from "lucide-react";

export const PlayingScreen = ({
  currentPlayer,
  currentWord,
  timerEnabled,
  timeLeft,
  onAwardPoints,
  onSkip,
  round,
  totalRounds,
  playerIndex,
  totalPlayers,
  players,
}) => {
  const [showGuessers, setShowGuessers] = useState(false);
  const timerColor =
    timeLeft > 20
      ? "text-green-600"
      : timeLeft > 10
        ? "text-yellow-600"
        : "text-red-600";
  const timerBg =
    timeLeft > 20
      ? "bg-green-50"
      : timeLeft > 10
        ? "bg-yellow-50"
        : "bg-red-50";

  const handlePlayerGuess = (playerIdx) => {
    onAwardPoints(playerIdx, 1);
    setShowGuessers(false);
  };

  return (
    <div className="fixed inset-0 flex flex-col p-4 z-50 overflow-y-auto">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="text-sm font-bold text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full">
          Round {round} / {totalRounds} • Player {playerIndex + 1} /{" "}
          {totalPlayers}
        </div>
        {timerEnabled && (
          <div
            className={`text-lg font-bold ${timerColor} ${timerBg} px-4 py-2 rounded-full transition-all duration-300`}
          >
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700 my-auto">
        {/* Current player name */}
        <div className="text-center">
          <p className="text-gray-600 text-lg font-medium mb-2">Explaining:</p>
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {currentPlayer.name}
          </h1>
        </div>

        {/* Word Card */}
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center space-y-6 border-4 border-blue-100 animate-in zoom-in duration-500">
            <div>
              <p className="text-gray-500 text-lg font-medium mb-4">
                Japanese Word
              </p>
              <p className="text-8xl font-black text-gray-900 mb-3 select-none">
                {currentWord.word}
              </p>
              <p className="text-3xl text-gray-500 font-light">
                {currentWord.furigana}
              </p>
            </div>

            {/* NG Words Section */}
            <div className="pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wider">
                NG Words (Don't Use!)
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {currentWord.ngWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold text-sm border-2 border-red-300"
                  >
                    ✕ {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="text-center">
          <span
            className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
              currentWord.difficulty === "easy"
                ? "bg-green-100 text-green-700"
                : currentWord.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {currentWord.difficulty} difficulty
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-8 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-wrap">
        <button
          onClick={() => setShowGuessers(true)}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-lg transition font-bold text-lg flex items-center gap-2"
        >
          <Trophy size={24} /> Understood! (+1 pt each)
        </button>
        <button
          onClick={onSkip}
          className="px-8 py-4 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-2xl transition font-bold text-lg"
        >
          Skip (0 pts)
        </button>
      </div>

      {/* Guesser Selection Modal */}
      {showGuessers && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-4 animate-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Who guessed it?
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {players.map((player, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayerGuess(idx)}
                  className={`w-full p-4 text-left rounded-xl font-semibold transition ${
                    idx === playerIndex
                      ? "bg-blue-100 border-2 border-blue-500 text-blue-900"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {player.name} {idx === playerIndex && "(Explaining)"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGuessers(false)}
              className="w-full px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-xl transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
