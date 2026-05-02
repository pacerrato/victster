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
        window.location.replace(window.origin+"/pages/song.html?song="+decodedText);
    }
};

function scanBackPage() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const id = params.get('id')
    if (mode === 'normal') {
        window.location.href = "/pages/mode.html"
    } else {
            window.location.href = "/pages/category.html?mode=bingo&id="+id
    }
};