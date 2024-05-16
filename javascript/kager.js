// Select the parent element where the figures will be appended
const parentElement = document.getElementById("myForm");

// URL to the JSON file containing cake data
const url = "../json/kager.json";

// Fetch the JSON data
fetch(url)
    .then(response => {
        // Check if the response is ok, if not, throw an error
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        // Parse and return the JSON data
        return response.json();
    })
    .then(data => {
        // Extract the "kager" array from the fetched data
        const kageData = data.kager;

        // Loop through each item in kageData and create the necessary elements
        kageData.forEach(kage => {
            // Create a figure element for each cake
            const figure = document.createElement("figure");
            figure.classList.add("produkt-figure");

            // Create an element for the cake name
            const productName = document.createElement("h2");
            productName.classList.add("produkt-overskrift");
            productName.textContent = kage.navn;

            // Create a div to contain the product information
            const productInfo = document.createElement("div");
            productInfo.classList.add("produkt-information");

            // Create an image element for the cake
            const productImage = document.createElement("img");
            productImage.classList.add("produkt-billede");
            productImage.src = kage.billede;
            productImage.alt = `billede af ${kage.navn}`;

            // Create a paragraph element for the cake description
            const productDescription = document.createElement("p");
            productDescription.classList.add("produkt-p");
            productDescription.textContent = kage.beskrivelse;

            // Create a div to contain the icons
            const productIcons = document.createElement("div");
            productIcons.classList.add("produkt-ikoner");

            // Loop through each icon URL and create img elements for them
            kage.ikoner.forEach(iconUrl => {
                const icon = document.createElement("img");
                icon.src = iconUrl;
                icon.alt = "Icon";
                productIcons.appendChild(icon);
            });

            // Create a div to contain the buttons for adjusting quantity
            const buttonsDiv = document.createElement("div");

            // Create the minus button
            const minusButton = document.createElement("button");
            minusButton.type = "button";
            minusButton.classList.add("produkt-minus-button");
            minusButton.textContent = "-";
            minusButton.onclick = function() {
                adjustValue(this.parentNode.querySelector(".output"), -1);
            };

            // Create the input element to display the current quantity
            const outputInput = document.createElement("input");
            outputInput.type = "text";
            outputInput.classList.add("output", "produkt-button-value");
            outputInput.value = "0";
            outputInput.readOnly = true;

            // Create the plus button
            const plusButton = document.createElement("button");
            plusButton.type = "button";
            plusButton.classList.add("produkt-plus-button");
            plusButton.textContent = "+";
            plusButton.onclick = function() {
                adjustValue(this.parentNode.querySelector(".output"), 1);
            };

            // Append the buttons and input to the buttonsDiv
            buttonsDiv.appendChild(minusButton);
            buttonsDiv.appendChild(outputInput);
            buttonsDiv.appendChild(plusButton);

            // Create the add button
            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.classList.add("tilfojButton", "produkt-tilfoj-knap");
            addButton.textContent = "TILFØJ";
            addButton.onclick = function() {
                displayValue(this.parentNode.querySelector(".output"), this);
            };

            // Append the elements to productInfo
            productInfo.appendChild(productImage);
            productInfo.appendChild(productDescription);
            productInfo.appendChild(productIcons);
            productInfo.appendChild(buttonsDiv);
            productInfo.appendChild(addButton);

            // Append the product name and info to the figure
            figure.appendChild(productName);
            figure.appendChild(productInfo);

            // Append the figure to the parent element
            parentElement.appendChild(figure);
        });

        /**
         * Adjusts the value in the specified output field by a given change amount.
         * @param {HTMLElement} outputField - The output field element.
         * @param {number} change - The amount to change the value by.
         */
        function adjustValue(outputField, change) {
            let currentValue = parseInt(outputField.value);
            let newValue = currentValue + change;

            // Ensure the value doesn"t go below zero
            if (newValue < 0) {
                newValue = 0;
            }

            // Update the output field with the new value
            outputField.value = newValue;
        }

    })
    .catch(error => {
        // Log any errors that occur during fetch
        console.error("Error:", error);
    });

/**
 * Displays the value in the output field in the order list.
 * @param {HTMLElement} outputField - The output field element.
 * @param {HTMLElement} addButton - The add button element.
 */
function displayValue(outputField, addButton) {
    let currentValue = parseInt(outputField.value);

    // Ensure the quantity is greater than zero
    if (currentValue > 0) {
        // Get the product name
        let productName = addButton.parentNode.parentNode.querySelector(".produkt-overskrift").textContent;

        // Create an input element for the order list
        let listItem = document.createElement("input");
        listItem.value = `${currentValue}x ${productName}`;
        listItem.classList.add("koeb-liste");
        listItem.readOnly = true;
        listItem.name = "Kager";

        // Create a button to delete the item from the list
        let deleteItem = document.createElement("button");
        deleteItem.textContent = "Fjern";
        deleteItem.classList.add("removeButton");

        // Select the display area for the order list
        let displayArea = document.querySelector(".displayArea");

        // Append the delete button and list item to the display area
        displayArea.appendChild(deleteItem);
        displayArea.appendChild(listItem);

        // Event listener to handle removal of the list item
        deleteItem.addEventListener("click", function() {
            displayArea.removeChild(listItem);
            displayArea.removeChild(deleteItem);
        });

        // Reset the output field value after adding to the list
        outputField.value = 0;

        // Update the add button appearance and text
        addButton.style.backgroundColor = "#2D65B6";
        addButton.style.color = "#FFFFFF";
        addButton.textContent = "TILFØJET";
    } else {
        // Alert the user to select at least one cake
        alert("Vælg venligst mindst 1 kage");
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Calculate total quantity of cakes selected
    const orderListItems = document.querySelectorAll(".orderList input");
    let totalQuantity = 0;
    orderListItems.forEach(orderItem => {
        const quantityText = orderItem.value.split("x")[0].trim(); // Extract quantity from input value
        const quantity = parseInt(quantityText);
        if (!isNaN(quantity)) { // Check if extracted quantity is a valid number
            totalQuantity += quantity;
        }
    });

    // Check if total quantity is at least 4
    console.log("Total quantity selected:", totalQuantity);
    if (totalQuantity < 4) {
        alert("Vælg venligst mindst 4 kager.");
    } else {
        // If validation passes, submit the form
        event.target.submit();
    }
}

// Add event listener to form submission
const form = document.querySelector(".form");
form.addEventListener("submit", handleFormSubmit);

