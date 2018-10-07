/// <reference path="_namespace.js" />
/// <reference path="geometry.js" />

(function () {

    const conferenceLocation = {
        latitude: 47.6097,  // decimal degrees
        longitude: 122.3331 // decimal degrees
    };

    const maximumDistanceInMilesFromConferenceToShowVenue = 10;

    const distanceElement = document.getElementById("distance");
    const travelSection = document.querySelector("section.travel");
    const venueSection = document.querySelector("section.venue");

    const distanceFromConference = function (coords) {
        return Math.floor(conference.geometry.distanceInMiles(coords, conferenceLocation));
    };

    const showDistanceMessage = function (distance) {
        const message = "You are " + distance + " miles from the conference";
        distanceElement.textContent = message;
    };

    const moveVenueSectionToTop = function () {
        travelSection.parentNode.insertBefore(venueSection, travelSection);
    };

    const updateUIForPosition = function (position) {
        const distance = distanceFromConference(position.coords);
        showDistanceMessage(distance);
        const isNearToConference = distance < maximumDistanceInMilesFromConferenceToShowVenue;
        if (isNearToConference) {
            moveVenueSectionToTop();
        }
    };

    const error = function () {
        distanceElement.textContent = "Could not detect your current location.";
    };

    navigator.geolocation.getCurrentPosition(updateUIForPosition, error);

} ());















































































































































































































