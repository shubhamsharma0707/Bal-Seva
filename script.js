document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Fade-in on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 3. Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let startTime = null;
                
                // Easing function
                const easeOutQuad = t => t * (2 - t);
                
                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const easedProgress = easeOutQuad(progress);
                    target.innerText = Math.floor(easedProgress * endValue);
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = endValue;
                    }
                };
                
                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
});
