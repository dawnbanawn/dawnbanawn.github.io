//Modul 4, Dan Heikenberg

//Antalet kort i spel.
let cards = 6;
//Array som ska innehålla o-shufflade siffer-par.
let cardArray = [];
//Array som ska innehålla siffer-paren, shufflade.
let shuffledArray = [];
//Int som ska hålla reda på hur många kort (i spel) som vänts upp (1-2 stycken).
let newTurnedCards = 0;
//Array som håller koll på vilka kort (i spel) som vänts upp.
let newTurnedCardsArray = [];

//For loop för att skapa en array av siffer-par.
for (let i = 1; i <= cards; i++) {
  cardArray[i - 1] = i;
  //Om i går att dela med 2 utan rest, så ska det värdet minskas med 1.
  //På så sätt blir det värdet lika stort som det förra elementet, och ett siffer-par blir skapat.
  if (i % 2 == 0) {
    cardArray[i - 1] = i - 1;
  }
}

//console.log(cardArray);

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

//console.log(shuffledArray);

//Returnerar rätt element.
const cardContainer = document.querySelector("#cardContainer");

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
    if (cardDiv.getAttribute('turned') == "false" && newTurnedCards < 2) {     
      //Kortet får attributet "true" till att det vänts. 
      cardDiv.setAttribute("turned", "true");
      //Ett kort till har vänts.
      newTurnedCards += 1;
      //Detta id har kortet som vänts.
      newTurnedCardsArray[newTurnedCards -1] = cardDiv.getAttribute('id');

      console.log("click", cardDiv.getAttribute('id'));      
      cardDiv.style.backgroundColor = "green";
      let p = document.createElement("p");
      p.innerHTML = shuffledArray[k];
      p.setAttribute("class", "cardP");
      
      cardDiv.appendChild(p);   

      //Kontrollerar om två kort (i spel) är vända, och vad som sker då.
      if (newTurnedCards == 2) {
          console.log("two cards picked");
          console.log(newTurnedCards);
          console.log(newTurnedCardsArray);
          console.log(shuffledArray[newTurnedCardsArray[0].charAt(3)], shuffledArray[newTurnedCardsArray[1].charAt(3)]);



      }

    }
  }),
  cardContainer.appendChild(cardDiv);

}

// class Card {
//   constructor(id, order, image, clicked, inGame) {
//     this.id = id;
//     this.order = order;
//     this.image = image;
//     this.clicked = clicked;
//     this.inGame = inGame;
//   }

//   cardDiv.addEventListener("click", () => {
//   })
// }

// let card = new Card();
