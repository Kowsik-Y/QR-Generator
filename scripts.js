document.getElementById('generate-btn').addEventListener('click', function () {
    var qrTextin = document.getElementById('text-input').value;
    var colorDark = document.getElementById('color-dark').value;
    var colorLight = document.getElementById('color-light').value;
    var transparentBg = document.getElementById('transparent-bg').checked;
    var upi =document.getElementById('UPI').checked;
    var qrText;
    var aler=document.getElementById('ale');
    let info = document.querySelector('.info');
    let ex = document.querySelector('.ex');
  
    if (qrTextin) {
        if (upi) {
            if (!qrTextin.includes('@')) {
                aler.style.display = "flex";
            ex.onclick = function() {
                aler.style.display = "none";
              }
            info.innerHTML  = '&#x274c; Please,Enter VALID UPI ID';
                window.onclick = function(event) {
                    if (event.target == aler) {
                      aler.style.display = "none";
                    }
                  }
                return;
            }else{
                qrText="upi://pay?pa="+qrTextin;
            }
        }else{
            qrText=qrTextin;
        }
        var qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; 
        var lightColor = transparentBg ? "rgba(0, 0, 0, 0)" : colorLight;
        var qr = new QRCode(qrCodeElement, {
            text: qrText,
            width: 256,
            height: 256,
            colorDark: colorDark,
            colorLight: lightColor,
            correctLevel: QRCode.CorrectLevel.H
        });
        setTimeout(() => {
            var qrCanvas = qrCodeElement.querySelector('canvas');
            if (qrCanvas) {
                var padding = 20;
                var paddedCanvas = document.createElement('canvas');
                var context = paddedCanvas.getContext('2d');
                paddedCanvas.width = qrCanvas.width + 2 * padding;
                paddedCanvas.height = qrCanvas.height + 2 * padding;
                if (!transparentBg) {
                    context.fillStyle = '#ffffff'; 
                    context.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
                } else {
                    context.clearRect(0, 0, paddedCanvas.width, paddedCanvas.height);
                }

                context.drawImage(qrCanvas, padding, padding);

                var qrImage = paddedCanvas.toDataURL("image/png");
                var imgElement = document.createElement('img');
                imgElement.src = qrImage;
                imgElement.alt = 'Generated QR Code';
                qrCodeElement.innerHTML = '';
                qrCodeElement.appendChild(imgElement);
                qrCodeElement.classList.add('show');

                var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
                var filename = "qrcode_" + timestamp + ".png";
                var downloadLink = document.getElementById('download-link');
                downloadLink.href = qrImage;
                downloadLink.download = filename;
                downloadLink.style.display = 'block'; 
                downloadLink.classList.add('show');
            }
        }, 100);
    } else {
        aler.style.display = "flex";
        ex.onclick = function() {
            aler.style.display = "none";
          }
        info.innerHTML  = '&#x274c; Please,enter some text or a URL!';
            window.onclick = function(event) {
                if (event.target == aler) {
                  aler.style.display = "none";

                }
              }
    }
    
    

});
function hep(){
    var aler=document.getElementById('ale');
    let info = document.querySelector('.info');
    let ex = document.querySelector('.ex');
    aler.style.display = "flex";
        ex.onclick = function() {
            aler.style.display = "none";
          }
        info.innerHTML  = '<a href="https://github.com/Kowsik-Y"  style=" text-decoration: none;"><i class="fa fa-github"> Github</i> </a><hr><a href="https://github.com/Kowsik-Y/QR-Generator-/issues/new/choose"  style=" text-decoration: none;"><i class="fa fa-caret-square-o-right">  Issues&Request</i> </a>';
            window.onclick = function(event) {
                if (event.target == aler) {
                  aler.style.display = "none";

                }
    }
}