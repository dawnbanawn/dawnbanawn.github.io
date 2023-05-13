//Modul 4, Dan Heikenberg

//Antalet kort i spel.
let cards;
//Array som ska innehålla o-shufflade siffer-par.
let cardArray = [];
//Array som ska innehålla siffer-paren, shufflade.
let shuffledArray = [];
//Int som ska hålla reda på hur många kort (i spel) som vänts upp (1-2 stycken).
let newTurnedCards = 0;
//Array som håller koll på vilka kort (i spel) som vänts upp.
let newTurnedCardsArray = [];
//Rätt element hämtas.
let startButton = document.querySelector("#startButton");
let cardInput = document.querySelector("#cards");
let playerInput = document.querySelector("#players");
//Kort-input får start-värde.
cardInput.value = 4;
//Spelare-input får start-värde.
playerInput.value = 1;
//Returnerar rätt element.
const cardContainer = document.querySelector("#cardContainer");
const whoseTurnP = document.querySelector("#whoseTurnP");
const whoseTurnSpan = document.querySelector("#whoseTurnSpan");



//Eventlyssnare till start-knappen.
startButton.addEventListener("click", () => {
  //If sats som kontrollerar antalet valda kort. Jag valde bara 4-20.
  if (cardInput.value < 4 || cardInput.value > 20) {
    alert("Please have 4-20 cards.");
    //Om det är godkänt, så är här nästa kontroll, om det är ett jämnt antal kort.

  } else if (cardInput.value % 2 != 0) {
    alert("Please use an even number of cards.");
    //Om inte, så minskas antalet med 1, så att 7 t.ex. blir 6 kort.
    cardInput.value -= 1;
    //Om det är godkänt, så är här nästa kontroll, av spelarantal.

  } else if (playerInput.value < 1 || playerInput.value > 4) {
    alert("Please have 1-4 players.");
  } else { //Allt är godkänt.
    //Variabler blir av med sina eventuella värden / får sina startvärden.
    cardArray = [];
    shuffledArray = [];
    newTurnedCards = 0;
    newTurnedCardsArray = [];
    whoseTurnSpan.innerHTML = "1";
    //P-elementet som visar vems tur det är, syns nu.
    whoseTurnP.style.display = "block";
    //Antalet kort som ska spelas, hämtas från DOM-input-värdet.
    cards = cardInput.value;
    //While loop som tar bort eventuella kort från DOM, före nya skapas.
    while (cardContainer.lastElementChild) {
      cardContainer.removeChild(cardContainer.lastElementChild);
    }
    //Funktion kallas, som ska shuffla arrayen.
    createCardArray();
    //For loop som loopar max-antalet spelare och letar upp motvarande P element som ges en styling så att de inte syns.
    for (let i = 0; i < 4; i++) {
      let playerP = document.querySelector("#player" + (i + 1).toString());
      playerP.style.display = "none";
    }
    //For loop som loopar antalet valda spelare och letar upp motvarande P element som ges en styling så att de nu syns.
    for (let i = 0; i < playerInput.value; i++) {
      let playerP = document.querySelector("#player" + (i + 1).toString());
      playerP.style.display = "block";
    }
  }
});

function createCardArray() {
  //For loop för att skapa en array av siffer-par.
  for (let i = 1; i <= cards; i++) {
    cardArray[i - 1] = i;
    //Om i går att dela med 2 utan rest, så ska det värdet minskas med 1.
    //På så sätt blir det värdet lika stort som det förra elementet, och ett siffer-par blir skapat.
    if (i % 2 == 0) {
      cardArray[i - 1] = i - 1;
    }
  }
  //Kallar funktion.
  shuffleCardArray();
}

function shuffleCardArray() {
  //En "negativt gående" for loop för att skapa en shufflad array av sifferpars-arrayen,
  //detta för att sifferpars-arrayen kommer att minska efterhand som element tas från den till den nya shufflade arrayen.
  for (let j = cards; j > 0; j--) {
    //Ett randomiserat (shufflat) nummer beroende på hur många element som finns kvar i siffer-pars-arrayen.
    let randomNumber = cardArray[Math.floor(Math.random() * (j - 1))];
    //Den nya snart shufflade arrayen, får värdet i det framslumpade sifferpar-array-elementet.
    shuffledArray[j - 1] = cardArray[randomNumber];
    //Original-arrayen med sifferpar blir nu av med elementet som precis tagits ifrån, så att detta inte kan råka framslumpas igen i nästa loop.
    cardArray.splice(randomNumber, 1);
    //Detta fungerade väl till jag fick en undefined, detta sker vid sista elementet.
    //Jag löste det genom en if-sats som fångar undefined och ger elementet dess rätta värde.
    if (shuffledArray[j - 1] == undefined) {
      shuffledArray[j - 1] = cardArray[0];
    }
  }
  distributeCardArray();
  console.log(cards, shuffledArray);
}

function distributeCardArray() {
  //En for loop som skapar korten.
  for (let k = 0; k < cards; k++) {
    let cardDiv = document.createElement("div");
    //korten får id för att hålla isär dem.
    cardDiv.setAttribute("id", "div" + k.toString());
    //Korten får en klass för att kunna styla dem.
    cardDiv.setAttribute("class", "cardDiv");
    //Korten får attribut som liknar boolean, men som inte är det egentligen.
    cardDiv.setAttribute("turned", "false");
    //Var kort som skapas, får här en eventlyssnare som lyssnar efter klick.
    cardDiv.addEventListener("click", () => {
      //Kontrollerar så att kortet (i spel) inte redan är vänt, och att 2 kort (i spel) inte redan är vända.
      if (cardDiv.getAttribute("turned") == "false" && newTurnedCards < 2) {
        //Kortet får attributet "true" till att det vänts.
        cardDiv.setAttribute("turned", "true");
        //Ett kort till har vänts.
        newTurnedCards += 1;
        //Detta id har kortet som vänts, vilket sparas i en array.
        newTurnedCardsArray[newTurnedCards - 1] = cardDiv.getAttribute("id");

        //Det vända kortet får färgen grön.
        cardDiv.style.backgroundColor = "green";
        //Ett p-element skapas.
        let p = document.createElement("p");
        //p får kortets siffra.
        p.innerHTML = shuffledArray[k];
        //p får även en klass för styling.
        p.setAttribute("class", "cardP");
        //p appendas till parent-elementet.
        cardDiv.appendChild(p);

        //If-sats som kontrollerar om två kort (i spel) är vända, och vad som sker då.
        if (newTurnedCards == 2) {
          console.log("two cards picked");
          console.log(newTurnedCards);
          console.log(newTurnedCardsArray);
          console.log(
            shuffledArray[newTurnedCardsArray[0].charAt(3)],
            shuffledArray[newTurnedCardsArray[1].charAt(3)]
          );

          //window.setTimeout-kod tagen ifrån https://www.w3schools.com/js/js_timing.asp
          window.setTimeout(wait, 2000);
        }
      }
    }),
      cardContainer.appendChild(cardDiv);
  }
}

function wait() {
  console.log("eee");
}
