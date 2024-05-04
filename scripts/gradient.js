let isMouseActive = false;
let animationId = null;
let gradientRotationRadius = 35; // This is actually the rotation radius I made an oops

// Check if the website is being viewed on a mobile device (and if so we do not check for mouse position because there is no mouse)
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Update gradient based on mouse position
function updateGradient(event) {
    const mouseX = event.pageX;
    const mouseY = event.pageY + 0; // Adjust mouseY for scroll position

    // Calculate gradient colors based on mouse position
    const gradientX = (mouseX / window.innerWidth) * 100;
    const gradientY = (mouseY / ((window.innerHeight) + (1.8 * window.scrollY))) * 100; // Adjust for scroll position

    const color1 = '#812020';
    const color2 = '#181818';

    // Update background gradient style
    const dynamicBackground = document.getElementById('dynamic-background');
    dynamicBackground.style.background = `radial-gradient(circle 128vmin at ${gradientX}% ${gradientY}%, ${color1}, ${color2})`;
    
    // dynamicBackground.style.filter = 'blur(1px)';
}

function updateAutomaticGradient() {
    let angle = 0;

    const color1 = '#812020';
    const color2 = '#181818';

    function animateGradient() {
        const centerX = 50 + gradientRotationRadius * Math.cos(angle); 
        const centerY = 50 + gradientRotationRadius * Math.sin(angle); 

        // Update background gradient style
        const dynamicBackground = document.getElementById('dynamic-background');
        dynamicBackground.style.background = `radial-gradient(circle 128vmin at ${centerX}% ${centerY}%, ${color1}, ${color2})`;
        
        // dynamicBackground.style.filter = 'blur(1px)';

        angle += 0.0048;

        // Continue animation loop unless mouse is active
        if (!isMouseActive) {
            animationId = requestAnimationFrame(animateGradient);
        }
    }

    animateGradient();
}

// Only add mouse and touch event listeners if not on a mobile device
if (!isMobile) {
    // Check if mouse is active (on desktop or laptops)
    document.addEventListener('mousemove', function (event) {
        isMouseActive = true;
        updateGradient(event);
    });

    // Check if touch is active (on mobile or touch devices)
    document.addEventListener('touchstart', function (event) {
        isMouseActive = true;
        updateGradient(event.touches[0]);
    });

    // Handle mouse leaving the window
    document.addEventListener('mouseleave', function () {
        isMouseActive = false;
        updateAutomaticGradient();
    });
}

// Start with automatic gradient circling if no mouse or touch detected
updateAutomaticGradient();
