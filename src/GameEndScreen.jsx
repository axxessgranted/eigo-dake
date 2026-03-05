import { RotateCcw } from "lucide-react";

export const GameEndScreen = ({ players, onReset }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4 z-50">
      <div className="w-full max-w-md space-y-6 animate-in zoom-in duration-500">
        {/* Trophy */}
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">🏆</div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Game Over!</h1>
          <p className="text-gray-600 text-lg">Final Standings</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-4">
          {sorted.map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-2xl ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-100 to-amber-100 border-3 border-yellow-400"
                  : index === 1
                    ? "bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-400"
                    : index === 2
                      ? "bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300"
                      : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black w-12 text-center">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `${index + 1}.`}
                </span>
                <span className="font-bold text-lg text-gray-900">
                  {player.name}
                </span>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {player.score}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition font-bold text-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} /> Play Again
        </button>
      </div>
    </div>
  );
};
