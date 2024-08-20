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
                var qrImage = qrCanvas.toDataURL("image/png");
                var downloadLink = document.getElementById('download-link');
                downloadLink.href = qrImage;
                downloadLink.download = "qrcode.png"; // Ensure correct filename
                downloadLink.style.display = 'block'; // Show the download link
            }
        }, 100); // Small delay to ensure QR code is generated
    } else {
        alert("Please enter some text or a URL!");
    }
});