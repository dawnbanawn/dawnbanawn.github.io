document.body.addEventListener('touchmove', function(event) {
  console.log(event.source);
  event.preventDefault();
}, false);

const buttonPage01 = document.querySelector("#button01");
const buttonPage02 = document.querySelector("#button02");
const buttonPage03 = document.querySelector("#button03");
const buttonPage03Back = document.querySelector("#button04");
const button04back = document.querySelector("#button04back");
const button04next = document.querySelector("#button04next");
const pauseButton = document.querySelector("#pauseButton");
const resultButton = document.querySelector("#resultButton");
const gameTimeField = document.querySelector("#gameTime");
previewCurrentPlayerA = document.querySelector("#previewCurrentPlayerA");
previewCurrentPlayerB = document.querySelector("#previewCurrentPlayerB");
previewCurrentPlayerC = document.querySelector("#previewCurrentPlayerC");
previewCurrentPlayerD = document.querySelector("#previewCurrentPlayerD");

currentPlayerA = document.querySelector("#currentPlayerA");
currentPlayerB = document.querySelector("#currentPlayerB");
currentPlayerC = document.querySelector("#currentPlayerC");
currentPlayerD = document.querySelector("#currentPlayerD");
nextPlayerA = document.querySelector("#nextPlayerA");
nextPlayerB = document.querySelector("#nextPlayerB");
nextPlayerC = document.querySelector("#nextPlayerC");
nextPlayerD = document.querySelector("#nextPlayerD");

let gameTime;
let numberOfPlayers;
let playerNamesArray = [];
let timePerGame; //gametime divided by matches.
//What the random match order is.
let chosenMatchOrder;
//which players meet which. Setup version.
let matchOrders = {
  //6 players, setup version 1-3.
  "6": {
    "1": [
      {//1
        "a": 3,
        "b": 4,
        "c": 1,
        "d": 2,
        "3": 0,
        "4": 0,
        "1": 0,
        "2": 0

      },
      {//2
        "a": 1,
        "b": 5,
        "c": 6,
        "d": 3,
        "1": 0,
        "5": 0,
        "6": 0,
        "3": 0
      },
      {//3
        "a": 2,
        "b": 5,
        "c": 4,
        "d": 6,
        "2": 0,
        "5": 0,
        "4": 0,
        "6": 0
      },
      {//4
        "a": 1,
        "b": 6,
        "c": 2,
        "d": 3,
        "1": 0,
        "6": 0,
        "2": 0,
        "3": 0
      },
      {//5
        "a": 1,
        "b": 4,
        "c": 5,
        "d": 3,
        "1": 0,
        "4": 0,
        "5": 0,
        "3": 0
      },
      {//6
        "a": 6,
        "b": 3,
        "c": 2,
        "d": 4,
        "6": 0,
        "3": 0,
        "2": 0,
        "4": 0
      },
      {//7
        "a": 5,
        "b": 6,
        "c": 1,
        "d": 2,
        "5": 0,
        "6": 0,
        "1": 0,
        "2": 0
      },
      {//8
        "a": 2,
        "b": 3,
        "c": 5,
        "d": 4,
        "2": 0,
        "3": 0,
        "5": 0,
        "4": 0
      },
      {//9
        "a": 1,
        "b": 3,
        "c": 4,
        "d": 6,
        "1": 0,
        "3": 0,
        "4": 0,
        "6": 0
      },
      {//10
        "a": 4,
        "b": 2,
        "c": 1,
        "d": 5,
        "4": 0,
        "2": 0,
        "1": 0,
        "5": 0
      },
      {//11
        "a": 2,
        "b": 6,
        "c": 5,
        "d": 3,
        "2": 0,
        "6": 0,
        "5": 0,
        "3": 0
      },
      {//12
        "a": 2,
        "b": 6,
        "c": 1,
        "d": 4,
        "2": 0,
        "6": 0,
        "1": 0,
        "4": 0
      },
      {//13
        "a": 6,
        "b": 5,
        "c": 3,
        "d": 4,
        "6": 0,
        "5": 0,
        "3": 0,
        "4": 0
      },
      {//14
        "a": 1,
        "b": 3,
        "c": 2,
        "d": 5,
        "1": 0,
        "3": 0,
        "2": 0,
        "5": 0
      },
      {//15
        "a": 4,
        "b": 5,
        "c": 1,
        "d": 6,
        "4": 0,
        "5": 0,
        "1": 0,
        "6": 0
      },
    ],
    "2": [
      
      {//15
        "a": 4,
        "b": 5,
        "c": 1,
        "d": 6,
        "4": 0,
        "5": 0,
        "1": 0,
        "6": 0
      },
      {//14
        "a": 1,
        "b": 3,
        "c": 2,
        "d": 5,
        "1": 0,
        "3": 0,
        "2": 0,
        "5": 0
      },
      {//13
        "a": 6,
        "b": 5,
        "c": 3,
        "d": 4,
        "6": 0,
        "5": 0,
        "3": 0,
        "4": 0
      },
      {//12
        "a": 2,
        "b": 6,
        "c": 1,
        "d": 4,
        "2": 0,
        "6": 0,
        "1": 0,
        "4": 0
      },
      {//11
        "a": 2,
        "b": 6,
        "c": 5,
        "d": 3,
        "2": 0,
        "6": 0,
        "5": 0,
        "3": 0
      },
      {//10
        "a": 4,
        "b": 2,
        "c": 1,
        "d": 5,
        "4": 0,
        "2": 0,
        "1": 0,
        "5": 0
      },
      {//9
        "a": 1,
        "b": 3,
        "c": 4,
        "d": 6,
        "1": 0,
        "3": 0,
        "4": 0,
        "6": 0
      },
      {//8
        "a": 2,
        "b": 3,
        "c": 5,
        "d": 4,
        "2": 0,
        "3": 0,
        "5": 0,
        "4": 0
      },
      {//7
        "a": 5,
        "b": 6,
        "c": 1,
        "d": 2,
        "5": 0,
        "6": 0,
        "1": 0,
        "2": 0
      },
      {//6
        "a": 6,
        "b": 3,
        "c": 2,
        "d": 4,
        "6": 0,
        "3": 0,
        "2": 0,
        "4": 0
      },
      {//5
        "a": 1,
        "b": 4,
        "c": 5,
        "d": 3,
        "1": 0,
        "4": 0,
        "5": 0,
        "3": 0
      },
      {//4
        "a": 1,
        "b": 6,
        "c": 2,
        "d": 3,
        "1": 0,
        "6": 0,
        "2": 0,
        "3": 0
      },
      {//3
        "a": 2,
        "b": 5,
        "c": 4,
        "d": 6,
        "2": 0,
        "5": 0,
        "4": 0,
        "6": 0
      },
      {//2
        "a": 1,
        "b": 5,
        "c": 6,
        "d": 3,
        "1": 0,
        "5": 0,
        "6": 0,
        "3": 0
      },
      {//1
        "a": 3,
        "b": 4,
        "c": 1,
        "d": 2,
        "3": 0,
        "4": 0,
        "1": 0,
        "2": 0

      },
    ],
    "3": [
      {//2
        "a": 1,
        "b": 5,
        "c": 6,
        "d": 3,
        "1": 0,
        "5": 0,
        "6": 0,
        "3": 0
      },
      {//3
        "a": 2,
        "b": 5,
        "c": 4,
        "d": 6,
        "2": 0,
        "5": 0,
        "4": 0,
        "6": 0
      },
      {//4
        "a": 1,
        "b": 6,
        "c": 2,
        "d": 3,
        "1": 0,
        "6": 0,
        "2": 0,
        "3": 0
      },
      {//5
        "a": 1,
        "b": 4,
        "c": 5,
        "d": 3,
        "1": 0,
        "4": 0,
        "5": 0,
        "3": 0
      },
      {//6
        "a": 6,
        "b": 3,
        "c": 2,
        "d": 4,
        "6": 0,
        "3": 0,
        "2": 0,
        "4": 0
      },
      {//7
        "a": 5,
        "b": 6,
        "c": 1,
        "d": 2,
        "5": 0,
        "6": 0,
        "1": 0,
        "2": 0
      },
      {//8
        "a": 2,
        "b": 3,
        "c": 5,
        "d": 4,
        "2": 0,
        "3": 0,
        "5": 0,
        "4": 0
      },
      {//9
        "a": 1,
        "b": 3,
        "c": 4,
        "d": 6,
        "1": 0,
        "3": 0,
        "4": 0,
        "6": 0
      },
      {//10
        "a": 4,
        "b": 2,
        "c": 1,
        "d": 5,
        "4": 0,
        "2": 0,
        "1": 0,
        "5": 0
      },
      {//11
        "a": 2,
        "b": 6,
        "c": 5,
        "d": 3,
        "2": 0,
        "6": 0,
        "5": 0,
        "3": 0
      },
      {//12
        "a": 2,
        "b": 6,
        "c": 1,
        "d": 4,
        "2": 0,
        "6": 0,
        "1": 0,
        "4": 0
      },
      {//13
        "a": 6,
        "b": 5,
        "c": 3,
        "d": 4,
        "6": 0,
        "5": 0,
        "3": 0,
        "4": 0
      },
      {//14
        "a": 1,
        "b": 3,
        "c": 2,
        "d": 5,
        "1": 0,
        "3": 0,
        "2": 0,
        "5": 0
      },
      {//15
        "a": 4,
        "b": 5,
        "c": 1,
        "d": 6,
        "4": 0,
        "5": 0,
        "1": 0,
        "6": 0
      },
      {//1
        "a": 3,
        "b": 4,
        "c": 1,
        "d": 2,
        "3": 0,
        "4": 0,
        "1": 0,
        "2": 0

      },
    ],
  },
};

page02Container = document.querySelector("#page02Container");
page03Container = document.querySelector("#page03Container");
mainContainer = document.querySelector("#mainContainer");
const nameInputContainer = document.querySelector("#nameInputContainer");
const playerNumberDropdown = document.querySelector("#numberOfPlayersDropDown");

//Randomizerbutton
button04randomize = document.querySelector("#button04randomize");
button04randomize.addEventListener("click", () => {
  if (numberOfPlayers == 6) {
  if (chosenMatchOrder == 1) {
    chosenMatchOrder = 2; 
  } else if (chosenMatchOrder == 2){
    chosenMatchOrder = 3; 
  } else {
    chosenMatchOrder = 1; 
  }
  

}
reloadPreviewPlayerOrder();
});


button04next.addEventListener("click", () => {
  // playerNamesArray = [];
  // let count = 0;
  // while (nameInputContainer.hasChildNodes()) {
  //   count++;
  //   if (nameInputContainer.firstChild.value == "") {
  //     nameInputContainer.firstChild.value = "Player " + count.toString();
  //   }
  //   playerNamesArray.push(nameInputContainer.firstChild.value);
  //   nameInputContainer.removeChild(nameInputContainer.firstChild);
  // }
  page04Container.style.display = "none";
  page05Container.style.display = "block";
  // chosenMatchOrder = 1; //This will randomize later.
  // console.log(playerNamesArray);
  loadFirstScreen();
});
button04back.addEventListener("click", () => {
  page04Container.style.display = "none";
  page03Container.style.display = "block";
  loadNameInputs();
});
buttonPage03.addEventListener("click", () => {
  page03Container.style.display = "none";
  page04Container.style.display = "block";
  playerNamesArray = [];
  let count = 0;
  while (nameInputContainer.hasChildNodes()) {
    count++;
    if (nameInputContainer.firstChild.value == "") {
      nameInputContainer.firstChild.value = "Player " + count.toString();
    }
    playerNamesArray.push(nameInputContainer.firstChild.value);
    nameInputContainer.removeChild(nameInputContainer.firstChild);
  }
  chosenMatchOrder = 1; //This will randomize later.
  //Randomizing between available options.
  if (numberOfPlayers == 6) {//randomizer for 6 players! Make new ones for different player numbers.

    chosenMatchOrder = Math.floor(Math.random() * 3) + 1;
    console.log(chosenMatchOrder);
  }
  console.log(playerNamesArray);
  match = 1;
  loadFirstScreen();
});
buttonPage03Back.addEventListener("click", () => {
  page03Container.style.display = "none";
  page02Container.style.display = "block";
  //saveNames(numberOfPlayers);
  numberOfPlayers = 0;
  playerNamesArray = [];

  while (nameInputContainer.hasChildNodes()) {
    playerNamesArray.push(nameInputContainer.firstChild.value);
    nameInputContainer.removeChild(nameInputContainer.firstChild);
  }
  console.log(playerNamesArray);
  //loadNameInputs();
});
buttonPage01.addEventListener("click", () => {
  //buttonPage02.style.backgroundColor  = "white";
  mainContainer.style.display = "none";
  page02Container.style.display = "block";
  //buttonPage02.style.backgroundColor  = "black";
});

buttonPage02.addEventListener("click", () => {
  if (gameTimeField.value == "") {
    gameTime = 120;
  } else {
    gameTime = gameTimeField.value;
  }
  console.log(gameTime);
  if (isNaN(gameTime) == true) {
    alert("Please use numbers.");
  } else if (parseInt(gameTime) < 90 || parseInt(gameTime) > 120) {
    alert("Please have a game time between 90 and 120 min.");
  } else if (gameTime.length > 1 && gameTime.charAt(0) == "0") {
    alert("Please re-write the game time.");
  } else {
    numberOfPlayers = playerNumberDropdown.value;
    //console.log("page03" + numberOfPlayers);
    //window.setTimeout(loadNameInputs, 2000);
    //window.open("./page03.html","_self");
    //window.location.href = './page03.html';
    let page03chosenGameTimeSpan = document.querySelector(
      "#page03chosenGameTimeSpan"
    );

    page03chosenGameTimeSpan.innerHTML = gameTime;
    let page03PlayerNumberSpan = document.querySelector(
      "#page03PlayerNumberSpan"
    );
    let page03MatchTime = document.querySelector(
      "#page03MatchTime"
    );
    page03MatchTime.innerHTML = calculateMatchTime("matchTime");
    
    page03PlayerNumberSpan.innerHTML = numberOfPlayers;

    page02Container.style.display = "none";
    page03Container.style.display = "block";
    loadNameInputs();
  }
});

function calculateMatchTime(message) {
  if (message == "matchTime" && numberOfPlayers == 6) {

    return (
      ((parseInt(gameTime) / 15) - parseInt(gameTime) / 15 * (0.0625))
    );
  } else if (message == "breakTime" && numberOfPlayers == 6) {

    return (
      (parseInt(gameTime) / 15 * (0.0625))
    );
  }
}

function loadNameInputs() {
  for (let i = 1; i <= numberOfPlayers; i++) {
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.size = "9";
    inputElement.placeholder = "Player " + i;

    inputElement.required;
    inputElement.minlength = "0";
    inputElement.maxlength = "14";
    if (playerNamesArray[i - 1] != "" && playerNamesArray[i - 1] != undefined) {
      inputElement.value = playerNamesArray[i - 1];
    }
    nameInputContainer.appendChild(inputElement);
    //console.log("page03" + numberOfPlayers);
  }
}

//function saveNames(numberOfPlayers) {

//}

function reloadPreviewPlayerOrder() {
  previewCurrentPlayerA.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["a"] - 1];
  previewCurrentPlayerB.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["b"] - 1];
  previewCurrentPlayerC.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["c"] - 1];
  previewCurrentPlayerD.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"] - 1];
}

function loadFirstScreen() { 
  

  reloadPreviewPlayerOrder();
  // previewCurrentPlayerA.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["a"] - 1];
  // previewCurrentPlayerB.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["b"] - 1];
  // previewCurrentPlayerC.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["c"] - 1];
  // previewCurrentPlayerD.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"] - 1];

  currentPlayerA.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["a"] - 1];
  currentPlayerB.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["b"] - 1];
  currentPlayerC.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["c"] - 1];
  currentPlayerD.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"] - 1];

  nextPlayerA.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match]["a"] - 1];
  nextPlayerB.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match]["b"] - 1];
  nextPlayerC.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match]["c"] - 1];
  nextPlayerD.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match]["d"] - 1];
//spear ds poäng
  console.log("points" + matchOrders[numberOfPlayers][chosenMatchOrder][match -1][(matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"]).toString()]);
}
