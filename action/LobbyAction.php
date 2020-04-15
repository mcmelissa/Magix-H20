<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
            // Option : QUITTER
			if(isset($_POST['quit'])) {

				$data["key"] = $_SESSION["key"];
				CommonAction::callAPI("signout", $data);

				//$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
				// Quand déloggé, est dirigé vers l'index
				header("location:?logout=true");
				// header("location:?index.php");
				exit;
			}
			// ne retourne que la validite de la connection
			//return compact("connectionError");
		}
    } 