/// <reference path="../datetime.js" />
import { formatTime } from "../datetime.js";

// TODO: Make sure the element class attributes in index.htm match these selectors.
const videoSection = document.querySelector(".video");
const video = videoSection.querySelector("video");
const controls = videoSection.querySelector(".video-controls");
const playButton = videoSection.querySelector(".video-play");
const pauseButton = videoSection.querySelector(".video-pause");
const time = videoSection.querySelector(".video-time");

function ready() {
    // TODO: display the video controls
    controls.style.display = "block";
};

function play() {
    // TODO: play the video
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
};

function pause() {
    // TODO: pause the video
    video.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "";
};

function updateTime() {
    // TODO: Set time.textContent using video.current time.
    //       Use the formatTime function to convert raw seconds into HH:MM:SS format.
    time.textContent = formatTime(video.currentTime);
};

pauseButton.style.display = "none";

// TODO: Add event listeners for:
//       video loaddata
video.addEventListener("loadeddata", ready, false);
//       video timeupdate
video.addEventListener("timeupdate", updateTime, false);
//       play click
//       pause click
playButton.addEventListener("click", play, false);
pauseButton.addEventListener("click", pause, false);
















































































































































































































