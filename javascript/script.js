let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});


const drinks = [
  { src: 'pictures/forside-slider-1.webp', text: 'FORFRISKENDE SAFT'},
  { src: 'pictures/forside-slider-2.webp', text: 'KAFFEBØNNER AF HØJ KVALITET'}
];

let currentIndex = 0;

function updateSlide() {
  const drinkImage = document.querySelector('#drinkImage');
  const drinkType = document.querySelector('#drinkType');

  drinkImage.style.opacity = 0;

  setTimeout(function() {
    drinkImage.src = drinks[currentIndex].src;
    drinkType.textContent = drinks[currentIndex].text;

    drinkImage.style.opacity = 1;
  }, 500);

  currentIndex = 1 - currentIndex;

  setTimeout(updateSlide, 5500);
}
updateSlide();




