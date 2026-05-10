/**
 * Three.js Scene for Portfolio
 * Implements a 3D animated particle system reacting to mouse movement.
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particle System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const isDarkMode = () => !document.getElementById('dark-theme-style').hasAttribute('disabled');

const getParticleColor = () => '#8b5cf6';

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: getParticleColor(),
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

// Update colors on theme toggle
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
            particlesMaterial.color.set(getParticleColor());
        }
    });
});

observer.observe(document.getElementById('dark-theme-style'), { attributes: true });

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    
    // Mouse movement influence
    if (window.innerWidth > 768) {
        gsap.to(particlesMesh.rotation, {
            x: -mouseY * 0.5,
            y: mouseX * 0.5,
            duration: 2,
            ease: "power2.out"
        });
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Entrance & Floating Animations for Hero Text
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    
    tl.from('.animate-in', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
    });

    // Floating effect
    gsap.to('.hero-title', {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('.hero-subtitle', {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
    });
});
