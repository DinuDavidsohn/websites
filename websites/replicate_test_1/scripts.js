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
  var playerWon = findWinner(1)
  var botWon = findWinner(2)

  if (playerWon != -1) {
    return playerWon
  } else if (botWon != -1) {
    return botWon
  } 
}


function makeMoves(index) {
  var boxes = document.getElementsByClassName("box")

  if (gameState[index] != 0) {
    return null
  }

  boxes[index].style.backgroundColor = "red"
  gameState[index] = 1

  hasWinner = hasGameFinished(index)
  if (hasWinner) {
    return hasWinner
  }
  
  var robotChoice = getRobotChoice()
  boxes[robotChoice].style.backgroundColor = "blue"
  gameState[robotChoice] = 2

  hasWinner = hasGameFinished(index)
  if (hasWinner) {
    return hasWinner
  }
}


function getRobotChoice() {

  var robotChoice = Math.floor((Math.random() * 9))
  while (gameState[robotChoice] != 0) {
    robotChoice = Math.floor((Math.random() * 9))
  }
  return robotChoice

}

function findWinner(i) {
  var winFound = false
  /*row*/
  for (j = 0; j < gameState.length; j += 3) {
    if (gameState[j] == i && gameState[j + 1] == i && gameState[j + 2] == i) {
      winFound = true
    }
  }
  if (!winFound) {
    /*column*/
    for (j = 0; j < 3; j += 1) {
      if (gameState[j] == i && gameState[j + 3] == i && gameState[j + 6] == i) {
        winFound = true
      }
    }
  }
  if (!winFound) {
    /*Diagonals*/
    for (j = 0; j < 3; j += 2) {
      if (gameState[j] == i && gameState[j + 4] == i && gameState[j + 8] == i) {
        winFound = true
      } else if (gameState[j] == i && gameState[j + 2] == i && gameState[j + 4] == i) {
        winFound = true
      }
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
  } else {
    document.getElementById("result").innerHTML = "The CPU wins the game!"
  }
}
window.onload = startPosition();