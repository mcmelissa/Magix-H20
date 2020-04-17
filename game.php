<?php
	require_once("action/GameAction.php");
	$action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php")
?>

<script src="./js/jquery.min.js"></script>
<script src="./js/game.js"></script>

<body id="game">
    this is the game

    <main>
        <section class="opponentGame">
            ceci est le jeu de mon adversaire
        </section>

        <section class="myGame">
            ceci est mon jeu
        </section>

    </main>
<?php
	require_once("partial/footer.php");