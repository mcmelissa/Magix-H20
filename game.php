<?php
	require_once("action/GameAction.php");
	$action = new GameAction();
    $data = $action->execute();

    require_once("partial/header.php")
?>
<script src="./js/jquery.min.js"></script>
<script src="./js/game.js"></script>
<script src="./js/sprite/Card.js"></script>

<body id="game">
    <main>
        <!---------------------------
            INFOS DE L'ADVERSAIRE
        ---------------------------->
        <section class="opponentGame">

            <div class="hero">
                <div class="heroImage"></div>

                <div class="infos">
                    <h1 class="name"></h1>
                    <div class="heroType"></div>
                    <h3></h3>
                </div> 

                <h1 class="hp"></h1>

                <h1 class="mana"></h1>
            </div>

            <div class="deck"> <!-- cartes --> </div>
            
            <h1 class="remainingDeck"></h1>
        </section>

        <!---------------------------
            LE JEU
        ---------------------------->

        <section class= "chat">
            <input type="checkbox">
            <h1>chat</h1> 
            <div class="decorate show">
                <iframe style="width:700px;height:100px;"
                src=https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION["key"]?>>
                </iframe>
            </div>
        </section>

        <section class="time"></section>

        <section class="board"> 
            <!-- h1 : annoncer la attente/fin du jeu -->
            <div class="opponentBoard"></div>
            <div class="myBoard"></div>
        </section>

        <!---------------------------
            MES INFOS
        ---------------------------->
        <section class="myGame">
            <div class="hero">
                <div class="heroImage"></div>
                
                <div class="infos">
                    <h1 class="name"><?=$data["username"]?></h1>
                    <div class="heroType"></div>
                    <h3></h3>
                
                </div>
                
                <h1 class="hp"></h1>
                
                <h1 class="mana"></h1>
            </div>
            
            <div class="deck"> <!-- cartes --> </div>
            
            <h1 class="remainingDeck"></h1>
        </section>
    </main>
<?php
	require_once("partial/footer.php");