import { useState, useEffect } from "react";

import { RoundEndScreen } from "./RoundEndScreen";
import { GameEndScreen } from "./GameEndScreen";
import { SetupScreen } from "./SetupScreen";
import { SettingsScreen } from "./SettingsScreen";
import { PlayingScreen } from "./PlayingScreen";
import { DatabaseManagementScreen } from "./DatabaseManagementScreen";
import { WORD_DATABASE } from "./consts";

export default function EigoDakeApp() {
  const [gameState, setGameState] = useState("setup"); // setup, settings, playing, roundEnd, gameEnd, manageDB
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [usedWordIndices, setUsedWordIndices] = useState(new Set());
  const [roundPoints, setRoundPoints] = useState(0);
  const [pointsRecipientIndex, setPointsRecipientIndex] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameRounds, setGameRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === "playing" && timerEnabled && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && gameState === "playing" && timerEnabled) {
      handleSkipWord();
    }
    return () => clearInterval(interval);
  }, [gameState, timerEnabled, timeLeft]);

  const getNextWord = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * WORD_DATABASE.length);
    } while (
      usedWordIndices.has(newIndex) &&
      usedWordIndices.size < WORD_DATABASE.length
    );

    if (usedWordIndices.size >= WORD_DATABASE.length) {
      setUsedWordIndices(new Set());
    }

    setUsedWordIndices((prev) => new Set([...prev, newIndex]));
    return WORD_DATABASE[newIndex];
  };

  const startGame = (playerNames) => {
    const newPlayers = playerNames.map((name) => ({
      name,
      score: 0,
    }));
    setPlayers(newPlayers);
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setUsedWordIndices(new Set());
    setCurrentWord(getNextWord());
    setTimeLeft(timerSeconds);
    setGameState("playing");
  };

  const awardPoints = (playerIndex, points) => {
    const newPlayers = [...players];

    if (points > 0) {
      // Someone guessed correctly - both explainer and guesser get a point
      newPlayers[currentPlayerIndex].score += 1;
      newPlayers[playerIndex].score += 1;
      setRoundPoints(1);
      setPointsRecipientIndex(playerIndex);
    } else {
      // Nobody understood or skipped - nobody gets points
      setRoundPoints(0);
      setPointsRecipientIndex(currentPlayerIndex);
    }

    setPlayers(newPlayers);
    setGameState("roundEnd");
  };

  const nextTurn = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;

    if (nextIndex === 0) {
      // New round
      if (currentRound < gameRounds) {
        setCurrentRound(currentRound + 1);
        setCurrentPlayerIndex(0);
        setCurrentWord(getNextWord());
        setTimeLeft(timerSeconds);
        setGameState("playing");
      } else {
        // Game end
        setGameState("gameEnd");
      }
    } else {
      setCurrentPlayerIndex(nextIndex);
      setCurrentWord(getNextWord());
      setTimeLeft(timerSeconds);
      setGameState("playing");
    }
  };

  const handleSkipWord = () => {
    awardPoints(currentPlayerIndex, 0);
  };

  const resetGame = () => {
    setGameState("setup");
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setCurrentWord(null);
    setUsedWordIndices(new Set());
    setRoundPoints(0);
    setTimeLeft(timerSeconds);
    setCurrentRound(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-indigo-100 font-sans">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {gameState === "setup" && (
        <SetupScreen
          onStart={startGame}
          onSettings={() => setGameState("settings")}
          onManageDatabase={() => setGameState("manageDB")}
        />
      )}
      {gameState === "settings" && (
        <SettingsScreen
          timerEnabled={timerEnabled}
          timerSeconds={timerSeconds}
          gameRounds={gameRounds}
          onTimerChange={setTimerEnabled}
          onTimeChange={setTimerSeconds}
          onRoundsChange={setGameRounds}
          onBack={() => setGameState("setup")}
        />
      )}
      {gameState === "manageDB" && (
        <DatabaseManagementScreen onBack={() => setGameState("setup")} />
      )}
      {gameState === "playing" && currentWord && (
        <PlayingScreen
          currentPlayer={players[currentPlayerIndex]}
          currentWord={currentWord}
          timerEnabled={timerEnabled}
          timeLeft={timeLeft}
          onAwardPoints={awardPoints}
          onSkip={handleSkipWord}
          round={currentRound}
          totalRounds={gameRounds}
          playerIndex={currentPlayerIndex}
          totalPlayers={players.length}
          players={players}
        />
      )}
      {gameState === "roundEnd" && (
        <RoundEndScreen
          player={players[pointsRecipientIndex]}
          roundPoints={roundPoints}
          onNext={nextTurn}
          explainer={players[currentPlayerIndex]}
        />
      )}
      {gameState === "gameEnd" && (
        <GameEndScreen players={players} onReset={resetGame} />
      )}
    </div>
  );
}
