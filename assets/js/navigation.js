function goBack() {
    const url = new URL(window.location.href);
    const path = window.location.pathname;
    
    const mode = url.searchParams.get("mode");
    const id = url.searchParams.get("id");
    
    if (path.includes("index.html")) return;
    
    if (path.includes("mode.html")) {
        window.location.replace("/index.html");
        return;
    }
    
    if (path.includes("category.html")) {
        window.location.replace("/pages/mode.html");
        return;
    }
    
    if (path.includes("scan.html")) {
        
        if (mode === "bingo" && id) {
            window.location.replace(`/pages/category.html?id=${id}`);
            return;
        }
        
        window.location.replace(`/pages/mode.html`);
        return;
    }
    
    if (path.includes("song.html")) {
        
        if (mode === "bingo" && id) {
            window.location.replace(`/pages/scan.html?mode=bingo&id=${id}`);
            return;
        }
        
        window.location.replace(`/pages/scan.html?mode=normal`);
        return;
    }
}

function goNextFromScan(songId) {
    const url = new URL(window.location.href);
    
    const mode = url.searchParams.get("mode");
    const id = url.searchParams.get("id");
    
    if (!songId) {
        console.warn("No songId recibido del QR");
        return;
    }
    
    if (mode === "normal") {
        window.location.href =
        `/pages/song.html?song=${songId}&mode=normal`;
        return;
    }
    
    if (mode === "bingo") {
        window.location.href =
        `/pages/song.html?song=${songId}&mode=bingo&id=${id}`;
        return;
    }
}

function goNextFromSong() {
    const url = new URL(window.location.href);
    
    const mode = url.searchParams.get("mode");
    const id = url.searchParams.get("id");
    
    if (mode === "normal") {
        window.location.replace(`/pages/scan.html?mode=normal`);
        return;
    }
    
    if (mode === "bingo" && id) {
        const level = id.startsWith("e") ? "easy" : "hard";
        window.location.replace(`/pages/category.html?level=${level}`);
        return;
    }
}   