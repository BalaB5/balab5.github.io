document.addEventListener('DOMContentLoaded', function () {
    // Set the interval for changing the slides (in milliseconds)
    const interval = 4000; // Change image every 5 seconds (adjust as needed)

    // Get all images and navigation buttons
    const slides = document.querySelectorAll('.img-slide');
    const navButtons = document.querySelectorAll('.nav-btn');

    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            navButtons[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        navButtons[index].classList.add('active');
    }

    // Function to handle automatic slide change
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Set up the automatic slider
    const sliderInterval = setInterval(nextSlide, interval);

    // Handle navigation button clicks
    navButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            clearInterval(sliderInterval); // Stop the automatic slider on button click
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
});
