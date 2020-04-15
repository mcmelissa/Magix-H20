<?php
    require_once("action/IndexAction.php");
    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

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
            <input type="text" name="username">
        </section>
        <section>
            <label for="password">Mot de passe:</label>
            <input type="password" name="password">
        </section>

        <input type="submit" value="Connexion" class="button">
    </form>

<?php
	require_once("partial/footer.php");