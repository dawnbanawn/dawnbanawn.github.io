const buttonPage01 = document.querySelector("#button01");
const buttonPage02 = document.querySelector("#button02");
const buttonPage03 = document.querySelector("#button03");
const buttonPage03Back = document.querySelector("#button04");
const button04back = document.querySelector("#button04back");
const button04next = document.querySelector("#button04next");
const pauseButton = document.querySelector("#pauseButton");
const resultButton = document.querySelector("#resultButton");
const gameTimeField = document.querySelector("#gameTime");

let gameTime;
let numberOfPlayers;
let playerNamesArray = [];
let timePerGame; //gametime divided by matches.
//What the random match order is.
let chosenMatchOrder;
//which players meet which.
let matchOrders = {
  //6 players, setup version 1.
  "6": {
    "1": [
      {
        "a": 3,
        "b": 4,
        "c": 1,
        "d": 2,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0

      },
      {
        1: 0,
        5: 0,
        6: 0,
        3: 0,
      },
    ],
  },
};

page02Container = document.querySelector("#page02Container");
page03Container = document.querySelector("#page03Container");
mainContainer = document.querySelector("#mainContainer");
const nameInputContainer = document.querySelector("#nameInputContainer");
const playerNumberDropdown = document.querySelector("#numberOfPlayersDropDown");

button04next.addEventListener("click", () => {
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
  page04Container.style.display = "none";
  page05Container.style.display = "block";
  chosenMatchOrder = 1; //This will randomize later.
  console.log(playerNamesArray);
  loadFirstScreen();
});
button04back.addEventListener("click", () => {
  page04Container.style.display = "none";
  page03Container.style.display = "block";
});
buttonPage03.addEventListener("click", () => {
  page03Container.style.display = "none";
  page04Container.style.display = "block";
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
  } else if (parseInt(gameTime) < 10 || parseInt(gameTime) > 1000) {
    alert("Please have a game time between 10 and 1000 min.");
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

    page03PlayerNumberSpan.innerHTML = numberOfPlayers;

    page02Container.style.display = "none";
    page03Container.style.display = "block";
    loadNameInputs();
  }
});

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

function loadFirstScreen() {
  match = 1;
  currentPlayerA = document.querySelector("#currentPlayerA");
  currentPlayerB = document.querySelector("#currentPlayerB");
  currentPlayerC = document.querySelector("#currentPlayerC");
  currentPlayerD = document.querySelector("#currentPlayerD");
  currentPlayerA.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["a"] - 1];
  currentPlayerB.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["b"] - 1];
  currentPlayerC.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["c"] - 1];
  currentPlayerD.innerHTML =
  playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"] - 1];
//spear ds poäng
  console.log(matchOrders[numberOfPlayers][chosenMatchOrder][match -1][(matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"]).toString()]);
}
