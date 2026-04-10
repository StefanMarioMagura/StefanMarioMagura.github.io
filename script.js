/**
 * Network Node Particles Effect
 */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let w, h, particles;
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('resize', windowResize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function windowResize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    init();
}

class Particle {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // Move slightly
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on edges
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        // Mouse interaction
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            }
        }
    }
}

function init() {
    particles = [];
    let numberOfParticles = (w * h) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < (w/10) * (h/10)) {
                let opacity = 1 - (distance / ((w/10) * (h/10)));
                ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

// Start Network Animation
windowResize();
animate();

/**
 * Certificate Modals
 */
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close-modal');

// Mapear los identificadores (del HTML onclick="openCert('ID')") a los nombres de tus archivos reales de certificados
// DEBES CAMBIAR ESTOS NOMBRES por los que tengas dentro de la carpeta portfolio/assets/certificados/
const certPaths = {
    'cisco-cyber': 'assets/certificados/cert1.png',
    'cisco-linux': 'assets/certificados/cert2.png',
    'ie-data': 'assets/certificados/cert3.png',
    'santander-python': 'assets/certificados/cert4.png',
    'helsinki-ai': 'assets/certificados/cert5.png',
    'google-ai': 'assets/certificados/cert6.png'
};

function openCert(certId) {
    modalImg.src = certPaths[certId];
    modal.style.display = 'flex';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

/**
 * Scroll Reveal Effects
 */
const scrollElements = document.querySelectorAll('.bento-box, .portfolio-card, .cred-category');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
};

const hideScrollElement = (element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
};

// Initial state
scrollElements.forEach((el) => hideScrollElement(el));

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    })
}
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});
handleScrollAnimation(); // trigger once on load

/**
 * Typing Text Effect for Hero Title
 */
const typingTextElement = document.querySelector('.typing-text');
const words = ["AI Agents Workflows", "Cybersecurity Defenses", "IT Core Infrastructure"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);
