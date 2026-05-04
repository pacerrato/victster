document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    
    const level = params.get("level");
    const id = params.get("id");
    
    fetch("../assets/data/categories.json")
    .then(res => res.json())
    .then(data => {
        if (id) {
            const item = findItemById(data, id);
            renderItem(item);
            document
            .getElementById("scan-button")
            .classList.add("show");
            
            return;
        }
        if (level) {
            const items = data[level];
            const item =
            items[Math.floor(Math.random() * items.length)];
            
            animateSelection(items, item);
        }
    })
    .catch(err => console.error("Error cargando JSON:", err));
});

function animateSelection(items, item) {
    const button = document.getElementById("scan-button");
    button.classList.remove("show");
    
    let currentIndex = Math.floor(Math.random() * items.length);
    
    const rounds = items.length * 2; 
    const itemIndex = items.findIndex(item => item.id === item.id);
    
    let extraSteps;
    if (itemIndex >= currentIndex) {
        extraSteps = itemIndex - currentIndex;
    } else {
        extraSteps = items.length - currentIndex + itemIndex;
    }
    
    const totalSteps = rounds + extraSteps;
    
    let step = 0;
    let delay = 50;
    
    function spin() {
        renderItem(items[currentIndex]);
        
        currentIndex = (currentIndex + 1) % items.length;
        step++;
        
        if (step < totalSteps) {
            delay += 40; 
            setTimeout(spin, delay);
        } else {
            renderItem(item);
            
            setTimeout(() => {
                button.classList.add("show");
            }, 250);
        }
    }
    
    spin();
}

function renderItem(item) {
    const category = document.getElementById("category");
    const button = document.getElementById("scan-button");
    
    category.className = "";
    category.id = "category";
    
    category.classList.add(item.id);
    
    document.getElementById("category-card").innerHTML = `
        <div class="card">
            <h2>${item.name}</h2>
        </div>
    `;
    
    button.href = `/pages/scan.html?mode=bingo&id=${item.id}`;
}

function findItemById(data, id) {
    for (const level in data) {
        const item = data[level].find(el => el.id === id);
        if (item) return item;
    }
    return null;
}