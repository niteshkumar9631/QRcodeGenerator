const qrText = document.getElementById("qr-text");
const sizes = document.getElementById("sizes");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrContainer = document.querySelector(".qr-body");

let qr;

// Clear QR before generating new one
function clearQRCode() {
    qrContainer.innerHTML = "";
}

// Generate QR Code
function generateQRCode() {
    clearQRCode();
    const size = sizes.value;

    if (qrText.value.trim().length === 0) {
        alert("Please enter text or URL");
        return;
    }

    // Create new QR code
    qr = new QRCode(qrContainer, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
        render: "image"  // Ensures output is <img> for download
    });
}

// Download QR Code
downloadBtn.addEventListener("click", () => {
    const img = document.querySelector(".qr-body img");
    const canvas = document.querySelector(".qr-body canvas");

    if (img) {
        const imgAttr = img.getAttribute("src");
        downloadBtn.setAttribute("href", imgAttr);
        downloadBtn.setAttribute("download", "QR_Code.png");
    } else if (canvas) {
        const imgData = canvas.toDataURL("image/png");
        downloadBtn.setAttribute("href", imgData);
        downloadBtn.setAttribute("download", "QR_Code.png");
    } else {
        alert("Please generate a QR code first.");
    }
});

// Generate QR when clicking generate button
generateBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent page reload if <a href="">
    generateQRCode();
});
