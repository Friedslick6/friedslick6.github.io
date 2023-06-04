var n = 0;
setInterval(function() {
	n += 1;
	if (n % 20) document.querySelector(".sidepanel").style.setProperty('--background-position-y', n + "px");
	if (n % 250) {
		document.querySelectorAll(".title").forEach(title => {
			title.textContent = title.textContent.toLowerCase().split('').map((c) =>
				Math.random() < .5 ? c : c.toUpperCase()
			).join('');
		});
		document.querySelectorAll(".subtitle").forEach(subtitle => {
			subtitle.style.fontFamily = (subtitle.style.fontFamily == "Scribbles No_ligatures") ? "Scribbles Variant No_ligatures" : "Scribbles No_ligatures";
		});
	}
})