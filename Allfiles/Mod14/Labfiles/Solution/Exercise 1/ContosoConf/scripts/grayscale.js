import { grayscalePixel } from "./grayscale-worker.js";
function createCanvas(size) {
    /// <summary>Creates a canvas used for image manipulation.</summary>

    const temporaryCanvas = document.createElement("canvas");
    temporaryCanvas.setAttribute("width", size.width);
    temporaryCanvas.setAttribute("height", size.height);
    return temporaryCanvas;
};

function getImageData(context, image) {
    /// <summary>Draws the image onto the canvas context, then returns the resulting image data.</summary>

    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
};



export function grayscaleImage(image) {
    // Converts a colour image into gray scale.

    // Return a new promise.
    return new Promise(function (resolve, reject) {   
        const canvas = createCanvas(image);
        const context = canvas.getContext("2d");
        const imageData = getImageData(context, image);

        // TODO: Create a Worker that runs /scripts/grayscale-worker.js
        const worker = new Worker("/scripts/grayscale-worker.js");
        const handleMessage = function (event) {
            // Update the canvas with the gray scaled image data.
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.putImageData(imageData, 0, 0);

            // Returning a Promise makes this function easy to chain together with other deferred operations.
            // The canvas object is returned as this can be used like an image.
            resolve([canvas]);
        };
        worker.addEventListener("message", handleMessage.bind(this));
        worker.postMessage(imageData);

       
    });
};















































































































































































































