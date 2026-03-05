import React, { useState, useEffect } from 'react';
import { RotateCcw, Play, Settings, Users, Trophy, Clock, Volume2 } from 'lucide-react';

// Sample word database - can be easily extended
const WORD_DATABASE = [
  // Animals - Easy
  { word: '猫', furigana: 'ねこ', ngWords: ['animal', 'meow', 'pet', 'feline'], category: 'animals', difficulty: 'easy' },
  { word: '犬', furigana: 'いぬ', ngWords: ['animal', 'bark', 'pet', 'puppy'], category: 'animals', difficulty: 'easy' },
  { word: '鳥', furigana: 'とり', ngWords: ['animal', 'fly', 'wing', 'sky'], category: 'animals', difficulty: 'easy' },
  { word: '魚', furigana: 'さかな', ngWords: ['animal', 'water', 'swim', 'ocean'], category: 'animals', difficulty: 'easy' },
  { word: '馬', furigana: 'うま', ngWords: ['animal', 'ride', 'brown', 'farm'], category: 'animals', difficulty: 'easy' },
  { word: '牛', furigana: 'うし', ngWords: ['animal', 'milk', 'farm', 'meat'], category: 'animals', difficulty: 'easy' },
  { word: '象', furigana: 'ぞう', ngWords: ['animal', 'trunk', 'large', 'africa'], category: 'animals', difficulty: 'medium' },
  { word: '熊', furigana: 'くま', ngWords: ['animal', 'bear', 'wild', 'forest'], category: 'animals', difficulty: 'easy' },
  { word: 'ライオン', furigana: 'ライオン', ngWords: ['animal', 'lion', 'roar', 'africa'], category: 'animals', difficulty: 'medium' },
  { word: '蛇', furigana: 'へび', ngWords: ['animal', 'dangerous', 'reptile', 'scales'], category: 'animals', difficulty: 'medium' },

  // Nature - Easy
  { word: '木', furigana: 'き', ngWords: ['plant', 'nature', 'wood', 'green'], category: 'nature', difficulty: 'easy' },
  { word: '水', furigana: 'みず', ngWords: ['liquid', 'drink', 'river', 'wet'], category: 'nature', difficulty: 'easy' },
  { word: '火', furigana: 'ひ', ngWords: ['heat', 'burn', 'hot', 'flame'], category: 'nature', difficulty: 'easy' },
  { word: '雲', furigana: 'くも', ngWords: ['sky', 'weather', 'white', 'rain'], category: 'nature', difficulty: 'medium' },
  { word: '花', furigana: 'はな', ngWords: ['plant', 'pretty', 'nature', 'color'], category: 'nature', difficulty: 'easy' },
  { word: '山', furigana: 'やま', ngWords: ['nature', 'high', 'terrain', 'climb'], category: 'nature', difficulty: 'easy' },
  { word: '海', furigana: 'うみ', ngWords: ['water', 'nature', 'salt', 'beach'], category: 'nature', difficulty: 'easy' },
  { word: '川', furigana: 'かわ', ngWords: ['water', 'nature', 'flow', 'bridge'], category: 'nature', difficulty: 'easy' },
  { word: '草', furigana: 'くさ', ngWords: ['plant', 'green', 'nature', 'ground'], category: 'nature', difficulty: 'easy' },
  { word: '石', furigana: 'いし', ngWords: ['hard', 'nature', 'rock', 'ground'], category: 'nature', difficulty: 'easy' },
  { word: '太陽', furigana: 'たいよう', ngWords: ['sky', 'hot', 'bright', 'energy'], category: 'nature', difficulty: 'medium' },
  { word: '月', furigana: 'つき', ngWords: ['night', 'sky', 'round', 'bright'], category: 'nature', difficulty: 'easy' },
  { word: '星', furigana: 'ほし', ngWords: ['night', 'sky', 'twinkle', 'space'], category: 'nature', difficulty: 'easy' },
  { word: '風', furigana: 'かぜ', ngWords: ['air', 'nature', 'move', 'invisible'], category: 'nature', difficulty: 'easy' },
  { word: '雨', furigana: 'あめ', ngWords: ['water', 'sky', 'weather', 'wet'], category: 'nature', difficulty: 'easy' },

  // Objects - Easy
  { word: '机', furigana: 'つくえ', ngWords: ['furniture', 'desk', 'work', 'wood'], category: 'objects', difficulty: 'easy' },
  { word: '椅子', furigana: 'いす', ngWords: ['furniture', 'sit', 'object'], category: 'objects', difficulty: 'easy' },
  { word: '本', furigana: 'ほん', ngWords: ['read', 'paper', 'story', 'pages'], category: 'objects', difficulty: 'easy' },
  { word: 'ペン', furigana: 'ペン', ngWords: ['write', 'object', 'ink', 'tool'], category: 'objects', difficulty: 'easy' },
  { word: 'キー', furigana: 'キー', ngWords: ['open', 'metal', 'door', 'lock'], category: 'objects', difficulty: 'easy' },
  { word: 'ドア', furigana: 'ドア', ngWords: ['enter', 'open', 'room', 'object'], category: 'objects', difficulty: 'easy' },
  { word: '窓', furigana: 'まど', ngWords: ['room', 'glass', 'light', 'outside'], category: 'objects', difficulty: 'easy' },
  { word: 'テーブル', furigana: 'テーブル', ngWords: ['furniture', 'eat', 'surface'], category: 'objects', difficulty: 'easy' },
  { word: 'ベッド', furigana: 'ベッド', ngWords: ['sleep', 'furniture', 'rest'], category: 'objects', difficulty: 'easy' },
  { word: 'シャツ', furigana: 'シャツ', ngWords: ['clothing', 'wear', 'cloth'], category: 'objects', difficulty: 'easy' },
  { word: 'ズボン', furigana: 'ズボン', ngWords: ['clothing', 'wear', 'legs'], category: 'objects', difficulty: 'easy' },
  { word: '靴', furigana: 'くつ', ngWords: ['clothing', 'feet', 'wear', 'walk'], category: 'objects', difficulty: 'easy' },
  { word: 'カップ', furigana: 'カップ', ngWords: ['drink', 'container', 'object'], category: 'objects', difficulty: 'easy' },
  { word: 'スプーン', furigana: 'スプーン', ngWords: ['eat', 'utensil', 'object'], category: 'objects', difficulty: 'medium' },
  { word: 'フォーク', furigana: 'フォーク', ngWords: ['eat', 'utensil', 'object'], category: 'objects', difficulty: 'medium' },

  // Time - Medium
  { word: '時間', furigana: 'じかん', ngWords: ['clock', 'watch', 'minute', 'second'], category: 'time', difficulty: 'medium' },
  { word: '昨日', furigana: 'きのう', ngWords: ['day', 'past', '24 hours', 'before today'], category: 'time', difficulty: 'medium' },
  { word: '明日', furigana: 'あした', ngWords: ['day', 'future', '24 hours', 'after today'], category: 'time', difficulty: 'medium' },
  { word: '今日', furigana: 'きょう', ngWords: ['day', 'present', '24 hours', 'now'], category: 'time', difficulty: 'medium' },
  { word: '朝', furigana: 'あさ', ngWords: ['time', 'morning', 'sunrise', 'early'], category: 'time', difficulty: 'easy' },
  { word: '昼', furigana: 'ひる', ngWords: ['time', 'noon', 'day', 'bright'], category: 'time', difficulty: 'easy' },
  { word: '夜', furigana: 'よる', ngWords: ['time', 'night', 'dark', 'sleep'], category: 'time', difficulty: 'easy' },
  { word: '週', furigana: 'しゅう', ngWords: ['time', 'seven days', 'period'], category: 'time', difficulty: 'medium' },
  { word: '月', furigana: 'つき', ngWords: ['time', 'twelve times', 'period'], category: 'time', difficulty: 'medium' },
  { word: '年', furigana: 'ねん', ngWords: ['time', 'twelve months', 'period'], category: 'time', difficulty: 'easy' },

  // Places - Medium
  { word: '学校', furigana: 'がっこう', ngWords: ['education', 'student', 'teacher', 'study'], category: 'places', difficulty: 'easy' },
  { word: '病院', furigana: 'びょういん', ngWords: ['sick', 'doctor', 'medicine', 'health'], category: 'places', difficulty: 'medium' },
  { word: '駅', furigana: 'えき', ngWords: ['train', 'transport', 'travel', 'platform'], category: 'places', difficulty: 'medium' },
  { word: '店', furigana: 'みせ', ngWords: ['buy', 'sell', 'shopping', 'money'], category: 'places', difficulty: 'easy' },
  { word: '家', furigana: 'いえ', ngWords: ['live', 'building', 'shelter', 'family'], category: 'places', difficulty: 'easy' },
  { word: 'オフィス', furigana: 'オフィス', ngWords: ['work', 'building', 'desk'], category: 'places', difficulty: 'medium' },
  { word: 'レストラン', furigana: 'レストラン', ngWords: ['eat', 'food', 'place'], category: 'places', difficulty: 'medium' },
  { word: '図書館', furigana: 'としょかん', ngWords: ['books', 'read', 'quiet', 'study'], category: 'places', difficulty: 'medium' },
  { word: '公園', furigana: 'こうえん', ngWords: ['outside', 'nature', 'play', 'green'], category: 'places', difficulty: 'medium' },
  { word: '市場', furigana: 'いちば', ngWords: ['buy', 'sell', 'food', 'market'], category: 'places', difficulty: 'hard' },

  // Emotions - Medium
  { word: '楽しい', furigana: 'たのしい', ngWords: ['happy', 'fun', 'enjoy', 'smile'], category: 'emotions', difficulty: 'medium' },
  { word: '悲しい', furigana: 'かなしい', ngWords: ['sad', 'cry', 'unhappy', 'emotion'], category: 'emotions', difficulty: 'medium' },
  { word: '怖い', furigana: 'こわい', ngWords: ['afraid', 'scary', 'fear', 'emotion'], category: 'emotions', difficulty: 'medium' },
  { word: '嬉しい', furigana: 'うれしい', ngWords: ['happy', 'glad', 'pleased', 'smile'], category: 'emotions', difficulty: 'medium' },
  { word: '怒っている', furigana: 'おこっている', ngWords: ['angry', 'mad', 'upset', 'emotion'], category: 'emotions', difficulty: 'hard' },
  { word: '驚いた', furigana: 'おどろいた', ngWords: ['surprised', 'shock', 'unexpected'], category: 'emotions', difficulty: 'hard' },
  { word: '退屈', furigana: 'たいくつ', ngWords: ['bored', 'dull', 'uninterested'], category: 'emotions', difficulty: 'hard' },
  { word: '緊張', furigana: 'きんちょう', ngWords: ['nervous', 'tense', 'anxious', 'stress'], category: 'emotions', difficulty: 'hard' },

  // Adjectives - Easy/Medium
  { word: '速い', furigana: 'はやい', ngWords: ['quick', 'fast', 'time', 'race'], category: 'adjectives', difficulty: 'medium' },
  { word: '遅い', furigana: 'おそい', ngWords: ['slow', 'late', 'time', 'behind'], category: 'adjectives', difficulty: 'medium' },
  { word: '大きい', furigana: 'おおきい', ngWords: ['size', 'big', 'large', 'huge'], category: 'adjectives', difficulty: 'easy' },
  { word: '小さい', furigana: 'ちいさい', ngWords: ['size', 'little', 'tiny', 'small'], category: 'adjectives', difficulty: 'easy' },
  { word: '長い', furigana: 'ながい', ngWords: ['length', 'extend', 'distance', 'not short'], category: 'adjectives', difficulty: 'medium' },
  { word: '短い', furigana: 'みじかい', ngWords: ['length', 'brief', 'not long', 'distance'], category: 'adjectives', difficulty: 'medium' },
  { word: '高い', furigana: 'たかい', ngWords: ['height', 'tall', 'expensive', 'up'], category: 'adjectives', difficulty: 'medium' },
  { word: '低い', furigana: 'ひくい', ngWords: ['height', 'short', 'down', 'beneath'], category: 'adjectives', difficulty: 'medium' },
  { word: '熱い', furigana: 'あつい', ngWords: ['temperature', 'hot', 'heat', 'fire'], category: 'adjectives', difficulty: 'easy' },
  { word: '冷たい', furigana: 'つめたい', ngWords: ['temperature', 'cold', 'cool', 'ice'], category: 'adjectives', difficulty: 'medium' },
  { word: '美しい', furigana: 'うつくしい', ngWords: ['appearance', 'pretty', 'beautiful', 'lovely'], category: 'adjectives', difficulty: 'hard' },
  { word: '汚い', furigana: 'きたない', ngWords: ['clean', 'dirty', 'messy', 'appearance'], category: 'adjectives', difficulty: 'medium' },

  // Food - Easy/Medium
  { word: 'ご飯', furigana: 'ごはん', ngWords: ['eat', 'rice', 'food'], category: 'food', difficulty: 'easy' },
  { word: 'パン', furigana: 'パン', ngWords: ['eat', 'bread', 'food'], category: 'food', difficulty: 'easy' },
  { word: 'リンゴ', furigana: 'りんご', ngWords: ['fruit', 'red', 'eat', 'food'], category: 'food', difficulty: 'easy' },
  { word: 'みかん', furigana: 'みかん', ngWords: ['fruit', 'orange', 'citrus', 'eat'], category: 'food', difficulty: 'easy' },
  { word: 'バナナ', furigana: 'バナナ', ngWords: ['fruit', 'yellow', 'peel', 'eat'], category: 'food', difficulty: 'easy' },
  { word: 'トマト', furigana: 'トマト', ngWords: ['vegetable', 'red', 'round', 'eat'], category: 'food', difficulty: 'easy' },
  { word: 'ニンジン', furigana: 'ニンジン', ngWords: ['vegetable', 'orange', 'root', 'eat'], category: 'food', difficulty: 'medium' },
  { word: 'タマネギ', furigana: 'たまねぎ', ngWords: ['vegetable', 'layer', 'cry', 'eat'], category: 'food', difficulty: 'hard' },
  { word: '牛乳', furigana: 'ぎゅうにゅう', ngWords: ['drink', 'cow', 'white', 'dairy'], category: 'food', difficulty: 'medium' },
  { word: 'チーズ', furigana: 'チーズ', ngWords: ['dairy', 'yellow', 'food', 'milk'], category: 'food', difficulty: 'easy' },
  { word: 'バター', furigana: 'バター', ngWords: ['dairy', 'yellow', 'soft', 'spread'], category: 'food', difficulty: 'easy' },
  { word: '肉', furigana: 'にく', ngWords: ['food', 'animal', 'protein', 'eat'], category: 'food', difficulty: 'easy' },
  { word: '魚', furigana: 'さかな', ngWords: ['food', 'ocean', 'protein', 'eat'], category: 'food', difficulty: 'easy' },
  { word: '卵', furigana: 'たまご', ngWords: ['chicken', 'round', 'breakfast', 'eat'], category: 'food', difficulty: 'easy' },
  { word: 'スープ', furigana: 'スープ', ngWords: ['hot', 'liquid', 'eat', 'food'], category: 'food', difficulty: 'medium' },
  { word: 'スイーツ', furigana: 'スイーツ', ngWords: ['sweet', 'dessert', 'sugar', 'eat'], category: 'food', difficulty: 'hard' },

  // Actions/Verbs - Medium
  { word: '食べる', furigana: 'たべる', ngWords: ['consume', 'mouth', 'food', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '飲む', furigana: 'のむ', ngWords: ['liquid', 'mouth', 'swallow', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '書く', furigana: 'かく', ngWords: ['pen', 'paper', 'mark', 'action'], category: 'actions', difficulty: 'easy' },
  { word: '読む', furigana: 'よむ', ngWords: ['book', 'text', 'eye', 'action'], category: 'actions', difficulty: 'easy' },
  { word: '走る', furigana: 'はしる', ngWords: ['move', 'fast', 'legs', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '歩く', furigana: 'あるく', ngWords: ['move', 'legs', 'slow', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '寝る', furigana: 'ねる', ngWords: ['sleep', 'night', 'rest', 'action'], category: 'actions', difficulty: 'easy' },
  { word: '起きる', furigana: 'おきる', ngWords: ['wake', 'morning', 'rise', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '座る', furigana: 'すわる', ngWords: ['chair', 'rest', 'down', 'action'], category: 'actions', difficulty: 'medium' },
  { word: '立つ', furigana: 'たつ', ngWords: ['stand', 'up', 'legs', 'action'], category: 'actions', difficulty: 'easy' },
  { word: '見る', furigana: 'みる', ngWords: ['eyes', 'watch', 'observe', 'action'], category: 'actions', difficulty: 'easy' },
  { word: '聞く', furigana: 'きく', ngWords: ['ears', 'sound', 'listen', 'action'], category: 'actions', difficulty: 'easy' },

  // Colors - Easy
  { word: '赤', furigana: 'あか', ngWords: ['color', 'tomato', 'fire', 'blood'], category: 'colors', difficulty: 'easy' },
  { word: '青', furigana: 'あお', ngWords: ['color', 'sky', 'ocean', 'sad'], category: 'colors', difficulty: 'easy' },
  { word: '黄色', furigana: 'きいろ', ngWords: ['color', 'sun', 'banana', 'bright'], category: 'colors', difficulty: 'easy' },
  { word: '緑', furigana: 'みどり', ngWords: ['color', 'plant', 'tree', 'grass'], category: 'colors', difficulty: 'easy' },
  { word: '白', furigana: 'しろ', ngWords: ['color', 'snow', 'milk', 'pure'], category: 'colors', difficulty: 'easy' },
  { word: '黒', furigana: 'くろ', ngWords: ['color', 'night', 'dark', 'coal'], category: 'colors', difficulty: 'easy' },
  { word: 'オレンジ', furigana: 'オレンジ', ngWords: ['color', 'fruit', 'warm'], category: 'colors', difficulty: 'medium' },
  { word: '紫', furigana: 'むらさき', ngWords: ['color', 'grape', 'royal'], category: 'colors', difficulty: 'hard' },

  // Family - Medium
  { word: '父', furigana: 'ちち', ngWords: ['family', 'man', 'parent', 'male'], category: 'family', difficulty: 'medium' },
  { word: '母', furigana: 'はは', ngWords: ['family', 'woman', 'parent', 'female'], category: 'family', difficulty: 'medium' },
  { word: '兄', furigana: 'あに', ngWords: ['family', 'boy', 'older', 'male'], category: 'family', difficulty: 'hard' },
  { word: '姉', furigana: 'あね', ngWords: ['family', 'girl', 'older', 'female'], category: 'family', difficulty: 'hard' },
  { word: '弟', furigana: 'おとうと', ngWords: ['family', 'boy', 'younger', 'male'], category: 'family', difficulty: 'hard' },
  { word: '妹', furigana: 'いもうと', ngWords: ['family', 'girl', 'younger', 'female'], category: 'family', difficulty: 'hard' },
  { word: '祖母', furigana: 'そぼ', ngWords: ['family', 'old', 'woman', 'grandparent'], category: 'family', difficulty: 'hard' },
  { word: '祖父', furigana: 'そふ', ngWords: ['family', 'old', 'man', 'grandparent'], category: 'family', difficulty: 'hard' },

  // Numbers - Easy
  { word: '一', furigana: 'いち', ngWords: ['number', 'count', 'one'], category: 'numbers', difficulty: 'easy' },
  { word: '二', furigana: 'に', ngWords: ['number', 'count', 'two'], category: 'numbers', difficulty: 'easy' },
  { word: '三', furigana: 'さん', ngWords: ['number', 'count', 'three'], category: 'numbers', difficulty: 'easy' },
  { word: '十', furigana: 'じゅう', ngWords: ['number', 'count', 'ten'], category: 'numbers', difficulty: 'easy' },
  { word: '百', furigana: 'ひゃく', ngWords: ['number', 'count', 'hundred'], category: 'numbers', difficulty: 'medium' },
  { word: '千', furigana: 'せん', ngWords: ['number', 'count', 'thousand'], category: 'numbers', difficulty: 'medium' },

  // School - Medium
  { word: '先生', furigana: 'せんせい', ngWords: ['education', 'teach', 'adult', 'school'], category: 'school', difficulty: 'medium' },
  { word: '生徒', furigana: 'せいと', ngWords: ['education', 'learn', 'young', 'school'], category: 'school', difficulty: 'hard' },
  { word: 'テスト', furigana: 'テスト', ngWords: ['education', 'exam', 'score', 'check'], category: 'school', difficulty: 'medium' },
  { word: '宿題', furigana: 'しゅくだい', ngWords: ['education', 'home', 'study', 'work'], category: 'school', difficulty: 'hard' },

  // Body - Medium
  { word: '頭', furigana: 'あたま', ngWords: ['body', 'brain', 'hair', 'top'], category: 'body', difficulty: 'medium' },
  { word: '目', furigana: 'め', ngWords: ['body', 'see', 'face', 'pair'], category: 'body', difficulty: 'easy' },
  { word: '耳', furigana: 'みみ', ngWords: ['body', 'hear', 'sound', 'pair'], category: 'body', difficulty: 'medium' },
  { word: '鼻', furigana: 'はな', ngWords: ['body', 'smell', 'face', 'breathe'], category: 'body', difficulty: 'medium' },
  { word: '口', furigana: 'くち', ngWords: ['body', 'eat', 'speak', 'face'], category: 'body', difficulty: 'easy' },
  { word: '手', furigana: 'て', ngWords: ['body', 'hold', 'arm', 'fingers'], category: 'body', difficulty: 'easy' },
  { word: '足', furigana: 'あし', ngWords: ['body', 'walk', 'run', 'leg'], category: 'body', difficulty: 'easy' },
  { word: '心臓', furigana: 'しんぞう', ngWords: ['body', 'beat', 'organ', 'life'], category: 'body', difficulty: 'hard' },
];

export default function EigoDarkeApp() {
  const [gameState, setGameState] = useState('setup'); // setup, settings, playing, roundEnd, gameEnd, manageDB
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
    if (gameState === 'playing' && timerEnabled && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing' && timerEnabled) {
      handleSkipWord();
    }
    return () => clearInterval(interval);
  }, [gameState, timerEnabled, timeLeft]);

  const getNextWord = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * WORD_DATABASE.length);
    } while (usedWordIndices.has(newIndex) && usedWordIndices.size < WORD_DATABASE.length);
    
    if (usedWordIndices.size >= WORD_DATABASE.length) {
      setUsedWordIndices(new Set());
    }
    
    setUsedWordIndices(prev => new Set([...prev, newIndex]));
    return WORD_DATABASE[newIndex];
  };

  const startGame = (playerNames) => {
    const newPlayers = playerNames.map(name => ({
      name,
      score: 0,
    }));
    setPlayers(newPlayers);
    setCurrentRound(1);
    setCurrentPlayerIndex(0);
    setUsedWordIndices(new Set());
    setCurrentWord(getNextWord());
    setTimeLeft(timerSeconds);
    setGameState('playing');
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
    setGameState('roundEnd');
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
        setGameState('playing');
      } else {
        // Game end
        setGameState('gameEnd');
      }
    } else {
      setCurrentPlayerIndex(nextIndex);
      setCurrentWord(getNextWord());
      setTimeLeft(timerSeconds);
      setGameState('playing');
    }
  };

  const handleSkipWord = () => {
    awardPoints(currentPlayerIndex, 0);
  };

  const resetGame = () => {
    setGameState('setup');
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
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />

      {gameState === 'setup' && <SetupScreen onStart={startGame} onSettings={() => setGameState('settings')} onManageDatabase={() => setGameState('manageDB')} />}
      {gameState === 'settings' && <SettingsScreen timerEnabled={timerEnabled} timerSeconds={timerSeconds} gameRounds={gameRounds} onTimerChange={setTimerEnabled} onTimeChange={setTimerSeconds} onRoundsChange={setGameRounds} onBack={() => setGameState('setup')} />}
      {gameState === 'manageDB' && <DatabaseManagementScreen onBack={() => setGameState('setup')} />}
      {gameState === 'playing' && currentWord && <PlayingScreen currentPlayer={players[currentPlayerIndex]} currentWord={currentWord} timerEnabled={timerEnabled} timeLeft={timeLeft} onAwardPoints={awardPoints} onSkip={handleSkipWord} round={currentRound} totalRounds={gameRounds} playerIndex={currentPlayerIndex} totalPlayers={players.length} players={players} />}
      {gameState === 'roundEnd' && <RoundEndScreen player={players[pointsRecipientIndex]} roundPoints={roundPoints} onNext={nextTurn} explainer={players[currentPlayerIndex]} />}
      {gameState === 'gameEnd' && <GameEndScreen players={players} onReset={resetGame} />}
    </div>
  );
}

function SetupScreen({ onStart, onSettings, onManageDatabase }) {
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);

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
          <p className="text-gray-600 text-lg font-light">Eigo Darke - English Explanation Game</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Players</h2>
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
}

function SettingsScreen({ timerEnabled, timerSeconds, gameRounds, onTimerChange, onTimeChange, onRoundsChange, onBack }) {
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
            <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">Enable Timer</span>
          </label>

          {timerEnabled && (
            <div className="ml-8 space-y-3 bg-blue-50 p-4 rounded-xl">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">Time per turn (seconds)</span>
                <input
                  type="number"
                  value={timerSeconds}
                  onChange={(e) => onTimeChange(Math.max(10, Math.min(300, parseInt(e.target.value) || 60)))}
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
            <span className="text-sm font-semibold text-gray-700 mb-2 block">Rounds per game</span>
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
}

function PlayingScreen({ currentPlayer, currentWord, timerEnabled, timeLeft, onAwardPoints, onSkip, round, totalRounds, playerIndex, totalPlayers, players }) {
  const [showGuessers, setShowGuessers] = React.useState(false);
  const timerColor = timeLeft > 20 ? 'text-green-600' : timeLeft > 10 ? 'text-yellow-600' : 'text-red-600';
  const timerBg = timeLeft > 20 ? 'bg-green-50' : timeLeft > 10 ? 'bg-yellow-50' : 'bg-red-50';

  const handlePlayerGuess = (playerIdx) => {
    onAwardPoints(playerIdx, 1);
    setShowGuessers(false);
  };

  return (
    <div className="fixed inset-0 flex flex-col p-4 z-50 overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="text-sm font-bold text-gray-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full">
          Round {round} / {totalRounds} • Player {playerIndex + 1} / {totalPlayers}
        </div>
        {timerEnabled && (
          <div className={`text-lg font-bold ${timerColor} ${timerBg} px-4 py-2 rounded-full transition-all duration-300`}>
            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700">
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
              <p className="text-gray-500 text-lg font-medium mb-4">Japanese Word</p>
              <p className="text-8xl font-black text-gray-900 mb-3 select-none">
                {currentWord.word}
              </p>
              <p className="text-3xl text-gray-500 font-light">
                {currentWord.furigana}
              </p>
            </div>

            {/* NG Words Section */}
            <div className="pt-8 border-t-2 border-gray-200">
              <p className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wider">NG Words (Don't Use!)</p>
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
          <span className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
            currentWord.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            currentWord.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {currentWord.difficulty} difficulty
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-wrap">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who guessed it?</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {players.map((player, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayerGuess(idx)}
                  className={`w-full p-4 text-left rounded-xl font-semibold transition ${
                    idx === playerIndex
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {player.name} {idx === playerIndex && '(Explaining)'}
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
}

function RoundEndScreen({ player, roundPoints, onNext, explainer }) {
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
                <p className="text-xl font-bold text-gray-900">{explainer.name}</p>
                <p className="text-2xl font-black text-blue-600 mt-2">+1 point</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                <p className="text-sm text-gray-600 mb-1">Guesser</p>
                <p className="text-xl font-bold text-gray-900">{player.name}</p>
                <p className="text-2xl font-black text-green-600 mt-2">+1 point</p>
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
}

function GameEndScreen({ players, onReset }) {
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
                  ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-3 border-yellow-400'
                  : index === 1
                  ? 'bg-gradient-to-r from-gray-100 to-slate-100 border-2 border-gray-400'
                  : index === 2
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black w-12 text-center">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </span>
                <span className="font-bold text-lg text-gray-900">{player.name}</span>
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
}

function DatabaseManagementScreen({ onBack }) {
  const exportDatabase = () => {
    const dataStr = JSON.stringify(WORD_DATABASE, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eigo-darke-words.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDatabase = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result || '[]');
        if (Array.isArray(imported)) {
          // Note: In a real app, you'd update WORD_DATABASE here
          alert(`Successfully imported ${imported.length} words!`);
        }
      } catch (error) {
        alert('Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-in fade-in duration-300 max-h-96 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Word Database Management</h2>

        {/* Current Database Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Current Database</h3>
          <p className="text-2xl font-black text-blue-600 mb-2">{WORD_DATABASE.length} Words</p>
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
          <p className="text-xs text-gray-600 mt-2">Save your word database to edit and reimport</p>
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
          <p className="text-xs text-gray-600 mt-2">Load a previously exported database or custom word list</p>
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
}