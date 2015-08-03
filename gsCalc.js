var ay=0, wx=0, pz=0, precArtic=0.0, volreal=0.0, volreal_int = 0, volreal_dec= 0, arrvolreal;
var const_bl = 0.0, const_doc = 0.0;
var plgCubic = 0, piesCubic = 0, ocfr = 0, bunker = 0, sed= 0, lbsvol = 0, entrega = 0.0, ptyitbmsporcent = 0.07, tramiteaduana = 0.0;
var currflete = 0, curritmbs=0, currtotal= 0.0;

$(document).ready(function(){
	const_bl = 35.00;
	const_doc= 50.00;
	ocfr= 170.00;
	bunker = 30.00;
	sed = 0.0;
	entrega = 50.00;

	console.log("Init calculation...");
     
	$("#lblBL").html( 'BL = $'.concat(const_bl.toFixed(2)));
	$("#lblDOC").html('DOCUMENTACION = $'.concat(const_doc.toFixed(2)));

	$("#txtvolumen").val(volreal);


	$("#btncalc").click(function() {
		/*alert("this button was clicked!");*/

		ay = $("#txtaltura").val();
		wx = $("#txtancho").val();
		pz = $("#txtprofundidad").val();
		precArtic = $("#txtprecioweb").val();

		volreal = ay * wx * pz;
		

		console.log(volreal.toString());
		
		piesCubic = volreal * 0.000578704;
		//piesCubic = (volreal * 0.000578704) % 1;

		arrvolreal = piesCubic.toString().split(".");
		console.log('parte entera de pies cubicos :' + arrvolreal[0]);
		console.log('parte decimal de pies cubicos:' + arrvolreal[1]);

		if (parseInt(arrvolreal[1]) > 0){
			piesCubic = parseInt(arrvolreal[0])+ 1;
		}
		else{
			piesCubic = parseInt(arrvolreal[0]);
		}


		ocfr = piesCubic * 2.00;
		if( ocfr <= 85.00){
			ocfr = 170.00;
		}	

		bunker = (piesCubic * 1.70) * 0.10;

		if(precArtic >= 2500.00){
			sed = 25.00;
		}


		lbsvol = volreal / 166; 
		/*entrega = (lbsvol/100) * 2.30;*/

		if(lbsvol <= 2200){
			entrega = 50.00
		}else{
			entrega = (lbsvol/100) * 2.30;
		}

		currflete = const_doc + const_bl + ocfr + bunker + sed + entrega; 

		tramiteaduana = 50.00 + (precArtic * 0.10);

		curritmbs = (tramiteaduana + currflete) * ptyitbmsporcent;
		
		currtotal = parseFloat(precArtic) + currflete + curritmbs + tramiteaduana;

		console.log('monto - pies cubicos : $' + piesCubic.toString());
		console.log('monto - OceanFreight : $' + ocfr.toString());
		console.log('monto - Bunker : $' + bunker.toFixed(2).toString());
		console.log('monto - SED : $' + sed.toString());
		console.log('monto - Libras volumetrica : ' + lbsvol.toString());
		console.log('monto - Entrega : $' + entrega.toString());
		console.log('monto - Flete: $' + currflete.toFixed(2).toString());
		console.log('monto - Tramite Aduanal: $' + tramiteaduana.toFixed(2).toString());
		console.log('monto - Impuesto I.T.B.M.S.: $' + curritmbs.toFixed(2).toString());
		console.log('monto - Total Neto : $' + currtotal.toFixed(2).toString());

		AsignarValores();
	});

});

function AsignarValores()
{
	$("#txtvolumen").val(volreal);
	$("#txtCF").val(piesCubic);
	$("#txtof").val(ocfr);
	$("#txtbunker").val(bunker.toFixed(2));
}
