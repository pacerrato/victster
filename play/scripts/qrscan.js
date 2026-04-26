// function scanQr() {
//     var config = {
//         fps: 10,
//         qrbox: 700,
//         aspectRatio: 9/16 
//     }
//     var html5QrcodeScanner = new Html5QrcodeScanner(
//         "qr-reader", config);
//     function onScanSuccess(decodedText, decodedResult) {
//         window.location.replace(window.origin+"/play/normal/song.html?song="+decodedText);
//     }
//     html5QrcodeScanner.render(onScanSuccess);
// };
function getCameraId() {
    // Read from file
    return "5368fae4b4b41c8fe44e57deef8196e765a796f496de59fd28188d7b1f16eb8a";
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