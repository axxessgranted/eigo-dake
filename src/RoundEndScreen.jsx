export const RoundEndScreen = ({ player, roundPoints, onNext, explainer }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6 animate-in zoom-in duration-500">
        {roundPoints > 0 ? (
          <>
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-black text-gray-900">Correct!</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-1">Explainer</p>
                <p className="text-xl font-bold text-gray-900">
                  {explainer.name}
                </p>
                <p className="text-2xl font-black text-blue-600 mt-2">
                  +1 point
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-1">Guesser</p>
                <p className="text-xl font-bold text-gray-900">{player.name}</p>
                <p className="text-2xl font-black text-green-600 mt-2">
                  +1 point
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-6xl">❌</div>
            <h2 className="text-3xl font-black text-gray-900">No Points</h2>
            <p className="text-lg text-gray-600">{explainer.name} - 0 points</p>
          </>
        )}

        <button
          onClick={onNext}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl transition font-bold text-lg"
        >
          Next Turn →
        </button>
      </div>
    </div>
  );
};
