const buttonPage01 = document.querySelector("#button01");
const buttonPage02 = document.querySelector("#button02");
const buttonPage03 = document.querySelector("#button03");
const buttonPage03Back = document.querySelector("#button04");
const gameTimeField = document.querySelector("#gameTime");
let gameTime;
page02Container = document.querySelector("#page02Container");
page03Container = document.querySelector("#page03Container");
mainContainer = document.querySelector("#mainContainer");
const nameInputContainer = document.querySelector("#nameInputContainer");
const playerNumberDropdown = document.querySelector("#numberOfPlayersDropDown");
let numberOfPlayers;
let playerNamesArray = [];

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
    inputElement.maxlength = "10";
    if (playerNamesArray[i - 1] != "" && playerNamesArray[i - 1] != undefined ) {
      inputElement.value = playerNamesArray[i - 1];
    }
    nameInputContainer.appendChild(inputElement);
    //console.log("page03" + numberOfPlayers);
  }
}


//function saveNames(numberOfPlayers) {

//}
