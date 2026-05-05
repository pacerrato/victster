document.addEventListener("DOMContentLoaded", () => {
    loadVinyl();
});

function loadVinyl() {
    const img = document.getElementById("vinyl");
    const num = Math.floor(Math.random()* 13)+1
    
    img.src =`assets/media/vinyl/${num}.png`
}

