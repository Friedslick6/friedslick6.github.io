setInterval(function () {
		document.querySelectorAll(".title").forEach((title) => {
			//for each element with the "title" class,
			title.textContent = title.textContent
				.toLowerCase()
				.split("")
				.map(
					(
						c //replace that element's text content with an array made from each character in lowercase,
					) => (Math.random() < 0.5 ? c : c.toUpperCase()) //where each index of that array is randomly assigned to uppercase,
				)
				.join(""); //and then that array is rejoined
		});
},250);
