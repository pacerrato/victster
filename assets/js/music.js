function loadSong() {
    currentSong = "song" + window.location.search.match(/(?<=\?song\=)\d+/);
    document.getElementById("song-source").src = "../../media/audio/"+currentSong+".opus";
    document.getElementById("song").load();
}

function playButtonPushed() {
    var audio = document.getElementById("song");
    if (audio.paused) {
        audio.play();
        document.getElementById("play-button").innerHTML = "pause";
        document.getElementById("song-status").innerHTML = "¡Adivina la canción!"
    } else {
        audio.pause();
        document.getElementById("play-button").innerHTML = "play_arrow";
        document.getElementById("song-status").innerHTML = "Canción en pausa."
    }
}

function replayButtonPushed() {
    var audio = document.getElementById("song");
    if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
        document.getElementById("play-button").innerHTML = "pause";
    } else {
        audio.currentTime = 0;
    }
    document.getElementById("song-status").innerHTML = "¡Adivina la canción!"
}

function showSolution() {
    document.getElementById("sol-button").classList.add("hide");
    document.getElementById("music-panel").classList.add("hide");
    document.getElementById("song-info").classList.remove("hide");
    document.getElementById("scan-button").classList.remove("hide");
}

function scanNext() {
    var audio = document.getElementById("song");
    audio.pause();
    document.getElementById("song-source").src = ""
    audio.load();
}