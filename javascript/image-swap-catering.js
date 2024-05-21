document.addEventListener("DOMContentLoaded", function() {
    let images = ["/pictures/bryllupskage.jpg", "/pictures/billede-catering-2.png", "/pictures/billede-catering-3.png"];
    let currentIndex = 0;
    let currentImage = document.getElementById('catering-image');

    function changeImage() {
        // Fade out the current image
        currentImage.style.opacity = 0;

        setTimeout(function() {
            // Change the image source after the fade out transition
            currentIndex = (currentIndex + 1) % images.length;
            currentImage.src = images[currentIndex];

            // Fade in the new image
            currentImage.style.opacity = 1;
        }, 1000); // Duration matches the CSS transition duration
    }

    setInterval(changeImage, 5000);
});
