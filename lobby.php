<?php
	require_once("action/LobbyAction.php");
	$action = new LobbyAction();
    $data = $action->execute();

	require_once("partial/header.php")
?>

<body id="lobby">
    <main>
        <section>
            <h3>Qu'est-ce que ce sera?</h3>
            <a href="game.php" class="button">Pratique</a>
            <a href="game.php" class="button">Jouer</a>
            <a href="?logout=true" class="button" >Quitter</a>

        </section>
        
        <section class="decorate">
            <!-- chat -->
            <iframe style="width:700px;height:240px;"
				src="<?="https://magix.apps-de-cours.com/server/#/chat/".$_SESSION["key"]?>">
            </iframe>
        </section>
    </main>

<?php
	require_once("partial/footer.php");