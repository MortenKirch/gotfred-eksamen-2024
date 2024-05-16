<<<<<<< Updated upstream
let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});
=======


// Select the parent element where the figures will be appended
const parentElement = document.getElementById('myForm');
const url = "../json/kager.json";
// Fetch the JSON data
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the fetched data
        const kageData = data.kager;

        // Loop through each kage and create the figure elements

// Inside the .then() block where you're processing the fetched data
kageData.forEach(kage => {
  const figure = document.createElement('figure');
  figure.classList.add('produkt-figure');

  const productName = document.createElement('h2');
  productName.classList.add('produkt-overskrift');
  productName.textContent = kage.navn;

  const productInfo = document.createElement('div');
  productInfo.classList.add('produkt-information');

  const productImage = document.createElement('img');
  productImage.classList.add('produkt-billede');
  productImage.src = kage.billede;
  productImage.alt = "";

  const productDescription = document.createElement('p');
  productDescription.classList.add('produkt-p');
  productDescription.textContent = kage.beskrivelse;

  const productIcons = document.createElement('div');
  productIcons.classList.add('produkt-ikoner');
  
  // Create and append icons
  kage.ikoner.forEach(iconUrl => {
      const icon = document.createElement('img');
      icon.src = iconUrl;
      icon.alt = "Icon";
      productIcons.appendChild(icon);
  });

  const buttonsDiv = document.createElement('div');
  const minusButton = document.createElement('button');
  minusButton.type = "button";
  minusButton.classList.add('produkt-minus-button');
  minusButton.textContent = '-';
  minusButton.onclick = function() {
      adjustValue(this.parentNode.querySelector('.output'), -1);
  };

  const outputInput = document.createElement('input');
  outputInput.type = "text";
  outputInput.classList.add('output', 'produkt-button-value');
  outputInput.name = "output";
  outputInput.value = "0";
  outputInput.readOnly = true;

  const plusButton = document.createElement('button');
  plusButton.type = "button";
  plusButton.classList.add('produkt-plus-button');
  plusButton.textContent = '+';
  plusButton.onclick = function() {
      adjustValue(this.parentNode.querySelector('.output'), 1);
  };

  buttonsDiv.appendChild(minusButton);
  buttonsDiv.appendChild(outputInput);
  buttonsDiv.appendChild(plusButton);

  const addButton = document.createElement('button');
  addButton.type = "button";
  addButton.classList.add('tilfojButton', 'produkt-tilfoj-knap');
  addButton.textContent = "TILFØJ";
  addButton.onclick = function() {
      displayValue(this.parentNode.querySelector('.output'), this);
  };

  productInfo.appendChild(productImage);
  productInfo.appendChild(productDescription);
  productInfo.appendChild(productIcons);
  productInfo.appendChild(buttonsDiv);
  productInfo.appendChild(addButton);

  figure.appendChild(productName);
  figure.appendChild(productInfo);

  parentElement.appendChild(figure);
});

        function adjustValue(outputField, change) {
          let currentValue = parseInt(outputField.value);
          let newValue = currentValue + change;
      
          if (newValue < 0) {
              newValue = 0;
          }
      
          outputField.value = newValue;
      }

    })
    .catch(error => {
        console.error('Error:', error);
    });

    function displayValue(outputField, addButton) {
      let currentValue = parseInt(outputField.value);
      
      if (currentValue > 0) {
          let productName = addButton.parentNode.parentNode.querySelector('.produkt-overskrift').textContent;
          let listItem = document.createElement('li');
          listItem.textContent = `${currentValue} ${productName}`;
          
          let displayArea = document.querySelector('.displayArea');
          displayArea.appendChild(listItem);
          
          outputField.value = 0; // Reset the output field value after adding to the list

          addButton.style.backgroundColor = '#2D65B6';
          addButton.style.color = '#FFFFFF';
          addButton.textContent = 'TILFØJET';
      } else {
          // You might want to handle this case differently, perhaps by showing a message to the user
          alert("Can't add to order: Quantity is zero.");
      }
  }
  
>>>>>>> Stashed changes
