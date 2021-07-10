$.fn.tablakezelo=function(par)
{
	var sajatobj=this; //amelyikhez kapcsoltuk a plugin-t ( id='doboz' )
	
	var tablakezelo_obj=
	{
		osszes_par:par
		,
		mutat:function()
		{
			$.ajax(
			{
				url:"tablakezelo_plugin/modules/tabla_vissza.php"
				,
				type:"POST" 
				,
				dataType:"json" 
				,
				data:{"tabla":tablakezelo_obj.osszes_par.tabla , "mezok":tablakezelo_obj.osszes_par.mezok , "egyedi_az":tablakezelo_obj.osszes_par.egyedi_az , "sorbarend":tablakezelo_obj.sorbarend }
				,
				success:function(valasz) 
				{
					//létrehozunk egy tabla_adatok nevű tulajdonságot az objektumon belül amiben bármikor elérhető az  adott példány aktuális adatai
					tablakezelo_obj.tabla_adatok=valasz;
					
					//be van-e kapcsolva az új sor hozzáadása funkció
					if( tablakezelo_obj.osszes_par.ujsor )
					{
						tablakezelo_obj.ujsor_kezelo();
					}
					
					
					tablakezelo_obj.tabla_megjelenit(valasz);
				}
			});
		}
		,
		ujsor_kezelo:function()
		{
			//console.log( tablakezelo_obj.tabla_adatok );
			
			//létrehozom az új sor gombot
			var uj_sor_gomb=$("<BUTTON class='uj_sor_gomb' title='Új sor hozzáadása'>+</BUTTON>").appendTo( sajatobj );
			
			uj_sor_gomb.click(
			function()
			{
				var uj_sor_ablak=$("<DIV class='uj_rec_ablak' title='Új sor hozzáadása'>");
				
				uj_sor_ablak.dialog(
				{
					modal:true,
					resizable:false,
					width:400,
					open:function() { tablakezelo_obj.uj_sor_mezok_letrehoz($(this)) },
					position:{ my: "top", at: "top", of: window },
					close:function()
					{
						$(this).remove();
					}
				});
			});
			
		}
		,
		uj_sor_mezok_letrehoz:function(ablak)
		{
			//ablak.html("Eddig jó!");
			
			$.each( tablakezelo_obj.tabla_adatok.mezonevek , function( idx,item )
			{
				var placeh=item;
			
				if( tablakezelo_obj.osszes_par.mezok )
				{
					placeh=tablakezelo_obj.osszes_par.mezok[item];
				}
			
				if( item!="id" )
				{
					var egy_bev_mezo = $("<INPUT TYPE='TEXT' class='uj_rec_bev_mezo' placeholder='"+placeh+"' data-mezo='"+item+"'>").appendTo( ablak );
				}
			});
			
			var uj_rec_mentes_gomb=$("<BUTTON class='uj_rec_mentes_gomb'>Mentés</BUTTON>").appendTo( ablak );
			
			uj_rec_mentes_gomb.click(
			function()
			{
				var kuld_mezok={};
				
				var mezok=ablak.find(".uj_rec_bev_mezo");
				
				for( var i=0;i<mezok.length;i++ )
				{
					kuld_mezok[ $(mezok[i]).data("mezo") ] = $(mezok[i]).val().trim();
				}
				
				//console.log( kuld_mezok );
				$.ajax(
				{
					url:"tablakezelo_plugin/modules/ujsor_mentes.php"
					,
					type:"POST" 
					,
					dataType:"json" 
					,
					data:{"tabla":tablakezelo_obj.osszes_par.tabla , "mezok":kuld_mezok }
					,
					success:function(valasz) 
					{
						ablak.remove(); //ablak bezárása
						
						sajatobj.empty(); //a container ürítése
						
						tablakezelo_obj.mutat(); //újra megjelenítjük a friss táblát
					}
				});
				
			});
			
		}
		,
		tabla_megjelenit:function(adatok)
		{
			if( tablakezelo_obj.osszes_par.sorok_szama_mutat )
			{
				$("<DIV>"+tablakezelo_obj.osszes_par.sorok_szama_felirat+":"+adatok.sorok_szama+"</DIV>").appendTo( sajatobj ); 
			}
			
			//adatok.sorok megjelenítése egy HTML táblázatban!!!
			if( !tablakezelo_obj.osszes_par.skin )
			{
				var skin="tabla_skin1.php";
			}
			else
			{
				var skin=tablakezelo_obj.osszes_par.skin;
			}
			
			$.get("tablakezelo_plugin/templates/"+skin , function( visszatemp )
			{
				var tempobj=$().add(visszatemp);
				
				var fejlec_sor=adatok.sorok[0];
				
				var etalon_f_cella=tempobj.find(".header_cell").clone(true,true);
				
				tempobj.find(".header_cell").remove();
				
				$.each( fejlec_sor , function( idx,item )
				{
					if( idx != tablakezelo_obj.osszes_par.egyedi_az )
					{
						var egy_f_cella=etalon_f_cella.clone(true,true);
						
						//az adott mező be van-e állítva sorbarendezhető mezőnek
						if( tablakezelo_obj.osszes_par.sorbarend_mezok )
						{
							var keresmezo= adatok.mezonevek[idx];
							
							if( tablakezelo_obj.osszes_par.sorbarend_mezok.indexOf(keresmezo) > -1 ) //megtalálta a tömbön belül
							{
								var cella_tartalom="<FONT style='text-decoration:underline;cursor:pointer'>"+idx+"</FONT>";
							}
							else var cella_tartalom=idx;
						}
						else var cella_tartalom=idx;
						
						egy_f_cella.html(cella_tartalom);
						
						egy_f_cella.find("FONT").click(
						function()
						{
							//alert("ok");
							//hozzáadok egy új tulajdonságot az adott obj.példányhoz
							if( tablakezelo_obj.sorbarend )
							{
								if( tablakezelo_obj.sorbarend.indexOf(keresmezo) > -1  )
								{
									if( tablakezelo_obj.sorbarend.indexOf("DESC") > -1 )
									{
										tablakezelo_obj.sorbarend=keresmezo;
									}
									else tablakezelo_obj.sorbarend=keresmezo+" DESC";
								}
								else tablakezelo_obj.sorbarend=keresmezo;
							}
							else
							tablakezelo_obj.sorbarend=keresmezo;
							
							sajatobj.empty();
							
							tablakezelo_obj.mutat();
						});
						
						tempobj.find(".header_row").append( egy_f_cella );
					}
				});
				
				//tábla sorainak megjelenítése
				var etalon_sor= tempobj.find(".content_row").clone(true,true);
				
				var etalon_a_cella=tempobj.find(".content_cell").clone(true,true);
				
				tempobj.find(".content_row").remove();
				
				$.each( adatok.sorok , function( sor_idx , sor_item )
				{
					var egy_adat_sor=etalon_sor.clone(true,true);
					
					egy_adat_sor.find(".content_cell").remove();
					
					$.each( sor_item , function( adat_idx , adat_item )
					{	
						if( adat_idx != tablakezelo_obj.osszes_par.egyedi_az )
						{
						
						var adat_cella=etalon_a_cella.clone(true,true);
						
						adat_cella.html( adat_item );
						
						adat_cella.appendTo( egy_adat_sor );
						
							//ha engedélyezem a szerkesztést akkor dblclick-re történik
							if( tablakezelo_obj.osszes_par.szerkeszt )
							{
								if( tablakezelo_obj.osszes_par.egyedi_az )
								{
									var akt_id= tablakezelo_obj.osszes_par.egyedi_az;
								}
								else var akt_id="id";
								
								
								adat_cella.dblclick(
								function()
								{
									tablakezelo_obj.cella_szerkeszt( adatok.mezonevek[adat_idx] , adat_item , sor_item[akt_id] , $(this) ,akt_id );
								});
							}
						
						}
					});
					
					//ha be van állítva a törlési lehetőség akkor újabb cella benne a gomb-al
					//ha be van kapcsolva a törlés funkció
					if( tablakezelo_obj.osszes_par.torles )
					{
						var adat_cella=etalon_a_cella.clone(true,true);
						
						adat_cella.empty();
						
						if( tablakezelo_obj.osszes_par.torles_felirat )
						{
							var f=tablakezelo_obj.osszes_par.torles_felirat;
						}
						else var f="X";
						
						var torles_gomb=$("<BUTTON>"+f+"</BUTTON>").appendTo( adat_cella );
						
						torles_gomb.click(
						function()
						{
							if( tablakezelo_obj.osszes_par.egyedi_az )
							{
								var akt_id= tablakezelo_obj.osszes_par.egyedi_az;
							}
							else var akt_id="id";
						
							tablakezelo_obj.sor_torlese( akt_id , sor_item[akt_id] ); 
						});
						
						
						adat_cella.appendTo( egy_adat_sor );
					}
					
					
					//hozzáadom a sort
					egy_adat_sor.appendTo(tempobj);
				});
				//vége sorok megjelenítése
				
				tempobj.appendTo( sajatobj );
			});
			
			if( tablakezelo_obj.osszes_par.after_open ) //van-e megadott after_open eseménykezelő
			{
				tablakezelo_obj.osszes_par.after_open();
			}
		}
		,
		sor_torlese:function( mezo , ertek ) 
		{
			// confirm -> választó ablak
			if( confirm("Valóban törölni kívánja a tételt?") )
			{
				$.ajax(
				{
					url:"tablakezelo_plugin/modules/torol_tetel.php"
					,
					type:"POST" 
					,
					dataType:"json" 
					,
					data:{"tabla":tablakezelo_obj.osszes_par.tabla , "egyedi_az":mezo , "ertek":ertek }
					,
					success:function(valasz) 
					{
						sajatobj.empty(); //a container ürítése
						
						tablakezelo_obj.mutat(); //újra megjelenítjük a friss táblát
					}
				});
			}
		}
		,
		cella_szerkeszt:function( mod_mezo , mod_ertek , egyedi_ertek , cella , egyedi_mezo )
		{
				//alert( mod_mezo+","+mod_ertek+","+egyedi_mezo );
				
				//var ment_ertek=cella.html();
				
				if( cella.find(".szerk_cella").length==0 )
				{
					cella.empty();
					
					var szerk_mezo=$("<INPUT class='szerk_cella' TYPE='TEXT' value='"+mod_ertek+"'>").appendTo(cella);
					
					szerk_mezo.keydown(
					function(e)
					{
						if( e.keyCode==13 ) 
						{
							
							//update tábla neve set mező neve = új érték where egyedi_az=sor egyedi értékkel
							
							var kuldes=
							{
								"tabla":tablakezelo_obj.osszes_par.tabla
								,
								"mezonev":mod_mezo
								,
								"uj_ertek":szerk_mezo.val().trim()
								,
								"egyedi_mezo":egyedi_mezo
								,
								"egyedi_ertek":egyedi_ertek
							};
								
							//console.log(kuldes);
							$.ajax(
							{
								url:"tablakezelo_plugin/modules/mod_tetel.php"
								,
								type:"POST" 
								,
								dataType:"json" 
								,
								data:kuldes
								,
								success:function(valasz)
								{
									cella.html( szerk_mezo.val().trim() );
									
									szerk_mezo.remove();
								}
							});
							
							
						}
						
						if( e.keyCode==27 ) 
						{
							$(this).remove();
							
							cella.html( mod_ertek );
						}
					});
					
					szerk_mezo.focus(); //kurzor megjelenítése
				}
		}
		
	};
	
	tablakezelo_obj.mutat();
	
	return tablakezelo_obj;
}