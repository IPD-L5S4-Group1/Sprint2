/* js/script.js */

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    // Select all buttons with the class 'btn'
    const buttons = document.querySelectorAll('.btn');

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Prevent action if button is already disabled
            if (this.disabled) return;

            // 1. Save original text
            const originalText = this.innerText;

            // 2. Change state to "Loading"
            this.innerText = 'Processing...';
            this.style.opacity = '0.7';
            this.style.cursor = 'wait';

            // 3. Simulate an API call (2 seconds delay)
            setTimeout(() => {
                // Restore original state
                this.innerText = originalText;
                this.style.opacity = '1';
                this.style.cursor = 'pointer';

                // Optional: Log action for debugging
                console.log(`Button "${originalText}" clicked`);
            }, 2000);
        });
    });
});