document.addEventListener("DOMContentLoaded", () => {
    const params =  new URLSearchParams(window.location.search);
    const level = params.get("level");
    if(level){
        fetch("../assets/data/categories.json")
        .then(res => res.json())
        .then(data => {
            const items = data[level];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            renderItem(randomItem);
        })
        .catch(err => console.error("Error cargando JSON:", err));
    }else{
        const id = params.get("id");
        const level = id.includes("e")?"easy":"hard";
        
        fetch("../assets/data/categories.json")
        .then(res => res.json())
        .then(data => {
            renderItem(findItemById(data, id));
        })
        .catch(err => console.error("Error cargando JSON:", err));
    }
});

function renderItem(item) {
    document.getElementById("category").classList.add(item.id)
    
    document.getElementById("category-card").innerHTML = `
    <div class="card">
      <h2>${item.name}</h2>
    </div>
  ;`
    
    document.getElementById('scan-button').href = "/pages/scan.html?mode=bingo&id="+item.id;
}

function findItemById(data, id) {
    for (const level in data) {
        const item = data[level].find(el => el.id === id);
        if (item) return item;
    }
    return null;
}