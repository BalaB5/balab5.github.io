const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const getParticleColor = () => '#3B82F6';

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: getParticleColor(),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
});

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

camera.position.z = 3;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.03;

    if (window.innerWidth > 768) {
        gsap.to(particlesMesh.rotation, {
            x: -mouseY * 0.3,
            y: mouseX * 0.3,
            duration: 2,
            ease: "power2.out"
        });
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();

    tl.from('.hero-content > *', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
    });
});
