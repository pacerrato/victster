function getCameraId() {
    const match = document.cookie.match(/(?:^|;\s*)cameraId=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}
function scanQr() {
    var html5Qrcode = new Html5Qrcode("qr-reader");
    var config = {fps: 10, qrbox: 700, aspectRatio: 9/16};
    var cameraId = getCameraId();
    html5Qrcode.start(cameraId, config, onScanSuccess);
    function onScanSuccess(decodedText) {
        decodedText = decodedText.trim();
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const mode = params.get("mode");
        const url = new URL(window.origin + "/pages/song.html");
        url.searchParams.set("song", decodedText);
        if (mode) url.searchParams.set("mode", mode);
        if (id) url.searchParams.set("id", id);
        window.location.replace(url);
    }
};


document.addEventListener("DOMContentLoaded", scanQr);