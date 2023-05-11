const buttonPage02 = document.querySelector("#button02");
const gameTimeField = document.querySelector("#gameTime");
let gameTime;

const playerNumberDropdown = document.querySelector("#numberOfPlayersDropDown");
let numberOfPlayers;

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
    console.log("page03" + numberOfPlayers);
  }
});
