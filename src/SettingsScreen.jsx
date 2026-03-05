export const SettingsScreen = ({
  timerEnabled,
  timerSeconds,
  gameRounds,
  onTimerChange,
  onTimeChange,
  onRoundsChange,
  onBack,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Game Settings</h2>

        {/* Timer Settings */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={timerEnabled}
              onChange={(e) => onTimerChange(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
              Enable Timer
            </span>
          </label>

          {timerEnabled && (
            <div className="ml-8 space-y-3 bg-blue-50 p-4 rounded-xl">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">
                  Time per turn (seconds)
                </span>
                <input
                  type="number"
                  value={timerSeconds}
                  onChange={(e) =>
                    onTimeChange(
                      Math.max(
                        10,
                        Math.min(300, parseInt(e.target.value) || 60),
                      ),
                    )
                  }
                  className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 transition font-semibold text-center text-lg"
                  min="10"
                  max="300"
                />
              </label>
              <p className="text-xs text-gray-600">Recommended: 60 seconds</p>
            </div>
          )}
        </div>

        {/* Rounds Settings */}
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700 mb-2 block">
              Rounds per game
            </span>
            <select
              value={gameRounds}
              onChange={(e) => onRoundsChange(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition font-semibold text-lg"
            >
              <option value={1}>1 Round</option>
              <option value={3}>3 Rounds</option>
              <option value={5}>5 Rounds</option>
              <option value={10}>10 Rounds</option>
            </select>
          </label>
        </div>

        <button
          onClick={onBack}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition font-bold text-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};
