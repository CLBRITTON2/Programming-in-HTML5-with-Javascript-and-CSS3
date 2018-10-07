import { formatTime } from "../datetime.js"

const videoSection = document.querySelector(".video");
const video = videoSection.querySelector("video");
const controls = videoSection.querySelector(".video-controls");
const playButton = videoSection.querySelector(".video-play");
const pauseButton = videoSection.querySelector(".video-pause");
const time = videoSection.querySelector(".video-time");

function ready() {
    controls.style.display = "block";
};

function play() {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
};

function pause() {
    video.pause();
    playButton.style.display = "";
    pauseButton.style.display = "none";
};

function updateTime() {
    time.textContent = formatTime(video.currentTime);
};

pauseButton.style.display = "none";
video.addEventListener("loadeddata", ready, false);
video.addEventListener("timeupdate", updateTime, false);
playButton.addEventListener("click", play, false);
pauseButton.addEventListener("click", pause, false);















































































































































































































