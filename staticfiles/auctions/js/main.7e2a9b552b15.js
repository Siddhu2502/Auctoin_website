// Wait for document to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }

    // Create cursor effect
    createCursorEffect();
    
    // Initialize all other effects
    initializeEffects();
});




// Cursor effect
function createCursorEffect() {
    let cursorDot = document.querySelector('.cursor-dot');
    let cursorGradient = document.querySelector('.cursor-dot-gradient');

    // Create elements if they don't exist
    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }
    if (!cursorGradient) {
        cursorGradient = document.createElement('div');
        cursorGradient.className = 'cursor-dot-gradient';
        document.body.appendChild(cursorGradient);
    }

    // Add mousemove event listener
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            cursorGradient.style.transform = `translate(${e.clientX - 75}px, ${e.clientY - 75}px)`;
        });
    });
}

// Initialize all effects
function initializeEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', handleCardReset);
    });

    // Form enhancement
    enhanceForms();
}

// Card hover effect
function handleCardHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / 10).toFixed(2);
    const rotateY = ((centerX - x) / 10).toFixed(2);
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
    `;
    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
}

// Reset card transform
function handleCardReset(e) {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
}

// Enhance forms
function enhanceForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                
                // Create and add spinner
                const spinner = document.createElement('span');
                spinner.className = 'spinner-border spinner-border-sm mr-2';
                spinner.setAttribute('role', 'status');
                spinner.setAttribute('aria-hidden', 'true');
                
                submitBtn.innerHTML = '';
                submitBtn.appendChild(spinner);
                submitBtn.appendChild(document.createTextNode(' Processing...'));
                
                // Add loading class to form
                form.classList.add('form-loading');
                
                // Reset button after 2 seconds if form hasn't redirected
                setTimeout(() => {
                    if (!submitBtn.disabled) return;
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    form.classList.remove('form-loading');
                }, 2000);
            }
        });
    });
}

// Show notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} animated fadeInRight`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOutRight 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}