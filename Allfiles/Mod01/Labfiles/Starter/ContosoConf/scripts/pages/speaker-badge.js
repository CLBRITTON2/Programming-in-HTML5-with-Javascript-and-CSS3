/// <reference path="../_namespace.js" />
/// <reference path="../greyscale.js" />

(function () {

    const grayscaleImage = conference.grayscaleImage;


    const speakerBadgePage = {
        
        initialize: function (element) {
            this.canvas = element.querySelector("canvas");
            this.busyElement = element.querySelector(".busy");
            this.progress = element.querySelector("progress");
            
            this.speakerId = this.canvas.getAttribute("data-speaker-id");
            this.speakerName = this.canvas.getAttribute("data-speaker-name");
            this.canvas.addEventListener("dragover", this.handleDragOver.bind(this));
            this.canvas.addEventListener("drop", this.handleDrop.bind(this));
            
            this.drawBadge();
        },

        handleDragOver: function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy'; // Makes the browser display a "copy" cursor.
        },

        handleDrop: function (event) {
            event.stopPropagation();
            event.preventDefault();

            const files = event.dataTransfer.files;
            if (files.length == 0) return;

            // More than one file could have been dropped, we'll just use the first.
            const file = files[0];
            if (this.isImageType(file.type)) {
                this.busy();
                this.readFile(file)
                    .pipe(this.loadImage)
                    .pipe(grayscaleImage)
                    .progress(this.updateProgress)
                    .done(this.drawBadge, this.notBusy);
            } else {
                alert("Please drop an image file.");
            }
        },

        drawBadge: function (image) {
            this.context = this.canvas.getContext("2d");
            this.drawBackground();
            this.drawTopText();
            this.drawSpeakerName();
            if (image) {
                this.drawSpeakerImage(image);
            } else {
                this.drawImagePlaceholder();
            }
            this.drawBarCode(this.speakerId);
        },

        drawBackground: function () {
            this.context.fillStyle = "white";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        },

        drawSpeakerImage: function (image) {
            const size = Math.min(image.width, image.height);
            const sourceX = image.width / 2 - size / 2;
            const sourceY = image.height / 2 - size / 2;
            this.context.drawImage(image, sourceX, sourceY, size, size, 20, 20, 160, 160);
        },

        drawImagePlaceholder: function () {
            this.context.strokeStyle = "2px #888";
            this.context.strokeRect(20, 20, 160, 160);
            this.context.font = "12px sans-serif";
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";
            this.context.fillStyle = "black";
            this.context.fillText("Drag your profile photo here", 100, 100);
        },

        drawTopText: function () {
            this.context.font = "20px sans-serif";
            this.context.fillStyle = "black";
            this.context.textBaseline = "top";
            this.context.textAlign = "left";
            this.context.fillText("ContosoConf 2013 Speaker:", 200, 20);
        },

        drawSpeakerName: function () {
            this.context.font = "40px sans-serif";
            this.context.fillStyle = "black";
            this.context.textBaseline = "top";
            this.context.textAlign = "left";
            this.context.fillText(this.speakerName, 200, 60);
        },

        drawBarCode: function (text) {
            text = "*" + text + "*"; // Wrap in "*" deliminators.
            const encodings = {
                "0": "bwbWBwBwb",
                "1": "BwbWbwbwB",
                "2": "bwBWbwbwB",
                "3": "BwBWbwbwb",
                "4": "bwbWBwbwB",
                "5": "BwbWBwbwb",
                "6": "bwBWBwbwb",
                "7": "bwbWbwBwB",
                "8": "BwbWbwBwb",
                "9": "bwBWbwBwb",
                "*": "bWbwBwBwb"
            };
            let x = 200, y = 140, height = 40, thick = 6, thin = 2;
            for (let charIndex = 0; charIndex < text.length; charIndex++) {
                const code = encodings[text[charIndex]];
                for (let stripeIndex = 0; stripeIndex < code.length; stripeIndex++) {
                    if (stripeIndex % 2 === 0) {
                        this.context.fillStyle = "black";
                    } else {
                        this.context.fillStyle = "white";
                    }
                    const isWideStripe = code.charCodeAt(stripeIndex) < 91;
                    if (isWideStripe) {
                        this.context.fillRect(x, y, thick, height);
                        x += thick;
                    } else {
                        this.context.fillRect(x, y, thin, height);
                        x += thin;
                    }
                }

                if (charIndex < text.length - 1) {
                    // Space between each
                    this.context.fillStyle = "white";
                    this.context.fillRect(x, y, thin, height);
                    x += thin;
                }
            }
        },

        isImageType: function (type) {
            const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
            return imageTypes.indexOf(type) === 0;
        },

        readFile: function (file) {
            const reading = $.Deferred();
            const reader = new FileReader();
            const self = this;
            reader.onload = function (loadEvent) {
                const fileDataUrl = loadEvent.target.result;
                reading.resolveWith(self, [fileDataUrl]);
            };
            reader.readAsDataURL(file);
            return reading;
        },

        loadImage: function (imageUrl) {
            const loading = $.Deferred();
            const image = new Image();
            const self = this;
            image.onload = function () {
                loading.resolveWith(self, [image]);
            };
            image.src = imageUrl; // This starts the image loading
            return loading;
        },

        updateProgress: function (progress) {
            this.progress.value = progress;
        },

        busy: function () {
            this.busyElement.style.display = "block";
        },

        notBusy: function () {
            this.busyElement.style.display = "none";
        }
    };

    const badgeElement = document.querySelector(".badge");
    speakerBadgePage.initialize(badgeElement);

} ());















































































































































































































