/* Hungarian initialisation for the jQuery UI date picker plugin. */
/* Written by Istvan Karaszi (jquery@spam.raszi.hu). */
jQuery(function($){
	$.datepicker.regional['hu'] = {
		closeText: 'bez�r',
		prevText: 'vissza',
		nextText: 'el�re',
		currentText: 'ma',
		monthNames: ['Janu�r', 'Febru�r', 'M�rcius', '�prilis', 'M�jus', 'J�nius',
		'J�lius', 'Augusztus', 'Szeptember', 'Okt�ber', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'M�r', '�pr', 'M�j', 'J�n',
		'J�l', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vas�rnap', 'H�tf�', 'Kedd', 'Szerda', 'Cs�t�rt�k', 'P�ntek', 'Szombat'],
		dayNamesShort: ['Vas', 'H�t', 'Ked', 'Sze', 'Cs�', 'P�n', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		weekHeader: 'H�t',
		dateFormat: 'yy.mm.dd.',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hu']);
});
