function getRandomSongId() {
    return Math.floor(Math.random() * 432) + 1;
}

function initWelcomeMusic() {
    const audio = document.getElementById("welcome-song");
    if (!audio) return;

    function playRandomSong() {
        const songId = getRandomSongId();

        audio.src = `assets/media/audio/song${songId}.opus`;
        audio.volume = 0.5;
        audio.load();

        audio.play().catch(() => {});
    }

    audio.onended = playRandomSong;

    const tryPlay = () => {
        audio.play()
            .then(() => {
                document.removeEventListener("click", tryPlay);
            })
            .catch(() => {});
    };

    playRandomSong();

    tryPlay();

    document.addEventListener("click", tryPlay);
}
document.addEventListener("DOMContentLoaded", initWelcomeMusic);