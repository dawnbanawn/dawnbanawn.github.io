document.body.addEventListener(
  "touchmove",
  function (event) {
    console.log(event.source);
    event.preventDefault();
  },
  false
);

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

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

const minusButton01 = document.querySelector("#minusButton01");
const plusButton01 = document.querySelector("#plusButton01");
const minusButton02 = document.querySelector("#minusButton02");
const plusButton02 = document.querySelector("#plusButton02");
const points = document.querySelector("#points");
const points2 = document.querySelector("#points2");

const page04PreviousMatch = document.querySelector("#page04PreviousMatch");

const previousMatchDiv = document.querySelector("#previousMatchDiv");
previousMatchDiv.style.display = "none";

const timeLeftSpan = document.querySelector("#timeLeftSpan");
const timeLeftSpanText = document.querySelector("#timeLeftSpanText");

const currentMatchId = document.querySelector("#currentMatchId");
let gameOn = true;
var c = 10;
let colorGreen = "rgb(0, 211, 0)";
let page04Points = 0;
let page04Points02 = 0;
let currentMatch = 1;
let gameTime;
let numberOfPlayers;
let playerNamesArray = [];
let timePerGame; //gametime divided by matches.
//What the random match order is.
let chosenMatchOrder;
//which players meet which. Setup version.
let matchOrders = {
  //6 players, setup version 1-3.
  6: {
    1: [
      {
        //1
        a: 3,
        b: 4,
        c: 1,
        d: 2,
        3: 0,
        4: 0,
        1: 0,
        2: 0,
      },
      {
        //2
        a: 1,
        b: 5,
        c: 6,
        d: 3,
        1: 0,
        5: 0,
        6: 0,
        3: 0,
      },
      {
        //3
        a: 2,
        b: 5,
        c: 4,
        d: 6,
        2: 0,
        5: 0,
        4: 0,
        6: 0,
      },
      {
        //4
        a: 1,
        b: 6,
        c: 2,
        d: 3,
        1: 0,
        6: 0,
        2: 0,
        3: 0,
      },
      {
        //5
        a: 1,
        b: 4,
        c: 5,
        d: 3,
        1: 0,
        4: 0,
        5: 0,
        3: 0,
      },
      {
        //6
        a: 6,
        b: 3,
        c: 2,
        d: 4,
        6: 0,
        3: 0,
        2: 0,
        4: 0,
      },
      {
        //7
        a: 5,
        b: 6,
        c: 1,
        d: 2,
        5: 0,
        6: 0,
        1: 0,
        2: 0,
      },
      {
        //8
        a: 2,
        b: 3,
        c: 5,
        d: 4,
        2: 0,
        3: 0,
        5: 0,
        4: 0,
      },
      {
        //9
        a: 1,
        b: 3,
        c: 4,
        d: 6,
        1: 0,
        3: 0,
        4: 0,
        6: 0,
      },
      {
        //10
        a: 4,
        b: 2,
        c: 1,
        d: 5,
        4: 0,
        2: 0,
        1: 0,
        5: 0,
      },
      {
        //11
        a: 2,
        b: 6,
        c: 5,
        d: 3,
        2: 0,
        6: 0,
        5: 0,
        3: 0,
      },
      {
        //12
        a: 2,
        b: 6,
        c: 1,
        d: 4,
        2: 0,
        6: 0,
        1: 0,
        4: 0,
      },
      {
        //13
        a: 6,
        b: 5,
        c: 3,
        d: 4,
        6: 0,
        5: 0,
        3: 0,
        4: 0,
      },
      {
        //14
        a: 1,
        b: 3,
        c: 2,
        d: 5,
        1: 0,
        3: 0,
        2: 0,
        5: 0,
      },
      {
        //15
        a: 4,
        b: 5,
        c: 1,
        d: 6,
        4: 0,
        5: 0,
        1: 0,
        6: 0,
      },
    ],
    2: [
      {
        //15
        a: 4,
        b: 5,
        c: 1,
        d: 6,
        4: 0,
        5: 0,
        1: 0,
        6: 0,
      },
      {
        //14
        a: 1,
        b: 3,
        c: 2,
        d: 5,
        1: 0,
        3: 0,
        2: 0,
        5: 0,
      },
      {
        //13
        a: 6,
        b: 5,
        c: 3,
        d: 4,
        6: 0,
        5: 0,
        3: 0,
        4: 0,
      },
      {
        //12
        a: 2,
        b: 6,
        c: 1,
        d: 4,
        2: 0,
        6: 0,
        1: 0,
        4: 0,
      },
      {
        //11
        a: 2,
        b: 6,
        c: 5,
        d: 3,
        2: 0,
        6: 0,
        5: 0,
        3: 0,
      },
      {
        //10
        a: 4,
        b: 2,
        c: 1,
        d: 5,
        4: 0,
        2: 0,
        1: 0,
        5: 0,
      },
      {
        //9
        a: 1,
        b: 3,
        c: 4,
        d: 6,
        1: 0,
        3: 0,
        4: 0,
        6: 0,
      },
      {
        //8
        a: 2,
        b: 3,
        c: 5,
        d: 4,
        2: 0,
        3: 0,
        5: 0,
        4: 0,
      },
      {
        //7
        a: 5,
        b: 6,
        c: 1,
        d: 2,
        5: 0,
        6: 0,
        1: 0,
        2: 0,
      },
      {
        //6
        a: 6,
        b: 3,
        c: 2,
        d: 4,
        6: 0,
        3: 0,
        2: 0,
        4: 0,
      },
      {
        //5
        a: 1,
        b: 4,
        c: 5,
        d: 3,
        1: 0,
        4: 0,
        5: 0,
        3: 0,
      },
      {
        //4
        a: 1,
        b: 6,
        c: 2,
        d: 3,
        1: 0,
        6: 0,
        2: 0,
        3: 0,
      },
      {
        //3
        a: 2,
        b: 5,
        c: 4,
        d: 6,
        2: 0,
        5: 0,
        4: 0,
        6: 0,
      },
      {
        //2
        a: 1,
        b: 5,
        c: 6,
        d: 3,
        1: 0,
        5: 0,
        6: 0,
        3: 0,
      },
      {
        //1
        a: 3,
        b: 4,
        c: 1,
        d: 2,
        3: 0,
        4: 0,
        1: 0,
        2: 0,
      },
    ],
    3: [
      {
        //2
        a: 1,
        b: 5,
        c: 6,
        d: 3,
        1: 0,
        5: 0,
        6: 0,
        3: 0,
      },
      {
        //3
        a: 2,
        b: 5,
        c: 4,
        d: 6,
        2: 0,
        5: 0,
        4: 0,
        6: 0,
      },
      {
        //4
        a: 1,
        b: 6,
        c: 2,
        d: 3,
        1: 0,
        6: 0,
        2: 0,
        3: 0,
      },
      {
        //5
        a: 1,
        b: 4,
        c: 5,
        d: 3,
        1: 0,
        4: 0,
        5: 0,
        3: 0,
      },
      {
        //6
        a: 6,
        b: 3,
        c: 2,
        d: 4,
        6: 0,
        3: 0,
        2: 0,
        4: 0,
      },
      {
        //7
        a: 5,
        b: 6,
        c: 1,
        d: 2,
        5: 0,
        6: 0,
        1: 0,
        2: 0,
      },
      {
        //8
        a: 2,
        b: 3,
        c: 5,
        d: 4,
        2: 0,
        3: 0,
        5: 0,
        4: 0,
      },
      {
        //9
        a: 1,
        b: 3,
        c: 4,
        d: 6,
        1: 0,
        3: 0,
        4: 0,
        6: 0,
      },
      {
        //10
        a: 4,
        b: 2,
        c: 1,
        d: 5,
        4: 0,
        2: 0,
        1: 0,
        5: 0,
      },
      {
        //11
        a: 2,
        b: 6,
        c: 5,
        d: 3,
        2: 0,
        6: 0,
        5: 0,
        3: 0,
      },
      {
        //12
        a: 2,
        b: 6,
        c: 1,
        d: 4,
        2: 0,
        6: 0,
        1: 0,
        4: 0,
      },
      {
        //13
        a: 6,
        b: 5,
        c: 3,
        d: 4,
        6: 0,
        5: 0,
        3: 0,
        4: 0,
      },
      {
        //14
        a: 1,
        b: 3,
        c: 2,
        d: 5,
        1: 0,
        3: 0,
        2: 0,
        5: 0,
      },
      {
        //15
        a: 4,
        b: 5,
        c: 1,
        d: 6,
        4: 0,
        5: 0,
        1: 0,
        6: 0,
      },
      {
        //1
        a: 3,
        b: 4,
        c: 1,
        d: 2,
        3: 0,
        4: 0,
        1: 0,
        2: 0,
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
    } else if (chosenMatchOrder == 2) {
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
  if (numberOfPlayers == 6) {
    //randomizer for 6 players! Make new ones for different player numbers.

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
  //openFullscreen(); //For fullscreen.
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
  } else if (parseInt(gameTime) < 4 || parseInt(gameTime) > 120) {
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
    let page03MatchTime = document.querySelector("#page03MatchTime");
    page03MatchTime.innerHTML = calculateMatchTime("matchTime00:00");

    page03PlayerNumberSpan.innerHTML = numberOfPlayers;

    page02Container.style.display = "none";
    page03Container.style.display = "block";
    loadNameInputs();
  }
});

function calculateMatchTime(message) {
  if (message == "matchTime" && numberOfPlayers == 6) {
    return parseInt(gameTime) / 15 - (parseInt(gameTime) / 15) * 0.0625;
  } else if (message == "breakTime" && numberOfPlayers == 6) {
    return (parseInt(gameTime) / 15) * 0.0625;
  } else if (message == "matchTime00:00" && numberOfPlayers == 6) {
    let tempTime = parseInt(gameTime) / 15 - (parseInt(gameTime) / 15) * 0.0625;
    let totalSeconds = Math.floor(tempTime * 60);
    var seconds = totalSeconds % 60; // Seconds that cannot be written in minutes
    var secondsInMinutes = (totalSeconds - seconds) / 60; // Gives the seconds that COULD be given in minutes
    var minutes = secondsInMinutes % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  } else if (message == "timeInSeconds" && numberOfPlayers == 6) {
    return Math.floor(
      (parseInt(gameTime) / 15 - (parseInt(gameTime) / 15) * 0.0625) * 60
    );
  } else if (message == "breakInSeconds" && numberOfPlayers == 6) {
    return Math.floor((parseInt(gameTime) / 15) * 0.0625 * 60);
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
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["a"] - 1
    ];
  previewCurrentPlayerB.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["b"] - 1
    ];
  previewCurrentPlayerC.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["c"] - 1
    ];
  previewCurrentPlayerD.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["d"] - 1
    ];
}

function loadFirstScreen() {
  if (numberOfPlayers == 6) {
    currentMatchId.innerHTML = "Match: " + currentMatch + "/15";
  }
  console.log(
    Math.floor(
      (parseInt(gameTime) / 15 - (parseInt(gameTime) / 15) * 0.0625) * 60
    )
  );
  timeLeftSpan.innerHTML = calculateMatchTime("matchTime00:00");

  reloadPreviewPlayerOrder();

  timeLeftSpan.style.color = "yellow";
  timeLeftSpanText.style.color = "yellow";
  // previewCurrentPlayerA.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["a"] - 1];
  // previewCurrentPlayerB.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["b"] - 1];
  // previewCurrentPlayerC.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["c"] - 1];
  // previewCurrentPlayerD.innerHTML =
  // playerNamesArray[matchOrders[numberOfPlayers][chosenMatchOrder][match -1]["d"] - 1];

  currentPlayerA.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["a"] - 1
    ];
  currentPlayerB.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["b"] - 1
    ];
  currentPlayerC.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["c"] - 1
    ];
  currentPlayerD.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["d"] - 1
    ];

  nextPlayerA.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["a"] - 1
    ];
  nextPlayerB.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["b"] - 1
    ];
  nextPlayerC.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["c"] - 1
    ];
  nextPlayerD.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["d"] - 1
    ];
  //spear ds poäng
  console.log(
    "points" +
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1][
        matchOrders[numberOfPlayers][chosenMatchOrder][match - 1][
          "d"
        ].toString()
      ]
  );
}
//Buttons for changing points on page 4.
minusButton01.addEventListener("click", () => {
  if (page04Points > 0) {
    page04Points--;
    points.value = page04Points;
  }
});
minusButton02.addEventListener("click", () => {
  if (page04Points02 > 0) {
    page04Points02--;
    points2.value = page04Points02;
  }
});
plusButton01.addEventListener("click", () => {
  page04Points++;
  points.value = page04Points;
});
plusButton02.addEventListener("click", () => {
  page04Points02++;
  points2.value = page04Points02;
});

//Timer
let seconds = calculateMatchTime("matchTime") * 60;
var myTimer;
let pause = false;
let initializeClock = false;
pauseButton.addEventListener("click", () => {
  if (pauseButton.innerHTML == "Start") {
    if (gameOn == true) {
      if (c > 3) {
        timeLeftSpan.style.color = colorGreen;
        timeLeftSpanText.style.color = colorGreen;
      } else {
        timeLeftSpan.style.color = "yellow";
        timeLeftSpanText.style.color = "yellow";
      }
    } else {
      timeLeftSpan.style.color = "red";
      timeLeftSpanText.style.color = "red";
    }

    pauseButton.innerHTML = "Pause";
    pause = false;
    if (initializeClock == false) {
      initializeClock = true;
      clock();
    }
  } else {
    timeLeftSpan.style.color = "yellow";
    timeLeftSpanText.style.color = "yellow";
    pauseButton.innerHTML = "Start";
    pause = true;
  }
});
function clock() {
  myTimer = setInterval(myClock, 1000);
  if (numberOfPlayers == 6) {
    var totalGameTime = calculateMatchTime("timeInSeconds") * 15;
  }
  c = calculateMatchTime("timeInSeconds"); //Initially set to 1 hour
  function myClock() {
    if (pause == false) {
      --c;
      --totalGameTime;
    }

    var seconds = c % 60; // Seconds that cannot be written in minutes
    var secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
    var minutes = secondsInMinutes % 60; // Minutes that cannot be written in hours
    //var hours = (secondsInMinutes - minutes) / 60;
    // Now in hours, minutes and seconds, you have the time you need.
    //console.clear();

    //console.log((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
    timeLeftSpan.innerHTML =
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);
    console.log(timeLeftSpan.innerHTML);
    if (gameOn == true) {
      if (c == 3) {
        timeLeftSpan.style.color = "yellow";
        timeLeftSpanText.style.color = "yellow";
        //play sound.
      }
      if (c == 2) {
        //play sound.
      }
      if (c == 1) {
        //play sound.
      }
      if (c == 0) {
        //play sound.
        // if (numberOfPlayers == 6 && currentMatch == 15) {
        //   gameOn == false
        // } else {
        timeLeftSpan.style.color = "red";
        timeLeftSpanText.style.color = "red";

        c = calculateMatchTime("breakInSeconds");

        gameOn = false;
        timeLeftSpanText.innerHTML = "Break: ";
        var seconds = c % 60; // Seconds that cannot be written in minutes
        var secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
        var minutes = secondsInMinutes % 60; //
        timeLeftSpan.innerHTML =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);
        //
        //           }
      }
    }
    if (gameOn == false) {
      if (c == 3) {
        timeLeftSpan.style.color = "yellow";
        timeLeftSpanText.style.color = "yellow";

        //play sound.
      }
      if (c == 2) {
        //play sound.
      }
      if (c == 1) {
        //play sound.
      }
      if (c == 0) {
        //play sound.
        timeLeftSpan.style.color = colorGreen;
        timeLeftSpanText.style.color = colorGreen;

        c = calculateMatchTime("timeInSeconds");

        gameOn = true;
        timeLeftSpanText.innerHTML = "Time left: ";
        var seconds = c % 60; // Seconds that cannot be written in minutes
        var secondsInMinutes = (c - seconds) / 60; // Gives the seconds that COULD be given in minutes
        var minutes = secondsInMinutes % 60; //
        timeLeftSpan.innerHTML =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);

        currentMatch++;

        reloadMainMatchPage();

        if (numberOfPlayers == 6) {
          currentMatchId.innerHTML = "Match: " + currentMatch + "/15";
        }
        if (currentMatch == 16) {
          //Game ended.
          clearInterval(myTimer);
          currentMatchId.innerHTML = "Match: " + (currentMatch - 1) + "/15";
          timeLeftSpanText.innerHTML = "Time´s Out!";
          timeLeftSpan.innerHTML = "";

          console.log("end game");
        }
        //PointsDiv
        previousMatchDiv.style.display = "block";
        page04PreviousMatch.innerHTML = currentMatch - 1;
      }
    }
  }
}

function reloadMainMatchPage() {
  
  currentPlayerA.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["a"] - 1
    ];
  currentPlayerB.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["b"] - 1
    ];
  currentPlayerC.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["c"] - 1
    ];
  currentPlayerD.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match - 1]["d"] - 1
    ];

  nextPlayerA.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["a"] - 1
    ];
  nextPlayerB.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["b"] - 1
    ];
  nextPlayerC.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["c"] - 1
    ];
  nextPlayerD.innerHTML =
    playerNamesArray[
      matchOrders[numberOfPlayers][chosenMatchOrder][match]["d"] - 1
    ];
}
