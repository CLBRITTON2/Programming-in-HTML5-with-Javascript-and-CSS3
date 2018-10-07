/// <reference path="../_namespace.js" />
/// <reference path="../datetime.js" />

(function () {

    const formatTime = conference.formatTime;
    

    const videoSection = document.querySelector(".video");
    const video = videoSection.querySelector("video");
    const controls = videoSection.querySelector(".video-controls");
    const playButton = videoSection.querySelector(".video-play");
    const pauseButton = videoSection.querySelector(".video-pause");
    const time = videoSection.querySelector(".video-time");

    const ready = function () {
        controls.style.display = "block";
    };

    const play = function () {
        video.play();
        playButton.style.display = "none";
        pauseButton.style.display = "";
    };

    const pause = function () {
        video.pause();
        playButton.style.display = "";
        pauseButton.style.display = "none";
    };

    const updateTime = function () {
        time.textContent = formatTime(video.currentTime);
    };

    pauseButton.style.display = "none";

    video.addEventListener("loadeddata", ready, false);
    video.addEventListener("timeupdate", updateTime, false);
    playButton.addEventListener("click", play, false);
    pauseButton.addEventListener("click", pause, false);

} ());















































































































































































































