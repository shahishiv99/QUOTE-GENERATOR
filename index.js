const container = document.getElementById("container");
const quoteText = document.getElementById("textQuote");
const textAuthr = document.getElementById("textAuthr");
const newBtn = document.getElementById("newBtn");
const twitBtn = document.getElementById("tweetBtn");
const loader = document.getElementById("loader");

// Empty Array
let apiQuote = [];

// Show loading

function loading() {
  loader.hidden = false;
  container.hidden = true;
}

// Hide loading
function loadingCompleted() {
  container.hidden = false;
  loader.hidden = true;
}

// Loader Start
loading();

// Sent to data single text and author name
function oneQuote() {
  const quotes = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  quoteText.innerHTML = quotes.text;
  //   if author value == null, add "Unknown"
  if (!quotes.author == "") {
    textAuthr.innerHTML = quotes.author;
  } else {
    textAuthr.innerHTML = "Unkown";
  }
  //   Reduce fontsize for long quote
  if (quotes.text.length > 100) {
    quoteText.classList.add("longQuote");
  } else {
    quoteText.classList.remove("longQuote");
  }
}

// Fetching API
async function quotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    oneQuote();
    // Loader End
    loadingCompleted();
  } catch (error) {
    console.log("server error");
  }
}

// twitter button event
function twitterbtn() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} Author- ${textAuthr.textContent}`;
  window.open(twitterUrl, "_blank");
}

// New Button and Twit Button Events
newBtn.addEventListener("click", oneQuote);
twitBtn.addEventListener("click", twitterbtn);

quotes();
