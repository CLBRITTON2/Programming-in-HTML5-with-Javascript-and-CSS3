/// <reference path="../_namespace.js" />
/// <reference path="../Object.inherit.js" />
/// <reference path="../HtmlTemplate.js" />
/// <reference path="../LocalStarStorage.js" />
/// <reference path="../datetime.js" />

(function () {

    // Import objects/functions from the conference namespace.
    const HtmlTemplate = conference.HtmlTemplate;
    const LocalStarStorage = conference.LocalStarStorage;
    const parseTimeAsTotalMinutes = conference.parseTimeAsTotalMinutes;


    const ScheduleItem = Object.inherit({

        initialize: function (data, localStarStorage) {
            this.id = data.id;
            this.tracks = data.tracks;
            this.localStarStorage = localStarStorage;

            this.element = this.scheduleItemTemplate.createElement(data);

            if (localStarStorage.isStarred(this.id)) {
                this.element.classList.add(this.starredClass);
            }

            this.initializeElementClass();
            this.initializeElementPosition(data.start, data.end);
            this.addStarClickEventHandler();
        },

        scheduleItemTemplate: HtmlTemplate.create("schedule-item"),

        initializeElementClass: function () {
            if (this.isInTrack(1) && this.isInTrack(2)) {
                this.element.classList.add("both-tracks");
            } else if (this.isInTrack(1)) {
                this.element.classList.add("track-1");
            } else if (this.isInTrack(2)) {
                this.element.classList.add("track-2");
            }
        },

        initializeElementPosition: function (start, end) {
            const startTimeInMinutes = parseTimeAsTotalMinutes(start);
            const endTimeInMinutes = parseTimeAsTotalMinutes(end);
            const pixelsPerMinute = 2;
            const conferenceStartTimeInMinutes = 8 * 60 + 30;
            this.element.style.top = pixelsPerMinute * (startTimeInMinutes - conferenceStartTimeInMinutes) + "px";
            this.element.style.height = pixelsPerMinute * (endTimeInMinutes - startTimeInMinutes) + "px";
        },

        addStarClickEventHandler: function () {
            const starElement = this.element.querySelector(".star");
            starElement.addEventListener("click", this.toggleStar.bind(this), false);
        },

        isInTrack: function (track) {
            return this.tracks.indexOf(track) >= 0;
        },

        starredClass: "starred",

        toggleStar: function () {
            if (this.isStarred()) {
                this.unsetStar();
            } else {
                this.setStar();
            }
        },

        isStarred: function () {
            return this.element.classList.contains(this.starredClass);
        },

        unsetStar: function () {
            this.element.classList.remove(this.starredClass);
            this.postStarChange(false);
            this.localStarStorage.removeStar(this.id);
        },

        setStar: function () {
            this.element.classList.add(this.starredClass);
            this.postStarChange(true);
            this.localStarStorage.addStar(this.id);
        },

        postStarChange: function (isStarred) {
            const request = $.ajax({
                type: "POST",
                url: "/schedule/star/" + this.id,
                data: { starred: isStarred },
                context: this
            });
            request.done(function (responseData) {
                this.updateStarCount(responseData.starCount);
            });
        },

        updateStarCount: function (starCount) {
            const starCountElement = this.element.querySelector(".star-count");
            starCountElement.textContent = starCount.toString();
        },

        show: function () {
            this.element.style.display = "block";
        },

        hide: function () {
            this.element.style.display = "none";
        }
    });


    const ScheduleList = Object.inherit({
        initialize: function (listElement, localStarStorage) {
            this.element = listElement;
            this.localStarStorage = localStarStorage;
            this.items = [];
        },

        startDownload: function () {
            const request = $.ajax({
                url: "/schedule/list",
                context: this
            });
            request.done(this.downloadDone)
                   .fail(this.downloadFailed);
        },

        downloadDone: function (responseData) {
            this.addAll(responseData.schedule);
        },

        downloadFailed: function () {
            alert("Could not retrieve schedule data at this time. Please try again later.");
        },

        addAll: function (itemsArray) {
            itemsArray.forEach(this.add, this);
        },

        add: function (itemData) {
            const item = ScheduleItem.create(itemData, this.localStarStorage);
            this.items.push(item); // Store item object in our array
            this.element.appendChild(item.element); // Also add the item element to the UI.
        }
    });


    const Page = Object.inherit({
        initialize: function () {
            const scheduleListElement = document.getElementById("schedule");
            this.scheduleList = ScheduleList.create(
                scheduleListElement,
                LocalStarStorage.create(localStorage)
            );
            this.scheduleList.startDownload();
        }
    });


    Page.create();

} ());















































































































































































































