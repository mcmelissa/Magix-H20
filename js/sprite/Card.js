class Card {
    constructor(c, deck) {        
        this.card  = document.createElement("div")
        this.card.className = "card";
        this.card.info = c.uid;

        // --> infos to be displayed
        //image
        this.img = document.createElement("div");
        c.cost < 11 ? this.img.className =  "cardImage " + "C"+c.cost : this.img.className = "cardImage Cdefault";
        // this.img.className = "cardImage";
        this.card.appendChild(this.img);
        //name
        this.name = document.createElement("h3");
        this.name.className = "cardName";
        this.card.appendChild(this.name).innerText = nameSelection(c.cost);
        //mechanis (battlecry, taunt, ..)
        this.mechanics = document.createElement("div");
        this.mechanics.className = "mechanics";
        this.card.appendChild(this.mechanics).innerText = c.mechanics;
        //hp
        this.hp = document.createElement("h3");
        this.hp.className = "cardHp";
        this.card.appendChild(this.hp).innerText = c.hp;
        //cost
        this.mana = document.createElement("h3");
        this.mana.className = "cardMana";
        this.card.appendChild(this.mana).innerText = c.cost;
        // attack
        this.attack = document.createElement("h3");
        this.attack.className = "cardAttack";
        this.card.appendChild(this.attack).innerText = c.atk;
        
        deck.appendChild(this.card);

        // --> add eventlistener
        // PLAY from my deck
        if (deck == document.querySelector(".myGame > .deck")) {
            this.card.addEventListener("mouseover", mouseOver);
            this.card.addEventListener("mouseout", mouseOut);
            this.card.onclick = () => play(c.uid);
        }
        // set ATTACK : from my board
        if (deck == document.querySelector(".board > .myBoard")) {
            this.card.addEventListener("mouseover", mouseOver);
            this.card.addEventListener("mouseout", mouseOut);
            this.card.addEventListener("click", () => {
                // isAttackMode = true
                card_uid = this.card.info;
            });            
        }
        if (deck == document.querySelector(".board > .opponentBoard")) {
            let target_uid = this.card.info;
            this.card.addEventListener("click", () => {
                attack(card_uid,target_uid);
            })
            this.card.addEventListener("mouseover", mouseOver);
            this.card.addEventListener("mouseout", mouseOut);

        }
        let alive = true;
        if (!alive) {
          this.card.remove();
        }
    }
}

/*---------------------------------------
   FUNCTIONS
 ----------------------------------------*/
function nameSelection (cost) {
    let name = "banana"
    switch (cost) {
        case 0: name = "aguacate"   // avocat
            break;
        case 1: name = "lima"       // lime
            break;
        case 2: name = "cilantro"   // coriandre
            break;
        case 3: name = "piña"       // ananas
            break;
        case 4: name = "mango"      // mangue
            break;
        case 5: name = "tortilla"   // tortilla
            break;
        case 6: name = "tabasco"    // tabasco
            break;
        case 7: name = "tomate"     // tomate
            break;
        case 8: name = "coco"       // noix de coco
            break;
        case 9: name = "margarita"  // margarita
            break;
        case 10: name = "chile"     // piment
            break;
        default: name = "banana"    // banane
            break;
    }
    return name
}

const play = (card_uid) => {
    $.ajax({
        url : "ajax-game.php",
        type : "POST",
        data : {
            type : "PLAY",
            uid : card_uid
        }
    })
    .done(function (msg) { 
        let reponse = JSON.parse(msg);
        card_uid = null;
    })
    .fail(function(msg) {
        let reponse = JSON.parse(msg);
        this.error = document.createElement("div");
        this.error.className = "error";
        board.appendChild(this.error).innerText = reponse;
    })
}

const attack = (card_uid, target_uid) => {
    $.ajax({
        url : "ajax-game.php",
        type : "POST",
        data : {
            type : "ATTACK",
            uid : card_uid,
            targetuid : target_uid
        }
    })
    .done(function (msg) { 
        let reponse = JSON.parse(msg);
        card_uid = null;
    })
    .fail(function(msg) {
        let reponse = JSON.parse(msg);
        this.error = document.createElement("div");
        this.error.className = "error";
        board.appendChild(this.error).innerText = reponse;
        card_uid = null;
    })
}

function mouseOver() {
    this.style.boxShadow = "0 0 10px yellow"
}

function mouseOut() {
    this.style.boxShadow = "none"
}