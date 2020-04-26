const state = () => {
    $.ajax({
        url : "ajax-state.php", // Le contrôleur/action de cette page appelle mon API.
        type : "POST"
    })
    .done(function (msg) { 
        let reponse = JSON.parse(msg);

        // opponent
        let opDeck = document.querySelector(".opponentGame > .deck");
        // board
        let time = document.querySelector(".time");
        let board = document.querySelector(".board");
        // me
        let myDeck = document.querySelector(".myGame > .deck");
        
        // remove board's children 
        board.querySelectorAll('*').forEach(n => n.remove());

        // create board's sub-containers
        let opBoard = document.createElement("div");
        opBoard.className = "opponentBoard";
        let myBoard = document.createElement("div");
        myBoard.className = "myBoard";
        board.appendChild(opBoard);
        board.appendChild(myBoard);

        
        // if game is : waiting / won / lost 
        if (typeof reponse !=="object") {

            if (reponse == "WAITING") {
                // add new child
                this.finishedGame = document.createElement("h1");
                this.finishedGame.className = "banderole";
                this.finishedGame.className = "waiting";
                board.appendChild(this.finishedGame).innerText = reponse;
            }
            else if (reponse == "LAST_GAME_WON" || reponse == "LAST_GAME_LOST") {
                // add new child
                this.finishedGame = document.createElement("h1");
                this.finishedGame.className = "banderole";
                this.finishedGame.className = "won";
                board.appendChild(this.finishedGame);
            }
            else if (reponse == "LAST_GAME_LOST") {
                // add new child
                this.finishedGame = document.createElement("h1");
                this.finishedGame.className = "banderole";
                this.finishedGame.className = "lost";
                board.appendChild(this.finishedGame);
            }
        }
        // if game is being played
        else { 
            // remove sub-container's children before creating new ones
            time.querySelectorAll('*').forEach(n => n.remove());

            // Remaining Time for turn
            this.remainingTimeNode = document.createElement("h1");
            this.remainingTimeNode.className = "timeRemaining";
            time.appendChild(this.remainingTimeNode).innerText = typeof reponse !== "object" ? "- -" : reponse.remainingTurnTime; 
            // My turn?
            this.myTurnNode = document.createElement("div");
            reponse.yourTurn ? this.myTurnNode.className = "myTurn" : this.myTurnNode.className = "opponentsTurn";
            time.appendChild(this.myTurnNode);

            //display cards (opponent, board and mine)
            displayOpponentCards(reponse.opponent.handSize, opDeck)
            displayBoardCards(reponse.opponent.board, opBoard, reponse.board, myBoard)
            displayMyCards(reponse.hand, myDeck);

            // opponent
            document.querySelector(".opponentGame > .hero > .infos > .name").innerText = reponse.opponent.username;
            document.querySelector(".opponentGame > .hero > .infos > h3").innerText = reponse.opponent.welcomeText;
            document.querySelector(".opponentGame > .hero > .infos > .heroType").innerText = reponse.opponent.heroClass;
            document.querySelector(".opponentGame > .hero > .hp").innerText = reponse.opponent.hp;
            document.querySelector(".opponentGame > .hero > .mana").innerText = reponse.opponent.mp;
            document.querySelector(".opponentGame > .remainingDeck").innerText = reponse.opponent.remainingCardsCount;
            
            // me
            document.querySelector(".myGame > .hero > .infos > h3").innerText = reponse.welcomeText;
            document.querySelector(".myGame > .hero > .infos > .heroType").innerText = reponse.heroClass;
            document.querySelector(".myGame > .hero > .hp").innerText = reponse.hp;
            document.querySelector(".myGame > .hero > .mana").innerText = reponse.mp;
            document.querySelector(".myGame > .remainingDeck").innerText = reponse.remainingCardsCount;
        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })

    // si probleme avec la requete
    .fail(function(msg) {
        $('.board').html(msg);
        $('.board').addClass("erreur");
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


/*---------------------------------------
   FUNCTIONS
 ----------------------------------------*/

function displayMyCards(hand, deck) {
    // remove all cards from deck
    deck.querySelectorAll('*').forEach(n => n.remove());

    // reassign cards to deck
    for (c in hand) {
        this.card = new Card(hand[c], deck);
    }
}

function displayOpponentCards(hand, deck) {
    // remove all cards from deck
    deck.querySelectorAll('*').forEach(n => n.remove());

    // reassign cards to deck
    for (let i = 0; i < hand; i++) {
        this.card  = document.createElement("div")
        this.card.className = "card";     
        deck.appendChild(this.card);
    }
}

function displayBoardCards(opHand, opBoard, myHand, myBoard) {
    // remove all cards from deck
    if (opHand) {
        opBoard.querySelectorAll('*').forEach(n => n.remove());
    }
    if (myHand) {
        myBoard.querySelectorAll('*').forEach(n => n.remove());
    }

    // reassign cards to deck
    for (c in opHand) {
        this.cardOp = new Card(opHand[c], opBoard);
    }

    for (c in myHand) {
        this.card = new Card(myHand[c], myBoard);
    }
}
