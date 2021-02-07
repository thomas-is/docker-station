<?php

require_once("../autoloader.php");

$docker = new DockerAPI\Call();
$docker->get("services");

?>
