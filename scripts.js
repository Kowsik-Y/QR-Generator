document.getElementById('generate-btn').addEventListener('click', function() {
    var qrText = document.getElementById('text-input').value;
    if (qrText) {
        var qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; // Clear previous QR code

        var qr = new QRCode(qrCodeElement, {
            text: qrText,
            width: 256,
            height: 256
        });

        // Timeout to ensure the QR code is generated before creating the download link
        setTimeout(() => {
            var qrCanvas = qrCodeElement.querySelector('canvas');
            if (qrCanvas) {
                var downloadLink = document.getElementById('download-link');
                var qrImage = qrCanvas.toDataURL("image/png");
                downloadLink.href = qrImage;
                downloadLink.style.display = 'inline-block'; // Show the download link
            }
        }, 500); // Adjust timeout as necessary for your use case
    } else {
        alert("Please enter some text or a URL!");
    }
});