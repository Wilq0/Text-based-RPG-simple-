// player stats
let health = 100;
let money = 1000;
let currentWeaponIndex = 0;
let inventory = [
    {
        name: "Stick",
        cost: 0,
        power: 5
    }
];
let truthy = true; // for weapons
// call html stats  text with id
let healthPoints = document.getElementById("healthPoints");
healthPoints.innerText = health;
let doubloons = document.getElementById("Doubloons");
doubloons.innerText = money;
let currentText = document.getElementById("text");
let monsterName = document.getElementById("monsterName");
let monsterHealth = document.getElementById("monsterHealth");
let monsterDamage = document.getElementById("monsterDamage");
let mName = "";
let mHealth = 0;
let mDamage = 0;
// Makes sure monster stat container doesn't show when you first load the website
let monsterStatContainer = document.getElementById("monsterStatContainer");
monsterStatContainer.style.display = "none";
//monster stats
let randomMonster;
let betaTownMonsterStats = [
    {
        name: "Greedy goblin",
        health: 15,
        damage: 2
    },
    {
        name: "Wild boar",
        health: 25,
        damage: 4
    },
    {
        name: "Spear goblin",
        health: 30,
        damage: 5
    },
    {
        name: "Golem",
        health: 50,
        damage: 2
    },
    {
        name: "Ninja goblin",
        health: 40,
        damage: 10
    },
    {
        name: "Goblin boss",
        health: 50,
        damage: 15
    },
]
// all in-game weapons
let playerIndex = 0;
let weaponStatIndex = 0;
let buttonTextWeapon;
let weaponStats = [
    {
        name: "Stick",
        cost: 0,
        power: 5
    },
    {
        name: "Branch",
        cost: 25,
        power: 10
    },
    {
        name: "Sharp pencil",
        cost: 50,
        power: 20
    },
    {
        name: "Paper ninja stars (Really sharp)",
        cost: 100,
        power: 25
    },
    {
        name: "Nunchucks",
        cost: 200,
        power: 35
    }
];
let currentPlayerWeapon = weaponStats[playerIndex].name;
let htmlCurrentWeaponIndex = document.getElementById("currentWeaponIndex");
htmlCurrentWeaponIndex.innerText = weaponStats[0].name;
// call html buttons id
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
button4.style.display = "none";
let changeWeaponButton = document.getElementById("changeWeapon");
// make them do something
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = goSigmaTown;
// locations, or a master object that changes the button text, function and regular text on bottom.
let locations = [
    {
        name: "Go to beta town",
        buttonFunctions: [goStore, goCave, goSigmaTown],
        buttonText: ["Travel to store", "Travel to a random cave", "Travel to Sigma town (requires 200 doubloons and 200 health points)"],
        text: "You are now in Beta town."
    },
    {
        name: "Travel to store",
        buttonFunctions: [buyHP, buyWeapon, goTown],
        buttonText: ["Buy 10 health (15 gold)", "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)", "Travel back to Beta town"],
        text: "You are in the town shop. Buy whatever is needed!"
    },
    { 
        name: "Travel to a random cave",
        buttonFunctions: [fightRandom, fightGoblinBoss, goTown],
        buttonText: ["Fight a random monster", "Fight Goblin boss", "Travel back to Beta town"],
        text: "You're in a cave. You see goofy monsters doing goofy things."
    },
    {
        name: "Currently fighting",
        buttonFunctions: [attackMonster, Dodge, goTown],
        buttonText: ["Attack", "Dodge", "Run"],
        text: "You are in a fight with a monster."
    },
    {
        name: "Reset",
        buttonFunctions: [Reset, Reset, Reset],
        buttonText: ["Play again", "Play again", "Play again"],
        text: "You died! Play again?"
    }
];
function update(location) {
    button1.onclick = location.buttonFunctions[0];
    button2.onclick = location.buttonFunctions[1];
    button3.onclick = location.buttonFunctions[2];

    button1.innerText = location.buttonText[0];
    // fix the "You bought the best weapon" thing.
    if (location.name == "Travel to store" && truthy === false && truthy2 === true) {
            button2.innerText = "You bought the best weapon!"
        } else {
            button2.innerText = location.buttonText[1];
        }
        button3.innerText = location.buttonText[2];
    
        if (location.buttonFunctions[3] != null) {
            button4.style.display = "block";
            button4.onclick = location.buttonFunctions[3];
            button4.innerText = location.buttonText[3];
        } else {
            button4.style.display = "none";
        }
        currentText.innerText = location.text;
    }

function goTown() {
    update(locations[0]);
    monsterStatContainer.style.display = "none";
}

function goStore() {
    update(locations[1]);
}
// Start of cave things
function goCave() {
    update(locations[2]);
}

function fightRandom() {
    update(locations[3]);
    monsterStatContainer.style.display = "block";
    randomMonster = Math.floor(Math.random()*betaTownMonsterStats.length-1)
    if (randomMonster < 0) {
        randomMonster++;
    }
    mHealth = betaTownMonsterStats[randomMonster].health;
    mName = betaTownMonsterStats[randomMonster].name;
    mDamage = betaTownMonsterStats[randomMonster].damage;
    monsterHealth.innerText = mHealth;
    monsterName.innerText = mName;
    monsterDamage.innerText = mDamage;
}
// Bosses
function fightGoblinBoss() {
    update(locations[3]);
    monsterStatContainer.style.display = "block";

    mHealth = betaTownMonsterStats[betaTownMonsterStats.length-1].health;
    mName = betaTownMonsterStats[betaTownMonsterStats.length-1].name;
    mDamage = betaTownMonsterStats[betaTownMonsterStats.length-1].damage;
    monsterHealth.innerText = mHealth;
    monsterName.innerText = mName;
    monsterDamage.innerText = mDamage;

    currentText.innerText = "You are in a fight with the Goblin boss! How scary.";
}

function attackMonster() {
    // You attack the monster
    playerIndex = weaponStatIndex;
    mHealth -= inventory[playerIndex].power;
    monsterHealth.innerText = mHealth;
    if (mHealth <= 0) {
        monsterStatContainer.style.display = "none";
        update(locations[2]);
        currentText.innerText = "You defeated the monster!";
        money = money + (Math.floor(Math.random() * (mDamage^2)));
        monsterHealth.innerText = mHealth;
        doubloons.innerText = money;
    }
    // Monster attacks you.
    health -= mDamage;
    healthPoints.innerText = health;
    if (health <= 0) {
        update(locations[locations.length-1]);
        health = 0;
        healthPoints.innerText = health;
    }
}

function Dodge() {

}
function Reset() {
    health = 100;
    money = 1000;
    for (let amountOfPops = inventory.length-1; amountOfPops != 0; amountOfPops--) {
        inventory.pop();
    }
    weaponStatIndex = 0;
    truthy = true;
    htmlCurrentWeaponIndex.innerText = inventory[0].name;
    doubloons.innerText = money;
    healthPoints.innerText = health;
    monsterStatContainer.style.display = "none";
    locations[1].buttonText[1] = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
    update(locations[0]);
}
// End of cave things (up there);
function buyHP() {
    if (money >= 15) {
        money-= 15;
        health+=10;
        healthPoints.innerText = health;
        doubloons.innerText = money;
    }
}
// IS FIXED
function buyWeapon() {
    if (inventory.length >= weaponStats.length-1) {
        if (money >= weaponStats[weaponStats.length-1].cost) {
            if (truthy === true) {
                currentText.innerText = "You have the best weapon!"
                button2.innerText = "You bought the best weapon!"
                truthy = false;
                inventory.push(weaponStats[weaponStats.length-1]);
                money -= weaponStats[weaponStats.length-1].cost;
                doubloons.innerText = money;
                htmlCurrentWeaponIndex.innerText = inventory[inventory.length-1].name;
                locations[1].buttonText[1] = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
                console.log("Hi");
            }
        } else {
            currentText.innerText = "You don't have enough money to buy this weapon!"
            button2.innerText = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
        }
    } else {
        if (money >= weaponStats[weaponStatIndex+1].cost) {
            money -= weaponStats[weaponStatIndex+1].cost;
            doubloons.innerText = money;
            inventory.push(weaponStats[weaponStatIndex+1]);
            htmlCurrentWeaponIndex.innerText = inventory[inventory.length-1].name;
            console.log("Hi");
            if (weaponStatIndex+1 < weaponStats.length) {
                weaponStatIndex++;
                console.log("Hi");
                if (weaponStatIndex+1 == weaponStats.length) {
                    weaponStatIndex = weaponStats.length-1;
                    button2.innerText = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
                    locations[1].buttonText[1] = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
                } else {
                    button2.innerText = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
                    locations[1].buttonText[1] = "Buy weapon ("+weaponStats[weaponStatIndex+1].name+" - " + weaponStats[weaponStatIndex+1].cost + " doubloons)";
                }
            }
        }
    }
}
function changeCurrentWeapon() {

}
function goSigmaTown() {

}