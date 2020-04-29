<?php
	require_once("action/CommonAction.php");

	class AjaxGameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

        protected function executeAction() {
            // Utilisation de l'API fourni avec le service "games/action"
            // données générales
            $data["key"] = $_SESSION["key"];
            $data["type"] = $_POST["type"];

            // Option : PLAY
            if ($data["type"] == "PLAY") {
                $data["uid"] = $_POST["uid"];
            }
            // Option : ATTAQUER
            else if ($data["type"] == "ATTACK") {
                $data["uid"] = $_POST["uid"];
                $data["targetuid"] = $_POST["targetuid"];
            }

            $result = CommonAction::callAPI("games/action", $data);
            
			return compact("result");
		}
    }
    
    
