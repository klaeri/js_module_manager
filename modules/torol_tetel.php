<?php
include("../ini.php");

include("connect.php");

$kapcsolat->query("delete from ".$_POST["tabla"]." where ".$_POST["egyedi_az"]."='".$_POST["ertek"]."'");

print json_encode("ok");
?>