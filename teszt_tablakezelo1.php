<!doctype html>
<html>
	<head>
		<title>Táblakezelő module</title>
		
		<script type="text/javascript" src="tablakezelo_plugin/jquery/jquery-1.8.2.js">
		</script>
		
		<script type="text/javascript" src="tablakezelo_plugin/jquery/jquery-ui-1.9.1.custom.js">
		</script>

		<link rel="stylesheet" type="text/css" href="tablakezelo_plugin/jquery/jquery-ui-1.9.1.custom.css">
		
		<script type="text/javascript" src="tablakezelo_plugin/js/tablakezelo.js">
		</script>
		
		<link rel="stylesheet" type="text/css" href="tablakezelo_plugin/css/tabla_skin1.css">
		
		<link rel="stylesheet" type="text/css" href="tablakezelo_plugin/css/ferrari.css">
		
		<link rel="stylesheet" type="text/css" href="tablakezelo_plugin/css/barbie.css">
		
	</head>
	<body>
	<DIV id="doboz">
	</DIV>
	
	
	<DIV id="doboz2" style="margin-top:30px">
	</DIV>
	
	<SCRIPT>
		$("#doboz").tablakezelo(
		{
			tabla:"termekek",
			sorok_szama_mutat:false,
			sorok_szama_felirat:"Termékek száma",
			after_open:function()//ez a tábla megjelenítése után hívódik meg
			{
				//alert("Betöltődés megtörtént!");
			},
			mezok:
			{
				termek_kep:"Termék képe",
				termek_nev:"Terméknév",
				termek_ar:"Ár"
			}
			,
			egyedi_az:"id"
			,
			ujsor:true /* megjelenik egy pl: + gomb amire kattintva kap egy űrlapot amit kitöltve hozzáad egy új sort a táblához */
			,
			torles:true /* ebben az esetben megjelenik a sor végén egy törlés gomb és végre is hajtja a kijelölt műveletet */
			,
			torles_felirat:"Törlés"
			,
			szerkeszt:true
			,
			sorbarend_mezok:["termeknev","ar"]
		});
		
		
		$("#doboz2").tablakezelo(
		{
			tabla:"users",
			sorok_szama_mutat:true,
			sorok_szama_felirat:"Felhasználók száma",
			skin:"ferrari.php",
			after_open:function()//ez a tábla megjelenítése után hívódik meg
			{
				//alert("Betöltődés megtörtént!");
			}
			,
			ujsor:true
			,
			torles:true
			,
			szerkeszt:true
			,
			sorbarend_mezok:["nev"]
			
		});
		
		
	</SCRIPT>
	
	</body>
</HTML>
	