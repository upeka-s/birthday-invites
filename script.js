let currentPuzzle = 0;
let data;

fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    // Fill party details
    document.getElementById('date').innerText = data.partyDetails.date;
    document.getElementById('time').innerText = data.partyDetails.time;
    document.getElementById('location').innerText = data.partyDetails.location;
    document.getElementById('rsvp').innerText = data.partyDetails.rsvp;
  });

const startBtn = document.getElementById('startBtn');
const gameDiv = document.getElementById('game');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');

startBtn.addEventListener('click', () => {
  startBtn.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  showPuzzle();
});

function showPuzzle() {
  const puzzle = data.puzzles[currentPuzzle];
  questionEl.innerText = puzzle.question;
  optionsEl.innerHTML = '';
  feedbackEl.innerText = '';

  puzzle.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.addEventListener('click', () => checkAnswer(opt));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(answer) {
  const puzzle = data.puzzles[currentPuzzle];
  if(answer === puzzle.correct) {
    feedbackEl.innerText = puzzle.successMessage;
    currentPuzzle++;
    if(currentPuzzle < data.puzzles.length) {
      setTimeout(showPuzzle, 1000);
    } else {
      feedbackEl.innerText += " 🎉 You've completed the mission!";
    }
  } else {
    feedbackEl.innerText = puzzle.failMessage;
  }
}
