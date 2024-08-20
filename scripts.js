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
    } else {
        alert("Please enter some text or a URL!");
    }
});
