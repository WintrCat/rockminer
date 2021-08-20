var money = 0;
var clickValue = 1;
var rocksPerSec = 0;

var achievements = [false, false, false, false, false, false, false, false, false];

var prices = {"miner":10,"digger":150,"quarry":1000,"heavyexcavator":15000,"miningprobe":250000,"dysonrock":3500000};

var inExplosion = false;

var beamClickValue = 1;
var timeSinceLastClick = 0;

var miningProbeCount = 0;
var hasFusionReacting = false;

var rocksPerClickMultiplier = 1;

setInterval(function() {
    timeSinceLastClick++;
    if (timeSinceLastClick == 3) beamClickValue = 1;
}, 1000)

setInterval(function() {
    rocksPerSec += miningProbeCount / 5;
}, 25);

function increaseMoney() {
    timeSinceLastClick = 0;
    if (clickValue != 500 && clickValue != 6000) {
        money += clickValue * rocksPerClickMultiplier;
    } else {
        money += beamClickValue * rocksPerClickMultiplier;
        beamClickValue = Math.min(beamClickValue * ((clickValue == 500) ? 1.02 : 1.04), (clickValue == 500) ? 500 : 6000);
    }

    if (clickValue == 45 && randint(1,40) == 1 && !inExplosion) {
        rocksPerSec *= 3;
        inExplosion = true;
        setTimeout(function() {
            rocksPerSec /= 3;
            inExplosion = false;
        }, 5000);
    }
    if (clickValue == 800) {
        let multiplier = 0.99975;
        prices.miner = Math.max(1, prices.miner * multiplier);
        prices.digger = Math.max(1, prices.digger * multiplier);
        prices.quarry = Math.max(1, prices.quarry * multiplier);
        prices.heavyexcavator = Math.max(1, prices.heavyexcavator * multiplier);
        prices.miningprobe = Math.max(1, prices.miningprobe * multiplier);
        prices.dysonrock = Math.max(1, prices.dysonrock * multiplier);
    }
    if (hasFusionReacting) {
        rocksPerSec *= 1.0002;
    }

    // HANDLE ACHIEVEMENT
    if (!achievements[0]) {
        achievements[0] = true;
        addAchievement(1);
    }
}

function buy(type) {

    var purchasedText = document.createElement("span");
    purchasedText.className = "no_expand";
    purchasedText.innerText = "PURCHASED";
    purchasedText.style.color = "red";

    // MINERS
    if (type == "Miner") {
        if (money >= prices.miner) {
            money -= prices.miner;
            rocksPerSec += 0.8;

            prices.miner = roundToOnePlace(prices.miner * 1.1);
            addMinerCount(type);
        }
    } else if (type == "Digger") {
        if (money >= prices.digger) {
            money -= prices.digger;
            rocksPerSec += 8;

            prices.digger = roundToOnePlace(prices.digger * 1.1);
            addMinerCount(type);
        }
    } else if (type == "Quarry") {
        if (money >= prices.quarry) {
            money -= prices.quarry;
            rocksPerSec += 64;

            prices.quarry = roundToOnePlace(prices.quarry * 1.1);
            addMinerCount(type);

            if (!achievements[5]) {
                achievements[5] = true;
                addAchievement(6);
            }
        }
    } else if (type == "Heavy Excavator") {
        if (money >= prices.heavyexcavator) {
            money -= prices.heavyexcavator;
            rocksPerSec += 480;

            prices.heavyexcavator = roundToOnePlace(prices.heavyexcavator * 1.1);
            addMinerCount("heavyexcavator");
        }
    } else if (type == "Mining Probe") {
        if (money >= prices.miningprobe) {
            money -= prices.miningprobe;
            miningProbeCount++;

            prices.miningprobe = roundToOnePlace(prices.miningprobe * 1.1);
            addMinerCount("miningprobe");
        }

    } else if (type == "Dyson Rock") {
        if (money >= prices.dysonrock) {
            money -= prices.dysonrock;
            rocksPerSec += 100000;
    
            prices.dysonrock = roundToOnePlace(prices.dysonrock * 1.1);
            addMinerCount("dysonrock");
        }

    // ITEMS
    } else if (type == "Pickaxe") {
        if (money >= 200 && clickValue < 5) {
            money -= 200;
            clickValue = 5;

            document.getElementById("pickaxe").style.backgroundColor = "#bababa";
            document.getElementById("div_pickaxe").appendChild(purchasedText);

            achievements[2] = true;
            addAchievement(3);
        }
    } else if (type == "Drill") {
        if (money >= 1500 && clickValue < 20) {
            money -= 1500;
            clickValue = 20;

            document.getElementById("drill").style.backgroundColor = "#bababa";
            document.getElementById("div_drill").appendChild(purchasedText);

            achievements[3] = true;
            addAchievement(4);
        }
    } else if (type == "Explosive Drill") {
        if (money >= 4000 && clickValue < 45) {
            money -= 4000;
            clickValue = 45;

            document.getElementById("explosivedrill").style.backgroundColor = "#bababa";
            document.getElementById("div_explosivedrill").appendChild(purchasedText);
        }
    } else if (type == "Mining Beam") {
        if (money >= 35000 && clickValue < 500) {
            money -= 35000;
            clickValue = 500;

            document.getElementById("miningbeam").style.backgroundColor = "#bababa";
            document.getElementById("div_miningbeam").appendChild(purchasedText);

            achievements[7] = true;
            addAchievement(8);
        }
    } else if (type == "Atom Collector") {
        if (money >= 400000 && clickValue < 800) {
            money -= 400000;
            clickValue = 800;

            document.getElementById("atomcollector").style.backgroundColor = "#bababa";
            document.getElementById("div_atomcollector").appendChild(purchasedText);
        }
    } else if (type == "Inferno Laser") {
        if (money >= 3000000 && clickValue < 6000) {
            money -= 3000000;
            clickValue = 6000;

            document.getElementById("infernolaser").style.backgroundColor = "#bababa";
            document.getElementById("div_infernolaser").appendChild(purchasedText);
        }
    } else if (type == "Terrain Editor") {
        if (money >= 20000000 && clickValue < 36000) {
            money -= 20000000;
            clickValue = 36000;

            document.getElementById("terraineditor").style.backgroundColor = "#bababa";
            document.getElementById("div_terraineditor").appendChild(purchasedText);
        }
    } else if (type == "Universe Simulator") {
        if (money >= 360000000 && clickValue < 560000) {
            money -= 360000000;
            clickValue = 560000;

            document.getElementById("universesimulator").style.backgroundColor = "#bababa";
            document.getElementById("div_universesimulator").appendChild(purchasedText);
        }

    // UPGRADES
    } else if (type == "Furious Clicks") {
        if (money >= 10000) {
            money -= 10000;
            rocksPerClickMultiplier *= 2;

            document.getElementById("furiousclicks").style.backgroundColor = "#bababa";
            document.getElementById("div_furiousclicks").appendChild(purchasedText);
        }
    } else if (type == "High Profile Mining") {
        if (money >= 650000) {
            money -= 650000;
            rocksPerClickMultiplier *= 2;

            document.getElementById("highprofilemining").style.backgroundColor = "#bababa";
            document.getElementById("div_highprofilemining").appendChild(purchasedText);
        }
    } else if (type == "Fusion Reacting") {
        if (money >= 4500000) {
            money -= 4500000;
            hasFusionReacting = true;

            document.getElementById("fusionreacting").style.backgroundColor = "#bababa";
            document.getElementById("div_fusionreacting").appendChild(purchasedText);
        }
    } else if (type == "Diamond Duplication") {
        if (money >= 70000000) {
            money -= 70000000;
            rocksPerClickMultiplier *= 2;

            document.getElementById("diamondduplication").style.backgroundColor = "#bababa";
            document.getElementById("div_diamondduplication").appendChild(purchasedText);
        }
    } else if (type == "Resource Mitosis") {
        if (money >= 320000000) {
            money -= 320000000;
            rocksPerSec *= 7;

            document.getElementById("resourcemitosis").style.backgroundColor = "#bababa";
            document.getElementById("div_resourcemitosis").appendChild(purchasedText);
        }
    } else if (type == "JavaScript Console") {
        if (money >= 8000000000) {
            money -= 8000000000;
            rocksPerClickMultiplier *= 60;

            document.getElementById("javascriptconsole").style.backgroundColor = "#bababa";
            document.getElementById("div_javascriptconsole").appendChild(purchasedText);
        }
    }


}

// SHOW PURCHASABLE DESCRIPTION

function description(visibility, item) {
    if (item == "Pickaxe") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "A handy pickaxe that mines 5 rocks per click.";
            desc.id = "item_desc";
            document.getElementById("div_pickaxe").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Drill") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "A powerful drill that mines at 20 rocks per click.";
            desc.id = "item_desc";
            document.getElementById("div_drill").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Explosive Drill") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "A drill that periodically uses bombs, tripling rocks per second for 5 seconds.";
            desc.id = "item_desc";
            document.getElementById("div_explosivedrill").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Mining Beam") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "A futuristic mining beam that exponentially heats up to 500 rocks per click!";
            desc.id = "item_desc";
            document.getElementById("div_miningbeam").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Atom Collector") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "This high-tech tool fuses the atoms of rocks to make better materials, reducing prices.";
            desc.id = "item_desc";
            document.getElementById("div_atomcollector").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Inferno Laser") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "The big brother of the mining beam which can heat up to 6000 rocks per second.";
            desc.id = "item_desc";
            document.getElementById("div_infernolaser").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Terrain Editor") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "We don't know how you got your hands on this. Can extract 36,000 rocks a second.";
            desc.id = "item_desc";
            document.getElementById("div_terraineditor").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Universe Simulator") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Simulates entire universes and extracts all resources. You stole this from the aliens.";
            desc.id = "item_desc";
            document.getElementById("div_universesimulator").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Furious Clicks") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Double rocks per click.";
            desc.id = "item_desc";
            document.getElementById("div_furiousclicks").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "High Profile Mining") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Docks per click is doubled.";
            desc.id = "item_desc";
            document.getElementById("div_highprofilemining").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Fusion Reacting") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Clicking increases rocks per second.";
            desc.id = "item_desc";
            document.getElementById("div_fusionreacting").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Diamond Duplication") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Rocks per click is doubled AGAIN.";
            desc.id = "item_desc";
            document.getElementById("div_diamondduplication").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "Resource Mitosis") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Rocks per second is multiplied by SEVEN.";
            desc.id = "item_desc";
            document.getElementById("div_resourcemitosis").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    } else if (item == "JavaScript Console") {
        if (visibility == "show") {
            let desc = document.createElement("p");
            desc.innerText = "Rocks per click is multiplied by SIXTY.";
            desc.id = "item_desc";
            document.getElementById("div_javascriptconsole").appendChild(desc);
        } else {
            document.getElementById("item_desc").remove();
        }
    }
}

// GENERATE ROCKS FROM RPS

setInterval(function() {
    money += rocksPerSec / 100;
}, 10);

// UPDATE MONEY TEXT

setInterval(function() {
    document.getElementById("money").innerText = "Money: £" + format(roundToOnePlace(money));
    document.getElementById("rps").innerText = "Rocks Per Sec: " + format(roundToOnePlace(rocksPerSec));

    if (clickValue == 500 || clickValue == 6000) {
        document.getElementById("rpc").innerText = "Rocks Per Click: " + format(roundToOnePlace(beamClickValue * rocksPerClickMultiplier));
    } else {
        document.getElementById("rpc").innerText = "Rocks Per Click: " + format(roundToOnePlace(clickValue * rocksPerClickMultiplier));
    }

    document.getElementById("miner").innerText = "Miner - £" + format(roundToOnePlace(prices.miner));
    document.getElementById("digger").innerText = "Digger - £" + format(roundToOnePlace(prices.digger));
    document.getElementById("quarry").innerText = "Quarry - £" + format(roundToOnePlace(prices.quarry));
    document.getElementById("heavyexcavator").innerText = "Heavy Excavator - £" + format(roundToOnePlace(prices.heavyexcavator));
    document.getElementById("miningprobe").innerText = "Mining Probe - £" + format(roundToOnePlace(prices.miningprobe));
    document.getElementById("dysonrock").innerText = "Dyson Rock - £" + format(roundToOnePlace(prices.dysonrock));

    // MILESTONE ACHIEVEMENT CHECKS

    if (money >= 100 && !achievements[1]) {
        achievements[1] = true;
        addAchievement(2);
    }
    if (money >= 10000 && !achievements[4]) {
        achievements[4] = true;
        addAchievement(5);
    }
    if (money >= 1000000 && !achievements[8]) {
        achievements[8] = true;
        addAchievement(9);
    }
    if (Math.floor(rocksPerSec) == 666 && !achievements[6]) {
        achievements[6] = true;
        addAchievement(7);
    }

}, 10);
