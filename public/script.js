document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const submitButton = document.getElementById('submit-button');
    const resetButton = document.getElementById('reset-button');
    const messageElement = document.getElementById('message');
    const lastWordElement = document.getElementById('last-word');
    const wordsListElement = document.getElementById('words-list');

    submitButton.addEventListener('click', async () => {
        const word = wordInput.value.trim();

        if (!word) {
            messageElement.textContent = '単語を入力してください。';
            return;
        }

        try {
            const response = await fetch('/word', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word })
            });

            const result = await response.json();

            if (response.ok) {
                messageElement.textContent = '';
                lastWordElement.textContent = result.previousWord;
                wordsListElement.textContent = result.usedWords.join(', ');
                wordInput.value = '';
            } else {
                messageElement.textContent = result.message;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    resetButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/reset', {
                method: 'POST'
            });

            const result = await response.json();

            if (response.ok) {
                messageElement.textContent = '';
                lastWordElement.textContent = '';
                wordsListElement.textContent = '';
                wordInput.value = '';
                messageElement.textContent = result.message;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
