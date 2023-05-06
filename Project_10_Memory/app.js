//Modul 4, Dan Heikenberg

let cards = 6;
let cardArray = [];
let shuffledArray = [];

//For loop för att skapa en array av siffer-par.
for (let i = 1; i <= cards; i++) {
  cardArray[i - 1] = i;
  //Om i går att dela med 2 utan rest, så ska det värdet minskas med 1.
  //På så sätt blir det värdet lika stort som det förra elementet, oh ett siffer-par blir skapat.
  if (i % 2 == 0) {
    cardArray[i - 1] = i - 1;
  }
}

console.log(cardArray);

//En "negativt gående" for loop för att skapa en shufflad array av sifferpars-arrayen,
//för att den arrayen kommer att minskar efterhand som element tas från den arrayen till den nya shufflade arrayen..
for (let j = cards; j > 0; j--) {
  //Ett randomiserat nummer beroende på hur många element som finns kvar i siffer-pars-arrayen.
  let randomNumber = cardArray[Math.floor(Math.random() * (j - 1))];
  //Den nya snart shufflade arrayen, får värdet i det framslumpade array-elementet.
  shuffledArray[j - 1] = cardArray[randomNumber];
  //Original-arrayen med sifferpar blir nu av med elementet som precis tagits ifrån.
  cardArray.splice(randomNumber, 1);
  //Detta fungerade väl till jag fick en undefined, vilket skedde vid sista elementet.
  //Jag löste det genom en if-sats då undefined skedde.
  if (shuffledArray[j - 1] == undefined) {
    shuffledArray[j - 1] = cardArray[0];
  }
}

console.log(shuffledArray);

const cardContainer = document.querySelector("#cardContainer");


for (let k = 0; k < cards; k++) {
  let cardDiv = document.createElement("div");
  cardDiv.setAttribute("id", "div" + k.toString());
  cardDiv.setAttribute("class", "cardDiv");
  cardDiv.addEventListener("click", () => {
    let clicked = false;
    if (clicked == false) {
      console.log("click", cardDiv.getAttribute('id'));
      clicked = true;
      cardDiv.style.backgroundColor = "green";
      let p = document.createElement("p");
      p.innerHTML = shuffledArray[k];
  p.setAttribute("class", "cardP");
      
      cardDiv.appendChild(p);
      
      
     




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
