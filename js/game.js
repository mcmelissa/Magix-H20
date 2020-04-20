const state = () => {
    $.ajax({
        url : "ajax-state.php", // Le contrôleur/action de cette page appelle mon API.
        type : "POST"
    })
    .done(function (msg) { 
        let reponse = JSON.parse(msg);
        // console.log(reponse);
        // console.log(reponse.hand);
        
        //creating parents
        let theGame = document.querySelector(".theGame");
        let myGame = document.querySelector(".myGame");
        // vider enfants
        theGame.querySelectorAll('*').forEach(n => n.remove());
        myGame.querySelectorAll('*').forEach(n => n.remove());
        // Alternative pour vider le parent
        // while (parent.firstChild) {
        //     parent.removeChild(parent.firstChild);
        // }

        // if game won / lost
        if (reponse == "LAST_GAME_WON" || reponse == "LAST_GAME_LOST") {
            this.finishedGame = document.createElement("h1");
            this.finishedGame.className = "decorate";
            theGame.appendChild(this.finishedGame).innerText = reponse;
        } else {

            // Creating container for turn / time remaining
            this.timeNode = document.createElement("div");
            this.timeNode.className = "time";
            let firstChild = theGame.appendChild(this.timeNode);

            // Remaining Time for turn
            this.remainingTimeNode = document.createElement("h1");
            this.remainingTimeNode.className = "timeRemaining";

            // My turn?
            this.myTurnNode = document.createElement("div");
            reponse.yourTurn ? this.myTurnNode.className = "myTurn" :this.myTurnNode.className = "opponentsTurn";

            console.log(reponse.yourTurn);

            firstChild.appendChild(this.myTurnNode);
            // firstChild.appendChild(this.myTurnNode).innerText = reponse.yourTurn ? "Mon tour de jouer" : "tour de l'adversaire";
            firstChild.appendChild(this.remainingTimeNode).innerText = reponse.remainingTurnTime; 


            //  A TRAVAILLER !!
            displayCards(reponse.hand, myGame);

            // // A TESTER
            // if (document.querySelector(".timeRemaining")) {
            //     parent.appendChild(this.remainingTimeNode).innerText = reponse.remainingTurnTime; 
            //     parent.replaceChild(this.node, parent.firstElementChild);
            // }
            // else {
            // }


            //--> toute la page
            //document.body.innerText = reponse.hand;
            //--> s'ajoute continuellement dans 'section'
            //parent.appendChild(this.node).innerText = reponse.remainingTurnTime; 
        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })

    //quand il y a un probleme avec la requete
    .fail(function(msg) {
        $('.test').html("ERREUR");
        $('.test').addClass("erreur");
    })
    //tjr réalisé
    .always(function(msg){
        $('.test').addClass("test")
    });
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


function displayCards(myHand, parent) {
    // Creating deck's container
    this.deck = document.createElement("div");
    this.deck.className = "deck";
    let hand = parent.appendChild(this.deck);

    // 2. À l’aide d’une boucle, créer à nouveau un bouton par carte, y afficher des information de la carte dessus.
    for (c in myHand) {
        this.card  = document.createElement("button")
        this.card.className = "card";
        this.card.id = myHand[c].uid;

        // 3. Inscrire ce bouton à une fonction écoutant les clicks ( addEventListener )
        this.card.addEventListener("mouseover", () => {
            this.card.style.boxShadow = "0px 0px 25px orange";            
        });

        this.card.addEventListener("click", () => {
            console.log("play");
        });

        // 4. Attacher au bouton le uid de la carte…on peut inclure des information sur un bouton simplement en faisant bouton.info = quelque chose
        this.card.info = myHand[c].uid;

        // 5. Bien entendu, ajouter le bouton à votre conteneur
        hand.appendChild(this.card).innerText = myHand[c].id;
    }

}
