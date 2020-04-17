const state = () => {
    $.ajax({
        url : "ajax-state.php", // Le contrôleur/action de cette page appelle mon API.
        type : "POST"
    })
    .done(function (msg) { 
        let reponse = JSON.parse(msg);
        console.log(reponse);
        
        // traitement ici…
        let parent = document.querySelector(".myGame");
        
		this.node = document.createElement("div");
        this.node.className = "test2";
        
        //toute la page
        //document.body.innerText = reponse.hand;
        
        //s'ajoute continuellement dans 'section'
		parent.appendChild(this.node).innerText = reponse.remainingTurnTime; 

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })

    //quand il y a un probleme avec la requete
    .fail(function(msg) {
        $('.test').html("ERREUR");
        $('.test').addClass("erreur");
    })
    //tjr réalisé
    .always(function(msg){
        $('.test').addClass("test")
    });
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

