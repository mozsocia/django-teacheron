document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',           // Use 'loop' to enable continuous looping
        perPage: 1,             // Number of slides per page
        autoplay: true,         // Auto play the slider
        interval: 4000,       // Autoplay interval in milliseconds (2 seconds)
        pauseOnHover: true,     // Pause autoplay on hover
        arrows: true,           // Show arrows for navigation
        pagination: false,      // Hide pagination bullets
    
    }).mount();  // Initialize the Splide instance
});
