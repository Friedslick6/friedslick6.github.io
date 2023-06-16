const titles = Array.from(document.querySelectorAll(".title"));
let frameCount = 0;

function animateTitles() {
	frameCount++;

	if (frameCount % 15 === 0) {
		titles.forEach(title => {
			let newContent = Array.from(title.textContent.toLowerCase(), char => {
				return Math.random() < 0.5 ? char : char.toUpperCase();
			}).join("");

			title.textContent = newContent;
		});
	}

	requestAnimationFrame(animateTitles);
}

requestAnimationFrame(animateTitles);