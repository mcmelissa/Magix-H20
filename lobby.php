<?php
	require_once("action/LobbyAction.php");
	$action = new LobbyAction();
    $data = $action->execute();

	require_once("partial/header.php")
?>

<body id="lobby">
    <main>
        <section>
            <!-- <h3>Qu'est-ce que ce sera?</h3> -->
            <h3>¡Bonyour Amigó!</h3>
            <h3>¿Qu'est-cè què ça sera?</h3>
            <!-- <h3>¿Qu'est-cè què yè peux tè serbir?</h3> -->
            <form action="lobby.php" method="post">
                <input type="submit" name="training" value="Pratique" class="button">
                <input type="submit" name="play" value="Jouer" class="button">
                <input type="submit" name="quit" value="Quitter" class="button">
                <a href="?logout=true" class="button"> Quitter (temp)</a>
            </form>

        </section>
        
        <section class="decorate">
            <!-- chat -->
            <iframe style="width:700px;height:175px;"
				src="<?="https://magix.apps-de-cours.com/server/#/chat/".$_SESSION["key"]; ?>">
            </iframe>
        </section>
    </main>

<?php
	require_once("partial/footer.php");