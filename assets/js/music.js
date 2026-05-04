document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("play-pause")
        .addEventListener("click", playButtonPushed);

    document
        .querySelector(".replay-button")
        .addEventListener("click", replayButtonPushed);

    document
        .getElementById("sol-button")
        .addEventListener("click", showSolution);

    loadSong();
    playButtonPushed()
});

function loadSong() {
    const params = new URLSearchParams(window.location.search);
    const song = params.get('song');
    const id = params.get('id');
    updateText(id);

    document.getElementById("song-source").src = "../assets/media/audio/song"+song+".opus";
    document.getElementById("song").load();
}

function updateText(id) {
    if(id){
        const level = id.includes("e")?"easy":"hard";
        fetch("../assets/data/categories.json")
        .then(res => res.json())
        .then(data => {
            for (const level in data) {
                const item = data[level].find(el => el.id === id);
                if (item) return  document.getElementById("song-status").innerHTML = item.name;
            }
            return null;
        })
        .catch(err => console.error("Error cargando JSON:", err));
    }else{
        document.getElementById("song-status").innerHTML = "¡Adivina la canción!";
    }
}

function playButtonPushed() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const button = document.getElementById("play-pause");
    const audio = document.getElementById("song");

    if (audio.paused) {
        audio.play()
            .then(() => {
                updateText(id);

                button.classList.remove("play");
                button.classList.add("pause");
            })
            .catch(err => console.error("Play bloqueado:", err));

    } else {
        audio.pause();

        button.classList.remove("pause");
        button.classList.add("play");

        document.getElementById("song-status").textContent =
            "Canción en pausa.";
    }
}
function replayButtonPushed() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const button = document.getElementById("play-pause");
    const audio = document.getElementById("song");
    if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
        button.classList.remove("play")
        button.classList.add("pause")
    } else {
        audio.currentTime = 0;
    }
    updateText(id);
}

function showSolution() {
    const params = new URLSearchParams(window.location.search);
    const song = params.get('song');
    document.getElementById("song").pause();
    document.getElementById("music-panel").classList.add("hide");
    document.getElementById("music-info").classList.remove("hide");
    
    fetch("../assets/data/songs.json")
    .then(res => res.json())
    .then(data => {
        const item = data.find(el => el.filename === "song"+song);
        document.getElementById("song-info").innerHTML = `
                <p id="artist"><b>${item.artist}</b></p>
                <p id="year">${item.year}</h2>
                <p id="title"><i>${item.title}</i></p>`;
        
    })
    .catch(err => console.error("Error cargando JSON:", err));
}

