<?php
include("../ini.php");

include("connect.php");

if( isset( $_POST["mezok"] ) )
{
	$mezonevek=array();

	$mezotomb=array();
	
	foreach( $_POST["mezok"] as $mezonev=>$alias )
	{
		//array_push($mezonevek,$mezonev);
	
		$mezonevek[$alias]=$mezonev;
	
		array_push( $mezotomb,$mezonev." as '".$alias."'" );
	}
	
	if( isset($_POST["egyedi_az"]) )
	{
		array_push( $mezotomb,$_POST["egyedi_az"] );
	}
	
	
	$mezok=implode(",", $mezotomb );
	/*a tömb elemeit felhasználva készít egy adott szeparációs karakterrel elválasztott szöveget. pl: [ "Hétfő","Kedd","Szerda" ] =>
	
	implode(";;",$tomb) => Hétfő;;Kedd;;Szerda
	
	*/
}
else 
{
	$mezok="*";

	$mezonevek=array();
}

if( isset($_POST["sorbarend"]) )
{
	$sorbarend=" order by ".$_POST["sorbarend"];
}
else $sorbarend="";


$vissza=$kapcsolat->query("select ".$mezok." from ".$_POST["tabla"].$sorbarend);

if( !isset( $_POST["mezok"] ) ) //ha nem postoltunk át konkrét mezőneveket
{
	//visszaadott mezők lekérdezése ,ha nem adtunk át konkrét mezőket
	while( $vissza_mezok=mysqli_fetch_field($vissza) )
	{
		//array_push( $mezonevek,$vissza_mezok->name);
		$mezonevek[$vissza_mezok->name]=$vissza_mezok->name;
	}
}

$valasz=array();

$valasz["sorok_szama"]=mysqli_num_rows( $vissza );

$valasz["sorok"]=array();

$valasz["mezonevek"]=$mezonevek;

while( $sor=mysqli_fetch_assoc($vissza) )
{
	array_push( $valasz["sorok"],$sor );
}

print json_encode($valasz);
?>