class Card {
    constructor(c, deck) {        
        this.card  = document.createElement("div")
        this.card.className = "card";
        this.card.id = c.uid;

        // --> add infos to be displayed
        //image
        this.img = document.createElement("div");
        this.img.className = "cardImage";
        this.card.appendChild(this.img);
        //name
        this.name = document.createElement("h3");
        this.name.className = "cardName";
        this.card.appendChild(this.name).innerText = c.id;
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

        this.attack = document.createElement("h3");
        this.attack.className = "cardAttack";
        this.card.appendChild(this.attack).innerText = c.atk;
        

        // add on-click listener 
        this.card.addEventListener("click", () => {
            $.ajax({
                url : "ajax-game.php", // Le contrôleur/action de cette page appelle mon API.
                type : "POST",
            })
            .done(function (msg) { 
                let reponse = JSON.parse(msg);

                console.log("prouet");

                // setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
            })
        });

        deck.appendChild(this.card);
    }
}