/// <reference path="_namespace.js" />

(function () {

    const createCanvas = function (size) {
        /// <summary>Creates a canvas used for image manipulation.</summary>

        const temporaryCanvas = document.createElement("canvas");
        temporaryCanvas.setAttribute("width", size.width);
        temporaryCanvas.setAttribute("height", size.height);
        return temporaryCanvas;
    };

    const getImageData = function (context, image) {
        /// <summary>Draws the image onto the canvas context, then returns the resulting image data.</summary>

        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
    };

    conference.grayscaleImage = function (image) {
        /// <summary>Converts a colour image into grey scale.</summary>
        const deferred = $.Deferred();

        const canvas = createCanvas(image);
        const context = canvas.getContext("2d");
        const imageData = getImageData(context, image);

        const handleMessage = function (event) {
            const message = event.data;
            
            if (message.progress) {
                deferred.notifyWith(this, [message.progress]);

            } else if (message.done) {
                // Update the canvas with the gray scaled image data.
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.putImageData(message.done, 0, 0);
                deferred.resolveWith(this, [canvas]);
            }
        };

        const worker = new Worker("/scripts/grayscale-worker.js");
        worker.addEventListener("message", handleMessage.bind(this));
        worker.postMessage(imageData);

        // Returning a jQuery Deferred makes this function easy to chain together with other deferred operations.
        return deferred;
    };

} ());















































































































































































































