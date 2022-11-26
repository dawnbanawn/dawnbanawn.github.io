//Original music player audio list array (it will be overwritten).
let audioList = [
  {
    title:"",
    album:"",
    author:"Benjamin Tissot",
    source:"https://www.bensound.com/bensound-music/bensound-evolution.mp3",
    type:"audio/mpeg"
    //https://www.bensound.com/bensound-img/epic.jpg
  },
  {
    title:"Epic",
    album:"Bensound",
    author:"Benjamin Tissot",
    source:"https://www.bensound.com/bensound-music/bensound-epic.mp3",
    type:"audio/mpeg"
  }
];

document.getElementById("bird").value = "";

let birdLoaded = false; //If a bird has been found, and is fetched.
let birdName = ""; //The user input search string.
let birdArrayEntry = 0; //What array entry recording is loaded (0-99).

let finalBirdEngName = "";
let finalBirdGenName = "";
let finalBirdCountryName = "";
let finalBirdSoundLink = "";

let bar = document.getElementById("bar");
let currentTime = document.getElementById("current-time");
let currentAudio;
let player = document.getElementById("player");
let play = document.getElementById("play");
let barPosition = player.offsetLeft;
let overlay = document.getElementById("overlay");
let mute = document.getElementById("mute");
let playing;
let musicInfo = document.getElementById("music-info");
let musicInfoChilds = [...musicInfo.children];

let button = document.getElementById("button");
let forward = document.getElementById("forward");
let backward = document.getElementById("backward");
let random = document.getElementById("random");
let muted = false;

let numOfRecordings = 0;

//Listens to search button, and catches input value.
button.addEventListener("click", function(e){
  e.preventDefault()
  birdArrayEntry = 0; //When searching, the first recording will be loaded.
  birdName = document.getElementById("bird").value;
  document.getElementById("infoText").innerHTML = "Please wait 1-5 seconds ...";

  //Api for recorded bird sounds.
  const soundUrl = "https://xeno-canto.org/api/2/recordings?query=" + birdName;
  fetch(soundUrl)
  .then(response => response.json())
  .then(data => { 
    if (data.recordings[0] !== undefined) { //Kollar om objectet (staden) finns, och gör val därefter.

      finalBirdEngName = data.recordings[0].en;
      finalBirdGenName = data.recordings[0].gen;
      //finalBirdCountryName = data.recordings[0].cnt; (Country), not used at the moment.
      finalBirdSoundLink = data.recordings[0].file;

      document.getElementById("bird").value = "";
      document.getElementById("infoText").innerHTML = "Image result when searching for: " + birdName + ".";

      numOfRecordings = data.recordings.length; //Checks number of found bird recordings.
      //Fills the array with all search results.
      for (let i = 0; i < numOfRecordings; i++){
        audioList[i] = {title: data.recordings[i].en,
          album: data.recordings[i].gen,
          source: data.recordings[i].file,
          image: ""}; //For later adding of unsplash link results.
      }

//Fetch from Unsplash api.
const unsplashUrl = "https://api.unsplash.com/search/photos?query=" + birdName + "&client_id=G0mr-66Lw3xTWMv-JJSLTRpxFAG7vASteAdWyLx0x4Q";

fetch(unsplashUrl)
.then(response => response.json())
.then(data => { 
  if (data === undefined) {
    
  } else {
    for (let i = 0; i < numOfRecordings; i++){
      audioList[i].image = data.results[0].links.download;
    }
  document.getElementById('music-info').style.backgroundImage = 'url(' + audioList[0].image + ')';
  loadAudio(birdArrayEntry); //Loads (first) bird object.
  birdLoaded = true;
  document.getElementById('play').style.color = '#ddd';
  document.getElementById('mute').style.color = '#ddd';
  document.getElementById('forward').style.color = '#ddd';
  document.getElementById('backward').style.color = '#ddd';
  document.getElementById('random').style.color = '#ddd';
  }
})

    } else {
      document.getElementById("bird").value = "";
      document.getElementById("infoText").innerHTML = "No bird found, please try again."
      birdLoaded = false;
      document.getElementById('play').style.color = '#333';
      document.getElementById('mute').style.color = '#333';
      document.getElementById('forward').style.color = '#333';
      document.getElementById('backward').style.color = '#333';
      document.getElementById('random').style.color = '#333';
      document.getElementById('music-info').style.backgroundImage = 'url()';
      musicInfoChilds[0].innerHTML = "Name: ";
      musicInfoChilds[2].innerHTML = "Genus: ";
    }
  })
});

  function loadAudio(audio){
    audio = audio || 0;
    if(currentAudio){
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    musicInfoChilds[0].innerHTML = "Name: " + audioList[audio].title;
    musicInfoChilds[2].innerHTML = "Genus: " + audioList[audio].album;
    currentAudio = new Audio(audioList[audio].source);
  }
  
  function pixelPerSecond(){
    return Number(window.getComputedStyle(bar).getPropertyValue("width").replace("px", "")) / currentAudio.duration;
  }
  
  function currentTimeUpdate(){
    if(!window.grabbing){
      currentTime.style.width = (currentAudio.currentTime * pixelPerSecond()) + "px";
    }
  }
  
  function currentGrabTimeUpdate(event){
    let eventPageX = event.pageX || event.touches[0].pageX;
    
    if((eventPageX - barPosition) > Number(window.getComputedStyle(bar).getPropertyValue("width").replace("px",""))){
      currentTime.style.width = window.getComputedStyle(bar).getPropertyValue("width");
    }else if((eventPageX - barPosition) < 0){
      currentTime.style.width = 0;
    }else{
      currentTime.style.width = (eventPageX - barPosition) + "px";
    }
  }
  
  function barStart(event){
    if(event.target == bar){
      let eventPageX = event.pageX || event.touches[0].pageX;
      window.grabbing = true;
      
      currentTime.style.width = (eventPageX - barPosition) + "px";
      overlay.style.display = "block";
      
      if(event.type == 'touchstart'){
        window.addEventListener("touchmove", currentGrabTimeUpdate);
      }else{
        window.addEventListener("mousemove", currentGrabTimeUpdate);
      }
      currentAudio.muted = true;
    }
  }
  
  function barEnd(event){
    if(window.grabbing === true){
      window.grabbing = false;
      currentAudio.muted = false;
      currentAudio.currentTime = Number(currentTime.style.width.replace("px","")) / pixelPerSecond();
      overlay.style.display = "none";      
      if(event.type == 'touchstart'){
        window.removeEventListener("touchmove", currentGrabTimeUpdate);
      }else{
        window.removeEventListener("mousemove", currentGrabTimeUpdate);
      }
    }
  }
  
  play.addEventListener("click", function(){
    if(currentAudio.paused){
      if (birdLoaded === true){        
        play.innerHTML = '<i class="fas fa-pause"></i>';
        currentAudio.play();
      }

    }else{
      play.innerHTML = '<i class="fas fa-play"></i>';
      currentAudio.pause();
    }
  });
  
  mute.addEventListener("click", function(){
    if(!currentAudio.muted){
      this.innerHTML = '<i class="fas fa-volume-mute"></i>';
      currentAudio.muted = true;
    }else{
      this.innerHTML = '<i class="fas fa-volume-up"></i>';
      currentAudio.muted = false;
    }
  })
  
  window.addEventListener("mousedown", barStart);
  window.addEventListener("mouseup", barEnd);  
  window.addEventListener("touchstart", barStart);
  window.addEventListener("touchend", barEnd);
  
  (function load(){
    playing = setInterval(currentTimeUpdate, 1);
    loadAudio()
  })();
  
  currentAudio.addEventListener("ended", function(){
    play.innerHTML = '<i class="fas fa-play"></i>';
  });

  forward.addEventListener("click", function(){  
      if (birdLoaded === true){
        if (birdArrayEntry < 100){
          muted = currentAudio.muted;
          currentAudio.pause();
          birdArrayEntry += 1;
          loadAudio(birdArrayEntry);
          forward.innerHTML = '<i class="fas fa-forward"></i>';
          if (muted === true) {
            currentAudio.play();           
            currentAudio.muted = true;
          } else {
            currentAudio.play();
          }
          play.innerHTML = '<i class="fas fa-pause"></i>';
          document.getElementById("infoText").innerHTML = "Recording number: " + (birdArrayEntry + 1).toString();
        }
      }    
  });

  backward.addEventListener("click", function(){      
      if (birdLoaded === true){
        if (birdArrayEntry > 0){
          muted = currentAudio.muted;
          currentAudio.pause();
          birdArrayEntry -= 1;
          loadAudio(birdArrayEntry);
          backward.innerHTML = '<i class="fas fa-backward"></i>';
          if (muted === true) {
            currentAudio.play();           
            currentAudio.muted = true;
          } else {
            currentAudio.play();
          }
          currentAudio.play();
          play.innerHTML = '<i class="fas fa-pause"></i>';
          document.getElementById("infoText").innerHTML = "Recording number: " + (birdArrayEntry + 1).toString();
        }
      }    
  });

  random.addEventListener("click", function(){      
      if (birdLoaded === true){
        muted = currentAudio.muted;
          currentAudio.pause();
          birdArrayEntry = Math.floor(Math.random() * 100);
          loadAudio(birdArrayEntry);
          random.innerHTML = '<i class="fas fa-random"></i>';

          if (muted === true) {
            currentAudio.play();           
            currentAudio.muted = true;
          } else {
            currentAudio.play(); 
          }
          
          currentAudio.play();
          play.innerHTML = '<i class="fas fa-pause"></i>';
          document.getElementById("infoText").innerHTML = "Recording number: " + (birdArrayEntry + 1).toString();
      }    
  });