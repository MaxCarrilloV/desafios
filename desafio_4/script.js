const url = document.querySelector("#qr");
const button = document.querySelector("#generate");
const inputContainer = document.querySelector(".input-container");
const main = document.querySelector(".main");
const buttons = document.querySelector("#buttons");
const download = document.querySelector("#download");
const share = document.querySelector("#share");
let qrCode;
button.addEventListener("click", (e) => {
  e.preventDefault();
  function isURL(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }
  if (isURL(url.value)) {
    qrCode = new QRCode(document.querySelector("#qrcode"), {
      text: url.value,
      width: 180,
      height: 180,
    });
    inputContainer.style.display = "none";
    const qr = document.querySelector("#qrcode");
    main.style.justifyContent = "start";
    qr.style.display = "block";
    qr.parentElement.style.display = "flex";
    buttons.style.display = "flex";
  }
});

download.addEventListener("click", (e) => {
  const qrCodeImg = document.querySelector("#qrcode img");
  if (qrCodeImg) {
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrCodeImg.src;
    link.click();
  }
});

share.addEventListener('click', async e => {
  const qrCodeImg = document.querySelector('#qrcode img');
  if (qrCodeImg) {
    const response = await fetch(qrCodeImg.src);
    const blob = await response.blob();
    const clipboardItem = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([clipboardItem]);
    alert('QR copiado al portapapeles.');
  }
})