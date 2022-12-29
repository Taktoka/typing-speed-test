let levels = document.querySelectorAll(".lvls li");
let lvlsContainer = document.querySelector(".message");
let seconds = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upComingWord = document.querySelector(".upCopming-word");
let input = document.querySelector(".input");
let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");

let words = [
  "Hello",
  "Code",
  "Town",
  "Programming",
  "Javascript",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

const lvl = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

let defTime;

levels.forEach((le) => {
  le.addEventListener("click", (e) => {
    levels.forEach((le) => {
      le.classList.remove("active");
    });
    e.target.classList.add("active");
    defTime = lvl[e.target.dataset.levels];
    seconds.innerHTML = defTime;
  });
});

scoreTotal.innerHTML = words.length;

startBtn.onclick = function () {
  if (seconds.innerHTML === "") {
    return false;
  }
  this.remove();
  input.focus();

  genWord();
};

function genWord() {
  upComingWord.innerHTML = "";
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let index = words.indexOf(randomWord);
  words.splice(index, 1);
  theWord.innerHTML = randomWord;
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upComingWord.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  timeLeft.innerHTML = defTime;
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(start);
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        input.value = "";
        score.innerHTML++;
        if (words.length > 0) {
          genWord();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.appendChild(document.createTextNode("Perfect! You Won"));
          finish.appendChild(span);
          lvlsContainer.remove();
          input.remove();
          upComingWord.remove();
          theWord.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over"));
        finish.appendChild(span);
        lvlsContainer.remove();
        input.remove();
        upComingWord.remove();
        theWord.remove();
      }
    }
  }, 1000);
}
