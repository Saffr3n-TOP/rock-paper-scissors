function getChoiceNum(choiceStr) {
  switch (choiceStr.toUpperCase()) {
    case "R":
    case "ROCK":
      return 0;
    case "P":
    case "PAPER":
      return 1;
    case "S":
    case "SCISSORS":
      return 2;
    default:
      return NaN;
  }
}

function getChoiceStr(choiceNum) {
  switch (choiceNum) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
    default:
      return "";
  }
}

function getPlayerChoice() {
  const p = prompt("Choose Rock, Paper or Scissors:");
  const choiceNum = getChoiceNum(p);
  const choiceStr = getChoiceStr(choiceNum);

  if (!choiceStr) return getPlayerChoice();

  return {
    num: choiceNum,
    str: choiceStr,
  };
}

function getComputerChoice() {
  const minChoiceNum = 0;
  const maxChoiceNum = 2;
  const choiceNum = Math.floor(
    Math.random() * (1 + maxChoiceNum - minChoiceNum) + minChoiceNum
  );
  const choiceStr = getChoiceStr(choiceNum);

  return {
    num: choiceNum,
    str: choiceStr,
  };
}

function getRoundResultNum(playerChoiceNum, computerChoiceNum) {
  let choiceNumsDifference = playerChoiceNum - computerChoiceNum;

  if (choiceNumsDifference < -1) choiceNumsDifference = 1;
  if (choiceNumsDifference > 1) choiceNumsDifference = -1;

  return choiceNumsDifference;
}

function getRoundResultStr(playerChoiceStr, computerChoiceStr, roundResultNum) {
  let resultStr;

  switch (roundResultNum) {
    case 0:
      resultStr = "Tie!";
      break;
    case 1:
      resultStr = "You win!";
      break;
    default:
      resultStr = "You lose...";
  }

  return `You chose ${playerChoiceStr}, computer chose ${computerChoiceStr}. ${resultStr}`;
}

function playRound() {
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const roundResultNum = getRoundResultNum(
    playerChoice.num,
    computerChoice.num
  );
  const roundResultStr = getRoundResultStr(
    playerChoice.str,
    computerChoice.str,
    roundResultNum
  );

  return {
    num: roundResultNum,
    str: roundResultStr,
  };
}

const roundsAmount = 5;

function getGameResult(playerWins, computerWins) {
  let result;

  if (playerWins > computerWins) result = "You won the game";
  else if (playerWins < computerWins) result = "You lost the game";
  else result = "Tie game";

  return `${result} of ${roundsAmount} rounds.\nPlayer ${playerWins}:${computerWins} Computer`;
}

function playGame() {
  let playerWins = 0;
  let computerWins = 0;

  for (let i = 0; i < roundsAmount; i++) {
    const roundResult = playRound();

    if (roundResult.num > 0) playerWins++;
    if (roundResult.num < 0) computerWins++;

    console.log(roundResult.str);
  }

  console.log(getGameResult(playerWins, computerWins));
}

playGame();
