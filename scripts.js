document.getElementById('generate-btn').addEventListener('click', function() {
    var qrText = document.getElementById('text-input').value;
    var colorDark = document.getElementById('color-dark').value;
    var colorLight = document.getElementById('color-light').value;
    var transparentBg = document.getElementById('transparent-bg').checked;

    if (qrText) {
        var qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; // Clear previous QR code

        // Generate QR code
        var qr = new QRCode(qrCodeElement, {
            text: qrText,
            width: 256,
            height: 256,
            colorDark: colorDark,
            colorLight: colorLight,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Wait for QR code to be generated and available in the DOM
        setTimeout(() => {
            var qrCanvas = qrCodeElement.querySelector('canvas');
            if (qrCanvas) {
                // Create a new canvas with padding
                var padding = 20; // Padding in pixels
                var paddedCanvas = document.createElement('canvas');
                var context = paddedCanvas.getContext('2d');

                // Set dimensions for the new canvas
                paddedCanvas.width = qrCanvas.width + 2 * padding;
                paddedCanvas.height = qrCanvas.height + 2 * padding;

                // Handle transparent background
                if (transparentBg) {
                    context.clearRect(0, 0, paddedCanvas.width, paddedCanvas.height); // Transparent background
                } else {
                    context.fillStyle = '#ffffff'; // White background
                    context.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
                }

                // Draw QR code onto new canvas with padding
                context.drawImage(qrCanvas, padding, padding);

                // Handle light color transparency
                if (transparentBg) {
                    var imgData = context.getImageData(0, 0, paddedCanvas.width, paddedCanvas.height);
                    var data = imgData.data;

                    // Set light color to transparent
                    for (var i = 0; i < data.length; i += 4) {
                        if (data[i] === parseInt(colorLight.substr(1, 2), 16) &&
                            data[i + 1] === parseInt(colorLight.substr(3, 2), 16) &&
                            data[i + 2] === parseInt(colorLight.substr(5, 2), 16)) {
                            data[i + 3] = 0; // Set alpha to 0 for light color
                        }
                    }

                    context.putImageData(imgData, 0, 0);
                }

                // Convert padded canvas to image data
                var qrImage = paddedCanvas.toDataURL("image/png");

                // Create an <img> element to display the QR code
                var imgElement = document.createElement('img');
                imgElement.src = qrImage;
                imgElement.alt = 'Generated QR Code';

                // Clear the QR code container and append the image
                qrCodeElement.innerHTML = '';
                qrCodeElement.appendChild(imgElement);

                // Generate a unique filename
                var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
                var filename = "qrcode_" + timestamp + ".png";

                // Set up download link
                var downloadLink = document.getElementById('download-link');
                downloadLink.href = qrImage;
                downloadLink.download = filename;
                downloadLink.style.display = 'block'; // Show the download link
            }
        }, 100); // Small delay to ensure QR code is generated
    } else {
        alert("Please enter some text or a URL!");
    }
});