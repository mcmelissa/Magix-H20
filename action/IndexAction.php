<?php
	require_once("action/CommonAction.php");

	class IndexAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$connectionError = false;
			//$data = [];
			
            //if (isset($_POST["username"], $_POST["password"])) {
			if (isset($_POST["username"]) && isset($_POST["password"])) {	
				var_dump($data);
                $data["username"] = $_POST["username"];
				$data["password"] = $_POST["password"];
				
				$result = CommonAction::callAPI("signin", $data);

				if ($result == "INVALID_USERNAME_PASSWORD") {
					$connectionError = true;
				}
				// suite aux verifications de $result, assigner des variables de session 
				else {
					// Verifier resultats : var_dump($result);
					$_SESSION["username"] = $_POST["username"];
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
					$key = $result->key;
					$_SESSION["key"] = $key;
					// Quand loggé, est dirigé vers le Lobby
					header("location:lobby.php");
					exit;
				}
			}
			// ne retourne que la validite de la connection
			return compact("connectionError");
		}
    }