document
  .getElementById("qr-generate-btn")
  .addEventListener("click", function () {
    var qrTextin = document.getElementById("qr-input-text").value.trim();
    var colorDark = document.getElementById("qr-color-dark").value;
    var colorLight = document.getElementById("qr-color-light").value;
    var transparentBg = document.getElementById("qr-transparent-bg").checked;
    var qrtype = document.getElementById("qr-type").value;
    var qrText = "";

    var aler = document.getElementById("notification-bar");
    let info = document.querySelector(".notification-message");

    if (!qrTextin) {
      aler.style.display = "flex";
      info.innerHTML = "Enter something to generate QR...";
      window.onclick = function (event) {
        if (event.target == aler) {
          aler.style.display = "none";
        }
      };
      return;
    }

    // Handle QR content based on type
    if (qrtype === "upi") {
      if (!qrTextin.includes("@")) {
        aler.style.display = "flex";
        info.innerHTML = "Invalid UPI ID";
        window.onclick = function (event) {
          if (event.target == aler) {
            aler.style.display = "none";
          }
        };
        return;
      }
      qrText = "upi://pay?pa=" + qrTextin;
    } else if (qrtype === "email") {
      if (!qrTextin.includes("@") || !qrTextin.includes(".")) {
        aler.style.display = "flex";
        info.innerHTML = "Invalid Email Address";
        window.onclick = function (event) {
          if (event.target == aler) {
            aler.style.display = "none";
          }
        };
        return;
      }
      qrText = "mailto:" + qrTextin;
    } else if (qrtype === "phone") {
      let phonePattern = /^[0-9+\-\s()]+$/;
      if (!phonePattern.test(qrTextin)) {
        aler.style.display = "flex";
        info.innerHTML = "Invalid Phone Number";
        window.onclick = function (event) {
          if (event.target == aler) {
            aler.style.display = "none";
          }
        };
        return;
      }
      qrText = "tel:" + qrTextin;
    } else {
      qrText = qrTextin;
    }

    // Generate QR Code
    var qrCodeElement = document.getElementById("qr-output");
    qrCodeElement.innerHTML = "";
    var lightColor = transparentBg ? "rgba(0, 0, 0, 0)" : colorLight;

    var qr = new QRCode(qrCodeElement, {
      text: qrText,
      width: 256,
      height: 256,
      colorDark: colorDark,
      colorLight: lightColor,
      correctLevel: QRCode.CorrectLevel.H,
    });

    setTimeout(() => {
      var qrCanvas = qrCodeElement.querySelector("canvas");
      if (qrCanvas) {
        var padding = 20;
        var paddedCanvas = document.createElement("canvas");
        var context = paddedCanvas.getContext("2d");
        paddedCanvas.width = qrCanvas.width + 2 * padding;
        paddedCanvas.height = qrCanvas.height + 2 * padding;

        if (!transparentBg) {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
        } else {
          context.clearRect(0, 0, paddedCanvas.width, paddedCanvas.height);
        }

        context.drawImage(qrCanvas, padding, padding);

        var qrImage = paddedCanvas.toDataURL("image/png");
        var imgElement = document.createElement("img");
        imgElement.src = qrImage;
        imgElement.alt = "Generated QR Code";
        qrCodeElement.innerHTML = "";
        qrCodeElement.appendChild(imgElement);
        qrCodeElement.classList.add("show");

        var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        var filename = "qrcode_" + timestamp + ".png";
        var downloadLink = document.getElementById("qr-download-link");
        downloadLink.href = qrImage;
        downloadLink.download = filename;
        downloadLink.style.display = "block";
        downloadLink.classList.add("show");
      }
    }, 100);
  });
