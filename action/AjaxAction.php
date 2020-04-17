<?php
	require_once("action/CommonAction.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

        protected function executeAction() {
            $data["key"] = $_SESSION["key"];
            
            // Utilisation de l'API fourni avec le service "games/state"
            $result = CommonAction::callAPI("games/state", $data);

			return compact("result");
		}
	}
