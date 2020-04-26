<?php
	require_once("action/LobbyAction.php");
	$action = new LobbyAction();
    $data = $action->execute();

	require_once("partial/header.php")
?>

<body id="lobby">
    <main>
        <section>
            <h3>¡Bonyour Amigó!</h3>
            <h3>¿Qu'est-cè què ça sèra?</h3>

            <!-- if connection to game failed -->
            <?php
                if ($data["connectionError"]) {
                ?>
                    <div class="error">Erreur: <?= $_SESSION["result"] ?> </div>
                <?php
                }
            ?>
            <!-- - - - - - - - - - - - - - - -->

            <form action="lobby.php" method="post">
                <input type="submit" name="training" value="Pratique" class="button">
                <input type="submit" name="play" value="Jouer" class="button">
                <input type="submit" name="quit" value="Quitter" class="button">
            </form>

        </section>
        
        <section class="decorate">
            <!-- chat -->
             <!-- j'ai choisi de ne pas modifier le style, la lecture est plus facile -->
            <iframe style="width:700px;height:200px;"
				src=https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION["key"]?>>
            </iframe>
        </section>
    </main>

<?php
	require_once("partial/footer.php");