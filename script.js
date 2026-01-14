// Breathing Cycle Animation
class BreathingCycle {
    constructor() {
        this.phases = [
            { name: 'Hold Off', chinese: '住息', duration: 2, color: '#95A5A6' },
            { name: 'Inhale', chinese: '入息', duration: 12, color: '#3498DB' },
            { name: 'Hold On', chinese: '顿息', duration: 1, color: '#E67E22' },
            { name: 'Exhale', chinese: '出息', duration: 2, color: '#2ECC71' }
        ];

        this.currentPhaseIndex = 1; // Start with Inhale
        this.totalDuration = this.phases.reduce((sum, phase) => sum + phase.duration, 0);
        this.startTime = Date.now();
        this.running = true;

        this.cycleProgress = document.getElementById('cycleProgress');
        this.cycleLabel = document.getElementById('cycleLabel');
        this.cycleTime = document.getElementById('cycleTime');

        this.init();
    }

    init() {
        this.animate();
    }

    formatTime(minutes) {
        const mins = Math.floor(minutes);
        const secs = Math.floor((minutes - mins) * 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    getCurrentPhase() {
        const elapsed = ((Date.now() - this.startTime) / 1000 / 60) % this.totalDuration;
        let accumulatedTime = 0;

        for (let i = 0; i < this.phases.length; i++) {
            accumulatedTime += this.phases[i].duration;
            if (elapsed < accumulatedTime) {
                const phaseElapsed = elapsed - (accumulatedTime - this.phases[i].duration);
                const phaseRemaining = this.phases[i].duration - phaseElapsed;
                return {
                    index: i,
                    phase: this.phases[i],
                    remaining: phaseRemaining,
                    progress: phaseElapsed / this.phases[i].duration
                };
            }
        }

        return {
            index: 0,
            phase: this.phases[0],
            remaining: this.phases[0].duration,
            progress: 0
        };
    }

    animate() {
        if (!this.running) return;

        const current = this.getCurrentPhase();

        // Update label
        this.cycleLabel.textContent = current.phase.chinese;

        // Update time
        this.cycleTime.textContent = this.formatTime(current.remaining);

        // Update progress circle
        const circumference = 2 * Math.PI * 80; // r=80
        const offset = circumference - (current.progress * circumference);
        this.cycleProgress.style.strokeDashoffset = offset;
        this.cycleProgress.style.stroke = current.phase.color;

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    pause() {
        this.running = false;
    }

    resume() {
        this.running = true;
        this.animate();
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    // Initialize breathing cycle animation
    const breathingCycle = new BreathingCycle();

    // Add fade-in effect to sections
    const sections = document.querySelectorAll('.philosophy, .cycle-explanation, .features, .download');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate phase cards
    const phaseCards = document.querySelectorAll('.phase');
    phaseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate pattern cards
    const patternCards = document.querySelectorAll('.pattern-card');
    patternCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            breathingCycle.pause();
        } else {
            breathingCycle.resume();
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 3s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
