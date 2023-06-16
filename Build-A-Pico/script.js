const titles = document.querySelectorAll(".title");
let frameCount = 0;

function animateTitles() {
	frameCount++ % 15 == 0 && titles.forEach(title => {
		let text = title.textContent.toLowerCase(),
			length = text.length,
			randomizedCaseTextContent = [];
		for (let i = 0; i < length; i++) {
			let char = text[i];
			randomizedCaseTextContent += Math.random() < .5 ? char : char.toUpperCase()
		}
		title.textContent = randomizedCaseTextContent
	}), requestAnimationFrame(animateTitles)
}
requestAnimationFrame(animateTitles);