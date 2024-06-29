import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

// Initialize variables
let lastWord = ''; // The last word used
let wordsUsed = []; // List of words used so far

// Check if the word is valid Hiragana
function isHiragana(word) {
    return /^[\u3040-\u309F]+$/.test(word);
}

// Check if the word is a single character
function isSingleChar(word) {
    return word.length === 1;
}

// Main handler for requests
const handler = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/word" && request.method === "POST") {
        return await handleWord(request);
    } else if (url.pathname === "/reset" && request.method === "POST") {
        return resetGame();
    } else if (url.pathname === "/") {
        return await serveFile(request, "./public/index.html");
    } else if (url.pathname === "/style.css") {
        return await serveFile(request, "./public/style.css");
    } else if (url.pathname === "/script.js") {
        return await serveFile(request, "./public/script.js");
    }
    return new Response("Not Found", { status: 404 });
};

// Handle word submission
async function handleWord(request) {
    const body = await request.json();
    const { word } = body;

    if (!isHiragana(word)) {
        return new Response(JSON.stringify({ message: 'Input contains non-Hiragana characters.' }), { status: 400 });
    }

    if (isSingleChar(word)) {
        return new Response(JSON.stringify({ message: 'Single character words are not allowed.' }), { status: 400 });
    }

    if (wordsUsed.includes(word)) {
        return new Response(JSON.stringify({ message: 'This word has already been used. Game over.' }), { status: 400 });
    }

    if (lastWord && lastWord.slice(-1) !== word[0]) {
        return new Response(JSON.stringify({ message: 'The first letter of the word does not match the last letter of the previous word.' }), { status: 400 });
    }

    if (word.slice(-1) === 'ん') {
        return new Response(JSON.stringify({ message: 'The word ends with "ん". Game over.' }), { status: 400 });
    }

    wordsUsed.push(word); // Add the word to the list of used words
    lastWord = word; // Update the last word

    return new Response(JSON.stringify({ message: 'OK', lastWord, wordsUsed }), { status: 200 });
}

// Reset the game
function resetGame() {
    lastWord = ''; // Reset the last word
    wordsUsed = []; // Clear the list of used words
    return new Response(JSON.stringify({ message: 'Game reset.' }), { status: 200 });
}

// Start the server on port 8000
serve(handler, { port: 8000 });
