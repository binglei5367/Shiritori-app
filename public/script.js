document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('word-input');
    const submitButton = document.getElementById('submit-button');
    const resetButton = document.getElementById('reset-button');
    const messageElement = document.getElementById('message');
    const lastWordElement = document.getElementById('last-word');
    const wordsListElement = document.getElementById('words-list');

    // Handle word submission
    submitButton.addEventListener('click', async () => {
        const word = wordInput.value.trim();

        if (!word) {
            messageElement.textContent = 'Please enter a word.';
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
                lastWordElement.textContent = result.lastWord;
                wordsListElement.textContent = result.wordsUsed.join(', ');
                wordInput.value = '';
            } else {
                messageElement.textContent = result.message;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle game reset
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
