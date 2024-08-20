document.getElementById('generate-btn').addEventListener('click', function() {
    var qrText = document.getElementById('text-input').value;
    if (qrText) {
        var qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; // Clear previous QR code

        // Generate QR code
        var qr = new QRCode(qrCodeElement, {
            text: qrText,
            width: 256,
            height: 256
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

                // Draw white background
                context.fillStyle = '#fff';
                context.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

                // Draw QR code onto new canvas with padding
                context.drawImage(qrCanvas, padding, padding);

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