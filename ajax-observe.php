<?php    
	require_once("action/AjaxObserveAction.php");

	$action = new AjaxObserveAction();
	$data = $action->execute();
	
	echo json_encode($data["result"]);