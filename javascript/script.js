const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  toggle.addEventListener('click', () =>{
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu')

      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle','nav-menu')


const drinks = [
  { src: 'pictures/forside-slider-1.webp', text: 'FORFRISKENDE SAFT'},
  { src: 'pictures/forside-slider-2.webp', text: 'KAFFEBØNNER AF HØJ KVALITET'}
];

let currentIndex = 0;

function updateSlide() {
  const drinkImage = document.querySelector('#drinkImage');
  const drinkType = document.querySelector('#drinkType');


  drinkImage.src = drinks[currentIndex].src;
  drinkType.textContent = drinks[currentIndex].text;


  currentIndex = 1 - currentIndex;

  setTimeout(updateSlide, 5000);
}
updateSlide();




