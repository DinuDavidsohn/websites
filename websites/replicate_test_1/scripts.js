function searchLandscapes() {
  var input = document.getElementById("searchbar").value
  applyFilter(input)
}

function selectLandscapes() {
  var trait = document.getElementById("selectbar").value
  applyFilter(trait)
}

function autocomplete_search() {
  input = document.getElementById("autocompletebar").value
  var traits = ["cave", "city", "coast", "desert", "forest", "lake", "mountains", "river", "temple", "tropical", "watefall"]
}

function startPosition() {
  var images = document.getElementById("carouselImages").children
  for (i = 0; i < images.length; i++) {
    if (i != 0) {
      images[i].style.display = "none"
    }
  }
}

function goRight() {
  var images = document.getElementById("carouselImages").children
  var counter = 0;
  for (i = 0; i < images.length; i++) {
    if (images[i].style.display != "none") {
      counter = i
    }
  }
  images[counter].style.display = "none"
  if (counter == (images.length - 1)) {
    images[0].style.display = "block"
  } else {
    images[counter + 1].style.display = "block"
  }
}

function goLeft() {
  var images = document.getElementById("carouselImages").children
  var counter = 0;
  for (i = 0; i < images.length; i++) {
    if (images[i].style.display != "none") {
      counter = i
    }
  }
  images[counter].style.display = "none"
  if (counter == 0) {
    images[images.length - 1].style.display = "block"
  } else {
    images[counter - 1].style.display = "block"
  }
}

function applyFilter(query) {
  var images_found = 0
  var imagesContainer = document.getElementsByClassName("images")
  var images = imagesContainer[0].children

  for (i = 0; i < images.length; i++) {
    var image = images[i]
    var attribute_list_raw = image.getAttribute("data-landscape")
    var attribute_list = attribute_list_raw.split(",")
    var attributeFound = false
    for (j = 0; j < attribute_list.length; j++) {
      if (query != attribute_list[j] && attributeFound == false) {
        image.style.display = "none"
      } else if (query == attribute_list[j]) {
        image.style.display = "inline-block"
        images_found++
        attributeFound = true
      }
    }
  }
  if (images_found == 0) {
    for (i = 0; i < images.length; i++) {
      images[i].style.display = "inline-block"

    }
  }
}
function runGame(query) {
  var robotChoice = Math.floor((Math.random() * 3) + 1)
  console.log(robotChoice)
  switch (robotChoice) {
    case 1:
      document.getElementById("gameStart").innerHTML = "The computer chooses Rock!"
      break
    case 2:
      document.getElementById("gameStart").innerHTML = "The computer chooses Paper!"
      break
    case 3:
      document.getElementById("gameStart").innerHTML = "The computer chooses Scissors!"
      break
  }
  switch (query) {
    case "rock":
      query = 1
      break
    case "paper":
      query = 2
      break
    case "scissors":
      query = 3
      break
  }
  if (robotChoice == query) {
    document.getElementById("outcome").innerHTML = "You drew against the computer!"
    playedGameIncrement()
  }
  else if (robotChoice == 2 && query == 3 || robotChoice == 3 && query == 1 || robotChoice == 1 && query == 2) {
    document.getElementById("outcome").innerHTML = "You beat the computer!"
    wonGameIncrement()
    playedGameIncrement()

  }
  else if (robotChoice == 1 && query == 3 || robotChoice == 2 && query == 1 || robotChoice == 3 && query == 2) {
    document.getElementById("outcome").innerHTML = "You lost to the computer!"
    playedGameIncrement()
  }
}
var gamesPlayed = 0
var gamesWon = 0
function playedGameIncrement() {
  gamesPlayed++
  document.getElementById("timesPlayed").innerHTML = "Times Played: " + gamesPlayed
}
function wonGameIncrement() {
  gamesWon++
  document.getElementById("timesWon").innerHTML = "Times Won: " + gamesWon
}




var gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]

function runGame(index) {
  var hasWinner = hasGameFinished(index)
  if (hasWinner) {
    return hasWinner
  }

  var updatedGameState = makeMoves(index)
  if (updatedGameState != -1 && updatedGameState != null) {
    setWinDialogue(updatedGameState)
  }
}


function hasGameFinished(index) {
  var playerWon = findWinner(1, gameState)
  var botWon = findWinner(2, gameState)

  if (playerWon != -1) {
    return playerWon
  } else if (botWon != -1) {
    return botWon
  } else if (!remainingSpaces()) {
    return 3
  }
}


function makeMoves(index) {
  debugger
  if (gameState[index] != 0) {
    return null
  }

  var boxes = document.getElementsByClassName("box")
  boxes[index].style.backgroundColor = "red"
  gameState[index] = 1

  hasWinner = hasGameFinished(index)
  if (hasWinner) {
    return hasWinner
  }

  var robotChoice = getRobotChoice()
  if (robotChoice != false) {
    boxes[robotChoice].style.backgroundColor = "blue"
    gameState[robotChoice] = 2
  }
  hasWinner = hasGameFinished(index)
  if (hasWinner) {
    return hasWinner
  }
}


function getRobotChoice() {
  var botChoice = winCheckForNextMove(2)
  if (botChoice != false) {
    return botChoice
  }
  botChoice = winCheckForNextMove(1)
  if (botChoice != false) {
    return botChoice
  }
  var botChoice = Math.floor((Math.random() * 9))
  while (gameState[botChoice] != 0) {
    botChoice = Math.floor((Math.random() * 9))
  }
  return botChoice
}

function remainingSpaces() {
  return (gameState.some(val => val == 0))
}

function winCheckForNextMove(player) {
  for (i = 0; i < gameState.length; i++) {
    if (gameState[i] == 0) {
      plusGameState = gameState.slice()
      plusGameState[i] = player
      if (findWinner(player, plusGameState) != -1) {
        return i
      }
    }
  } 
  return false
}

function findWinner(i, localGameState) {
  var winFound = false
  /*row*/
  for (j = 0; j < localGameState.length; j += 3) {
    if (localGameState[j] == i && localGameState[j + 1] == i && localGameState[j + 2] == i) {
      winFound = true
    }
  }
  if (!winFound) {
    /*column*/
    for (j = 0; j < 3; j += 1) {
      if (localGameState[j] == i && localGameState[j + 3] == i && localGameState[j + 6] == i) {
        winFound = true
      }
    }
  }
  if (!winFound) {
    /*Diagonals*/
    if (localGameState[0] == i && localGameState[4] == i && localGameState[8] == i) {
      winFound = true
    } else if (localGameState[2] == i && localGameState[4] == i && localGameState[6] == i) {
      winFound = true
    }
  }
  if (winFound) {
    return i
  } else {
    return -1
  }
}
function setWinDialogue(i) {
  if (i == 1) {
    document.getElementById("result").innerHTML = "You win the game!"
  } else if (i == 2) {
    document.getElementById("result").innerHTML = "The CPU wins the game!"
  } else {
    document.getElementById("result").innerHTML = "Cat's cradle, it's a draw!"
  }
}
window.onload = startPosition();