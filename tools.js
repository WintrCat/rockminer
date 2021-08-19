function randint(lower, upper) {
    return Math.floor(((upper - lower) * Math.random()) + lower)
}

function format(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roundToOnePlace(number) {
    return Math.trunc(number * 10) / 10;
}

function addMinerCount(string) {
    document.getElementById("count_" + string.toLowerCase()).innerText = "x" + (parseInt(document.getElementById("count_" + string.toLowerCase()).innerText.slice(1,document.getElementById("count_" + string.toLowerCase()).innerText.length)) + 1).toString();
}

function addAchievement(id) {
    // INITIALIZE
    var ach = document.createElement("div");
    var text = document.createElement("span");
    var img = document.createElement("img");

    switch (id) {
        case 1:
            img.src = "assets/achievement-1.png";
            text.innerText = "First Steps - Click the rock for the first time.";
            break;
        case 2:
            img.src = "assets/achievement-2.png";
            text.innerText = "Making Stacks - Make your first £100.";
            break;
        case 3:
            img.src = "assets/achievement-3.png";
            text.innerText = "Isn't it Iron Pick - Buy a pickaxe from the shop.";
            break;
        case 4:
            img.src = "assets/achievement-4.png";
            text.innerText = "Bit of an upgrade - Buy your first drill item."
            break;
        case 5:
            img.src = "assets/achievement-5.png";
            text.innerText = "Imagine the Gaming PC - Make your first £10,000.";
            break;
        case 6:
            img.src = "assets/achievement-6.png";
            text.innerText = "Leadership skills - Buy your own quarry.";
            break;
        case 7:
            img.src = "assets/achievement-7.png";
            text.innerText = "How did you get this one? - Have 666 rocks per second.";
            break;
        case 8:
            img.src = "assets/achievement-8.png";
            text.innerText = "Four Universes Ahead - Buy a mining beam from the shop.";
            break;
        case 9:
            img.src = "assets/achievement-9.png";
            text.innerText = "Monopoly Miner - Become a millionaire from rocks!";
            break;
    }

    // FINALIZE
    img.width = img.height = 32;
    img.style = "position: relative; left: 5px;";
    text.style = "position: relative; top: -10px; right: -10px;";
    text.className = "no_expand";
    ach.appendChild(img);
    ach.appendChild(text);
    document.getElementById("achievements").appendChild(ach);
}