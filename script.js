const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;

// Prevent link default behavior
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleGenerate();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    if (qrText.value.trim().length > 0) {
        generateQRCode();
    }
});

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const img = document.querySelector('.qr-body img');
    if (img) {
        downloadBtn.setAttribute("href", img.src);
    } else {
        const canvas = document.querySelector('.qr-body canvas');
        if (canvas) {
            const imgData = canvas.toDataURL("image/png");
            downloadBtn.setAttribute("href", imgData);
        } else {
            alert("Please generate a QR Code first.");
        }
    }
});

function handleGenerate() {
    const text = qrText.value.trim();
    if (text.length > 0) {
        generateQRCode();
    } else {
        alert("Please enter some text or a URL to generate the QR Code.");
    }
}

function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear previous QR code
    new QRCode(qrContainer, {
        text: qrText.value.trim(),
        width: parseInt(size),
        height: parseInt(size),
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}
