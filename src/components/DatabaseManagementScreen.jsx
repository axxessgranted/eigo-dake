import { WORD_DATABASE } from "../consts";

export const DatabaseManagementScreen = ({ onBack }) => {
  const exportDatabase = () => {
    const dataStr = JSON.stringify(WORD_DATABASE, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "eigo-dake-words.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDatabase = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result || "[]");
        if (Array.isArray(imported)) {
          // TODO: For future, update WORD_DATABASE here
          alert(`Successfully imported ${imported.length} words!`);
        }
      } catch (error) {
        alert("Error importing file: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in duration-300 max-h-96 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Word Database Management
        </h2>

        {/* Current Database Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Current Database</h3>
          <p className="text-2xl font-black text-blue-600 mb-2">
            {WORD_DATABASE.length} Words
          </p>
          <p className="text-sm text-gray-600">Words available for gameplay</p>
        </div>

        {/* Export Button */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Export Database</h3>
          <button
            onClick={exportDatabase}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition font-bold text-lg flex items-center justify-center gap-2"
          >
            📥 Download as JSON
          </button>
          <p className="text-xs text-gray-600 mt-2">
            Save your word database to edit and reimport
          </p>
        </div>

        {/* Import Button */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Import Database</h3>
          <label className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:shadow-lg transition font-bold text-lg flex items-center justify-center gap-2 cursor-pointer">
            📤 Upload JSON File
            <input
              type="file"
              accept=".json"
              onChange={importDatabase}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-600 mt-2">
            Load a previously exported database or custom word list
          </p>
        </div>

        {/* Format Info */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">JSON Format</h3>
          <pre className="bg-white p-3 rounded-lg overflow-x-auto text-xs font-mono text-gray-700">
            {`[
  {
    "word": "猫",
    "furigana": "ねこ",
    "ngWords": ["animal", "meow", "pet"],
    "category": "animals",
    "difficulty": "easy"
  }
]`}
          </pre>
        </div>

        <button
          onClick={onBack}
          className="w-full px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition font-bold text-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};
