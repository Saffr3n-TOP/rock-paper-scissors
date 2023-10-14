const choiceButtons = document.querySelectorAll('.opts button');

const playerLog = {
  score: document.querySelector('.player .score'),
  body: document.querySelector('.player .body')
};
const computerLog = {
  score: document.querySelector('.computer .score'),
  body: document.querySelector('.computer .body')
};

choiceButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const playerChoice = getPlayerChoice(e.target);
    const computerChoice = getComputerChoice();
    const roundResult = getRoundResult(playerChoice.num, computerChoice.num);

    updateScore(roundResult);
    createLogRow(playerChoice.str, computerChoice.str, roundResult);
  });
});

function getPlayerChoice(clickedBtn) {
  const choiceNum = +clickedBtn.id;

  return {
    num: choiceNum,
    str: getChoiceStr(choiceNum)
  };
}

function getComputerChoice() {
  const minChoiceNum = 0;
  const maxChoiceNum = 2;

  const choiceNum = Math.floor(
    Math.random() * (1 + maxChoiceNum - minChoiceNum) + minChoiceNum
  );

  return {
    num: choiceNum,
    str: getChoiceStr(choiceNum)
  };
}

function getChoiceStr(choiceNum) {
  switch (choiceNum) {
    case 0:
      return 'Rock';
    case 1:
      return 'Paper';
    case 2:
      return 'Scissors';
    default:
      return '';
  }
}

function getRoundResult(playerChoiceNum, computerChoiceNum) {
  let roundResult = playerChoiceNum - computerChoiceNum;

  if (roundResult < -1) roundResult = 1;
  if (roundResult > 1) roundResult = -1;

  return roundResult;
}

function updateScore(roundResult) {
  const maxScore = 5;

  let playerScore = +playerLog.score.textContent;
  let computerScore = +computerLog.score.textContent;

  if (roundResult === 1) {
    playerScore++;
    playerLog.score.textContent = playerScore;
  }
  if (roundResult === -1) {
    computerScore++;
    computerLog.score.textContent = computerScore;
  }

  if (playerScore > computerScore) {
    playerLog.score.style.color = 'green';
    computerLog.score.style.color = 'red';
  } else if (playerScore < computerScore) {
    playerLog.score.style.color = 'red';
    computerLog.score.style.color = 'green';
  } else {
    playerLog.score.style.color = 'darkorange';
    computerLog.score.style.color = 'darkorange';
  }

  if (playerScore === maxScore || computerScore === maxScore) {
    finishGame(playerScore, computerScore);
  }
}

function finishGame(playerScore, computerScore) {
  const resultMsg = document.querySelector('.result .message');
  const restartBtn = document.querySelector('.result button');

  choiceButtons.forEach((btn) => {
    btn.disabled = true;
  });

  if (playerScore > computerScore) {
    resultMsg.textContent = 'You win!';
  } else {
    resultMsg.textContent = 'You lose...';
  }

  restartBtn.addEventListener('click', () => {
    window.location.reload();
  });

  restartBtn.disabled = false;
  restartBtn.style.display = 'inline';
}

function createLogRow(playerChoiceStr, computerChoiceStr, roundResult) {
  const playerLogEntry = document.createElement('div');
  playerLogEntry.textContent = playerChoiceStr;
  playerLogEntry.className = 'item';
  playerLog.body.appendChild(playerLogEntry);

  const computerLogEntry = document.createElement('div');
  computerLogEntry.textContent = computerChoiceStr;
  computerLogEntry.className = 'item';
  computerLog.body.appendChild(computerLogEntry);

  if (roundResult === 1) {
    playerLogEntry.style.color = 'green';
    computerLogEntry.style.color = 'red';
  } else if (roundResult === -1) {
    playerLogEntry.style.color = 'red';
    computerLogEntry.style.color = 'green';
  } else {
    playerLogEntry.style.color = 'darkorange';
    computerLogEntry.style.color = 'darkorange';
  }
}
