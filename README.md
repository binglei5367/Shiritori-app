# Shiritori Game

This is a simple web-based Shiritori game implemented using Deno.

## Features

1. **Input Validation**: Ensures that the input is Hiragana and longer than one character.
2. **Display Last Word**: Shows the last word used in the game.
3. **Word Comparison**: Compares the newly entered word with the last word. If the first character of the new word matches the last character of the previous word, the word is accepted; otherwise, an error is displayed.
4. **Game Over on "ん"**: If a word ending in "ん" is entered, the game ends.
5. **Display Word Records**: Keeps track of all used words and displays them.
6. **Game Over on Duplicate Word**: If a previously used word is entered, the game ends.
7. **Restart Game**: Allows the game to be restarted at any time.

## How to Verify Functionality

To verify the functionality of the Shiritori game, you can access the deployed URL:

[Shiritori Game Deployment](https://mizuumi-shiritori-a-78-c46xthjgxmaz.deno.dev/)


## References

Here are some references that helped in the implementation of this project:

- [Deno Documentation](https://deno.land/manual)
- [Deno Deploy Documentation](https://deno.com/deploy/docs)
- [MDN Web Docs - Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN Web Docs - Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
