<?php

require_once("../autoloader.php");

$docker = new DockerAPI\Call();
$docker->get("images/json");
//$docker->get("containers/json");
//$docker->get("volumes");

?>
