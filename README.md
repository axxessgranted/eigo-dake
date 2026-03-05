# 英語ダーク - Eigo Dake

A fun, interactive English word explanation game for Japanese learners. Players explain Japanese words in English without using forbidden words (NG words), and other players try to guess what they're explaining.

Perfect for ESL/EFL classrooms, language clubs, and group study sessions!

![Eigo Dake Game](https://img.shields.io/badge/Made%20with-React-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎮 How to Play

1. **Setup**: Add 2-8 players with custom names
2. **Configure**: Set optional turn timer and number of rounds
3. **Explain**: Current player gets a Japanese word and must explain it **only in English**
4. **Avoid**: Cannot use the forbidden "NG words" listed
5. **Guess**: Other players try to understand the explanation
6. **Score**: When someone guesses correctly, both explainer and guesser get +1 point
7. **Win**: Player with most points at the end wins!

## ✨ Features

- ✅ Beautiful, modern UI with smooth animations
- ✅ Support for 2-8 players
- ✅ 180+ Japanese words across 17 categories
- ✅ Customizable difficulty levels (easy, medium, hard)
- ✅ Optional turn timer (adjustable 10-300 seconds)
- ✅ Configurable number of rounds (1, 3, 5, or 10)
- ✅ Real-time score tracking and leaderboard
- ✅ Word database import/export (JSON format)
- ✅ Fully responsive design (desktop, tablet, mobile)

## 🚀 Quick Start

### Online (Easiest)
Visit the live game: `https://YOUR_USERNAME.github.io/eigo-darke`

### Local Development

**Requirements:**
- Node.js 14+ and npm

**Setup:**
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eigo-darke.git
cd eigo-darke

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📦 Deployment

### Deploy to GitHub Pages

1. **Update homepage** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/eigo-darke"
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Select "gh-pages" branch as source
   - Save

5. **Your game is live!** Share the link: `https://YOUR_USERNAME.github.io/eigo-darke`

## 📚 Word Database

### Built-in Categories
- Animals (10 words)
- Nature (15 words)
- Objects (15 words)
- Time (10 words)
- Places (10 words)
- Emotions (8 words)
- Adjectives (12 words)
- Food (16 words)
- Actions/Verbs (12 words)
- Colors (8 words)
- Family (8 words)
- Numbers (6 words)
- School (4 words)
- Body (8 words)
- And more!

### Import Custom Words

1. Click **"Manage Word Database"** from the main menu
2. Click **"Upload JSON File"**
3. Use this format:

```json
[
  {
    "word": "猫",
    "furigana": "ねこ",
    "ngWords": ["animal", "meow", "pet", "feline"],
    "category": "animals",
    "difficulty": "easy"
  }
]
```

### Export Database

1. Click **"Manage Word Database"**
2. Click **"Download as JSON"**
3. Edit in spreadsheet or text editor
4. Re-import to apply changes

## 🎯 Tips for Teachers

- **Mix difficulties**: Use easy words for warm-up, harder ones later
- **Custom word lists**: Create themed word sets (food, travel, etc.)
- **Adjust timer**: Start with 60 seconds, reduce for challenge
- **Team mode**: Can be played in teams for larger classes
- **Vocabulary review**: Great for reviewing vocabulary units

## 🛠️ Customization

### Change Colors/Theme
Edit `src/App.jsx` and look for gradient classes like:
```jsx
className="bg-gradient-to-r from-blue-600 to-indigo-600"
```

### Add More Words
Edit `WORD_DATABASE` in `src/App.jsx`:
```javascript
{ 
  word: '日本', 
  furigana: 'にほん', 
  ngWords: ['country', 'asia', 'east'], 
  category: 'places', 
  difficulty: 'easy' 
}
```

### Adjust Game Settings
- Change default timer duration in `useState(60)`
- Modify round options in `SettingsScreen`
- Update max players in player setup UI

## 📱 Responsive Design

Works great on:
- 🖥️ Desktop browsers
- 📱 Tablets
- 📱 Mobile phones

## 🤝 Contributing

Want to add more words or features? 
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for education and commercial purposes

## 🙋 Support

Have questions? Found a bug?
- Open an issue on GitHub
- Check existing issues for solutions

## 🎉 Credits

Made with ❤️ for English language learners and teachers in Japan

---

**Ready to play?** Start a game and have fun explaining! 🎮✨
