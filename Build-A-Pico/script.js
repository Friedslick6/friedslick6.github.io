var label = document.getElementsByClassName('label');
console.log(window.getComputedStyle(label).getPropertyValue('--perceived-lightness'));
label.textContent = label.textContent.split('').map((v) =>
  Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
).join('');