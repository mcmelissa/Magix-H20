<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$connectionError = false;
			
            if (isset($_POST["username"], $_POST["password"])) {
                $data["username"] = $_POST["username"];
				$data["password"] = $_POST["password"];
				
				// Utilisation de l'API fourni avec le service "signin"
				$result = CommonAction::callAPI("signin", $data);

				if ($result == "INVALID_USERNAME_PASSWORD") {
					$connectionError = true;
				}
				else {
					// suite aux verifications de $result, assigner des variables de session 
					$key = $result->key;
					$_SESSION["key"] = $key;
					$_SESSION["username"] = $_POST["username"];
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;

					// Quand loggé, est dirigé vers le Lobby
					header("location:lobby.php");
					exit;
				}
			}
			// ne retourne que la validite de la connection
			return compact("connectionError");
		}
    }