/**
 * Main Script for Style Library
 * Handles interactions like Navbar toggle and dynamic behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Toggle Logic
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            
            // Optional: Animate hamburger icon (transform to X)
            const spans = navbarToggler.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                // Simple animation logic if needed
            }
        });
    }

    // 2. Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Future: Add logic for Career Map or Chat interactions here
    console.log('Style Library Loaded Successfully');
});
