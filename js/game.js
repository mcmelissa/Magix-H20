let card_uid = null;
let isAttackMode = true;

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
        if (reponse == "WAITING") {
            this.finishedGame = document.createElement("h1");
            this.finishedGame.className = "banderole waiting";
            board.appendChild(this.finishedGame);
        }
        else if (reponse == "LAST_GAME_WON") {
            ending(board, "won");

        }
        else if (reponse == "LAST_GAME_LOST") {
            ending(board, "lost");
        }
        else if (reponse == "NOT_IN_GAME") {
            this.finishedGame = document.createElement("h1");
            this.finishedGame.className = "banderole";
            board.appendChild(this.finishedGame).innerText = reponse;
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


            if (reponse.yourTurn) {
                this.remainingTimeNode.addEventListener('click', () => {
                    gamesAction("END_TURN");
                });
                if (!reponse.heroPowerAlreadyUsed){
                    document.querySelector(".myGame > .hero > .heroImage").addEventListener('click', () => {
                        gamesAction("HERO_POWER");
                    });
                }
            }

            let opponentHero = document.querySelector(".opponentGame > .hero > .heroImage");
            if (isAttackMode) {
                opponentHero.onclick = () => attack(card_uid, 0);
                opponentHero.addEventListener("mouseover", mouseOver);
                opponentHero.addEventListener("mouseout", mouseOut);
                // document.querySelector(".board > .opponentBoard > .card").addEventListener("mouseover", mouseOver);
                // document.querySelector(".board > .opponentBoard > .card").addEventListener("mouseout", mouseOut);
            }

            //display cards (opponent, board and mine)
            displayOpponentCards(reponse.opponent.handSize, opDeck)
            // my cards
            displayCards(reponse.hand, myDeck);
            // my board : set AttackMode 
            displayCards(reponse.board, myBoard)
            // opponent board
            displayCards(reponse.opponent.board, opBoard)

            // opponent
            document.querySelector(".opponentGame > .hero > .infos > .name").innerText = reponse.opponent.username;
            document.querySelector(".opponentGame > .hero > .infos > h3").innerText = "\""+reponse.opponent.welcomeText+"\"";
            document.querySelector(".opponentGame > .hero > .infos > .heroType").innerText = reponse.opponent.heroClass;
            document.querySelector(".opponentGame > .hero > .hp").innerText = reponse.opponent.hp;
            document.querySelector(".opponentGame > .hero > .mana").innerText = reponse.opponent.mp;
            document.querySelector(".opponentGame > .remainingDeck").innerText = reponse.opponent.remainingCardsCount;
            
            // me
            document.querySelector(".myGame > .hero > .infos > h3").innerText = "\""+reponse.welcomeText+"\"";
            document.querySelector(".myGame > .hero > .infos > .heroType").innerText = reponse.heroClass;
            document.querySelector(".myGame > .hero > .hp").innerText = reponse.hp;
            document.querySelector(".myGame > .hero > .mana").innerText = reponse.mp;
            document.querySelector(".myGame > .remainingDeck").innerText = reponse.remainingCardsCount;
            
            // if errors (string) while playing
            if (typeof reponse !=="object") {
                this.error = document.createElement("div");
                this.error.className = "error";
                board.appendChild(this.error).innerText = reponse;
                console.log(reponse);
            }

        }
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })

    // si probleme avec la requete
    .fail(function(msg) {
        let reponse = JSON.parse(msg);
        this.error = document.createElement("div");
        this.error.className = "error";
        board.appendChild(this.error).innerText = reponse;
        console.log("erreur game: " + reponse);
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


/*---------------------------------------
   FUNCTIONS
 ----------------------------------------*/
function ending(board, endingType) {
    this.finishedGame = document.createElement("h1");
    this.finishedGame.className = "banderole " + endingType;
    board.appendChild(this.finishedGame);
    // relocate
    setTimeout(function () {
        document.location.href = './lobby.php';
    }, 4000);
}

 const gamesAction = (service) => {
    $.ajax({
        url : "ajax-game.php",
        type : "POST",
        data : {
            type : service
        }
    })
    .done(function (msg) { 
        // let reponse = JSON.parse(msg);
        // console.log(reponse);
    })
    .fail(function (msg) {
        let reponse = JSON.parse(msg);
        this.error = document.createElement("div");
        this.error.className = "error";
        board.appendChild(this.error).innerText = reponse;
    })
}

function displayCards(hand, deck) {
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

