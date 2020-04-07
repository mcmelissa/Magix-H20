<?php
	session_start();

	abstract class CommonAction {

		// constantes
		public static $VISIBILITY_PUBLIC = 0;
		public static $VISIBILITY_MEMBER = 1;
		public static $VISIBILITY_MODERATOR = 2;
		public static $VISIBILITY_ADMINISTRATOR = 3;

		private $pageVisibility;

		public function __construct($pageVisibility){

			$this->pageVisibility = $pageVisibility;
		}


		public function execute() {

			if (!empty ($_GET["logout"])) {
				session_unset();
				session_destroy();
				session_start();
			}

			if ( !isset($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}

			// essayer d'accéder à une page sans avoir les droits, retour à la page de connection
			if ($_SESSION["visibility"] < $this->pageVisibility) {
				header("location:login.php"); //redirection
				exit();
			}

			// exécute le code de l'enfant
			// patron de conception: template method
			$data = $this->executeAction(); //retourne un tableau

			$data["isConnected"] = $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;
			$data["username"] = empty($_SESSION["username"]) ? null : $_SESSION["username"];
			$data["password"] = "' test '";

			return $data;
		}

		// méthode abstraite: à définir dans les sous-classes
		protected abstract function executeAction();
	}