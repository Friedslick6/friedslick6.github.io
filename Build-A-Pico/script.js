const titles = document.querySelectorAll(".title");
let frameCount = 0;

function animateTitles() {
	frameCount++;

	if (frameCount % 15 === 0) {
		titles.forEach(title => {
			title.textContent = title.textContent.replace(/[a-z]/gi, (match) => {
				return Math.random() < 0.5 ? match.toLowerCase() : match.toUpperCase();
			});
		});
	}

	requestAnimationFrame(animateTitles);
}

requestAnimationFrame(animateTitles);