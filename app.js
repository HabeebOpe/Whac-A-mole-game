const body = document.querySelector("body");
const startGame = document.getElementById("start-game");

startGame.addEventListener('click', () => {
  startGame.textContent = "Loading..."
  setTimeout(() => {
    body.classList.add("start-game")
  }, 3000)
})
clearInterval(() => {
  startGame.textContent = "Start Game"
    body.classList.remove("start-game")
  }, 3000)

const squares = document.querySelectorAll(".square");
const scores = document.querySelectorAll("#score");
const time = document.querySelector("#time");
const pause = document.querySelector("#pause");
const resume = document.querySelector("#resume");
const restart = document.querySelectorAll("#restart");
const speeds = document.querySelectorAll("#speed")

let result = 0
let hitPosition
let timeLeft = 60

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove("mole")
  })
  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add("mole")
  hitPosition = randomSquare.id;
}
squares.forEach(square => {
  square.addEventListener("click", () => {
    if (square.id == hitPosition) {
      result += 1
    }
    scores.forEach((score) => {
      score.innerText = result
    })
  })
})

speeds.forEach(speed => {
  speed.addEventListener('click', () => {
    if (speed.classList.contains("3")) {
      speedValue = 100
    }
    else if (speed.classList.contains("2")) {
      speedValue = 250
    }
    else if (speed.classList.contains("1.5")) {
      speedValue = 400
    }
    else if (speed.classList.contains("0.5")) {
      speedValue = 600
    }
  })
})

function myTime() {
  if (timeLeft == 10) {
    body.classList.add("end-game")
  }
  if (timeLeft <= 20) {
    time.style.color = "red"
  }
  timeLeft -= 1
  time.textContent = timeLeft
}

let paused = false;
let timeId = null;
let speedValue = 500;

function moleMoveInterval() {
  if (!paused) {
    timeId = setInterval(randomSquare, speedValue);
    displayTime = setInterval(myTime, 1000);
  }
}
pause.addEventListener("click", () => {
  paused = true;
  clearInterval(timeId);
  clearInterval(displayTime)
  body.classList.add("open")
})
resume.addEventListener("click", () => {
  paused = false;
  console.log("play")
  moleMoveInterval()
  body.classList.remove("open")
});
moleMoveInterval();


const home = document.querySelectorAll("#home");
home.forEach((hom) => {
  hom.addEventListener("click", () => {
    body.classList.add("home")
  })
})

restart.forEach((restartGame) => {
  restartGame.addEventListener('click', () => {
    window.location.reload()
  })
})
