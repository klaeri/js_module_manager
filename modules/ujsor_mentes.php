<?php
include("../ini.php");

include("connect.php");

$mezok=array();

$ertekek=array();

foreach( $_POST["mezok"] as $mezonev=>$ertek )
{
		array_push( $mezok , $mezonev );
		
		array_push( $ertekek , $ertek );
}

$pcs="insert into ".$_POST["tabla"]." ( ".implode(",",$mezok)." ) values ('".implode("','",$ertekek)."')";

$kapcsolat->query( $pcs );

print json_encode( $pcs );
?>