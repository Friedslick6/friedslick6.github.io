const titles = document.querySelectorAll(".title");
let frameCount = 0;

function animateTitles() {
	++frameCount % 15 == 0 && titles.forEach(title => {
		title.textContent = title.textContent.replace(/[a-z]/gi, match => .5 > Math.random() ? match.toLowerCase() : match.toUpperCase())
	}), requestAnimationFrame(animateTitles)
}
requestAnimationFrame(animateTitles);