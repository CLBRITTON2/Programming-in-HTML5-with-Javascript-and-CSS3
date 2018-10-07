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

function grayscalePixel(pixels, index) {
    /// <summary>Updates the pixel, starting at the given index, to be gray scale.</summary>

    const brightness = 0.34 * pixels[index] + 0.5 * pixels[index + 1] + 0.16 * pixels[index + 2];

    pixels[index] = brightness; // red
    pixels[index + 1] = brightness; // green
    pixels[index + 2] = brightness; // blue
};

export function grayscaleImage(image) {
    // Converts a colour image into gray scale.

    // Return a new promise.
    return new Promise(function (resolve, reject) {
        
        const canvas = createCanvas(image);
        const context = canvas.getContext("2d");
        const imageData = getImageData(context, image);

        // TODO: Create a Worker that runs /scripts/grayscale-worker.js

        const pixels = imageData.data;
        // 4 array items per pixel => Red, Green, Blue, Alpha
        for (let i = 0; i < pixels.length; i += 4) {
            grayscalePixel(pixels, i);
        }

        // Update the canvas with the gray scaled image data.
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(imageData, 0, 0);

        // Returning a Promise makes this function easy to chain together with other deferred operations.
        // The canvas object is returned as this can be used like an image.
        resolve([canvas]);
    });
};
















































































































































































































