$("form").on( "submit", function( event ) {
  event.preventDefault();
  $("canvas").toggleClass("show");
  var lastName=$("#lastName").val();
  var firstName=$("#firstName").val();
  tartan(lastName, firstName);
});

function tartan(lastName, firstName){
var lName = lastName.toUpperCase();
var fName = firstName.toUpperCase();

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alpha = alphabet.split("");

var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');


var lNameArray = lName.split("");
var fNameArray = fName.split("");

var lHueArray = [];
var fHueArray = [];


//Select colours
for (var i=0;i<lNameArray.length;i++){
	for (var j=0;j<alpha.length;j++){
		if (lNameArray[i] === alpha[j]){
			var lLetterIndex = j;
			var col = Math.floor(lLetterIndex*360/26);
			lHueArray[i] = col;
		}
	}
}

for (var k=0;k<fNameArray.length;k++){
	for (var l=0;l<alpha.length;l++){
		if (fNameArray[k] === alpha[l]){
			var fLetterIndex = l;
			var light = Math.floor(fLetterIndex*80/26 + 20);
			fHueArray[k] = light;
		}
	}
}


// Build stripe sizes
var fNameArrayAlpha = fNameArray.sort();
var fLetterIndexAlpha = [];

for (var a=0;a<fNameArrayAlpha.length;a++){
	for (var b=0;b<alpha.length;b++){
		if (fNameArrayAlpha[a] === alpha[b]){
			fLetterIndexAlpha[a] = b;
		}
	}
}
var smallSpace = fLetterIndexAlpha[0]+1;
var largeSpace = fLetterIndexAlpha[fLetterIndexAlpha.length-1];
var firstSpace = fName.length;
var secondSpace = lName.length;


//Call function to build canvas
for (var m=0;m<lHueArray.length;m++){
	for (var n=0;n<fHueArray.length;n++){
		makeColourful(lHueArray[m], fHueArray[n], m, n);
	}
}	


//Function that builds canvas (add in smallSpace, largeSpace, firstSpace, secondSpace)
function makeColourful(colour, lightness, m, n) {	

	var width = smallSpace;
	var height = firstSpace;

	for(x=0;x<10;x++){
		for(y=0;y<10;y++){
			ctx.fillStyle="hsl(" + colour + ", 100%, " + lightness +"%)";
			ctx.fillRect(0+100*n+100*fNameArray.length*x,0+100*m+100*lNameArray.length*y,100,100);

			ctx.fillStyle="hsl(" + colour + ", 100%, 10%)";
			ctx.fillRect(20+100*n+100*fNameArray.length*x, 0, width, 100+100*m+100*lNameArray.length*y);

			ctx.fillStyle="hsl(" + colour + ", 100%, 80%)";
			ctx.fillRect(0, 20+100*m+100*lNameArray.length*y, 100+100*n+100*fNameArray.length*x, height);
		}
	}


}
}