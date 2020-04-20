<?php
	require_once("action/GameAction.php");
	$action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php")
?>

<script src="./js/jquery.min.js"></script>
<script src="./js/game.js"></script>

<body id="game">
    <h1>this is the game</h1>
    <a href="./lobby.php">Retour au Lobby</a>

    <main>
        <section class="opponentGame">
            ceci est le jeu de mon adversaire
        </section>

        <section class="theGame">
            The Game!!

            <div class="time">
                <div class="myTurn"></div>
                <div class="timeRemaining"></div>
            </div>
        </section>

        <section class="myGame">
            ceci est mon jeu

            <div class="mana">
                <div class="manaAvailable"></div>
                <div class="manaMax"></div>
            </div>
            
            <div class="hero"></div>

            <!-- my deck of cards -->
            <div class="deck">
                <button></button>
            </div>
        </section>

    </main>
<?php
	require_once("partial/footer.php");