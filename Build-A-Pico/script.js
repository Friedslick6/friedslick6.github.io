const titles = document.querySelectorAll(".title"),
	nameInput = document.querySelector('#name-input');
let frameCount = 0;

nameInput.addEventListener("keypress", function(event) {
	this.innerHTML.length >= this.getAttribute("maxlength") && event.preventDefault()
});

function animateTitles() {
	frameCount++ % 15 == 0 && titles.forEach(title => {
		if (title !== document.activeElement) {
			let text = title.textContent.toLowerCase(),
				length = text.length,
				randomizedCaseTextContent = [];
			for (let i = 0; i < length; i++) {
				let char = text[i];
				randomizedCaseTextContent += Math.random() < .5 ? char : char.toUpperCase()
			}
			title.textContent = randomizedCaseTextContent;
		}
	});
	requestAnimationFrame(animateTitles);
}

requestAnimationFrame(animateTitles);

/* Test parameters:
?n=Melon&0=000000&1=8fd77d&2=c3e584&3=f0ee88&4=ffe789&5=ffdcac&6=ffe4c1&7=ffedd6&8=fff0e7&9=edffe9&10=ff673c&11=1bff50&12=a6f072&13=002c56&14=9bc0e5&15=ffffff */