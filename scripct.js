let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn");

let scoreO = 0;
let scoreX = 0;
let turnO = true; // true for O, false for X

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const playSound = () => {
  document.getElementById("click-sound").play();
};

const updateScore = (winner) => {
  if (winner === "O") {
    scoreO++;
    document.getElementById("score-o").innerText = scoreO;
  } else {
    scoreX++;
    document.getElementById("score-x").innerText = scoreX;
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  updateScore(winner);
  disableBoxes();
};

const checkDraw = () => {
  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerText === "") isDraw = false;
  });
  if (isDraw) {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
};

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnDisplay.innerText = "Current Turn: O";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    playSound();

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;

    if (!checkWinner()) {
      checkDraw();
      turnO = !turnO;
      turnDisplay.innerText = `Current Turn: ${turnO ? "O" : "X"}`;
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
