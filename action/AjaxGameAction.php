<?php
	require_once("action/CommonAction.php");

	class AjaxGameAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

        protected function executeAction() {
            $data["key"] = $_SESSION["key"];
            
            // Utilisation de l'API fourni avec le service "games/action"
            // Option : TERMINER SON TOUR
            if (isset($_POST['endTurn'])) {
				$data["type"] = "END_TURN";
				$result = CommonAction::callAPI("games/action", $data);
            }
            // Option : POUVOIR DU HERO
            else if (isset($_POST['heroPower'])) {
                $data["type"] = "HERO_POWER";
				$result = CommonAction::callAPI("games/action", $data);
            }
            // Option : POUVOIR DU HERO
            else if (isset($_POST['play'])) {
                $data["type"] = "PLAY";
                //$data["uid"] = ??
                $result = CommonAction::callAPI("games/action", $data);
            }
            // Option : ATTAQUER
            else if (isset($_POST['attack'])) {
                $data["type"] = "ATTACK";
                //$data["uid"] = ??
                //$data["targetuid"] = ??
				$result = CommonAction::callAPI("games/action", $data);
            }
			
			return compact("result");
		}
	}
