document.addEventListener('DOMContentLoaded', () => {
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
