var camsId = {};
function openSettings() {
    document.getElementById("settings-box").classList.remove("hide");
    document.getElementById("settings-box").classList.add("playAnim");
    loadCameras();
}
function closeSettings() {
    document.getElementById("settings-box").classList.remove("playAnim");
    setTimeout(document.getElementById("settings-box").classList.add("hide"),200)
}
function getCameraCookies() {
    var cookies = decodeURIComponent(document.cookie);
    return ""+cookies.match(/(?<=cameraName\=).+?(?=;|$)/);
}
function loadCameras() {
    select = document.getElementById("camera-select");
    select.innerHTML = "";
    savedCamera = getCameraCookies();
    Html5Qrcode.getCameras().then(cams => {
        camsId = {};
        isCamera = false;
        if (cams && cams.length) {
            for(var i = 0; i < cams.length; i++) {
                camsId[cams[i].label] = cams[i].id;
                var opt = document.createElement('option');
                camName = cams[i].label;
                opt.value = camName;
                opt.innerHTML = camName;
                if (camName === savedCamera) {
                    isCamera = true;
                    opt.selected = "selected";
                }
                select.appendChild(opt);
            }
            if (!savedCamera || !isCamera) {
                saveSettings();
            }
        }
    })
}
function saveSettings() {
    camName = document.querySelector('option:checked').value
    const d = new Date();
    d.setTime(d.getTime() + (3.14e11)); // Cookies expire in 1 year
    document.cookie = "cameraName="+camName+";expires="+ d.toUTCString();
    document.cookie = "cameraId="+camsId[camName]+";expires="+ d.toUTCString();
}

// const file = await fetch("config.json");
// config = await file.json();
// config.cam;
// config.