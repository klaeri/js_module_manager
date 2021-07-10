<?php
include("../ini.php");

include("connect.php");

$kapcsolat->query("update ".$_POST["tabla"]." set ".$_POST["mezonev"]."='".$_POST["uj_ertek"]."' where ".$_POST["egyedi_mezo"]."='".$_POST["egyedi_ertek"]."'");

print json_encode("ok");

?>