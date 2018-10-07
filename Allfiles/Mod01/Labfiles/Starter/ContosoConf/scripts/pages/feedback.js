/// <reference path="../_namespace.js" />
/// <reference path="../StarRatingView.js" />

(function () {

    const section = document.getElementById("feedback");
    const form = section.querySelector("form");
    const sent = document.getElementById("feedback-sent");

    const formSubmitting = function (event) {
        event.preventDefault();
        form.classList.add("sending");
    };

    const animationEnded = function () {
        section.style.display = "none";
        sent.style.display = "block";
    };

    form.addEventListener("submit", formSubmitting, false);
    form.addEventListener("msAnimationEnd", animationEnded, false);
    form.addEventListener("webkitAnimationEnd", animationEnded, false);
    form.addEventListener("animationEnd", animationEnded, false);

    const StarRatingView = conference.StarRatingView;

    const questions = form.querySelectorAll(".feedback-question");
    for (let i = 0; i < questions.length; i++) {
        StarRatingView.create(questions[i]);
    }

} ());















































































































































































































