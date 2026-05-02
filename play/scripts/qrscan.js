function getCameraId() {
    var cookies = decodeURIComponent(document.cookie);
    return ""+cookies.match(/(?<=cameraId\=).+?(?=;|$)/);
}
function scanQr() {
    var html5Qrcode = new Html5Qrcode("qr-reader");
    var config = {fps: 10, qrbox: 700, aspectRatio: 9/16};
    var cameraId = getCameraId();
    html5Qrcode.start(cameraId, config, onScanSuccess);
    function onScanSuccess(decodedText, decodedResult) {
        window.location.replace(window.origin+"/play/normal/song.html?song="+decodedText);
    }
};