var n = 0;
var backgroundPositionY = 0;
setInterval(function() {
	n += 1; //increment tick count
	if (n % 20 == 0) { //if 20 ticks have passed,
		backgroundPositionY += 1; //increment this variable and
		document.querySelector(".sidepanel").style.setProperty('--background-position-y', backgroundPositionY + "px"); //apply it to this CSS property
	}
	if (n % 250 == 0) { //if 250 ticks have passed,
		document.querySelectorAll(".title").forEach(title => { //for each element with the "title" class,
			title.textContent = title.textContent.toLowerCase().split('').map((c) => //replace that element's text content with an array made from each character in lowercase,
				Math.random() < .5 ? c : c.toUpperCase() //where each index of that array is randomly assigned to uppercase,
			).join(''); //and then that array is rejoined
		})
	};
	if (n % 250 == 0) { //if 250 ticks have passed,
		document.querySelectorAll(".subtitle").forEach(subtitle => {//for each element with the "subtitle" class,
			subtitle.style.fontFamily = (subtitle.style.fontFamily == "Scribbles No_ligatures") ? "Scribbles Variant No_ligatures" : "Scribbles No_ligatures"; //toggle that element's font between these two variables
/* Except it just... doesn't? */
		})
	};
})