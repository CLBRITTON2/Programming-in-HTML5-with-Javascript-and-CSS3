import { distanceInMiles } from "../geometry.js";

const conferenceLocation = {
    latitude: 47.6097,  // decimal degrees
    longitude: 122.3331 // decimal degrees
};

const maximumDistanceInMilesFromConferenceToShowVenue = 10;

const distanceElement = document.getElementById("distance");
const travelSection = document.querySelector("section.travel");
const venueSection = document.querySelector("section.venue");

function distanceFromConference(coords) {
    return Math.floor(conference.geometry.distanceInMiles(coords, conferenceLocation));
};

function showDistanceMessage(distance) {
    const message = "You are " + distance + " miles from the conference";
    distanceElement.textContent = message;
};

function moveVenueSectionToTop() {
    travelSection.parentNode.insertBefore(venueSection, travelSection);
};

function updateUIForPosition(position) {
    // TODO: Calculate the distance from the conference
    // const distance = ... ;

    showDistanceMessage(distance);
    const isNearToConference = distance < maximumDistanceInMilesFromConferenceToShowVenue;
    if (isNearToConference) {
        moveVenueSectionToTop();
    }
};

function error() {
    distanceElement.textContent = "Could not detect your current location.";
};

    // TODO: Get current position from the geolocation API.
    //       Call updateUIForPosition for success and error for failure.
















































































































































































































