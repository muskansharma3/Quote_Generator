const line = document.getElementById("line");
const writer = document.getElementById("writer");
let realData = "";
let quotesData = "";
volumeBtn = document.querySelector(".volumeBtn");
clipboardBtn = document.querySelector(".clipBoard");
quoteBtn = document.querySelector("button");
let synth = window.speechSynthesis;

// function to show data
const getNewQuotes = () => {
    let rnum = Math.floor(Math.random() * 15);
    quotesData = realData[rnum]
    let position = quotesData.author.search(",");
    line.innerText = `${quotesData.text}`;

    if (position > -1) {
        writer.innerText = `${quotesData.author.substring(0, position)}`;
    }
    else {
        writer.innerText = `${quotesData.author}`;
    }
    quoteBtn.innerText = "New Quote";
    quoteBtn.classList.remove("loading");
};

// function to fetch data from api
const getQuotes = async () => {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    const api = "https://type.fit/api/quotes";
    try {
        let data = await fetch(api);
        realData = await data.json();
        getNewQuotes();
    }
    catch (error) { }
};

// Speech button functionality
let isSpeaking = false;
volumeBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(`${line.innerText} by ${writer.innerText}`);
    utterance.voice = synth.getVoices()[2];
    if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
    }
    else {
        synth.speak(utterance);
        isSpeaking = true;
    }
});

// copying button functionality
clipboardBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(line.innerText);
    clipboardBtn.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function () {
        clipboardBtn.classList.remove("active");
    }, 1000)
});

// new quote button functionality
quoteBtn.addEventListener("click", getQuotes);

getQuotes();
