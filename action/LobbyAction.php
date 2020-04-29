<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			$connectionError = false;
			$data["key"] = $_SESSION["key"];

			// Option : PRATIQUE -->  service "games/auto-match"
			if (isset($_POST['training'])) {
				$data["type"] = "TRAINING";
				$result = CommonAction::callAPI("games/auto-match", $data);

				// Gerer les erreurs
				// (ici nous supposons que nous avons tjs un 'key' et un 'game_type' valides)
				if ($result == "DECK_INCOMPLETE") {
					$connectionError = true;
					$_SESSION["result"] = $result;
				}
				else {
					// Acceder au jeu (pratique ou contre qqun)
					header("location:game.php");
					exit;
				}
			}
			// Option : JOUER  -->  service "games/auto-match"
			else if (isset($_POST['play'])) {
				$data["type"] = "PVP";
				$result = CommonAction::callAPI("games/auto-match", $data);

				// Gerer les erreurs
				if ($result == "MAX_DEATH_THRESHOLD_REACHED") {
					$connectionError = true;
					$_SESSION["result"] = $result;
				}
				else {
					// Acceder au jeu (pratique ou contre qqun)
					header("location:game.php");
					exit;
				}
			}
			// Option : QUITTER  -->  service "signout"
			else if (isset($_POST['quit'])) {
				CommonAction::callAPI("signout", $data);

				// Quand déloggé, est dirigé vers l'index (VISIBILITY redevient PUBLIC)
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
				header("location:?logout=true");
				exit;
			}
			// Option : OBSERVER  -->  service "games/observe"
			if (!empty($_POST['observed']) && isset($_POST['observe'])) {
				
				$result = null;
				$data["username"] = $_POST["observed"];
				$result = CommonAction::callAPI("games/observe", $data);
				// var_dump($result);

				// Gerer les erreurs
				if ($result == "INVALID_KEY") {
					$connectionError = true;
					$_SESSION["result"] = $result;
				}
				else {
					// Acceder au jeu du joueur selectionné
					header("location:game.php");
					exit;
				}
			}
			// ne retourne que la validite de la connection
			// return compact("connectionError");
			return compact("result");
		}
    } 