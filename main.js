import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

let previousWord = '';
let usedWords = [];

const handler = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/word" && request.method === "POST") {
    return await handleWord(request);
  } else if (url.pathname === "/reset" && request.method === "POST") {
    return handleReset();
  } else if (url.pathname === "/") {
    return await serveFile(request, "./public/index.html");
  } else if (url.pathname.startsWith("/public/")) {
    return await serveFile(request, `.${url.pathname}`);
  } else if (url.pathname.endsWith('.css')) {
    return await serveFile(request, `./public${url.pathname}`);
  } else if (url.pathname.endsWith('.js')) {
    return await serveFile(request, `./public${url.pathname}`);
  }
  return new Response("Not Found", { status: 404 });
};

async function handleWord(request) {
  const body = await request.json();
  const { word } = body;

  if (usedWords.includes(word)) {
    return new Response(JSON.stringify({ message: 'この単語は既に使われています。ゲーム終了です。' }), { status: 400 });
  }

  if (previousWord && previousWord.slice(-1) !== word[0]) {
    return new Response(JSON.stringify({ message: '単語の頭文字が前の単語の末尾と一致しません。' }), { status: 400 });
  }

  if (word.slice(-1) === 'ん') {
    return new Response(JSON.stringify({ message: '単語が「ん」で終わりました。ゲーム終了です。' }), { status: 400 });
  }

  usedWords.push(word);
  previousWord = word;

  return new Response(JSON.stringify({ message: 'OK', previousWord, usedWords }), { status: 200 });
}

function handleReset() {
  previousWord = '';
  usedWords = [];
  return new Response(JSON.stringify({ message: 'リセットしました。' }), { status: 200 });
}

serve(handler, { port: 8000 });
