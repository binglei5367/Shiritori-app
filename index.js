const express = require('express');
const app = express();
const port = 3000;

let previousWord = '';
let usedWords = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/word', (req, res) => {
    const { word } = req.body;

    if (usedWords.includes(word)) {
        return res.status(400).json({ message: 'この単語は既に使われています。ゲーム終了です。' });
    }

    if (previousWord && previousWord.slice(-1) !== word[0]) {
        return res.status(400).json({ message: '単語の頭文字が前の単語の末尾と一致しません。' });
    }

    if (word.slice(-1) === 'ん') {
        return res.status(400).json({ message: '単語が「ん」で終わりました。ゲーム終了です。' });
    }

    usedWords.push(word);
    previousWord = word;

    res.json({ message: 'OK', previousWord, usedWords });
});

app.post('/reset', (req, res) => {
    previousWord = '';
    usedWords = [];
    res.json({ message: 'リセットしました。' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
