<?php
    require_once("action/IndexAction.php");
    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<script src="./js/indexAnimation.js"></script>
<script src="js/sprite/Thumbleweed.js"></script>
<script src="js/sprite/Explosion.js"></script>
<script src="js/TiledImage.js"></script>

<body id="login">
    <form action="index.php" class="decorate" method="post">
        
    <!-- if login failed -->
    <?php
        if ($data["connectionError"]) {
        ?>
            <div class="error">Connection erronée, veuillez réessayer</div>
        <?php
        }
    ?>
    <!-- - - - - - - - - -->
    
        <section>
            <label for="username">Nom d'usager:</label>
            <input type="text" name="username" id="keyStorage">
        </section>
        <section>
            <label for="password">Mot de passe:</label>
            <input type="password" name="password">
        </section>

        <input type="submit" value="Connexion" class="button" id="localStorage">
    </form>
    <canvas id="canvas"></canvas>

<?php
	require_once("partial/footer.php");