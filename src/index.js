import { AUDIOS } from "/src/audios.js";
const playElement = document.querySelector("#playPauseToggle");
const prevElement = document.querySelector("#prev");
const nextElement = document.querySelector("#next");
const volumeElement = document.querySelector("#volume");
document.addEventListener("DOMContentLoaded", () => {
ui()
})
let currentPosition = 0;

let audio = new Audio(AUDIOS[currentPosition].src);
audio.volume = volumeElement.value;
const playAudio = () => {
 
  if (audio.paused || audio.ended) {
    document.querySelector('.player__state').innerHTML = `<p>playing</p>`;
    document.querySelector('#btnPause').classList.remove('fa-play');
    document.querySelector('#btnPause').classList.add('fa-pause');
    
    ui()
    audio.play();
    
} else {
    volume();
    document.querySelector('.player__state').innerHTML = `<p>Paused</p>`;
   
    document.querySelector('#btnPause').classList.add('fa-play');
    document.querySelector('#btnPause').classList.remove('fa-pause');
    audio.pause();
   
  
  }
};

const prevSong = () => {
    if(currentPosition !== 0){
        currentPosition--;
        audio.pause();
        audio = new Audio(AUDIOS[currentPosition].src);
        volume();
        playAudio();
        ui()
        
    }else{
        currentPosition = AUDIOS.length-1;
        audio.pause();
        audio = new Audio(AUDIOS[currentPosition].src);
        volume();
        ui()
        playAudio();
    }
    
    
};
const nextSong = () => {
    if(currentPosition !== AUDIOS.length-1){
        currentPosition++;
        audio.pause();
        audio = new Audio(AUDIOS[currentPosition].src);
        volume();
        ui()
        playAudio();
    }else{
        currentPosition = 0;
        audio.pause();
        audio = new Audio(AUDIOS[currentPosition].src);
        volume();
        ui()
        playAudio();
    }
};

const volume = () => {
    let vol = volumeElement.value;
    audio.volume = vol;
};

const ui = () => {
    const { nameSong, author,srcImg } = AUDIOS[currentPosition];
    document.querySelector(".title__song").textContent = nameSong;
    document.querySelector(".title__author").textContent = author;
    document.querySelector('#imgSong').src = srcImg;
    setInterval(() => {
        audio.currentTime > 0 ? (document.querySelector('#duration').textContent = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}`) : (document.querySelector('#duration').textContent = `0:0`);
    },1000)
}

audio.addEventListener("ended", () => {
  currentPosition++;
  audio = new Audio(AUDIOS[currentPosition].src);
  volume();
  playAudio();
});
playElement.addEventListener("click", playAudio);
prevElement.addEventListener("click", prevSong);
nextElement.addEventListener("click", nextSong);
volumeElement.addEventListener("change", volume);
