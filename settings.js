var camsProperties = [];
function openSettings() {
    document.getElementById("settings-box").classList.remove("hide");
    document.getElementById("settings-box").classList.add("playAnim");
    loadCameras();
}
function closeSettings() {
    document.getElementById("settings-box").classList.remove("playAnim");
    setTimeout(document.getElementById("settings-box").classList.add("hide"),200)
}
function getCurrentCamera() {
    return "";
}
function loadCameras() {
    select = document.getElementById("camera-select");
    select.innerHTML = "";
    currentCamera = getCurrentCamera();
    Html5Qrcode.getCameras().then(cams => {
        camsProperties = [];
        if (cams && cams.length) {
            for(var i = 0; i < cams.length; i++) {
                camsProperties.push([cams[i].label, cams[i].id]);
                var opt = document.createElement('option');
                camName = cams[i].label;
                opt.value = camName;
                opt.innerHTML = camName;
                if (camName === currentCamera) {
                    opt.selected = "selected"
                }
                select.appendChild(opt);
            }
            if (!currentCamera) {
                saveSettings();
            }
        }
    })
}
function saveSettings() {
    //camName = document.querySelector('option:checked').value
    // Write camera name and id to file
}

// const file = await fetch("config.json");
// config = await file.json();
// config.cam;
// config.